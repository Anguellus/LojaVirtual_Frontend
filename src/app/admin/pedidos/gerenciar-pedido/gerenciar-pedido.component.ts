import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/components/produtos/produto.model';
import { ProdutosService } from 'src/app/components/produtos/produtos.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Usuario } from 'src/app/views/login/usuario.model';
import { Pedido } from 'src/app/views/pedidos/pedido.model';
import { PedidosService } from 'src/app/views/pedidos/pedidos.service';
import { ProdutoPedido } from 'src/app/views/pedidos/produtoPedido.model';
import { ClientesService } from '../../clientes/clientes.service';
import { GerenciarPedidoService } from './gerenciar-pedido.service';

@Component({
  selector: 'app-gerenciar-pedido',
  templateUrl: './gerenciar-pedido.component.html',
  styleUrls: ['./gerenciar-pedido.component.css']
})
export class GerenciarPedidoComponent implements OnInit {

  clientes: Usuario[] = []
  produtos: Produto[] = []

  clienteSelect: Usuario = {
    nome: '',
    CPF: '',
    email: '',
    endereco: '',
    password: '',
    telefone: '',
    _id: 0
  }
  produtoSelect: ProdutoPedido = {
    _id: 0,
    nome: '',
    preco: 0,
    quantidade: 0,
    totalProduto: 0
  }

  totalPedido: number = 0

  carrinho: ProdutoPedido[] = []

  displayedColumns = ['nome', 'preco', 'quantidade', 'total_item']

  constructor(private pedidosSVC: PedidosService , private gerenciarPedidoSrc: GerenciarPedidoService, private produtosSvc: ProdutosService, private clientesService: ClientesService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    //console.log(this.headerService.headerData)
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || 'master')) {
      this.clientesService.read().subscribe(clientes => {
        this.clientes = clientes
        this.produtosSvc.read().subscribe(produtos => {
          this.produtos = produtos
          this.carrinho = this.gerenciarPedidoSrc.carrinhoData.produtos
          this.clienteSelect = this.gerenciarPedidoSrc.clienteData
          this.totalPedido = this.gerenciarPedidoSrc.totalPedido
          // console.log("CLIENTE ONINIT: " + JSON.stringify(this.clienteSelect))
          this.produtoSelect = this.gerenciarPedidoSrc.produtoData
          //console.log(JSON.stringify(this.produtoSelect))
        })
      })
    } else {
      this.router.navigate(['admin'])
    }
  }

  adicionarAoCarrinho() {
    let prodPedido: ProdutoPedido = {
      _id: 0,
      nome: '',
      preco: 0,
      quantidade: 0,
      totalProduto: 0
    }

    prodPedido._id = this.produtoSelect._id
    prodPedido.nome = this.produtoSelect.nome
    prodPedido.preco = this.produtoSelect.preco
    prodPedido.quantidade = this.produtoSelect.quantidade
    prodPedido.totalProduto = this.produtoSelect.quantidade * this.produtoSelect.preco

    if (this.gerenciarPedidoSrc.carrinhoData.idCliente == '') {
      this.gerenciarPedidoSrc.carrinhoData.idCliente = `${this.clienteSelect._id}`
      this.gerenciarPedidoSrc.carrinhoData.dataPedido = new Date()
      this.gerenciarPedidoSrc.clienteData = this.clienteSelect
    }
    this.gerenciarPedidoSrc.produtoData = this.produtoSelect
    this.adicionarProdutoAoCarrinho(prodPedido)
    // console.log(JSON.stringify(this.gerenciarPedidoSrc.carrinhoData.produtos))
    //this.gerenciarPedidoSrc.carrinhoData.produtos.push(prodPedido)
    //this.zerarProduto()
    this.router.navigate(['admin/pedidos/update'])
  }

  adicionarProdutoAoCarrinho(produto: ProdutoPedido) {
    let encontrado: boolean = false
    let indice = 0
    console.log(produto.quantidade)
    if (produto.quantidade == undefined || 0){
      this.produtosSvc.showMessage("Quantidade não pode ser 0.", false)
    }
    else {
      if (this.gerenciarPedidoSrc.carrinhoData.produtos.length == 0) {
        this.gerenciarPedidoSrc.carrinhoData.produtos.push(produto)
        this.totalPedido = produto.preco * produto.quantidade
        console.log("TOTAl PEDIDO: " + this.totalPedido)
      }
      else {
        for (let index = 0; index < this.gerenciarPedidoSrc.carrinhoData.produtos.length; index++) {
          const element = this.gerenciarPedidoSrc.carrinhoData.produtos[index]
  
          if (element._id == produto._id) {
            encontrado = true
            indice = index
          }
        }
        if (encontrado) {
          this.gerenciarPedidoSrc.carrinhoData.produtos[indice].quantidade = parseInt(`${this.gerenciarPedidoSrc.carrinhoData.produtos[indice].quantidade}`) + parseInt(`${produto.quantidade}`)
          this.totalPedido += (produto.quantidade * produto.preco)
          console.log("TOTAl PEDIDO: " + this.totalPedido)
        } else {
          this.gerenciarPedidoSrc.carrinhoData.produtos.push(produto)
          this.totalPedido += (produto.quantidade * produto.preco)
          console.log("TOTAl PEDIDO: " + this.totalPedido)
        }
      }
      this.gerenciarPedidoSrc.totalPedido = this.totalPedido
    }
  }

  finalizarPedido (){
    let pedido: Pedido = {
      idCliente: `${this.gerenciarPedidoSrc.clienteData._id}`,
      status: 'enviado',
      dataPedido: new Date(),
      produtos: this.gerenciarPedidoSrc.carrinhoData.produtos,
      totalPedido: this.totalPedido
    }

    this.pedidosSVC.criarPedido(pedido).subscribe(pedidos => {
      this.totalPedido = 0
      this.zerarProduto()
      this.zerarCliente()
      this.zerarProduto()
      this.pedidosSVC.showMessage("Pedido finalizado. Acompanhe o andamento em pedidos.")
      this.router.navigate(['/admin/pedidos'])
    })
  }

  voltar() {
    this.router.navigate(['admin/pedidos'])
  }

  zerarProduto() {
    this.produtoSelect = {
      _id: 0,
      nome: '',
      preco: 0,
      quantidade: 0,
      totalProduto: 0
    }
  }

  zerarCliente() {
    this.clienteSelect = {
      _id: 0,
      nome: '',
      CPF: '',
      email: '',
      endereco: '',
      password: '',
      telefone: ''
    }
  }

  zerarPedido() {
    this.carrinho = []
    this.totalPedido = 0
  }

}

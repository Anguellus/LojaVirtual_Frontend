import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/dir-document-token';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/components/produtos/produto.model';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Pedido } from '../pedidos/pedido.model';
import { PedidosService } from '../pedidos/pedidos.service';
import { ProdutoPedido } from '../pedidos/produtoPedido.model';
import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  pedido: Pedido[] = []
  totalPedido: number = 0

  displayedColumns = ['produtos'];
  // , 'total_pedido', 'status'

  produtoDisplayedColumns = ['nome', 'preco', 'quantidade', 'total_item', 'action'];

  constructor(private headerSvc: HeaderService, private pedidosSvc: PedidosService, private router: Router, private carrinhoSvc: CarrinhoService) { }

  ngOnInit(): void {
    if (this.headerSvc.headerData.autenticado) {
      this.pedido.push(this.carrinhoSvc.carrinhoData)
      //this.produtos = this.carrinhoSvc.carrinhoData.produtos
      for (let index = 0; index < this.pedido[0].produtos.length; index++) {
        const total_item = this.pedido[0].produtos[index].preco * this.pedido[0].produtos[index].quantidade;
        this.totalPedido = this.totalPedido + total_item
      }
    }
    else {
      this.router.navigate(['/'])
    }
  }

  removerItem(idProduto: number) {
    console.log("REMOVER ITEM COKPONENT: " + idProduto)
    this.carrinhoSvc.removerItem(idProduto)
    this.router.navigate(['/carrinho/delete'])
  }

  aumentarQtd(idProduto: number) {
    this.carrinhoSvc.aumentarQtd(idProduto)
    this.router.navigate(['/carrinho/update'])
  }

  diminuirQtd(idProduto: number) {
    this.carrinhoSvc.diminuirQtd(idProduto)
    this.router.navigate(['/carrinho/update'])
  }

  finalizarPedido() {
    console.log("FINALIZAR PEDIDO: " + JSON.stringify(this.pedido))
    this.pedido[0].dataPedido = new Date()
    this.pedidosSvc.criarPedido(this.pedido[0]).subscribe(pedidos => {
      this.pedido[0].status = 'enviado'
      this.totalPedido = 0
      this.headerSvc.headerData.itensCarrinho = 0
      this.carrinhoSvc.limparCarrinho()
      this.pedidosSvc.showMessage("Pedido finalizado. Acompanhe o andamento em pedidos.")
      this.router.navigate(['/'])
    })
  }

}

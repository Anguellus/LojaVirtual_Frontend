import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/components/produtos/produto.model';
import { ProdutosService } from 'src/app/components/produtos/produtos.service';
import { HeaderData } from 'src/app/components/template/header/header-data.model';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { ProdutoPedido } from '../pedidos/produtoPedido.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos: Produto[] = [];

  autenticado: boolean = false

  constructor(private headerSrv: HeaderService, private carSvc: CarrinhoService, private produtoService: ProdutosService) { }

  ngOnInit(): void {
    this.autenticado = this.headerSrv.headerData.autenticado
    this.produtoService.read().subscribe(produtos => {
      this.produtos = produtos
    })
  }

  incluir(idProduto: number | undefined, nomeProduto: string, preco: number): void {
    if (idProduto != undefined) {
      let produto: ProdutoPedido = {
        _id: idProduto,
        nome: nomeProduto,
        preco: preco,
        totalProduto: 0,
        quantidade: 0
      }
      this.carSvc.incluirItem(produto)
    }
  }

}

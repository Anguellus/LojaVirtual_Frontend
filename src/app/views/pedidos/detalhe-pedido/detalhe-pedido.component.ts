import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Produto } from 'src/app/components/produtos/produto.model';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Pedido } from '../pedido.model';
import { PedidosService } from '../pedidos.service';
import { ProdutoPedido } from '../produtoPedido.model';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.css']
})
export class DetalhePedidoComponent implements OnInit {

  pedidos: Pedido[] = []
  produtos: ProdutoPedido[] = []

  // , 'total_pedido', 'dataPedido', 'dataEntrega', 'status'
  displayedColumns = ['numero', 'produtos', 'total_pedido', 'dataPedido', 'dataEntrega', 'status'];

  produtoDisplayedColumns = ['nome', 'preco', 'quantidade', 'total_item'];

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute, private pedidosService: PedidosService) { }

  ngOnInit(): void {
    if (this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'cliente') {
      const idPedido = this.route.snapshot.paramMap.get('id')
      if (idPedido != null) {
        this.pedidosService.readByPedido(idPedido).subscribe(pedido => {
          //let v1 = JSON.stringify(pedidos)
          this.pedidos = pedido
          this.produtos = pedido[0].produtos
          //console.log("PEDIDOS: " + JSON.stringify(this.pedidos))
        })
      }
    } else {
      this.router.navigate(['/'])
    }
  }

  voltar() {
    this.router.navigate(['/pedidos'])
  }

}

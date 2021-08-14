import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosAdminService } from 'src/app/admin/produtos/produtos-admin.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Pedido } from './pedido.model';
import { PedidosService } from './pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: Pedido[] = [];

  displayedColumns = ['numero', 'total_pedido', 'dataPedido', 'dataEntrega', 'status'];

  produtoDisplayedColumns = ['nome', 'preco', 'quantidade', 'total_item'];

  constructor(private headerService: HeaderService, private pedidosService: PedidosService, private router: Router) { }

  ngOnInit(): void {
    if (this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'cliente') {
      this.pedidosService.readByCliente(this.headerService.headerData.id).subscribe(pedidos => {
        console.log("PEDIDOS: " + JSON.stringify(pedidos))
        //let v1 = JSON.stringify(pedidos)
        this.pedidos = pedidos
      })
    } else {
      this.router.navigate(['/'])
    }
  }

  get autenticado(): boolean {
    return this.headerService.headerData.autenticado;
  }

}

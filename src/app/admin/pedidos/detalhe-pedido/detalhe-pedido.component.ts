import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Usuario } from 'src/app/views/login/usuario.model';
import { Pedido } from 'src/app/views/pedidos/pedido.model';
import { ProdutoPedido } from 'src/app/views/pedidos/produtoPedido.model';
import { ClientesService } from '../../clientes/clientes.service';
import { UsuariosAdminComponent } from '../../usuarios/usuarios.component';
import { PedidosAdminService } from '../pedidos-admin.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.css']
})
export class DetalheAdminPedidoComponent implements OnInit {

  pedidos: Pedido[] = []
  produtos: ProdutoPedido[] = []

  // , 'total_pedido', 'dataPedido', 'dataEntrega', 'status'
  displayedColumns = ['numero', 'produtos', 'total_pedido', 'dataPedido', 'dataEntrega', 'status', 'acoes']

  produtoDisplayedColumns = ['nome', 'preco', 'quantidade', 'total_item'];

  clienteDisplayedColumns = ['nome', 'endereco', 'telefone'];

  // status: Status[] = [
  //   { value: 'andamento', viewValue: 'Em andamento' },
  //   { value: 'entrega', viewValue: 'Saiu para entrega' },
  //   { value: 'entregue', viewValue: 'Entregue' }
  // ];

  cliente: Usuario = {
    CPF:  '',
    email: '',
    endereco: '',
    nome: '',
    password: '',
    telefone: '',
    _id: 0
  }
  selected = '';

  constructor(private clienteSVC: ClientesService, private router: Router, private headerService: HeaderService, private route: ActivatedRoute, private pedidosAdminService: PedidosAdminService) { }

  ngOnInit(): void {
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || this.headerService.headerData.perfil == 'master')) {
      const idPedido = this.route.snapshot.paramMap.get('id')
      if (idPedido != null) {
        this.pedidosAdminService.readByPedido(idPedido).subscribe(pedido => {
          this.clienteSVC.readById(pedido[0].idCliente).subscribe(cliente => { 
            this.cliente = cliente
            console.log("retorno do rd BY ID: " + JSON.stringify(this.cliente))
          })
          this.selected = pedido[0].status
          console.log("SELECTED: " + this.selected)
          this.pedidos = pedido
          this.produtos = pedido[0].produtos
        })
      }
    } else {
      this.router.navigate(['/'])
    }
  }

  atualizar() {
    this.pedidos[0].status = this.selected
    if (this.selected == 'entregue!') {
      this.pedidos[0].dataEntrega = new Date()
    }
    this.pedidosAdminService.update(this.pedidos[0]).subscribe(retorno => {
      this.router.navigate(['/admin/pedidos/'])
    })
    this.pedidosAdminService.showMessage("Pedido atualizado com sucesso!")
  }

  voltar(): void {
    this.router.navigate(['/admin/pedidos'])
  }

  apagarPedido() {
    if (this.pedidos[0]._id != null) {
      this.pedidosAdminService.delete(this.pedidos[0]._id).subscribe(retorno => {
        this.router.navigate(['/admin/pedidos/'])
      })
      this.pedidosAdminService.showMessage("Pedido apagado!")
    }
  }
}

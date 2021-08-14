import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { LoginService } from 'src/app/views/login/login.service';
import { Usuario } from 'src/app/views/login/usuario.model';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Usuario = {
    CPF: '',
    email: '',
    endereco: '',
    nome: '',
    password: '',
    telefone: ''
  }

  constructor(private loginSVC: LoginService, private route: ActivatedRoute, private clientesService: ClientesService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    const idCliente = this.route.snapshot.paramMap.get('id')
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || this.headerService.headerData.perfil == 'master')) {
      if (idCliente != null) {
        this.clientesService.readById(idCliente).subscribe(cliente => {
          this.cliente = cliente
        })
      }
    } else {
      this.router.navigate(['admin/clientes'])
    }
  }

  updateCliente(): void {
    console.log("UPDATE CLIENTE COMPONENT: " + JSON.stringify(this.cliente))
    this.cliente.password = this.loginSVC.critpSenha(this.cliente.password)
    this.clientesService.update(this.cliente).subscribe(usuario => {
      this.clientesService.showMessage('Cliente atualizado')
      this.router.navigate(['/admin/clientes'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/admin/clientes'])
  }

}

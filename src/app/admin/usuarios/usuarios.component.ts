import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { ClientesService } from '../clientes/clientes.service';
import { UsuariosAdminService } from './usuarios-admin.service';
import { UsuarioAdmin } from './usuariosAdmin.model';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosAdminComponent implements OnInit {

  usuarios: UsuarioAdmin[] = [];
  displayedColumns = ['id', 'usuario','nome', 'master', 'action'];

  constructor(private usuarioAdminSvc: UsuariosAdminService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    if (this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'master'){
      this.usuarioAdminSvc.read().subscribe(usuariosAdmin => {
        this.usuarios = usuariosAdmin
      })
    } else {
      this.router.navigate(['admin'])
    }
  }

  navigateToUsuarioCreate (){
    this.router.navigate(['admin/usuarios/create'])
  }

}

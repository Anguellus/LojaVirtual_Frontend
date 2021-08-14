import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Login } from '../login.model';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Usuario } from '../usuario.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = {
    nome: '',
    CPF: '',
    email: '',
    endereco: '',
    password: '',
    telefone: ''
  }
  checkPass: String = '';

  login : Login ={
    cpf: '',
    password: ''
  }

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    
  // var form = new FormGroup({
  //   nome: new FormControl(this.usuario.nome, [Validators.required, Validators.minLength(5)]),
  //   CPF: new FormControl(this.usuario.CPF, [Validators.required, Validators.minLength(11)]),
  //   email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
  //   endereco: new FormControl(this.usuario.endereco, [Validators.required]),
  //   password: new FormControl(this.usuario.password, [Validators.required]),
  //   telefone: new FormControl(this.usuario.telefone, [Validators.required])
  // })
  }

  createUser(): void {

    if (this.usuario.nome == "") {
      this.loginService.showMessage("Campo Usuário não pode ser vazio")
      console.log(this.usuario.nome)
      this.router.navigate(['/cadastro'])
    } else if (this.usuario.password == "" || this.checkPass!=this.usuario.password) {
      this.loginService.showMessage("Campo Senha não pode ser vazio e deve coincidir.")
      this.router.navigate(['/cadastro'])
    }
    else {
      let senhaCripto = this.loginService.critpSenha(this.usuario.password)
      this.usuario.password = senhaCripto
      this.loginService.createCadastro(this.usuario).subscribe(mensagem => {
        console.log("MENSAGEM " + mensagem)
        // this.loginService.showMessage(mensagem)
        this.router.navigate(['/'])
      });
      // this.loginService.createLogin(this.usuario.email, this.usuario.password).subscribe(() => {
      //   console.log("chamou Login Service");
      // });
    }
  }

  cancelar(): void {
    this.router.navigate(['/'])
  }

}

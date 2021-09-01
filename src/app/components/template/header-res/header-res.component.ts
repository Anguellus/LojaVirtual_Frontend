import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/views/login/login.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-header-res',
  templateUrl: './header-res.component.html',
  styleUrls: ['./header-res.component.css']
})
export class HeaderResComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private headerService: HeaderService, private router: Router, private loginService: LoginService) {}

  get autenticado(): boolean {
    return this.headerService.headerData.autenticado;
  }

  get perfil(): string {
    return this.headerService.headerData.perfil;
  }

  get nome(): string {
    return this.headerService.headerData.nome;
  }

  get qtdItens(): number {
    return this.headerService.headerData.itensCarrinho
  }

  login(): void {
    this.router.navigate(['/login'])
  }

  cadastro(): void {
    this.router.navigate(['/cadastro'])
  }

  sair(): void {
    this.headerService.headerData.autenticado = false;
    if (this.headerService.headerData.perfil == 'cliente') {
      this.router.navigate(['/menu'])
    } else if (this.headerService.headerData.perfil == 'admin' || 'master') {
      this.router.navigate(['/admin'])
    }
  }
}

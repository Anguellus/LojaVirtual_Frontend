import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/components/produtos/produto.model';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { ProdutosAdminService } from './produtos-admin.service';

@Component({
  selector: 'app-produto-admin',
  templateUrl: './produto-admin.component.html',
  styleUrls: ['./produto-admin.component.css']
})
export class ProdutosAdminComponent implements OnInit {

  produtos: Produto[] = [];
  displayedColumns = ['_id', 'nome','preco', 'descricao', 'estoque', 'foto', 'fotoAvatar', 'action'];
  
  constructor(private headerService: HeaderService, private produtoAdminService: ProdutosAdminService, private router: Router) { }

  navigateToProdutoCreate(): void {
    this.router.navigate(['admin/produtos/create'])
  }
  
  ngOnInit(): void {
    // console.log(this.headerService.headerData)
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || this.headerService.headerData.perfil == 'master')){
      this.produtoAdminService.read().subscribe(produtos => {
        this.produtos = produtos
      })
    } else {
      this.router.navigate(['admin'])
    }
  }
}

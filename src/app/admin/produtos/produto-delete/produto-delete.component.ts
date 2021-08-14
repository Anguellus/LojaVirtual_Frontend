import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Produto } from '../../../components/produtos/produto.model';
import { ProdutosAdminService } from '../produtos-admin.service';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  produto: Produto = {
    _id: 0,
    nome: '',
    preco: 0,
    descricao: '',
    estoque: 0,
    foto: '',
    fotoAvatar: ''
  }

  constructor(private headerService: HeaderService, private productService: ProdutosAdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || this.headerService.headerData.perfil == 'master')) {
      if (id != null) {
        this.productService.readById(id).subscribe(produto => {
          this.produto = produto
        })
      }
    } else {
      this.router.navigate(['admin'])
    }
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log("AQUI")
    if (this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'admin' || 'master') {
      console.log("PRIMEIRO IF")
      if (id != null) {
        console.log("SEGUNDO IF")
        this.productService.delete(id).subscribe(produto => {
          console.log("RETORNO DA CHAMADA")
          this.productService.showMessage('Produto excluído')
          this.router.navigate(['/admin/produtos'])
        })
      }
    }

  }

  cancel(): void {
    this.router.navigate(['/admin/produtos'])
  }

}

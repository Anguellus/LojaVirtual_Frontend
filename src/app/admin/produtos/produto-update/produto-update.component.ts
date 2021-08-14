import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Produto } from 'src/app/components/produtos/produto.model';
import { FooterComponent } from 'src/app/components/template/footer/footer.component';
import { HeaderData } from 'src/app/components/template/header/header-data.model';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { ProdutosAdminService } from '../produtos-admin.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  urlImagens = "./assets/"

  // autenticado: boolean = false;
  // perfil: string = '';
  // nome: string = '';

  produto: Produto = {
    _id: 0,
    nome: '',
    preco: 0,
    descricao: '',
    estoque: 0,
    foto: '',
    fotoAvatar: ''
  }

  fileFoto: File | null = null
  fileAvatar: File | null = null

  constructor(private headerService: HeaderService, private productService: ProdutosAdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log("UPDATE")
    console.log(this.headerService.headerData)
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

  onChangeAvatar(files: FileList | null): void {
    if (files != null) {
      console.log(files[0])
      this.produto.fotoAvatar = this.urlImagens + files[0].name
      console.log(this.produto.fotoAvatar)
      this.fileAvatar = files[0]
    }
  }

  onChangeFoto(files: FileList | null): void {
    if (files != null) {
      this.produto.foto = this.urlImagens + files[0].name
      console.log(this.produto.foto)
      this.fileFoto = files[0]
    }
  }

  updateProduto(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(this.produto.foto)
    console.log(this.produto.fotoAvatar)
    if (id != null) {
      this.productService.update(this.produto).subscribe(produto => {
        this.productService.showMessage('Produto atualizado')
        this.router.navigate(['/admin/produtos'])
      })
      if (this.fileFoto != null && this.fileAvatar != null) {
        this.productService.upload(this.fileFoto, this.fileAvatar).subscribe(produto => {
          console.log("upload")
        }, error =>{
          console.log(error)
        })
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/produtos'])
  }
}

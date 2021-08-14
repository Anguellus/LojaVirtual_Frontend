import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Produto } from 'src/app/components/produtos/produto.model';
import { ProdutosService } from 'src/app/components/produtos/produtos.service';
import { HeaderData } from 'src/app/components/template/header/header-data.model';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { ProdutosAdminService } from '../produtos-admin.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  fileFoto: File | null = null
  fileAvatar: File | null = null

  urlImagens = "./assets/"

  produto: Produto = {
    nome: '',
    preco: 0,
    descricao: '',
    estoque: 0,
    foto: '',
    fotoAvatar: ''
  }

  constructor(private headerService: HeaderService, private produtoService: ProdutosAdminService, private router: Router) { }

  ngOnInit(): void {
    if (!this.headerService.headerData.autenticado || (this.headerService.headerData.perfil != 'admin' && this.headerService.headerData.perfil != 'master')) {
      this.router.navigate(['admin'])
    }
  }

  criarProduto(): void {

    if (this.produto.nome == "") {
      this.produtoService.showMessage("Campo AÇÃO não pode ser vazio")
      this.router.navigate(['admin/produtos/create'])
    } else if (this.produto.preco == 0) {
      this.produtoService.showMessage("Campo PREÇO não pode ser vazio")
      this.router.navigate(['admin/produtos/create'])
    } else if (this.produto.descricao == '') {
      this.produtoService.showMessage("Campo DESCRIÇÃO não pode ser vazio")
      this.router.navigate(['admin/produtos/create'])
    } else {
      this.produtoService.create(this.produto).subscribe(() => {
        this.produtoService.showMessage("Produto criado")
      });
      if (this.fileFoto != null && this.fileAvatar != null) {
        console.log("antes do UPLOAD NO FRONT")
        this.produtoService.upload(this.fileFoto, this.fileAvatar)
        // .subscribe(() => {
        //   console.log("fotos atualizadas")
        // })
      }
      this.router.navigate(['admin/produtos/'])
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

  cancel(): void {
    this.router.navigate(['/admin/produtos'])
  }
}

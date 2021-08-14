import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule }from '@angular/material/sidenav'
import { MatListModule }from '@angular/material/list';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component'
import { MatCardModule } from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list'
import { BidiModule }from '@angular/cdk/bidi'
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge'
import {MatSelectModule} from '@angular/material/select';

import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { CadastroComponent } from './views/login/cadastro/cadastro.component';
import { CarrinhoComponent } from './views/carrinho/carrinho.component';

import { MenuComponent } from './views/menu/menu.component';

import { UsuariosAdminComponent } from './admin/usuarios/usuarios.component';

import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ReactiveFormsModule} from '@angular/forms'

import { ProdutosAdminComponent } from './admin/produtos/produto-admin.component';
import { ProdutoCreateComponent } from './admin/produtos/produto-create/produto-create.component';
import { ProdutoUpdateComponent } from './admin/produtos/produto-update/produto-update.component';
import { ProdutoDeleteComponent } from './admin/produtos/produto-delete/produto-delete.component';

import { CarrinhoUpdateComponent } from './views/carrinho/carrinho-update/carrinho-update.component';
import { CarrinhoDeleteComponent } from './views/carrinho/carrinho-delete/carrinho-delete.component';

import { PedidosComponent } from './views/pedidos/pedidos.component';
import { DetalhePedidoComponent } from './views/pedidos/detalhe-pedido/detalhe-pedido.component';

import { PedidosAdminComponent } from './admin/pedidos/pedidos.component';
import { DetalheAdminPedidoComponent } from './admin/pedidos/detalhe-pedido/detalhe-pedido.component';

import { ClientesAdminComponent } from './admin/clientes/clientes.component';
import { ClienteCreateComponent } from './admin/clientes/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './admin/clientes/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './admin/clientes/cliente-delete/cliente-delete.component';
import { UsuarioDeleteComponent } from './admin/usuarios/usuario-delete/usuario-delete.component';
import { UsuarioCreateComponent } from './admin/usuarios/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './admin/usuarios/usuario-update/usuario-update.component';
import { GerenciarPedidoComponent } from './admin/pedidos/gerenciar-pedido/gerenciar-pedido.component';
import { GerenciarPedidoUpdateComponent } from './admin/pedidos/gerenciar-pedido-update/gerenciar-pedido-update.component'

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    CarrinhoComponent,
    PedidosComponent,
    MenuComponent,
    ProdutosAdminComponent,
    UsuariosAdminComponent,
    ClientesAdminComponent,
    LoginAdminComponent,
    ProdutoCreateComponent,
    ProdutoUpdateComponent,
    ProdutoDeleteComponent,
    CarrinhoUpdateComponent,
    CarrinhoDeleteComponent,
    DetalhePedidoComponent,
    PedidosAdminComponent,
    DetalheAdminPedidoComponent,
    ClienteCreateComponent,
    ClienteUpdateComponent,
    ClienteDeleteComponent,
    UsuarioDeleteComponent,
    UsuarioCreateComponent,
    UsuarioUpdateComponent,
    GerenciarPedidoComponent,
    GerenciarPedidoUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatGridListModule,
    BidiModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    MatTooltipModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

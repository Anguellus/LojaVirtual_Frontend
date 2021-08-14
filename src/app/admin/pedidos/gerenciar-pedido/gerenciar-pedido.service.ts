import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/views/login/usuario.model';
import { Pedido } from 'src/app/views/pedidos/pedido.model';
import { ProdutoPedido } from 'src/app/views/pedidos/produtoPedido.model';

@Injectable({
  providedIn: 'root'
})
export class GerenciarPedidoService {

  private _carrinhoData = new BehaviorSubject<Pedido>({
    dataPedido: new Date(),
    idCliente: '',
    produtos: [],
    status: '',
    totalPedido: 0
  })

  private _totalPedido = new BehaviorSubject<number>(0)

  private _produtoData = new BehaviorSubject<ProdutoPedido>({
    _id: 0,
    nome: '',
    preco: 0,
    quantidade: 0,
    totalProduto: 0,
  })

  private _clienteData = new BehaviorSubject<Usuario>({
    CPF: '',
    email: '',
    endereco: '',
    nome: '',
    password: '',
    telefone: '',
  })

  constructor() { }

  get carrinhoData(): Pedido {
    return this._carrinhoData.value
  }

  set carrinhoData(carrinhoData: Pedido) {
    this._carrinhoData.next(carrinhoData)
  }

  get totalPedido(): number {
    return this._totalPedido.value
  }

  set totalPedido(totalPedido: number) {
    this._totalPedido.next(totalPedido)
  }

  get produtoData(): ProdutoPedido {
    return this._produtoData.value
  }

  set produtoData(produtoData: ProdutoPedido) {
    this._produtoData.next(produtoData)
  }

  get clienteData(): Usuario {
    return this._clienteData.value
  }

  set clienteData(clienteData: Usuario) {
    this._clienteData.next(clienteData)
  }
  
}

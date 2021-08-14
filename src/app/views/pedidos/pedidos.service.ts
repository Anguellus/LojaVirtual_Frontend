import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from './pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  baseURL = "http://localhost:8080/pedidos/";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  readByCliente(idCliente: string): Observable<Pedido[]> {
    const url = `${this.baseURL}${idCliente}`
    console.log("PEDIDO SRV: " + url)
    return this.http.get<Pedido[]>(url)
  }

  readByPedido(idPedido: string): Observable<Pedido[]> {
    const url = `${this.baseURL}detalhe/${idPedido}`
    return this.http.get<Pedido[]>(url)
  }

  criarPedido(pedido: Pedido): Observable<Pedido> {
    console.log("PEDIDO CRIAR PEDIDO: " + JSON.stringify(pedido))
    console.log(this.baseURL)
    return this.http.post<Pedido>(this.baseURL, pedido).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }

  // readById(id: string): Observable<Produto> {
  //   const url = `${this.baseURL}${id}`
  //   console.log(url)
  //   return this.http.get<Produto>(url).pipe(
  //     map((obj) => obj),
  //     catchError(e => this.errorHandler(e))
  //   );
  // }

  // update(product: Produto): Observable<Produto> {
  //   const url = `${this.baseURL}${product._id}`
  //   return this.http.put<Produto>(url, product).pipe(
  //     map((obj) => obj),
  //     catchError(e => this.errorHandler(e))
  //   );
  // }
}

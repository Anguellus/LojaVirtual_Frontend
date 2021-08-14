import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Usuario } from 'src/app/views/login/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  baseURL = "http://localhost:8080/usuarios/";
  
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }

  read(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL)
  }

  readById(id: string): Observable<Usuario> {
    const url = `${this.baseURL}${id}`
    console.log(url)
    return this.http.get<Usuario>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  createCadastro(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.baseURL, usuario).pipe(
      map((obj) => this.showMessage(obj, false)),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(usuario: Usuario): Observable<Usuario> {
    const url = `${this.baseURL}${usuario._id}`
    console.log(url)
    return this.http.delete<Usuario>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(usuario: Usuario): Observable<Usuario> {
    const url = `${this.baseURL}${usuario._id}`
    console.log(url)
    return this.http.put<Usuario>(url, usuario).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url = 'http://localhost/php-auth/api';

  constructor(private http: HttpClient) { }


  registrar(usuario: UsuarioModel){

    return this.http.post(`${this.url}/register`, usuario);

  }

  iniciar(credenciales: UsuarioModel): Observable<string>{

  return this.http.post<{token: string}>(`${this.url}/login`, credenciales).pipe(
    map(response => response.token)
  );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Providers } from '../interfaces/providers';


@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private url = 'http://localhost/crud/api/providers';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Providers[]>(this.url);
  }

  get(id: string){
    return this.http.get<Providers[]>(this.url + '/' + id);
  }

  create(providers: Providers){
    return this.http.post<Providers[]>(this.url, providers);
  }

  update(providers: Providers, id: string){
    return this.http.put(this.url + '/' + id, providers);
  }

  remove(id: string){
    return this.http.delete(this.url + '/' + id);
  }
}

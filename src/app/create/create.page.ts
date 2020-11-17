import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage{

  constructor(private http: HttpClient) { }

  Crear() {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    console.log(token);
    this.http.post('http://localhost/php-auth/api/create', 'body', { headers }).subscribe(console.log);
  }

}

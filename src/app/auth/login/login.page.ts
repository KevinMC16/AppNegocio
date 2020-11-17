import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private authService: AuthService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private router: Router) { }

              form = new FormGroup({
                usuario: new FormControl('',[Validators.required, Validators.minLength(5)]),
                contrasena: new FormControl('',[Validators.required, Validators.minLength(8)]),
            
              });
            
              async onSubmit(){
            
                const loading = await this.loadingCtrl.create({ message: 'Iniciando...'});
                await loading.present();
                
                this.authService.iniciar(this.form.value).subscribe(
                  // Si se da el acceso
                async token => {
                  localStorage.setItem('token', token);
                  loading.dismiss();
                  this.router.navigateByUrl('/principal');
                  this.form.reset();
                },
                // Si existe un error
                async () => {
                  const alert = await this.alertCtrl.create({ message: 'Inicio de Sesión Falló', buttons: ['OK'] });
                  loading.dismiss();
                  await alert.present();
                             
                }
                );
                
              }
 

}

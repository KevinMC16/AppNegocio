import { Component, OnInit, Provider } from '@angular/core';
import { ProvidersService } from '../../services/providers.service';
import { Providers } from '../../interfaces/providers';
import { AlertController, ModalController } from '@ionic/angular';
import { ProviderRegisterPage } from '../provider-register/provider-register.page';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {

    providers: Providers[];

  constructor(private providerService: ProvidersService, 
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.providerService.getAll().subscribe(response => {     
      this.providers = response;
    });
  }

  addProvider(){
      this.modalCtrl.create({
        component: ProviderRegisterPage
      }).then(modal => {
        modal.present();
        return modal.onDidDismiss();
  }).then(({data, role}) => {
    if (role === 'created'){
      this.providers.push(data);
    }
  });
}

  updateProvider(providers: Providers){
    this.modalCtrl
    .create({
     component: ProviderRegisterPage,
     componentProps: { providers }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) =>{
      this.providers = this.providers.filter(prv =>{
        if (data.id === prv.id){
          return data;
        }
        return prv;
      });
    });
}

  removeProvider(id: string){
    this.alertCtrl.create({
      header: 'Eliminar',
      message: 'Está seguro que desea eliminar este proveedor?',
      buttons: [{
        text: 'Yes',
        handler: () =>{
          this.providerService.remove(id).subscribe(() => {
          this.providers = this.providers.filter(prv => prv.id !== id);
        });
      }
    },
    { text: 'No'}
      ]
    }).then(alertEl => alertEl.present());
  }

}

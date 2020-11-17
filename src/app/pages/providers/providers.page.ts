import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../services/providers.service';
import { Providers } from '../../interfaces/providers';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {

    providers: Providers[];

  constructor(private providerService: ProvidersService, 
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.providerService.getAll().subscribe(response => {     
      this.providers = response;
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

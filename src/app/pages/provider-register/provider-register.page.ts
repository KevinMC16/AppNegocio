import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProvidersService } from '../../services/providers.service';
import { Providers } from '../../interfaces/providers';

@Component({
  selector: 'app-provider-register',
  templateUrl: './provider-register.page.html',
  styleUrls: ['./provider-register.page.scss'],
})
export class ProviderRegisterPage implements OnInit {
  @Input() providers: Providers;
   isUpdate = false;

   data = {
     name: '',
     address: '',
     phone: ''
  };

  constructor(private modalCtrl: ModalController,
              private providerService: ProvidersService) { }

  ngOnInit() {
    if (this.providers){
      this.isUpdate = true;
      this.data = this.providers;
    }
  }

  closeModal(){
    this.modalCtrl.dismiss(null, 'closed');
  }


  onSubmit(form: NgForm){
    const providers = form.value;

    if(this.isUpdate){
      this.providerService.update(providers, this.providers.id).subscribe(() => {
      providers.id = this.providers.id;
      this.modalCtrl.dismiss(providers, 'updated')
      });
    } else {
      this.providerService.create(providers).subscribe(response => {
        this.modalCtrl.dismiss(response, 'created');
      });
    }
  }
}

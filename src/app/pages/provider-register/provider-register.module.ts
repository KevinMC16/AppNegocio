import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderRegisterPageRoutingModule } from './provider-register-routing.module';

import { ProviderRegisterPage } from './provider-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderRegisterPageRoutingModule
  ],
  declarations: [ProviderRegisterPage]
})
export class ProviderRegisterPageModule {}

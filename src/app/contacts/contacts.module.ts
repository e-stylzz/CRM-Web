import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MaterialModule
  ],
  declarations: [HomeComponent]
})
export class ContactsModule { }

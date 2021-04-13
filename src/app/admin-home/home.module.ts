import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AdminHomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CentersComponent } from './components/centers/centers.component';
import { DoctorsComponent } from './components/doctors/doctors.component';


@NgModule({
  declarations: [AdminHomeComponent, CentersComponent, DoctorsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class AdminHomeModule { }

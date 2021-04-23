import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AdminHomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CentersComponent } from './components/centers/centers.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients/patients.component';
import { PatientsDataComponent } from './components/patients/patients-data/patients-data.component';
import { PatientsCycleComponent } from './components/patients/patients-cycle/patients-cycle.component';
import { AddPatientComponent } from './components/patients/matDialog/add-patient/add-patient.component';
import { PatientDetailsComponent } from './components/patients/patient-details/patient-details.component';


@NgModule({
  declarations: [AdminHomeComponent, CentersComponent, DoctorsComponent, PatientsComponent, PatientsDataComponent, PatientsCycleComponent, AddPatientComponent, PatientDetailsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class AdminHomeModule { }

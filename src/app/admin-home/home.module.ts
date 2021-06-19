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
import { AddPatientCycleComponent } from './components/patients/matDialog/add-patient-cycle/add-patient-cycle.component';
import { CenterAdminComponent } from './components/center-admin/center-admin/center-admin.component';
import { CenterLoginComponent } from './components/center-admin/dialogs/center-login/center-login.component';
import { ChangeCycleStatuesComponent } from './components/center-admin/dialogs/change-cycle-statues/change-cycle-statues.component';
import { PatientTestsReportComponent } from './components/patients/patient-tests-report/patient-tests-report.component';
import { CenterAdminReportsComponent } from './components/center-admin/center-admin-reports/center-admin-reports.component';


@NgModule({
  declarations: [AdminHomeComponent, CentersComponent, DoctorsComponent, PatientsComponent, PatientsDataComponent, PatientsCycleComponent, AddPatientComponent, PatientDetailsComponent, AddPatientCycleComponent, CenterAdminComponent, CenterLoginComponent, ChangeCycleStatuesComponent, PatientTestsReportComponent, CenterAdminReportsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class AdminHomeModule { }

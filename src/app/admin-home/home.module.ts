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
import { ReportsListComponent } from './components/reports/reports-list/reports-list.component';
import { CenterReportComponent } from './components/reports/center-report/center-report.component';
import { StatisticsComponent } from './components/reports/statistics/statistics.component';
import { PatientPvComponent } from './components/patients/patient-pv/patient-pv.component';
import { AddPatientOvComponent } from './components/patients/matDialog/add-patient-ov/add-patient-ov.component';


@NgModule({
  declarations: [AdminHomeComponent, CentersComponent, DoctorsComponent, PatientsComponent, PatientsDataComponent, PatientsCycleComponent, AddPatientComponent, PatientDetailsComponent, AddPatientCycleComponent, CenterAdminComponent, CenterLoginComponent, ChangeCycleStatuesComponent, PatientTestsReportComponent, CenterAdminReportsComponent, ReportsListComponent, CenterReportComponent, StatisticsComponent, PatientPvComponent, AddPatientOvComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class AdminHomeModule { }

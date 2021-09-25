import { PatientsDataComponent } from './components/patients/patients-data/patients-data.component';
import { PatientsComponent } from './components/patients/patients/patients.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../shared/components';
import { AuthGaurdService } from '../core/services/auth-gaurd.service';
import { AdminHomeComponent } from './components/home/home.component';
import { CentersComponent } from './components/centers/centers.component';
import { CenterLoginComponent } from './components/center-admin/dialogs/center-login/center-login.component';
import { CenterAdminComponent } from './components/center-admin/center-admin/center-admin.component';
import { CenterAdminReportsComponent } from './components/center-admin/center-admin-reports/center-admin-reports.component';
import { ReportsListComponent } from './components/reports/reports-list/reports-list.component';
import { StatisticsComponent } from './components/reports/statistics/statistics.component';
import { CenterReportComponent } from './components/reports/center-report/center-report.component';

const routes: Routes = [
  {
    path: 'centerAdmin',
    component: CenterLoginComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'centerActions/:id',
    component: CenterAdminComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'centerReport/:id',
    component: CenterAdminReportsComponent,
    canActivate: [AuthGaurdService],
  },
  
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: 'centers',
        component: CentersComponent,
        canActivate: [AuthGaurdService],
      },
     
      {
        path: 'doctors',
        component: DoctorsComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: 'patients',
        component: PatientsDataComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: 'patientDetails/:id',
        component: PatientsComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: 'reports',
        component: ReportsListComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: 'reports/statistics',
        component: StatisticsComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: 'reports/centers',
        component: CenterReportComponent,
        canActivate: [AuthGaurdService],
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

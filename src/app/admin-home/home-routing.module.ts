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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

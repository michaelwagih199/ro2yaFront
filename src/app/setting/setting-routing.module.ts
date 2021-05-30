import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../shared/components';
import { AuthGaurdService } from '../core/services/auth-gaurd.service';
import { SettingComponent } from './components/setting/setting.component';
import { CentersSettingComponent } from './components/centers-setting/centers-setting.component';


const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SettingComponent,canActivate:[AuthGaurdService]
      },
      {
        path: 'centers',
        component: CentersSettingComponent,canActivate:[AuthGaurdService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './components/setting/setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CentersSettingComponent } from './components/centers-setting/centers-setting.component';
import { ExportDataComponent } from './components/export-data/export-data.component';

@NgModule({
  declarations: [SettingComponent, CentersSettingComponent, ExportDataComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
  ]
})
export class SettingModule { }

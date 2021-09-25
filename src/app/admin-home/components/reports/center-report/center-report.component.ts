import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CenterModel } from 'src/app/admin-home/models/center';
import { CenterAdminDataModel } from 'src/app/admin-home/models/centerAdminModel';
import { CenterAdminService } from 'src/app/admin-home/services/center-admin.service';
import { CenterService } from 'src/app/admin-home/services/center.service';
import { PatientDataService } from 'src/app/admin-home/services/patient-data.service';
import { ExportDataComponent } from 'src/app/setting/components/export-data/export-data.component';
import { ImagesComponent } from 'src/app/shared/components/layout/dialog/images/images.component';
import { ExcelService } from 'src/app/shared/service/excel.service';

class ExportDataInt {
  patientCode!: string;
  patientName!: string;
  patientIDNumber!: string;
  phone!: string;
  voucherCode!: string;
  cycleStatues!: string;
}

@Component({
  selector: 'app-center-report',
  templateUrl: './center-report.component.html',
  styleUrls: ['./center-report.component.scss'],
})
export class CenterReportComponent implements OnInit {
  startDate: any;
  endDate: any;
  isLoading: boolean = false;
  centerAdminList!: CenterAdminDataModel[];
  hospitalId!: number;
  private routeSub!: Subscription;
  centerName: any;
  centerList!: CenterModel[];

  displayedColumns: string[] = [
    'patientCode',
    'patientName',
    'patientIDNumber',
    'phone',
    'voucherCode',
    'cycleStatues',
    'actions',
  ];

  constructor(
    private patientService: PatientDataService,
    private centerAdminService: CenterAdminService,
    private router: Router,
    private centerService: CenterService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.centerService.findAll().subscribe(
      (data) => {
        this.centerList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * data
   */

  getReport() {
    this.isLoading = true;
    console.log(this.hospitalId);

    this.centerAdminService
      .getTestedDoneWithinDate(
        this.hospitalId,
        this.formatDate(this.startDate),
        this.formatDate(this.endDate)
      )
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.centerAdminList = data;
        },
        (error) => {}
      );
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  toInfo(element: CenterAdminDataModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element.id;
    this.dialog.open(ImagesComponent, dialogConfig);
    const dialogRef = this.dialog.open(ImagesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {});
  }

  /**event  */
  exportReport() {
    let data: ExportDataInt[] = [];
    // data.push(this.centerAdminList);
    this.centerAdminList.forEach((element) => {
      var obj: ExportDataInt = new ExportDataInt();
      obj.phone = element?.patientCycle?.patient?.phone;
      obj.patientName = element?.patientCycle?.patient?.patientName;
      obj.patientCode = element?.patientCycle?.patient?.patientCode;
      obj.cycleStatues = element?.cycleStatues;
      obj.patientIDNumber = element?.patientCycle?.patient?.patientIDNumber;
      obj.voucherCode = element?.patientCycle?.voucherNo
      data.push(obj);
    });
    
    this.excelService.exportAsExcelFile(data, 'statisticsData');
  }
}

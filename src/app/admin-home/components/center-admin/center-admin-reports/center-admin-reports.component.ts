import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CenterAdminDataModel } from 'src/app/admin-home/models/centerAdminModel';
import { CenterAdminService } from 'src/app/admin-home/services/center-admin.service';
import { PatientDataService } from 'src/app/admin-home/services/patient-data.service';
import { ImagesComponent } from 'src/app/shared/components/layout/dialog/images/images.component';

@Component({
  selector: 'app-center-admin-reports',
  templateUrl: './center-admin-reports.component.html',
  styleUrls: ['./center-admin-reports.component.scss'],
})
export class CenterAdminReportsComponent implements OnInit {
  isLoading: boolean = false;
  startDate: any;
  endDate: any;

  centerAdminList!: CenterAdminDataModel[];

  hospitalId!: number;
  private routeSub!: Subscription;
  centerName: any;

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
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getPatientId();
  }

  getPatientId() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.hospitalId = params['id'];
    });
  }

  /**
   * data
   */

  getReport() {
    this.isLoading = true;
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
    dialogRef.afterClosed().subscribe((data) => {
      
    });
  }

  

}

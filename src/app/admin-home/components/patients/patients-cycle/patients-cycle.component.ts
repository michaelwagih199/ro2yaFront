import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientDataService } from 'src/app/admin-home/services/patient-data.service';
import { AddPatientCycleComponent } from '../matDialog/add-patient-cycle/add-patient-cycle.component';
import { Subscription } from 'rxjs';
import { PatientCycleService } from '../../../services/patient-cycle.service';
import { PatientCycleModel } from '../../../models/patientCycle';

@Component({
  selector: 'app-patients-cycle',
  templateUrl: './patients-cycle.component.html',
  styleUrls: ['./patients-cycle.component.scss'],
})
export class PatientsCycleComponent implements OnInit {
  private routeSub!: Subscription;
  isLoading: boolean = false;
  patientId: any;
  patientCycleList!: PatientCycleModel[];

  constructor(
    private dialog: MatDialog,
    private patientCycleService: PatientCycleService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPatintCycle()
    this.getPatientId();
  }

  /**
   * data
   *
   */
  getPatientId() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.patientId = params['id'];
    });
  }
  getPatintCycle() {
    this.isLoading = true;
    this.patientCycleService.findPatientCycle(this.patientId).subscribe(
      (data) => {
console.log([{data}]);

        this.patientCycleList = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /**
   * events
   */
  saveCycle() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = {

    // };
    this.dialog.open(AddPatientCycleComponent, dialogConfig);
    const dialogRef = this.dialog.open(AddPatientCycleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.patientCycleService
        .create(data.model, data.centerId, this.patientId)
        .subscribe(
          (data) => {
            this.openSnackBar('Saved Success', '');
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  /**
   * UIUX and Helbers
   *
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getRequestParams(page: any, pageSize: any) {
    // tslint:disable-next-line:prefer-const
    let params: any = {};
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }
}

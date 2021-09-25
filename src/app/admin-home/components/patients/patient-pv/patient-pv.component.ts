import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientPvService } from 'src/app/admin-home/services/patient-pv.service';
import { ConfirmationDialog } from 'src/app/shared/components/layout/dialog/confirmation/confirmation.component';
import { PvModel } from '../../../models/pv';
import { AddPatientOvComponent } from '../matDialog/add-patient-ov/add-patient-ov.component';

@Component({
  selector: 'app-patient-pv',
  templateUrl: './patient-pv.component.html',
  styleUrls: ['./patient-pv.component.scss'],
})
export class PatientPvComponent implements OnInit {
  private routeSub!: Subscription;
  isLoading: boolean = false;
  pvList!: PvModel[];
  patientId: any;

  displayedColumns: string[] = ['creadetDate', 'comment', 'pvCode', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private pvService: PatientPvService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPatientId();
    this.getPvList();
  }

  /**events */
  savePv() {
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = {

    // };
    this.dialog.open(AddPatientOvComponent, dialogConfig);
    const dialogRef = this.dialog.open(AddPatientOvComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.pvService.create(data.model, this.patientId).subscribe(
        (data) => {
          this.isLoading = false;
          this.getPvList();
          this.openSnackBar('Saved Success', '');
          this.dialog.closeAll();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  editeDialog(element: PvModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    this.dialog.open(AddPatientOvComponent, dialogConfig);
    const dialogRef = this.dialog.open(AddPatientOvComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.pvService
        .update(element.id, data.model, this.patientId)
        .subscribe(
          (data) => {
            this.openSnackBar('Updated Successfully', '');
            this.getPvList();
            this.dialog.closeAll();
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  deleteDialog(element: PvModel) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are You Sure To Delete? `,
        buttonText: {
          ok: `Delete`,
          cancel: `Cancel`,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.pvService.delete(element.id).subscribe(
          (data) => {
            this.openSnackBar(`Deleted Successfully`, '');
            this.getPvList();
            this.dialog.closeAll();
          },
          (error) => {
            console.log(error);
          }
        );
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
    });
  }

  /**data */
  getPvList() {
    this.isLoading = true;
    this.pvService.findPatientPv(this.patientId).subscribe(
      (data) => {
        console.log([{ data }]);
        this.pvList = data;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPatientId() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.patientId = params['id'];
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
}

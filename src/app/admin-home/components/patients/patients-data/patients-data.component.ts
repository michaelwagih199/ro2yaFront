import { PatientsModel } from './../../../models/patients';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CenterModel } from 'src/app/admin-home/models/center';
import { CenterService } from 'src/app/admin-home/services/center.service';
import { ConfirmationDialog } from 'src/app/shared/components/layout/dialog/confirmation/confirmation.component';
import { PatientDataService } from 'src/app/admin-home/services/patient-data.service';
import { StaticData } from 'src/app/_helpers/staticData';
import { AddPatientComponent } from '../matDialog/add-patient/add-patient.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-data',
  templateUrl: './patients-data.component.html',
  styleUrls: ['./patients-data.component.scss'],
})
export class PatientsDataComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading: boolean = false;
  searchInout: any;
  selectedSearchFilter!: string;
  saveCheck: string = 'Save Center';
  myControl = new FormControl();
  //for autocomplete
  options!: string[];
  centerList!: CenterModel[];
  patientList!: PatientsModel[];
  center: CenterModel = new CenterModel();

  displayedColumns: string[] = [
    'patientCode',
    'patientName',
    'patientIDNumber',
    'phone',
    'center',
    'actions',
  ];

  filteredOptions!: Observable<string[]>;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private patientService: PatientDataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNames();
    this.retrievePagable();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  /**
   * data
   */
  getNames() {
    this.patientService.getNames().subscribe(
      (response) => {
        this.options = response;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPhones() {
    this.patientService.getPhones().subscribe(
      (response) => {
        this.options = response;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  retrievePagable() {
    this.isLoading = true;
    const params = this.getRequestParams(this.page, this.pageSize);
    this.patientService.getAllPagination(params).subscribe(
      (data) => {
        this.isLoading = false;
        this.patientList = data.patients;
        this.count = data.totalItems;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  findByName() {
    this.isLoading = true;
    this.patientService.findByName(this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.patientList = data;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  findByPhone() {
    this.isLoading = true;
    this.patientService.findByPhone(this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.patientList = data;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  /**
   * events
   */

  search() {
    if (this.selectedSearchFilter == 'name') this.findByName();
    else if (this.selectedSearchFilter == 'phone') this.findByPhone();
  }

  refresh() {
    this.searchInout = '';
    this.retrievePagable();
  }

  deleteDialog(element: PatientsModel) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are You Shoure To Delete? ${element.patientName}`,
        buttonText: {
          ok: `Delete`,
          cancel: `Cancel`,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.patientService.delete(element.id).subscribe(
          (data) => {
            this.openSnackBar(`Center Deleted Successfully`, '');
            this.refresh();
          },
          (error) => console.log(error)
        );
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
    });
  }

  displayFn(value: any): string {
    this.searchInout = value;
    return value;
  }

  savePatient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = {

    // };
    this.dialog.open(AddPatientComponent, dialogConfig);
    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.patientService.create(data.model, data.doctorId).subscribe(
        (data) => {
          this.openSnackBar('Patient Saved Successfully', '');
          this.retrievePagable();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  editePatient(element: PatientsModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    this.dialog.open(AddPatientComponent, dialogConfig);
    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.patientService
        .update(data.model.id, data.model, data.doctorId)
        .subscribe(
          (data) => {
            this.openSnackBar('Patient Saved Successfully', '');
            this.retrievePagable();
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  toInfo(id:number) {
    this.router.navigate([`admin/patientDetails/${id}`]);
  }

  OnHumanSelected(SelectedHuman: any) {
    this.searchInout = SelectedHuman;
    if (this.selectedSearchFilter == 'name') this.findByName();
    else if (this.selectedSearchFilter == 'phone') this.findByPhone();
  }

  onSearchFilterChange(value: string) {
    if (value == 'name') {
      this.getNames();
    } else {
      this.getPhones();
    }
  }

  onSearchClick() {
    this.searchInout = '';
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

  page = 1;
  count = 0;
  pageSize = 6;
  handlePageChange(event: any) {
    this.page = event;
    this.retrievePagable();
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

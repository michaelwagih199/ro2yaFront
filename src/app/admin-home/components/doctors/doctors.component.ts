import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConfirmationDialog } from 'src/app/shared/components/layout/dialog/confirmation/confirmation.component';
import { CenterModel } from '../../models/center';
import { DoctorModel } from '../../models/doctor';
import { CenterService } from '../../services/center.service';
import { DotorServiceService } from '../../services/dotor-service.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading: boolean = false;
  searchInout: any;
  selectedSearchFilter!: string;
  saveCheck: string = 'Save Center';
  myControl = new FormControl();
  selectHospital!: number;

  //for autocomplete
  options!: string[];
  centerList!: CenterModel[];
  doctorList!: DoctorModel[];
  center: CenterModel = new CenterModel();
  doctor: DoctorModel = new DoctorModel();

  displayedColumns: string[] = ['name', 'center', 'actions'];

  filteredOptions!: Observable<string[]>;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private centerService: CenterService,
    private doctorService: DotorServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getNames();
    this.retrievePagable();
    this.validateform();
    this.findAllHospital();
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
    this.doctorService.getNames().subscribe(
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

  findAllHospital() {
    this.centerService.findAll().subscribe((data) => {
      this.centerList = data;
    });
  }

  getPhones() {
    this.centerService.getPhones().subscribe(
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
    this.doctorService.getAllPagination(params).subscribe(
      (data) => {
        this.isLoading = false;
        this.doctorList = data.doctors;
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
    this.doctorService.findByName(this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.doctorList = data;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  getDoctorByCenterId(value: number) {
    this.isLoading = true;
    this.doctorService.getDoctorByCenterId(value).subscribe((data) => {
      this.isLoading = false;
      this.doctorList = data;
    });
  }

  /**
   * events
   */

  search() {
    this.findByName();
  }

  onSaveCenter() {
    if (this.saveCheck == 'Save Doctor') {
      this.isLoading = true;
      this.doctorService.create(this.doctor, this.selectHospital).subscribe(
        (data) => {
          this.isLoading = false;
          this.openSnackBar('Doctor Saved Succesfully', '');
          this.refresh();
          this.modalService.dismissAll();
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
    } else {
      //update
      this.isLoading = true;
      this.doctorService
        .update(this.doctor.id, this.doctor, this.selectHospital)
        .subscribe((data) => {
          this.isLoading = false
          this.openSnackBar('Doctor Saved Succesfully', '');
          this.refresh();
          this.modalService.dismissAll();
        });
    }
  }

  refresh() {
    this.searchInout = '';
    this.retrievePagable();
    this.getNames();
  }

  deleteDialog(element: DoctorModel) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are You Shoure To Delete? ${element.doctorName}`,
        buttonText: {
          ok: `Delete`,
          cancel: `Cancel`,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.doctorService.delete(element.id).subscribe(
          (data) => {
            this.openSnackBar(`Doctor Deleted Successfully`, '');
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

  openSaveModal(content: any, model: DoctorModel, saveCheck: string) {
    if (saveCheck == 'Save Doctor') {
      this.saveCheck = saveCheck;
      this.doctor = new DoctorModel();
      this.modalService.open(content);
    } else {
      this.saveCheck = saveCheck;
      this.doctor = model;
      this.modalService.open(content);
    }
  }

  OnHumanSelected(SelectedHuman: any) {
    this.searchInout = SelectedHuman;
    this.findByName();
  }

  onSearchFilterChange(value: number) {
    this.getDoctorByCenterId(value);
  }

  onSearchClick() {
    this.searchInout = '';
  }

  validateform() {
    this.validateForm = this.fb.group({
      doctorName: ['', [Validators.required]],
      center: ['', [Validators.required]],
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

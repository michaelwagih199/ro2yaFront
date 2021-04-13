import { element } from 'protractor';
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
import { CenterService } from '../../services/center.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss'],
})
export class CentersComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading: boolean = false;
  searchInout: any;
  selectedSearchFilter!: string;
  saveCheck: string = 'Save Center';
  myControl = new FormControl();
  //for autocomplete
  options!: string[];
  centerList!: CenterModel[];
  center: CenterModel = new CenterModel();

  displayedColumns: string[] = [
    'hospitalName',
    'hospitalPhone1',
    'hospitalPhone2',
    'actions',
  ];

  filteredOptions!: Observable<string[]>;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private centerService: CenterService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getNames();
    this.retrieveProductsPagable();
    this.validateform();
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
    this.centerService.getNames().subscribe(
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

  retrieveProductsPagable() {
    this.isLoading = true;
    const params = this.getRequestParams(this.page, this.pageSize);
    this.centerService.getAllPagination(params).subscribe(
      (data) => {
        this.isLoading = false;
        this.centerList = data.hospitals;
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
    this.centerService.findByName(this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.centerList = data;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  findByPhone() {
    this.isLoading = true;
    this.centerService.findByPhone(this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.centerList = data;
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



  onSaveCenter() {
    if (this.saveCheck == 'Save Center') {
      this.isLoading = true;
      this.centerService.create(this.center).subscribe(
        (data) => {
          this.isLoading = false;
          this.openSnackBar('Center Saved Succesfully', '');
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
      this.centerService.update(this.center.id, this.center).subscribe(
        (data) => {
          this.isLoading = false;
          this.openSnackBar('Center Saved Succesfully', '');
          this.refresh();
          this.modalService.dismissAll();
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
    }
  }

  refresh() {
    this.searchInout = '';
    this.retrieveProductsPagable();
  }

  deleteDialog(element: CenterModel) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are You Shoure To Delete? ${element.hospitalName}`,
        buttonText: {
          ok: `Delete`,
          cancel: `Cancel`,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.centerService.delete(element.id).subscribe(
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

  openSaveModal(content: any, model: CenterModel, saveCheck: string) {
    if (saveCheck == 'Save Center') {
      this.saveCheck = saveCheck;
      this.center = new CenterModel();
      this.modalService.open(content);
    } else {
      this.saveCheck = saveCheck;
      this.center = model;
      this.modalService.open(content);
    }
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

  validateform() {
    this.validateForm = this.fb.group({
      hospitalName: ['', [Validators.required]],
      hospitalPhone1: ['', [Validators.required]],
      hospitalPhone2: ['', null],
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
    this.retrieveProductsPagable();
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

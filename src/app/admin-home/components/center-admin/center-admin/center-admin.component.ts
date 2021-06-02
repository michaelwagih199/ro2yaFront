import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PatientDataService } from 'src/app/admin-home/services/patient-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CenterAdminService } from '../../../services/center-admin.service';
import { CenterAdminDataModel } from '../../../models/centerAdminModel';
import { element } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-center-admin',
  templateUrl: './center-admin.component.html',
  styleUrls: ['./center-admin.component.scss'],
})
export class CenterAdminComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading: boolean = false;
  searchInout: any;
  selectedSearchFilter!: string;
  myControl = new FormControl();
  //for autocomplete
  options!: string[];
  centerAdminList!: CenterAdminDataModel[];
  centerAdminDetailsList: CenterAdminDataModel[]=[];
  hospitalId!: number;
  private routeSub!: Subscription;

  displayedColumns: string[] = [
    'patientCode',
    'patientName',
    'patientIDNumber',
    'phone',
    'voucherCode',
    'cycleStatues',
    'actions',
  ];

  filteredOptions!: Observable<string[]>;

  constructor(
    private _snackBar: MatSnackBar,
    private patientService: PatientDataService,
    private centerAdminService: CenterAdminService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getNames();
    this.getPatientId();
  }

  getPatientId() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.hospitalId = params['id'];
      this.getAllActivePatient(params['id']);
    });
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

  getAllActivePatient(hospitalId: number) {
    this.isLoading = true;
    this.centerAdminService.findAllByhospital(hospitalId).subscribe(
      (data) => {
        this.isLoading = false;
        this.centerAdminList = data;
      },
      (error) => {}
    );
  }

  findByName() {
    this.isLoading = true;
    this.patientService.findByName(this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.centerAdminList = data;
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
        this.centerAdminList = data;
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
    this.getAllActivePatient(this.hospitalId);
  }

  displayFn(value: any): string {
    this.searchInout = value;
    return value;
  }

  details(content: any, item: CenterAdminDataModel) {
    this.centerAdminDetailsList=[]
    this.modalService.open(content, { size: 'xl' });
    this.centerAdminDetailsList.push(item);
    console.log(item.patientCycle.id);
    
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
}

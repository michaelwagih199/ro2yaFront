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
import { DataService } from '../../../../shared/service/data.service';
import { PatientsModel } from 'src/app/admin-home/models/patients';
import { ThrowStmt } from '@angular/compiler';

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
  centerAdminDetailsList: CenterAdminDataModel[] = [];
  hospitalId!: number;
  private routeSub!: Subscription;
  centerAdminModel: CenterAdminDataModel = new CenterAdminDataModel();
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

  filteredOptions!: Observable<string[]>;

  constructor(
    private _snackBar: MatSnackBar,
    private patientService: PatientDataService,
    private centerAdminService: CenterAdminService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private dataServer: DataService
  ) {}

  ngOnInit(): void {
    this.getNames();
    this.getPatientId();
    this.centerName = localStorage.getItem('userName');
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

  viewReport() {
    this.reloadPage(this.hospitalId);
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

  /**
   * events
   */

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
    this.centerAdminDetailsList = [];
    this.modalService.open(content, { size: 'xl' });
    this.centerAdminDetailsList.push(item);
    this.dataServer.changeMessage(item.patientCycle.patient.id);
  }

  confirmation(content: any, element: CenterAdminDataModel) {
    this.centerAdminModel = element;
    this.modalService.open(content);
  }

  onupdateStatues() {
    this.isLoading = true;
    this.centerAdminService
      .updateCycleTestToDoneTest(this.centerAdminModel.id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.refresh();
        },
        (error) => {
          console.log();
        }
      );
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

  reloadPage(id: any) {
    this.router.navigateByUrl(`/admin/centerReport/${id}`);
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

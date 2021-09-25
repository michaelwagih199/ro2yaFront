import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { PatientDataService } from 'src/app/admin-home/services/patient-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CenterAdminService } from '../../../services/center-admin.service';
import { CenterAdminDataModel } from '../../../models/centerAdminModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/service/data.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PatientCycleService } from 'src/app/admin-home/services/patient-cycle.service';

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
  selectedCycle!: number;
  imageToShow!: string;
  imagType: any;
  imagesType: string = 'image/x-png,image/gif,image/jpeg';

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
    private patientCycleService: PatientCycleService,
    private centerAdminService: CenterAdminService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private dataServer: DataService,
    private http: HttpClient,
    private msg: NzMessageService
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

  getVouchers(){
    this.patientCycleService.getVouchers().subscribe(
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
  onSearchFilterChange(value: string) {
    if (value == 'name') {
      this.getNames();
    } else if (value == 'voucher') {
      this.getVouchers();
    }
  }

  search() {
    if (this.selectedSearchFilter == 'name') this.findByName();
    else if (this.selectedSearchFilter == 'voucher') this.findByVoucher();
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
    this.isUploadImpty = true;
    this.fileList = [];
  }

  onupdateStatues() {
    this.isLoading = true;
    // this.centerAdminService
    //   .updateCycleTestToDoneTest(this.centerAdminModel.id)
    //   .subscribe(
    //     (data) => {
    //       this.isLoading = false;
    //       this.refresh();
    //     },
    //     (error) => {
    //       console.log();
    //     }
    //   );
  }

  OnHumanSelected(SelectedHuman: any) {
    this.searchInout = SelectedHuman;
    if (this.selectedSearchFilter == 'name') this.findByName();
    else if (this.selectedSearchFilter == 'voucher') this.findByVoucher();
  }


  findByVoucher() {
    this.isLoading = true;
    this.centerAdminService.findByVoucher(this.hospitalId,this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.centerAdminList = data;
      },
      (error) => {}
    );
  }

  findByName() {
    this.isLoading = true;
    this.centerAdminService.findByName(this.hospitalId,this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.centerAdminList = data;
      },
      (error) => {}
    );
  }


  onSearchClick() {
    this.searchInout = '';
  }

  reloadPage(id: any) {
    this.router.navigateByUrl(`/admin/centerReport/${id}`);
  }

  /**upload file */
  uploading = false;
  fileList: NzUploadFile[] = [];
  isUploadImpty: boolean = true;

  beforeUpload = (file: NzUploadFile): boolean => {
    this.isUploadImpty = false;
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    this.isLoading = true;
    this.centerAdminService
      .updateCycleTestToDoneTest(this.centerAdminModel.id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.refresh();
          this.uploadImage();
          this.openSnackBar('Cycle Updated Successfull', '');
          this.modalService.dismissAll();
        },
        (error) => {
          console.log('error');
        }
      );
  }

  uploadImage() {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest(
      'POST',
      `http://localhost:8080/api/files/uploadCycleFile?cycleId=${this.centerAdminModel.id}&docTitle=cycleScreen`,
      formData,
      {
        // reportProgress: true
      }
    );
    this.http
      .request(req)
      .pipe(filter((e) => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
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

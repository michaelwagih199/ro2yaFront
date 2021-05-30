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
import { CenterModel } from 'src/app/admin-home/models/center';
import { DoctorModel } from 'src/app/admin-home/models/doctor';
import { CenterService } from 'src/app/admin-home/services/center.service';
import { ConfirmationDialog } from 'src/app/shared/components/layout/dialog/confirmation/confirmation.component';
import { CenterSettingModel } from '../../models/centerModel';
import { CentersSettingService } from '../../services/centers-setting.service';

@Component({
  selector: 'app-centers-setting',
  templateUrl: './centers-setting.component.html',
  styleUrls: ['./centers-setting.component.scss'],
})
export class CentersSettingComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading: boolean = false;
  searchInout: any;
  selectedSearchFilter!: string;
  saveCheck: string = 'Save Center';
  myControl = new FormControl();
  selectHospital!: number;
  centerSetting: CenterSettingModel = new CenterSettingModel();

  //for autocomplete
  options!: string[];
  centerList!: CenterModel[];
  centerSettingList!: CenterSettingModel[];
  displayedColumns: string[] = ['center', 'userName', 'password', 'actions'];
  filteredOptions!: Observable<string[]>;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private centerService: CenterService,
    private centerSettingService: CentersSettingService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getNames();
    this.getCenterSetting();
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
    this.centerSettingService.getNames().subscribe(
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

  
  findByName() {
    this.isLoading = true;
    this.centerSettingService.findByName(this.searchInout).subscribe(
      (data) => {
        this.isLoading = false;
        this.centerSettingList = data;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  getCenterSetting() {
    this.isLoading = true;
    this.centerSettingService.findAll().subscribe(
      (data) => {
        this.isLoading = false;
        this.centerSettingList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * events
   */

  search() {
    this.findByName();
  }

  onSaveCenter() {
    if (this.saveCheck == 'Save Center') {
      this.isLoading = true;
      this.centerSettingService.create(this.centerSetting,this.selectHospital).subscribe(
        (data) => {
          this.isLoading = false;
          if (data) {
            this.openSnackBar('Center Saved Succesfully', '');
          } else {
            this.openSnackBar('Center Saved Before', '');
          }
          this.getCenterSetting()
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
    }
  }

  refresh() {
    this.searchInout = '';
    this.getNames();
  }

  deleteDialog(element: CenterSettingModel) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are You Shoure To Delete? ${element.hospital.hospitalName}`,
        buttonText: {
          ok: `Delete`,
          cancel: `Cancel`,
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.centerSettingService.delete(element.id).subscribe(
          (data) => {
            this.openSnackBar(`Doctor Deleted Successfully`, '');
            this.getCenterSetting();
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

  openSaveModal(content: any, model: CenterSettingModel, saveCheck: string) {
    if (saveCheck == 'Save Center') {
      this.saveCheck = saveCheck;
      this.centerSetting = new CenterSettingModel();
      this.modalService.open(content);
    } else {
      this.saveCheck = saveCheck;
      this.centerSetting = model;
      this.modalService.open(content);
    }
  }

  OnHumanSelected(SelectedHuman: any) {
    this.searchInout = SelectedHuman;
    this.findByName();
  }

  onSearchClick() {
    this.searchInout = '';
  }

  validateform() {
    this.validateForm = this.fb.group({
      centeruserName: ['', [Validators.required]],
      centerPassword: ['', [Validators.required]],
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
}

import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DoctorModel } from 'src/app/admin-home/models/doctor';
import { PatientsModel } from 'src/app/admin-home/models/patients';
import { DotorServiceService } from 'src/app/admin-home/services/dotor-service.service';
import { StaticData } from 'src/app/_helpers/staticData';

export interface User {
  name: string;
}

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  isLoading: boolean = false;
  validateForm!: FormGroup;
  patient: PatientsModel = new PatientsModel();
  doctorId!: DoctorModel;
  governorates = StaticData.governorates;
  doctorList!: DoctorModel[];
  filteredOptions!: Observable<DoctorModel[]>;
  options!: DoctorModel[];

  constructor(
    private fb: FormBuilder,
    private doctorService: DotorServiceService,
    private dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) data: PatientsModel
  ) {
    if (data != null) {
      this.patient = data;
      this.doctorId = data.doctor;
    } else {
    }
  }

  ngOnInit() {
    this.validateform();
    this.getNames();
  }

  getNames() {
    this.isLoading = true;
    this.doctorService.findAll().subscribe(
      (response) => {
        this.isLoading = false;
        this.options = response;

        this.filteredOptions = this.validateForm.controls['doctor'].valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.doctorName),
          map(name => name ? this._filter(name) : this.options.slice())
        );
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  displayFn(user: DoctorModel): string {
    return user && user.doctorName ? user.doctorName : '';
  }

  private _filter(name: string): DoctorModel[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.doctorName.toLowerCase().indexOf(filterValue) === 0);
  }

  OnHumanSelected(SelectedHuman: any) {
    this.doctorId = SelectedHuman;
    console.log(SelectedHuman);
    
  }



  save() {
    let data = {
      model: this.patient,
      doctorId: this.doctorId.id,
    };
    this.dialogRef.close(data);
    // this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  validateform() {
    this.validateForm = this.fb.group({
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      phone2: ['', [Validators.required]],
      patientName: ['', [Validators.required]],
      patientIDNumber: ['', [Validators.required]],
      comments: [''],
      address: ['', [Validators.required]],
      governorate: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      indication: ['', [Validators.required]],
      diagnosedDate: ['', [Validators.required]],
      startingLucentisDate: ['', [Validators.required]],
      previousTreatment: ['', [Validators.required]],
      voiceMessageConsent: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
    });
  }
}

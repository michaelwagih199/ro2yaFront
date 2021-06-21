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
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DoctorModel } from 'src/app/admin-home/models/doctor';
import { PatientsModel } from 'src/app/admin-home/models/patients';
import { DotorServiceService } from 'src/app/admin-home/services/dotor-service.service';
import { StaticData } from 'src/app/_helpers/staticData';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  isLoading: boolean = false;
  validateForm!: FormGroup;
  patient: PatientsModel = new PatientsModel();
  doctorId!: number;
  governorates = StaticData.governorates;
  doctorList!: DoctorModel[];

  constructor(
    private fb: FormBuilder,
    private doctorService: DotorServiceService,
    private dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) data: PatientsModel
  ) {
    if (data != null) {
      this.patient = data;
      this.doctorId = data.doctor.id;
    } else {
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.validateform();
    this.doctorService.findAll().subscribe(
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

 


  save() {
    let data = {
      model: this.patient,
      doctorId: this.doctorId,
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

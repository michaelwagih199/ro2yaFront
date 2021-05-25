import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CenterModel } from '../../../../models/center';
import { CenterService } from '../../../../services/center.service';
import { PatientCycleModel } from '../../../../models/patientCycle';

@Component({
  selector: 'app-add-patient-cycle',
  templateUrl: './add-patient-cycle.component.html',
  styleUrls: ['./add-patient-cycle.component.scss'],
})
export class AddPatientCycleComponent implements OnInit {
  validateForm!: FormGroup;
  patient: PatientCycleModel = new PatientCycleModel();
  centerId!: number;
  centerList!: CenterModel[];

  constructor(
    private fb: FormBuilder,
    private centerService: CenterService,
    private dialogRef: MatDialogRef<AddPatientCycleComponent>,
    @Inject(MAT_DIALOG_DATA) data: PatientCycleModel
  ) {
    if (data != null) {
      this.patient = data;
      this.centerId = data.hospital.id;
    } else {
    }
  }

  ngOnInit() {
    this.validateform();
    this.centerService.findAll().subscribe(
      (data) => {
        this.centerList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  save() {
    let data = {
      model: this.patient,
      centerId: this.centerId,
    };
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }

  validateform() {
    this.validateForm = this.fb.group({
      injectionDate: ['', [Validators.required]],
      octDate: ['', [Validators.required]],
      comment: [''],
      voucherNo: ['',[Validators.required]],
      injectionEye: ['',[Validators.required]],
      injectionPayment: ['',[Validators.required]],
      hospital: ['',[Validators.required]],
    });
  }
}

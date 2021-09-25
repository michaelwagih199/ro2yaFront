import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PvModel } from 'src/app/admin-home/models/pv';

@Component({
  templateUrl: './add-patient-ov.component.html',
  styleUrls: ['./add-patient-ov.component.scss'],
})
export class AddPatientOvComponent implements OnInit {
  validateForm!: FormGroup;
  pv: PvModel = new PvModel();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPatientOvComponent>,
    @Inject(MAT_DIALOG_DATA) data: PvModel
  ) {
    if (data != null) {
      this.pv = data;
    } else {
    }
  }

  ngOnInit(): void {
    this.validateform();
  }

  save() {
    let data = {
      model: this.pv,
    };
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }

  validateform() {
    this.validateForm = this.fb.group({
      pvCode: ['', [Validators.required]],
      pvComment: ['', [Validators.required]],
    });
  }
}

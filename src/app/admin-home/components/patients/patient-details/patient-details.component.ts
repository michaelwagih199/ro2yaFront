import { Component, OnInit } from '@angular/core';
import { PatientsModel } from 'src/app/admin-home/models/patients';
import { PatientDataService } from 'src/app/admin-home/services/patient-data.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {

  patient: PatientsModel = new PatientsModel();
  patientId!: number;
  private routeSub!: Subscription;
  isLoading: boolean = false;

  constructor(
    private patientService: PatientDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPatientId();
  }

  getPatientId() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.patientId = params['id'];
      this.findPatientById(params['id']);
    });
  }

  /**
   * data
   */

  findPatientById(id: number) {
    this.isLoading = true;
    this.patientService.findById(id).subscribe(
      (response) => {
        this.isLoading = false;
        this.patient = response;
        console.log(response);
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}

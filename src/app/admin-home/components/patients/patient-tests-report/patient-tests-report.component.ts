import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { CenterAdminService } from '../../../services/center-admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-tests-report',
  templateUrl: './patient-tests-report.component.html',
  styleUrls: ['./patient-tests-report.component.scss'],
})
export class PatientTestsReportComponent implements OnInit {
  leftEye: any;
  rightEye: any;
  patientId: any;

  subscription!: Subscription;

  constructor(
    private dataStore: DataService,
    private center_admin_service: CenterAdminService
  ) {}

  ngOnInit(): void {
    this.subscription = this.dataStore.currentMessage.subscribe((message) => {
      this.patientId = message;
    });

    this.center_admin_service
      .getCycleReportStatues(this.patientId, 'LEFT')
      .subscribe(
        (data) => {
          this.leftEye = data;
        },
        (err) => {
          console.log(err);
        }
      );

      this.center_admin_service
      .getCycleReportStatues(this.patientId, 'Right')
      .subscribe(
        (data) => {
          this.rightEye = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

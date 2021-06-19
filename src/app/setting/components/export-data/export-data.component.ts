import { Component, OnInit } from '@angular/core';
import { PatientsModel } from 'src/app/admin-home/models/patients';
import { PatientDataService } from 'src/app/admin-home/services/patient-data.service';
import { ExcelService } from 'src/app/shared/service/excel.service';
import { ExportPatientService } from '../../services/export-patient.service';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss'],
})
export class ExportDataComponent implements OnInit {
  patientList!: PatientsModel[];

  constructor(
    private excelService: ExcelService,
    private exportDataService: ExportPatientService
  ) {}

  ngOnInit(): void {
    this.exportDataService.findAll().subscribe((data) => {
      this.patientList = data;
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.patientList, 'footballer_data');
  }
}

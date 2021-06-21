import { Component, OnInit } from '@angular/core';
import { PatientCycleModel } from 'src/app/admin-home/models/patientCycle';
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
  cycles!:PatientCycleModel[];
  isLoading: boolean = false;

  constructor(
    private excelService: ExcelService,
    private exportDataService: ExportPatientService
  ) {}

  ngOnInit(): void {}

  /**
   * data
   */



  /**
   * events
   */
  exportAsXLSX(): void {
    this.isLoading = true;
    this.exportDataService.findAll().subscribe((data) => {
      this.isLoading = false;
      this.patientList = data;
      this.excelService.exportAsExcelFile(this.patientList, 'patientData');
    });
  }

  exportCyclesAsXLSX(): void {
    this.isLoading = true;
    this.exportDataService.exportCycles().subscribe((data) => {
      this.isLoading = false;
      this.cycles = data;
      this.excelService.exportAsExcelFile(this.cycles, 'patientCycles');
    });
  }

}

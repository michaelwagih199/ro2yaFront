import { Component, OnInit } from '@angular/core';
import { StatisticsModel } from 'src/app/admin-home/models/statisticsModel';
import { ReportsService } from 'src/app/admin-home/services/reports.service';
import { ExcelService } from 'src/app/shared/service/excel.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  isLoading: boolean = false;
  startDate: any;
  endDate: any;
  statisticsData!: StatisticsModel;

  constructor(
    private reportService: ReportsService,
    private excelService: ExcelService,

  ) {}

  ngOnInit(): void {}

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  /**
   * data
   */
  getReport() {
    this.isLoading = true;
    this.reportService
      .getReport(this.formatDate(this.startDate), this.formatDate(this.endDate))
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.statisticsData = data;
        },
        (error) => {}
      );
  }

  exportReport() {}

  exportAsXLSX(): void {
    let data: StatisticsModel[] = [];
    data.push(this.statisticsData);
    this.excelService.exportAsExcelFile(data,'statisticsData');
  }
}

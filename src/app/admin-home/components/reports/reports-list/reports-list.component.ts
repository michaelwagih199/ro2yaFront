import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toStatistics() {
    this.router.navigateByUrl('admin/reports/statistics');
  }

  toCenters(){
    this.router.navigateByUrl('admin/reports/centers');
  }
  
}

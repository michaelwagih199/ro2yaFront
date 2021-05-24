import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients-cycle',
  templateUrl: './patients-cycle.component.html',
  styleUrls: ['./patients-cycle.component.scss']
})
export class PatientsCycleComponent implements OnInit {
  isLoading:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  saveCycle(){
    
  }

}

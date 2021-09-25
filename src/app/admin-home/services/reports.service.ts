import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = `${environment.baseUrl}/reports`;

  constructor(private http: HttpClient) {}  

  getReport(start: any,end:any):Observable<any> {
    //http://localhost:8080/api/reports/statistics?start=2021-06-15&end=2021-07-27
    return this.http.get(`${this.baseUrl}/statistics?start=${start}&end=${end}`);
  }

}

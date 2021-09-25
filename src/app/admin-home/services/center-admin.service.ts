import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CenterAdminService {

  private baseUrl = `${environment.baseUrl}/centersAdmin`;
  constructor(private http: HttpClient) {}

  findAllByhospital(hospitalId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/hospital?hospitalId=${hospitalId}`);
  }

  getTestedDoneWithinDate(hospitalID:any,start: any,end:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/hospital/TestedDone?hospitalId=${hospitalID}&start=${start}&end=${end}`);
  }

  getCycleReportStatues(patientId: number, enjectionEye: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/injectionEye?patientId=${patientId}&eyeInjection=${enjectionEye}`
    );
  }

  findByName(hospitalId: number, searchInout: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/hospital/patientName?hospitalId=${hospitalId}&patientName=${searchInout}`);
  }

  findByVoucher(hospitalId: number, searchInout: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/hospital/voucherNo?hospitalId=${hospitalId}&voucherNo=${searchInout}`);
  }
 
  updateCycleTestToDoneTest(cycleStatuesId: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/testDone?cycleStatuesId=${cycleStatuesId}`,
      null
    );
  }
}

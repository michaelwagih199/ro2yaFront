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

  getCycleReportStatues(patientId:number,enjectionEye:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/injectionEye?patientId=${patientId}&eyeInjection=${enjectionEye}`)
  }

}

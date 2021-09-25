import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientCycleService {
  
  private baseUrl = `${environment.baseUrl}/patientCycle`;

  constructor(private http: HttpClient) {}

  findPatientCycle(patientId:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient?patientId=${patientId}`);
  }

  create(object: any, centerId: number, patientId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}?patientId=${patientId}&hospitalId=${centerId}`, object);
  }

  update(id: number, object: Object, hospitalId: number, patientId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}?patientId=${patientId}&hospitalId=${hospitalId}`, object);
  }
  
  getVouchers():Observable<any>{
    return this.http.get(`${this.baseUrl}/vouchers`);
  }

  delete(id:number): Observable<any> {
    return this.http.put(`${this.baseUrl}/archive?id=${id}`,null);
  }

}

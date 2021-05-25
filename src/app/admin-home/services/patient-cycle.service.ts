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
    return this.http.get(`${this.baseUrl}?patientId=${patientId}`);
  }

  create(object: any, centerId: number, patientId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}?patientId=${patientId}&hospitalId=${centerId}`, object);
  }

  update(id: number, object: Object, centerId: number, patientId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, object);
  }

}

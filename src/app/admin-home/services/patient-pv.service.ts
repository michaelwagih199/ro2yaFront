import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientPvService {
 

  private baseUrl = `${environment.baseUrl}/pvs`;
  constructor(private http: HttpClient) {}

  findPatientPv(patientId:number): Observable<any> {
    return this.http.get(`${this.baseUrl}?patientId=${patientId}`);
  }

  create(model: any, patientId: any) :Observable<any>{
    return this.http.post(`${this.baseUrl}?patientId=${patientId}`, model);
  }
  
  update(id: number, model: any, patientId: any):Observable<any> {
    return this.http.put(`${this.baseUrl}?patientId=${patientId}&pvId=${id}`, model);
  }

  delete(id:number): Observable<any> {
    return this.http.put(`${this.baseUrl}/archive?id=${id}`,null);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientSycleStatuesService {

  private baseUrl = `${environment.baseUrl}/cycleStatues`;
  
    constructor(private http: HttpClient) {}  
      
    findByCycleId(id: number) :Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    create(object: any): Observable<any>  {
      return this.http.post(`${this.baseUrl}`, object);
    }
  
    update(patientId:number, object: Object,doctorId:number): Observable <any> {
      return this.http.put(`${this.baseUrl}?patientId=patientId&doctorId=doctorId`, object);
    }
  
    delete(id:number): Observable<any> {
      return this.http.put(`${this.baseUrl}/archive?id=id`,null);
    }
  
}

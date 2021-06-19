import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  private baseUrl = `${environment.baseUrl}/patients`;

  constructor(private http: HttpClient) {}  

  findAll():Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllPagination(params:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/pageable`, { params });
  }

  getNames():Observable<any> {
    return this.http.get(`${this.baseUrl}/names`);
  }

  getPhones():Observable<any> {
    return this.http.get(`${this.baseUrl}/phones`);
  }

  getIdNumbers():Observable<any> {
    return this.http.get(`${this.baseUrl}/IDNumbers`);
  }


  findById(id: number) :Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  findByName(name:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/name?patientName=${name}`);
  }

  findByPhone(phone:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/phone?phone=${phone}`);
  }

  findByIdNumber(idNumber:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/patientIDNumber?idNumber=${idNumber}`);
  }


  create(object: any,doctorId:number): Observable<any>  {
    return this.http.post(`${this.baseUrl}?doctorId=${doctorId}`, object);
  }

  update(patientId:number, object: Object,doctorId:number): Observable <any> {
    return this.http.put(`${this.baseUrl}?patientId=${patientId}&doctorId=${doctorId}`, object);
  }

  delete(id:number): Observable<any> {
    return this.http.put(`${this.baseUrl}/archive?id=${id}`,null);
  }

}

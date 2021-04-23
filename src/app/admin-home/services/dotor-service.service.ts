import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DotorServiceService {

  private baseUrl = `${environment.baseUrl}/doctors`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getDoctorByCenterId(value: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/hospital?hospitalID=${value}`);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/pageable`, { params });
  }

  getNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/names`);
  }

  findByName(name: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/name?doctorName=${name}`);
  }

  create(object: any, centerId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}?centerId=${centerId}`, object);
  }

  
  update(id: number, object: Object, centerId: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}?id=${id}&centerId=${centerId}`,
      object
    );
  }

  delete(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/archive?id=${id}`, null);
  }
}

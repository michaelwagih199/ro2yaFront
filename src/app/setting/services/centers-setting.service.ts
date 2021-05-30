import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentersSettingService {

  private baseUrl = `${environment.baseUrl}/settings/centers`;
  
  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/names`);
  }

  findByName(name: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/name?doctorName=${name}`);
  }

  create(object: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, object);
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


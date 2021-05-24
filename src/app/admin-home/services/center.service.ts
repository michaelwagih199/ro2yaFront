import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CenterService {

  private baseUrl = `${environment.baseUrl}/hospitals`;

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

  findById(id: number) :Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  findByName(name:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/name?hospitalName=${name}`);
  }

  findByPhone(phone:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/phone?hospitalPhone1=${phone}`);
  }

  create(object: any): Observable<any>  {
    return this.http.post(`${this.baseUrl}`, object);
  }

  update(id:number, object: Object): Observable <any> {
    return this.http.put(`${this.baseUrl}/${id}`, object);
  }

  delete(id:number): Observable<any> {
    return this.http.put(`${this.baseUrl}/archive?id=${id}`,null);
  }

}

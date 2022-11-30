import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clinic } from './clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private httpclient:HttpClient) { }

  getAll():Observable<any>
  {
    return this.httpclient.get<any>("https://localhost:44385/api/Clinic/ClinicList");
  }

  saveClinic(newClinic:Clinic):Observable<Clinic>
  {
    return this.httpclient.post<Clinic>("https://localhost:44385/api/Clinic/SaveClinic",newClinic);
  }

  updateClinic(newClinic:Clinic):Observable<Clinic>
  {
    return this.httpclient.put<Clinic>("https://localhost:44385/api/Clinic/UpdateClinic",newClinic);
  }

  deleteClinic(id:number):Observable<any>
  {
    return this.httpclient.delete<any>("https://localhost:44385/api/Clinic/"+ id);
  }
}

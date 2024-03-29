import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminName!:string;
   adminURL: string = 'http://localhost:6767/api/v1/admin/';

  constructor(private http:HttpClient) { }

  insertAdmin(admin:Admin):Observable<Admin>
  {
    return this.http.post<Admin>(this.adminURL+"add",admin);
    alert("New Admin Added Successfully");
  }



  setAdminName(name:string)
  {
    this.adminName=name;
  }

  getAdminName()
  {
    return this.adminName;
  }

  
  // updateAdmin(admin:Admin):Observable<Admin>
  // {
  //   return this.http.put<Admin>(this.adminURL+"/update",admin);
  // }
}

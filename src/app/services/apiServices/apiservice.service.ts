import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  constructor(private http:HttpClient) { }
   getApiresponse(data:any){
     this.http.post("http://localhost:3000/api/v1/login",data);
   } 
}

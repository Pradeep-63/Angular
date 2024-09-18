import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { apiRoutes } from '../../../environments/apiRoutes';
import { BehaviorSubject, retry } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetails$ : BehaviorSubject<object> = new BehaviorSubject({} as object)  // TODO - Define proper interface
  
  constructor(private http: HttpClient,private router:Router) { }

  userLogin(userData: any) {
   
    return this.http.post(`${environment.baseURL}/${apiRoutes.LOGIN}`,userData)
  }
  getSingup(userData:any){
    return this.http.post(environment.baseURL,userData)
  }

  getUserDetails() {
    return this.http.get(`${environment.baseURL}/${apiRoutes.USER_VERIFY}`);
  }
  //get the user by id 
   cookieService=inject(CookieService)
   userId =this.cookieService.get('id');
  getUserById(data:any){
    console.log(this.userId,"please give me id");
    return this.http.get(`${environment.baseURL}/${apiRoutes.USERS}/${data}`);
  }
  // get all users
  getAllUsers(params: HttpParams){
    return this.http.get<any>(`${environment.baseURL}${apiRoutes.GETALLUSERS}`,{params})
  }
}

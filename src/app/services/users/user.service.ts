import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { apiRoutes } from '../../../environments/apiRoutes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetails$ : BehaviorSubject<object> = new BehaviorSubject({} as object)  // TODO - Define proper interface of user dtails here
  
  constructor(private http: HttpClient) { }

  getLogin(userData: any) {
    return this.http.post(`${environment.baseURL}/${apiRoutes.LOGIN}`,userData)
  }
  getSingup(userData:any){
    return this.http.post(environment.baseURL,userData)
  }

  getUserDetails() {
    return this.http.get(`${environment.baseURL}/${apiRoutes.TOKEN_VERIFY}`).subscribe((res:any)=>{
      if(res.data){
       this.userDetails$.next(res.data)
      }
    })
  }
}

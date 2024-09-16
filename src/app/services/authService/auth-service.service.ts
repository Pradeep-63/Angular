import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private cookieService: CookieService) { }
  getToken(): string | null {
    return this.cookieService.get('token');
  } 

  isLoggedIn():string | null {
    return this.getToken();
  } 
}

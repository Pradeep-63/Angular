import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  // Retrieve the token from localStorage or a service
  const cookieService=inject(CookieService)
  const authToken = cookieService.get('token');  
  console.log("hello world=======================");
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}` 
    }
  });

  // Pass the cloned request instead of the original request
  return next(authReq);
};

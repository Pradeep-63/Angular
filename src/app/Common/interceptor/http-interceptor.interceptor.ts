import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const publicRoutes = ["login"]
  const cookieService=inject(CookieService)
  const router=inject(Router)
  const spinner=inject(NgxSpinnerService)
  const authToken = cookieService.get('token'); 

  const isPublicRoute = publicRoutes.some(route => req.url.includes(route));
  spinner.show()
  if(isPublicRoute){
    return next(req).pipe(
      map(res => {
       spinner.hide()
        return res
      }),
      catchError((error: HttpErrorResponse) => {
        spinner.hide()
        console.error('Error occurred:', error);
        if (error.status === 404) {
          console.log("users not found");
        }
        else if(error.status=== 500) {
          console.log("internal server error");
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    }
  });

  
  return next(authReq).pipe(
    map(res => {
      setTimeout(()=>{
        spinner.hide()
      },1000)
      return res 
    }),
    
    catchError((error: HttpErrorResponse) => {
      console.error('Error occurred:', error);
      if (error.status === 401) {
      
        cookieService.delete('token')
       cookieService.delete('id')
        router.navigate(['/login'])
      } 
      return throwError(() => new Error(error.message));
    })
  );
   
};
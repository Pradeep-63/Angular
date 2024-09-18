import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  user={
    email:'',
    password:''
   }

  constructor(private http:HttpClient,private toaster:ToastrService,private router:Router, private cookieService: CookieService,private login:UserService){
  }
 ngOnInit(): void {
   const token=this.cookieService.get('token')
   if(token){
    this.router.navigate(['/dashboard'])
   }
 }
  public onLogin(newform:NgForm){
    if(newform.invalid){
      Object.keys(newform.controls).forEach(field => {
        const control = newform.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.login.userLogin(this.user).subscribe((res:any)=>{
          
      if(res.token && res.id){
      
             this.cookieService.set('token',res.token);
             this.cookieService.set('id',res.id)
              this.login.getUserById(res.id).subscribe((res:any)=>{
               if(res.data){
                this.login.userDetails$.next(res.data)
               }
              })
               this.toaster.success("user login succesfully",'Success')
               this.router.navigateByUrl('/dashboard')
            }
            this.router.navigateByUrl('/dashboard')
        },
        (err)=>{
         this.toaster.error("Email or Password is incorrect",'Error')
        }
      )
   

    }  

}

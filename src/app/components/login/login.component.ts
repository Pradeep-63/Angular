import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user={
    email:'',
    password:'',
   }

  constructor(private http:HttpClient,private toaster:ToastrService){
  }

  public onSave(newform:NgForm){
    if(newform.invalid){
      Object.keys(newform.controls).forEach(field => {
        const control = newform.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }
      this.http.post("http://localhost:3000/api/v1/login",this.user).subscribe((res:any)=>{
          if(res.token){
             this.toaster.success("user login succesfully",'Success')
          }
      },
      (err)=>{
       this.toaster.error("Email or Password is incorrect",'Error')
      }
    )
    }
    

}

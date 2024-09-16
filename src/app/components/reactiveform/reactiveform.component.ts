import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { PreventCharactersService } from '../../services/preventCharacterService/prevent-characters.service';
import { UserService } from '../../services/users/user.service';
 
@Component({
  selector: 'app-reactiveform',
  standalone: true,
  imports: [FormsModule,JsonPipe,CommonModule,JsonPipe,RouterLink],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent {
  user={
    name:'',
    email:'',
    fatherName:'',
    Class:'',
    password:'',
    role:''
  }
  //import service here
  preventInvalidCharacters(event: KeyboardEvent){
     this.invalid.preventInvalidCharactersfromkeyboard(event)
  }
  userData:any | null=null
  //constructor
  constructor(private http:HttpClient,private toaster:ToastrService,private router:Router,private invalid:PreventCharactersService,private signup:UserService){
  }

  public msg:any | null=null
  public onEmailChange() {
    this.msg = null; 
  }
  selectedFile: File | null = null;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  //onsubmit the function works
   public onSave(newform:NgForm){
    if(newform.invalid){
      Object.keys(newform.controls).forEach(field => {
        const control = newform.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;}
      const formData = new FormData();

      // Append form fields to FormData
      formData.append('name', this.user.name);
      formData.append('email', this.user.email);
      formData.append('fatherName', this.user.fatherName);
      formData.append('Class', this.user.Class);
      formData.append('password', this.user.password);
      formData.append('role', this.user.role);
  
      // Append the selected file to FormData
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

    this.signup.getSingup(formData).subscribe((response:any)=>{
      if(response.data){
       this.userData=response.data
       console.log(this.userData);
       this.toaster.success("user registered successfully","success")
      }
     this.router.navigateByUrl('/login')
    },
    (error)=> {
      this.msg=error?.error?.errors[0]?.message
    }
   ) 
    
   }
}

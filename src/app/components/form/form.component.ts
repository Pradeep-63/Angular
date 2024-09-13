// import { CommonModule, JsonPipe } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';

// import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-form',
//   standalone: true,
//   imports: [FormsModule,JsonPipe,CommonModule],
//   templateUrl: './form.component.html',
//   styleUrl: './form.component.css'
// })
// export class FormComponent {
  
//       constructor(private http:HttpClient){

//       }
//       public msg:any | null=null
//       public onEmailChange() {
//         this.msg = null; 
//       }
//        public onSave(newform:NgForm){
//         if(newform.invalid){
//           Object.keys(newform.controls).forEach(field => {
//             const control = newform.control.get(field);
//             control?.markAsTouched({ onlySelf: true });
//           });
//           return;}
//         this.http.post("http://localhost:3000/api/v1",this.user).subscribe((response:any)=>{
//            if(response.data){
//             alert("user created succesfully")
//            }
//          },
//          (error)=> {
//            this.msg=error.error.errors[0].message
//          }
//         ) 
//        }

// }

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  userData:any|null=null
  url:string='http://localhost:3000/'
  profile:string="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png" 

  constructor(private user:UserService){}
  ngOnInit(): void {  
   // this.userData=JSON.parse(localStorage.getItem('name') ?? "")
    this.user.userDetails$.subscribe((details:Object)=>{
      this.userData=details
      if(this.userData.filePath){
        this.profile=this.url+this.userData.filePath
        console.log(this.profile);
      }
      
    })
    
   
  }
  
}

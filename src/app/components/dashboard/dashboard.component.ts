import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
   avatarSrc: string = 'https://epichcl.com/public/images/doctors/Dr-Jishu-Deb-Nath1723273750.jpg';
  url:string='http://localhost:3000/'
  
  profile:any={
     name:'',
     email:'',
     fatherName:'',
     rollNumber:'',
     class:''
  }
  userId:string | null=null
  constructor(private http:HttpClient,private route:ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      console.log(this.userId);
      this.http.get(`http://localhost:3000/api/v1/user/${this.userId}`).subscribe((res:any)=>{
        if(res.data){
          this.profile.name=res.data.name
          this.profile.fatherName=res.data.fatherName
          this.profile.email=res.data.email
          this.profile.rollNumber=res.data._id
          this.profile.class=res.data.Class
        }
        if(res.data.filePath){
         this.avatarSrc=this.url+ res.data.filePath
        }
      }
    )
    });
   
  }
  
}

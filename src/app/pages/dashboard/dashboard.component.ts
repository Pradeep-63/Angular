import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/users/user.service';
import { HeaderComponent } from '../header/header.component';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent,LeftSideBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
    constructor(private router:Router,private cookieService:CookieService,private usersDetails:UserService){
      
    }
    allUserDetails:any;

    page:number=1;
    totalPages:number=0
    pagesArray: number[] = [];
    limit:number=10
    ngOnInit(): void {
      this.fetchUsers(this.page)
    }


    fetchUsers(page: number): void {
      const params = new HttpParams()
      .set('page', page.toString())
      .set(' limit', this.limit.toString());
      console.log(page);
      this.usersDetails.getAllUsers(params).subscribe((res:any)=>{
        if(res.data){
          console.log(res);
          this.page=res.page
          this.totalPages=res.totalPages
          this.allUserDetails=res.data
          this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        }
      }
    )
    }
  
    getPage(page:number): void {
      console.log("page===========");
      if (page !== this.page) {
        this.page=page
        this.fetchUsers(page)
      }
     
    }
  
}

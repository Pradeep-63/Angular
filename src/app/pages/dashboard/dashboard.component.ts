import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/users/user.service';
import { HeaderComponent } from '../header/header.component';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent,LeftSideBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
    constructor(private router:Router,private cookieService:CookieService,private usersDetails:UserService){
      
    }
    

}

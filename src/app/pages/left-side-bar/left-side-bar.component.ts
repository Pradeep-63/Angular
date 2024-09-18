import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-left-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.css'
})
export class LeftSideBarComponent {
  constructor(private cookieService:CookieService,private router:Router) {
    
  }
  logout(){
    if(confirm("are you sure you want to logout")){
      this.cookieService.delete('token')
      this.cookieService.delete('id')
      this.router.navigate(['/login']);
    }
   
  }
}

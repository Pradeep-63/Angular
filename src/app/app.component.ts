import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveformComponent } from './components/reactiveform/reactiveform.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from './services/users/user.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveformComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
     constructor(private userService: UserService,private cookieService:CookieService ) {
       
     }

     ngOnInit(): void {
      const token=this.cookieService.get('token')
      if(token){
        this.userService.getUserDetails()
      }
     
     }

}

import { Component,OnInit } from '@angular/core';
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
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit {
     constructor(private userService: UserService,private cookieService:CookieService ) {
       
     }
    title:string=''
     ngOnInit(): void {
      const id=this.cookieService.get('id')
      if(id){
        this.userService.getUserById(id).subscribe((res:any)=>{
          if(res.data){
            this.userService.userDetails$.next(res.data)
          }
          
        })
      }
     
     }

}

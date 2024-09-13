import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveformComponent } from './components/reactiveform/reactiveform.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveformComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  
}

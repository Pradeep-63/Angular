import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveformComponent } from './components/reactiveform/reactiveform.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './Common/authGuard/auth.guard';
import { ModalComponent } from './components/modal/modal.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
    },
    {
        path:'signup',
        component:ReactiveformComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path: 'dashboard/:id',
        component: ModalComponent,
        canActivate: [authGuard]
      },
    {
        path:'profile/:id',
        component:DashboardComponent
    },
    { 
          path: '',
          redirectTo: '/dashboard',
          pathMatch: 'full',
          
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard],
        
    }
    
];

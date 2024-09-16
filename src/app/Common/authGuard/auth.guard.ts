import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../../services/authService/auth-service.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    toastr.info('your session is expired','INFO');
    router.navigate(['/login']);
    return false;
  }

  return true;
};


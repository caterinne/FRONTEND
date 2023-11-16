import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  if (inject(LoginService).session) return true;
  inject(Router).navigateByUrl('/login');
  return false;
};

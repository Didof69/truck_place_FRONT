import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { forwardRef, inject } from '@angular/core';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(forwardRef(() => UserService));
  const router = inject(forwardRef(() => Router));

  if (!userService.isAdmin) {  
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};

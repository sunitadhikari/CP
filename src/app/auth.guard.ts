import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
const userDate = localStorage.getItem('userData')

 if(!userDate){
  router.navigate(['/login'])
return false
 }
  return true;
};

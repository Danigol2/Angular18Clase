import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authenticatedGuard: CanMatchFn = (route, segments) => {
  let auth = inject(AuthService);
  return true;
};

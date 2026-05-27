import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '@core/services/auth';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { 'X-Admin-Token': token }
    });
  }
  return next(req);
};

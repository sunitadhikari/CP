import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
 
  if(req.headers.get('No-Auth')== 'True'){
    return next(req);
  }
  if(typeof window !== 'undefined'){
    const authToken = localStorage.getItem('userToken');
    // const tokenWithoutQuotes = authToken.substring(1, authToken.length - 1);
    if(!authToken){

    }
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    debugger
    return next(authReq)
  }
return next(req) 
 
};

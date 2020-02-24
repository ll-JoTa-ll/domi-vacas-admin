import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DmInterceptor implements HttpInterceptor {
    // tslint:disable-next-line: max-line-length
    intercept(req: import('@angular/common/http').HttpRequest<any>, next: import('@angular/common/http').HttpHandler): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
      if (req.url.includes('vacation')) {
        req = req.clone({
          setHeaders: {
            'Ocp-Apim-Subscription-Key': environment.subsKey
          }
        });
      }
      return next.handle(req);
    }
}

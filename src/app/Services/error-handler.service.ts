import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage = '';

  constructor(
    private router: Router,
  ) { }

  public handleError = (error: HttpErrorResponse) => {
    if (error.status === 500){
      console.log('error 500');
      this.handleError500(error);
    }else if (error.status === 404){
      console.log('error 404');
      this.handleError404(error);
    }else {}
  }


  private handleError500(error: HttpErrorResponse): void {
    this.createErrorMessage(error);
    this.router.navigate(['/error-pages/500']);
  }
  private handleError404(error: HttpErrorResponse): void {
    this.createErrorMessage(error);
    this.router.navigate(['/error-pages/404']);
  }

  private createErrorMessage(error: HttpErrorResponse): void {
    this.errorMessage = error.error ? error.error : error.statusText;
  }
}

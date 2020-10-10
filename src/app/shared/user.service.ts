import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserLoginModel } from './UserLogin.model';
import { profilemodel } from './getProfile.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly registerUrl = 'http://localhost:61236/api/ApplicationUser/Register';
  readonly LoginUrl = 'http://localhost:61236/api/ApplicationUser/Login';
  readonly userprofileurl = 'http://localhost:61236/api/UserProfile';


  constructor(private http:HttpClient) { }

  registeration(register:UserModel){
    return this.http.post(this.registerUrl,register)
    .pipe(catchError(this.handleError));
  }

  Login(userlogin:UserLoginModel){
    return this.http.post(this.LoginUrl,userlogin);
    // .pipe(catchError(this.handleError));
  }

  getUserProfile():Observable<profilemodel> {
    return this.http.get<profilemodel>(this.userprofileurl);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}
}

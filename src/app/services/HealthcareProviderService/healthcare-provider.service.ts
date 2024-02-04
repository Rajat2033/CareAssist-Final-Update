import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HealthcareProvider } from 'src/app/model/HealthcareProvider';
import { JwtLoginService } from '../jwt-login.service';

@Injectable({
  providedIn: 'root'
})
export class HealthcareProviderService {

  providerName!:string;
  providerURL: string = 'http://localhost:6767/api/v1/provider';

  constructor(private http: HttpClient,private jwtLogin:JwtLoginService) { }


  registerHealthcareProvider(provider:HealthcareProvider):Observable<HealthcareProvider>
  {
    const token = this.jwtLogin.getToken();
    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);
      return this.http.post<HealthcareProvider>(this.providerURL + '/add/provider', provider, { headers })
      
        .pipe(
          catchError((error: any) => {
            console.log('Error adding Provider:', error);
            return throwError(error); // Re-throw the error to be handled by the caller
          })
        );
    } else {
      // If the token is not available, emit an error
      return throwError('Token not available');
    }
  }



  
  getAllProviders(): Observable<HealthcareProvider[]> {
    const token = this.jwtLogin.getToken();

    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);

     
      console.log(headers);
      return this.http.get<HealthcareProvider[]>(this.providerURL + '/getall/provider', { headers});
      }
      else{
        return new Observable<HealthcareProvider[]>;
      }
  }




  deleteProviderById(providerId: number): Observable<string> {
    const token = this.jwtLogin.getToken();

    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);
      return this.http.delete<string>(this.providerURL + `/delete/provider/${providerId}`,{headers})
    }
    else{
      return new Observable<string>();
    }
  }




  updateProvider(provider:HealthcareProvider):Observable<HealthcareProvider>
  {
    const token = this.jwtLogin.getToken();

    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);

     
      console.log(headers);
      return this.http.put<HealthcareProvider>(this.providerURL + '/update/provider',provider, { headers});
      }
      else{
        return new Observable<HealthcareProvider>;
      }
  }



  setProviderName(name:string)
  {
    this.providerName=name;
  }

  getProviderName()
  {
    return this.providerName;
  }
}

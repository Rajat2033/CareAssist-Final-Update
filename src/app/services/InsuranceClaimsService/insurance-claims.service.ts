import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, throwError } from 'rxjs';
import { InsuranceClaims } from 'src/app/model/InsuranceClaims';
import { PatientsService } from '../PatientsService/patients.service';
import { JwtLoginService } from '../jwt-login.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceClaimsService {

  adminURL: string = "http://localhost:6767/api/v1/admin";
  claimURL: string = "http://localhost:6767/api/v1/insuranceclaims";
  companyURL: string = 'http://localhost:6767/api/v1/companies';
  constructor(private http: HttpClient, private jwtLogin:JwtLoginService) { }




  getAllInsuranceClaims(): Observable<InsuranceClaims[]> {
    const token = this.jwtLogin.getToken();

    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);


      console.log(headers);
      return this.http.get<InsuranceClaims[]>(this.adminURL + '/getallinsuranceclaims', { headers });
    }
    else {
      return new Observable<InsuranceClaims[]>;
    }
  }






  addClaim(claim: InsuranceClaims, patientName: string, planId: number): Observable<InsuranceClaims> {
    const token = this.jwtLogin.getToken();

    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);

      return this.http.post<InsuranceClaims>(this.claimURL + `/add/newclaim/${patientName}/${planId}`, claim, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error adding claim:', error);
            return throwError(error); // Re-throw the error to be handled by the caller
          })
        );
    } else {
      // If the token is not available, emit an error
      return throwError('Token not available');
    }
  }






  getClaimForPatient(patientName: string): Observable<InsuranceClaims[]> {
    const token = this.jwtLogin.getToken();

    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);


      console.log(headers);
      return this.http.get<InsuranceClaims[]>(this.claimURL + `/getclaim/${patientName}`, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error adding claim:', error);
            return throwError(error); // Re-throw the error to be handled by the caller
          })
        );
    } else {
      // If the token is not available, emit an error
      return throwError('Token not available');
    }

  }





  updateClaimStatus(insuranceClaims:InsuranceClaims,claimId:number):Observable<InsuranceClaims>
  {
    const token = this.jwtLogin.getToken();
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);
      console.log(headers);
      return this.http.put<InsuranceClaims>(this.claimURL + `/update/claim/${claimId}`,insuranceClaims, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error Updating claim:', error);
            return throwError(error); 
          })
        );
    } else {
      return throwError('Token not available');
    }
  }
}

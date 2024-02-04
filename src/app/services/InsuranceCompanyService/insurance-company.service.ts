import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { InsuranceCompany } from 'src/app/model/InsuranceCompany';
import { InsuranceClaims } from 'src/app/model/InsuranceClaims';
import { JwtLoginService } from '../jwt-login.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyService {
  companyName!: string;
  companyURL: string = 'http://localhost:6767/api/v1/companies';
  claimURL: string = 'http://localhost:6767/api/v1/insuranceclaims';

  constructor(private http: HttpClient, private jwtLogin:JwtLoginService) { }


  registerCompany(company: InsuranceCompany): Observable<InsuranceCompany> {
    const token = this.jwtLogin.getToken();
    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);
      return this.http.post<InsuranceCompany>(this.companyURL + '/add/company', company, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error adding New insurnace Company:', error);
            return throwError(error); // Re-throw the error to be handled by the caller
          })
        );
    } else {
      // If the token is not available, emit an error
      return throwError('Token not available');
    }
    // return this.http.post<InsuranceCompany>(this.companyURL + '/add/company', company);
  }




  getAllCompanyData(): Observable<InsuranceCompany[]> {
    const token = this.jwtLogin.getToken();

    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);


      console.log(headers);
      return this.http.get<InsuranceCompany[]>(this.companyURL + '/getallcompaniesdata', { headers });
    }
    else {
      return new Observable<InsuranceCompany[]>;
    }

  }





  deleteCompanyById(companyId: number): Observable<string> {
    const token = this.jwtLogin.getToken();

    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);
      return this.http.delete<string>(this.companyURL + `/delete/companyById/${companyId}`, { headers })
    }
    else {
      return new Observable<string>();
    }
  }






  getClaimByCompany(companyName: string): Observable<InsuranceClaims[]> {
    const token = this.jwtLogin.getToken();
    console.log(token);
    if (token) {
      const tokenString = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenString);
      console.log(headers);
      return this.http.get<InsuranceClaims[]>(this.claimURL + `/getclaims/${companyName}`, { headers });
    }
    else {
      return new Observable<InsuranceClaims[]>;
    }
  }




  getCompanyByName(companyName: string):Observable<InsuranceCompany>
  {
    const token = this.jwtLogin.getToken();
    console.log(token);
    if (token) {
      const tokenString = 'Bearer'+ token;
      const headers = new HttpHeaders().set('Authorization', tokenString);
      console.log(headers);
      return this.http.get<InsuranceCompany>(this.companyURL + `/getcompanybyname/${companyName}`, { headers });
    }
    else {
      return new Observable<InsuranceCompany>();
    }
  }



  updateCompany(company:InsuranceCompany,companyId:number):Observable<InsuranceCompany> {

    const token = this.jwtLogin.getToken();
    console.log(token);
    if (token) {
      const tokenString = 'Bearer '+ token;
      const headers = new HttpHeaders().set('Authorization', tokenString);
      console.log(headers);
      return this.http.put<InsuranceCompany>(this.companyURL + `/update/company/${companyId}`,company, { headers });
    }
    else {
      return new Observable<InsuranceCompany>();
    }

  }






  setCompanyInfo(companyName: string) {

    this.companyName = companyName;

  }




  getPatientName() {
    return this.companyName;
  }
}

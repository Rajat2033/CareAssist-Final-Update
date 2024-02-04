import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Patients } from 'src/app/model/Patients';
import { PatientsService } from 'src/app/services/PatientsService/patients.service';
import { JwtLoginService } from 'src/app/services/jwt-login.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent {
  patientName:any;
  constructor(private router: Router,private jwtLogin:JwtLoginService,private patientService:PatientsService){


this.patientName =sessionStorage.getItem('patientName');
  }


  // getClaimHistory()
  // {
    
  // }

  logout() {
    
    this.jwtLogin.clearToken();

    this.router.navigate(['/login']);
  }

}

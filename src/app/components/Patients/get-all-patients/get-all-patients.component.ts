import { Component, OnInit } from '@angular/core';
import { Patients } from '../../../model/Patients';
import { PatientsService } from 'src/app/services/PatientsService/patients.service';
import { Router } from '@angular/router';
import { JwtLoginService } from 'src/app/services/jwt-login.service';

@Component({
  selector: 'app-get-all-patients',
  templateUrl: './get-all-patients.component.html',
  styleUrls: ['./get-all-patients.component.css']
})
export class GetAllPatientsComponent{

  patientList: Patients[] = [];

  constructor(private patientService:PatientsService,private jwtLogin:JwtLoginService,private router:Router){
    this.patientService.getAllPatients().subscribe(data=>{
      this.patientList = data;
    })
  }

 

  deletePatients(patientId:number)
  {
    this.patientService.deletePatientById(patientId).subscribe(data=>{
    console.log("Patient deleted");
    
     
    })
  }
  

}

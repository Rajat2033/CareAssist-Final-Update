import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtLoginService } from 'src/app/services/jwt-login.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

  adminname!:any;
  constructor(private jwtLogin: JwtLoginService,private router:Router){

    this.adminname=sessionStorage.getItem('adminName');
    console.log(this.adminname);

  }

  logoutAdmin() {
    
    this.jwtLogin.clearToken();
    this.router.navigate(['/login']);
  }

  
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtLoginService } from 'src/app/services/jwt-login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  companyName:any;
  constructor(private jwtLogin: JwtLoginService,private router:Router){
    this.companyName=sessionStorage.getItem('companyName');
  }

  logoutCompany() {
    
    this.jwtLogin.clearToken();
    this.router.navigate(['/login']);
  }
  

}

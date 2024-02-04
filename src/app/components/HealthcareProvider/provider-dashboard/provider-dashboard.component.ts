import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtLoginService } from 'src/app/services/jwt-login.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent {

  providerName!:any;
  constructor(private jwtLogin: JwtLoginService,private router:Router){

    this.providerName=sessionStorage.getItem('providerName');
  }

  logoutProvider() {
    
    this.jwtLogin.clearToken();
    this.router.navigate(['/login']);
  }

}

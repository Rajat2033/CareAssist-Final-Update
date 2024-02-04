import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtLoginService } from 'src/app/services/jwt-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private jwtLogin:JwtLoginService,private router:Router)
  {
    
  }
  login(formData:any)
  {
   

      let username = formData.form.value.name;
      let password = formData.form.value.password;

     

      this.jwtLogin.login(username, password).subscribe(
        (token) => {
        
          sessionStorage.setItem('patientName', username);
         
          console.log(token);
          this.jwtLogin.setToken(token);
          this.jwtLogin.getRole(username).subscribe(role => {
            // Redirect based on role
            if (role === 'ADMIN') {
              this.router.navigate(['/admin/dashboard']);
            } else if (role === 'PATIENTS') {
              this.router.navigate(['/patient/dashboard']);
            } else if (role === 'COMPANY') {
              this.router.navigate(['/company/dashboard']);
            } else if (role === 'PROVIDER') {
              this.router.navigate(['/provider/dashboard']);
            } else {
              // Handle unknown role
              console.error('Unknown role:', role);
            }
          });
     
      
        }
      );
    
   
  }
 
}

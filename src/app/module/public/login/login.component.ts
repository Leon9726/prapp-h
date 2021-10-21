import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import * as $ from 'jquery' 
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})


export class LoginComponent implements OnInit {

  username: string = '';
  password : string = '';
  errorMessage = 'Invalid Credentials';
  successMessage: string = '';
  invalidLogin = false;
  loginSuccess = false;
  user= new User;

  constructor(private translateService: TranslateService, private authService: AuthService, private utilService: UtilService) { }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.utilService.checkAnimazioni('login');
      }, 2000);
  }

  handleLogin() {
    this.authService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }

  registra() {
    this.authService.registra(this.user).subscribe(res => {
      console.log(res);
    });
  }

  listaUtenti() {
    this.authService.utenti().subscribe(res => {
      console.log(res);
    });
  }

}

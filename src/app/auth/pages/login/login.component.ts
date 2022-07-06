import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onGoogleLogin() {
    try {
      await this.authSvc.loginWithGoogle();
      if (await this.authSvc.getCurrentUser()) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

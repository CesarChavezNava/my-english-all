import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  user: User = {} as User;

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSvc.getCurrentUser().subscribe((_user) => (this.user = _user));
  }

  async logout() {
    await this.authSvc.logout();
    this.router.navigate(['/']);
  }
}

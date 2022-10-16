import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApplicationUser, AuthService } from '../../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  busy = false;
  loginError = false;
  user: ApplicationUser;
  private subscription: Subscription;
  private readonly accessTokenName = `${environment.access_token_name}`;
  private readonly refreshTokeName = `${environment.refresh_token_name}`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = {
      accessToken: '',
      email: '',
      fullName: '',
      password: '',
      refreshToken: ''
    };

    this.subscription = this.authService.user$.subscribe((x) => {
      if (this.route.snapshot.url.length > 0){
        if (this.route.snapshot.url[0].path === '') {
          const accessToken = localStorage.getItem(this.accessTokenName);
          const refreshToken = localStorage.getItem(this.refreshTokeName);
          if (x && accessToken && refreshToken) {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
            this.router.navigate([returnUrl]);
          }
        }
      }

    });
  }
  
  login() {
    if (!this.user.email || !this.user.password) {
      return;
    }
    this.busy = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
    this.authService
      .login(this.user)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe(
        () => {
          this.router.navigate([returnUrl]);
        },
        () => {
          this.loginError = true;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

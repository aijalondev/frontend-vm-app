// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveTokenAndRole(response);
        if (this.authService.isAdmin()) {
          this.router.navigate(['/user-list']);
        } else if (this.authService.isRegularUser()) {
          this.router.navigate(['/user-profile']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        let errorMessage = 'Credenciais inválidas.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.notificationService.showError(errorMessage);
      }
    });
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private notificationService: NotificationService) { }

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    this.userService.register(this.email, this.password, this.name, this.role).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        let errorMessage = 'Erro ao registrar usuário';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.notificationService.showError(errorMessage);
      }
    );
  }
}
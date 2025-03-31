import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [FormsModule, CommonModule],
})
export class UserProfileComponent implements OnInit {
  userId: number | null = null;
  userDetails: any = {};
  loading: boolean = false;
  isEditing: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.fetchUserDetails(this.userId);
    } else {
      this.notificationService.showError('Usuário não autenticado.');
      this.router.navigate(['/login']);
    }
  }

  startEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.loadUserProfile();
  }

  updateUserProfile(): void {
    if (this.userId && this.userDetails) {
      this.userService.updateUser(this.userId, this.userDetails).subscribe({
        next: () => {
          this.notificationService.showSuccess('Perfil atualizado com sucesso!');
          this.isEditing = false;
          this.loadUserProfile();
        },
        error: (error) => {
          let errorMessage = 'Erro ao atualizar perfil.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.notificationService.showError(errorMessage);
        }
      });
    }
  }

  fetchUserDetails(userId: number): void {
    this.loading = true;
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.userDetails = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        let errorMessage = 'Erro ao buscar detalhes do usuário.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.notificationService.showError(errorMessage);
      }
    });
  }
}
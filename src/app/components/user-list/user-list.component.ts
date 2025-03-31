// src/app/components/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserUpdateModalComponent } from '../user-update-modal/user-update-modal.component';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [UserUpdateModalComponent, CommonModule, FormsModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 1;
  pageSize: number = 7;
  totalPages: number = 1;
  selectedUser: any;
  selectedUserToUpdate: any = null;
  filterName: string = '';

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize, this.filterName).subscribe(response => {
      this.users = response.content;
      this.totalPages = response.totalPages;
    });
  }

  applyFilter(): void {
    this.currentPage = 1;
    this.loadUsers();
  } 
  
  clearFilter(): void {
    this.filterName = '';
    this.currentPage = 1;
    this.loadUsers();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages - 1; i++) {
      pages.push(i);
    }
    return pages;
  }

  openUserUpdateModal(user: any): void {
    this.selectedUserToUpdate = user;
  }

  updateUser(updatedUserData: any): void {
    if (this.selectedUserToUpdate) {
      this.userService.updateUser(this.selectedUserToUpdate.id, updatedUserData).subscribe({
        next: () => {
          this.currentPage = 1
          this.loadUsers();
          this.selectedUserToUpdate = null;
          this.notificationService.showSuccess('Usuário atualizado com sucesso!');
        },
        error: (error) => {
          let errorMessage = 'Erro ao atualizar usuário.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.notificationService.showError(errorMessage);
        }
      });
    }
  }

  deleteUser(userToDelete: User): void {
    if (confirm(`Tem certeza que deseja deletar o usuário ${userToDelete.name}?`)) {
      this.userService.deleteUser(userToDelete.id).subscribe({
        next: () => {
          this.currentPage = 1
          this.loadUsers();
          this.notificationService.showSuccess(`Usuário ${userToDelete.name} deletado com sucesso!`);
        },
        error: (error) => {
          let errorMessage = 'Erro ao deletar usuário.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.notificationService.showError(errorMessage);
        }
      });
    }
  }
}
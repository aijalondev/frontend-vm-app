// src/app/components/user-update-modal/user-update-modal.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['./user-update-modal.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UserUpdateModalComponent implements OnInit {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<any>();

  updatedUser: any = {};
  roles: string[] = ['ADMIN', 'USER'];

  ngOnInit(): void {
    this.updatedUser = { ...this.user };
  }

  onClose(): void {
    this.close.emit();
  }

  onUpdate(): void {
    this.update.emit(this.updatedUser);
    this.close.emit();
  }
}
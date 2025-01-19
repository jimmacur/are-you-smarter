import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response-modal',
  templateUrl: './response-modal.component.html',
  styleUrls: ['./response-modal.component.css'],
  imports: [NgIf]
})
export class ResponseModalComponent {
  @Input() showModal = false;
  @Input() title = "";
  @Input() message = "";
  @Input() statement?: string;
  @Output() onClose = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();
  @Output() onReset = new EventEmitter<void>();

  constructor(private router: Router) {}

  close() {
    this.router.navigate(['/home']);
    this.onClose.emit();
  }

  newGame() {
    this.onReset.emit();
  }

  next() {
    this.onNext.emit();
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-response-modal',
  templateUrl: './response-modal.component.html',
  styleUrls: ['./response-modal.component.css'],
  imports: [NgIf, RouterModule]
})
export class ResponseModalComponent {
  @Input() showModal = false;
  @Input() title = "";
  @Input() message = "";
  @Input() statement?: string;
  @Output() onClose = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();
  @Output() onReset = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }

  newGame() {
    this.onReset.emit();
  }

  next() {
    this.onNext.emit();
  }
}
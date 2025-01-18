import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

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
  @Output() onClose = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }

  next() {
    this.onNext.emit();
  }
}
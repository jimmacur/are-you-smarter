import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-winnings',
  templateUrl: './total-winnings.component.html',
  styleUrl: './total-winnings.component.css'
})
export class TotalWinningsComponent {
  @Input() totalWinnings: number = 0;
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-total-winnings',
  imports: [],
  templateUrl: './total-winnings.component.html',
  styleUrl: './total-winnings.component.css'
})
export class TotalWinningsComponent {
  totalWinnings: number = 0;
}

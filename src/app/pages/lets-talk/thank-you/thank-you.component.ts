import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {
  showPopup: boolean = true; 
  constructor(private router: Router) { }
  redirectToHome(): void {
    // Navigate to the home page
    this.router.navigate(['/']);
  }
  closePopup(): void {
    this.router.navigate(['/']); // Hides the popup
  } 

}

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CADIZLOOP1';
  constructor(private router: Router) { }

  hideLandingPage(): void {
    document.getElementById('landing-page')!.style.display = 'none';
    this.router.navigate(['/busqueda']);
  }
}

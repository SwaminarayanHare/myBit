import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
    navbarOpen = false;

    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    }

}

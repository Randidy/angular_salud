import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInfo } from '../../models/auth.models';

@Component({
  selector: 'app-medico-dashboard',
  templateUrl: './medico-dashboard.component.html',
  styleUrls: []
})
export class MedicoDashboardComponent implements OnInit {
  
  currentUser: UserInfo | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
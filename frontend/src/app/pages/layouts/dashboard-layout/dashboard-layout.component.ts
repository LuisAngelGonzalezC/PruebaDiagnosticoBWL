import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  user: any;

  constructor(private token: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.token.getUser();
  }

  logout():void {
    this.token.logout();
    this.router.navigateByUrl('/');
  }
}

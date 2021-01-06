import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
  }

}

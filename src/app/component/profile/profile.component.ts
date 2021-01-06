import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ConfirmationService]
})
export class ProfileComponent implements OnInit {
  profile: any;
  userId: any;
  constructor(private dataService: DataService, private router: Router, private auth: AuthService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.dataService.getItem(`user/${this.userId}`).subscribe(data => {
      console.log(data);
      this.profile = data;
    })
  }
  deleteProfile() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete Your Profile?',
      accept: () => {
        this.dataService.deleteItem(`user/${this.userId}`).subscribe(data => {
          this.router.navigate(['/login']);
        })
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  password = '';
  pno = '';

  constructor(private dataService: DataService, private auth: AuthService, private router: Router, private messageService: MessageService) {
  }
  login() {
    if (this.password !== '' && this.pno != '') {
      this.dataService.addItem('login', { pno: this.pno, password: this.password }).subscribe(data => {
        console.log(data);
        this.auth.setToken(data.token, data.userId);
        this.router.navigate(['/home']);
      }, err => {
        console.log(err.error.msg);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.msg });
      })

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'all field required' });

    }
  }
  ngOnInit(): void {
  }

}

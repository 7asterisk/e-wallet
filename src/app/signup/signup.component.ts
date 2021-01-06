import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  profileForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    pno: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormGroup({
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pinCode: new FormControl(''),
    }),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  constructor(private dataService: DataService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }


  get fname() { return this.profileForm.get('fname'); }
  get lname() { return this.profileForm.get('lname'); }
  get pno() { return this.profileForm.get('pno'); }
  get email() { return this.profileForm.get('email'); }
  get password() { return this.profileForm.get('password'); }

  onSubmit() {
    console.log(this.profileForm.value);
    this.dataService.addItem('signup', this.profileForm.value).subscribe(data => {
      console.log(data);
      this.auth.setToken(data.token, data.userId);
      this.router.navigate(['/home']);
    })
  }

}

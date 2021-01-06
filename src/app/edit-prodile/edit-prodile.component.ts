import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-prodile',
  templateUrl: './edit-prodile.component.html',
  styleUrls: ['./edit-prodile.component.scss']
})
export class EditProdileComponent implements OnInit {

  profileForm = {
    fname: '',
    lname: '',
    pno: '',
    email: '',
    address: {
      country: '',
      state: '',
      city: '',
      pinCode: '',
    },
  };
  userId: any;
  constructor(private dataService: DataService, private router: Router, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      this.userId = prms.userId;
      this.dataService.getItem(`user/${this.userId}`).subscribe(data => {
        console.log(data);
        this.profileForm = data;
      })

    });
  }

  onSubmit() {
    this.dataService.updateItem(`user/${this.userId}`, this.profileForm).subscribe(data => {
      console.log(data);
      this.router.navigate(['/home']);
    })
  }

}

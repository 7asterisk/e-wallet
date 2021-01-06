import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit {
  userId: any;
  profile: any;

  viewProfile = false;

  walletId: any;
  wallet: any;
  fundsToAdd: any;
  fundsInWallet: any;
  numberToTransfer: any;
  fundsToTransfer: any;
  reseverWalletId: any;

  allTransection = [];
  constructor(private dataService: DataService, private router: Router, private auth: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }
  seltedCard = 'add-funds';
  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    console.log(this.userId);

    this.dataService.getItem(`user/${this.userId}`).subscribe(data => {
      console.log(data);
      this.walletId = data.walletId;
      this.profile = data;

      this.dataService.getItem(`wallet/${this.walletId}`).subscribe(res => {
        this.wallet = res;
      })
      this.getTransection();
    })
  }

  getTransection() {
    this.dataService.getFilterData({
      to: 'Wallet',
      filter: { _id: this.walletId },
      populate: { path: 'transection', populate: { path: 'reseverId', select: 'fname lname pno' } },
      popilate2: { path: 'transection', populate: { path: 'senderId', select: 'fname lname pno' } }
    }).subscribe(data => {
      console.log(data);
      this.fundsInWallet = data[0].totalFund;
      this.allTransection = data[0].transection;
    })

  }

  addFunds() {
    if (this.fundsToAdd) {
      this.fundsInWallet = Number(this.fundsInWallet) + Number(this.fundsToAdd);
      this.wallet.totalFund = this.fundsInWallet;
      this.dataService.updateItem(`wallet/${this.walletId}`, this.wallet).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: '₹' + this.fundsToAdd, detail: 'Fund Added Sucessfully' });

      })
    }
  }


  verifySender() {
    if (this.numberToTransfer) {
      this.dataService.getFilterData({
        to: 'User',
        filter: { pno: this.numberToTransfer }, projection: {
          fname: 1, lname: 1,
          walletId: 1
        },
      }).subscribe(data => {
        if (data.length > 0) {



          this.confirmationService.confirm({
            message: `Transfer  ₹ ${this.fundsToTransfer} to ${data[0].fname} ${data[0].lname}. `,
            accept: () => {
              this.fundTransfer(data[0]._id);
            }
          });
          this.reseverWalletId = data[0].walletId;

        }
        else {
          this.messageService.add({ severity: 'error', summary: this.numberToTransfer, detail: 'not found!' });
        }
      });

    }
  }

  fundTransfer(reseverId: string) {
    this.dataService.fundTranfer({
      reseverId: reseverId, senderId: this.userId,
      senderWalletId: this.profile.walletId, reseverWalletId: this.reseverWalletId, fundsToTransfer: this.fundsToTransfer
    }).subscribe(res => {
      console.log(res);
      this.getTransection();
      this.messageService.add({ severity: 'success', summary: '₹' + this.fundsToTransfer, detail: 'Fund Transfered Sucessfully' });
      this.fundsInWallet = res.totalFund;
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ScrollPanelModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule
  ],
  exports: [
    ScrollPanelModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule
  ]
})
export class PrimeModule { }

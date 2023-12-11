import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vigente-modal',
  templateUrl: './vigente-modal.component.html',
  styleUrls: ['./vigente-modal.component.scss']
})
export class VigenteModalComponent {
  convenios: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<VigenteModalComponent>) {
    if (data && data.convenios) {
      this.convenios = data.convenios;
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
}

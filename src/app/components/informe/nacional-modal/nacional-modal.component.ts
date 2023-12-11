import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-nacional-modal',
  templateUrl: './nacional-modal.component.html',
  styleUrls: ['./nacional-modal.component.scss']
})
export class NacionalModalComponent {
  convenios: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<NacionalModalComponent>) {
    if (data && data.convenios) {
      this.convenios = data.convenios;
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
}

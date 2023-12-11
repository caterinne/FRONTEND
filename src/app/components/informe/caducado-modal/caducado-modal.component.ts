import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-caducado-modal',
  templateUrl: './caducado-modal.component.html',
  styleUrls: ['./caducado-modal.component.scss']
})
export class CaducadoModalComponent {
  convenios: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CaducadoModalComponent>) {
    if (data && data.convenios) {
      this.convenios = data.convenios;
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
}

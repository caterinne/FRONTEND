import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-internacional-modal',
  templateUrl: './internacional-modal.component.html',
  styleUrls: ['./internacional-modal.component.scss']
})
export class InternacionalModalComponent {
  convenios: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<InternacionalModalComponent>) {
    if (data && data.convenios) {
      this.convenios = data.convenios;
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nacional-modal',
  templateUrl: './nacional-modal.component.html',
  styleUrls: ['./nacional-modal.component.css']
})
export class NacionalModalComponent {
  convenios: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.convenios) {
      this.convenios = data.convenios;
    }
  }
}

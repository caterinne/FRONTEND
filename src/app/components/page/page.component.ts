import { Component } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent {
  constructor(private router: Router, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }


  ngOnInit(){
    this.renderer.setStyle(this.document.body, 'background-color', 'white');
  }

}



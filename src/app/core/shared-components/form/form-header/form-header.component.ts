import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent {
  @Input() title: string = '';
  @Input() isUpperCase: boolean = false;
  @Input() notSticky: boolean = false;

  public navbarFixed: boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.navbarFixed = window.scrollY > 160;
  }
}

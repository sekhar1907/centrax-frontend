import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { StepItem } from '../form-steps/form-steps.component';

@Component({
  selector: 'app-form-side-menu',
  templateUrl: './form-side-menu.component.html',
  styleUrls: ['./form-side-menu.component.scss']
})
export class FormSideMenuComponent implements OnChanges {

  @Input() navItems: StepItem[] = [];
  @Input() activeNav: number = 0;
  @Input() patientId: string | number | undefined;

  @Output() selectNavItem = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['activeNav']) {
      this.navItems.forEach(step => {
        step.isActive = false;
      });

      this.navItems[this.activeNav].isActive = true;
    }
  }

  public onSelectNavItem(index: number) {
    this.selectNavItem.emit({index, patientId: this.patientId});
  }
}

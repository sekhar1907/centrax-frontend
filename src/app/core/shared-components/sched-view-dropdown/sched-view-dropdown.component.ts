import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
export interface DropdownItem {
  iconUrl: string;
  value: 'day' | 'week' | 'month' | 'list';
  label: string;
}

@Component({
  selector: 'sched-view-dropdown',
  templateUrl: './sched-view-dropdown.component.html',
  styleUrls: ['./sched-view-dropdown.component.scss']
})
export class SchedViewDropdownComponent {
  isDropdownOpen = false;


  @Input() viewSelected: DropdownItem;
  @Input() dropdownItems: DropdownItem[] = [];
  @Input() appearance: string;
  @Output() selectedSchedView = new EventEmitter()

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   if (!this.isDropdownClicked(target)) {
  //     this.isDropdownOpen = false;
  //   }
  // }

  toggleDropdown() {
    console.log('toggle')
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelectDropdown(item: DropdownItem) {
    this.viewSelected = item;
    this.selectedSchedView.emit(item);
  }


  private isDropdownClicked(target: HTMLElement): boolean {
    const dropdownButton = document.querySelector('.dropdown-trigger') as HTMLElement;
    const dropdownMenu = document.querySelector('.dropdown-container') as HTMLElement;

    return dropdownButton.contains(target) || dropdownMenu.contains(target);
  }
}

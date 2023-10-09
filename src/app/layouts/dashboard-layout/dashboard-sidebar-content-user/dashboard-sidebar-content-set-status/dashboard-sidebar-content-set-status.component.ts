import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

const statusOpts = ['In a meeting', 'Lunch', 'Out Sick', 'Vacation'];

@Component({
  selector: 'dashboard-sidebar-content-set-status',
  templateUrl: './dashboard-sidebar-content-set-status.component.html',
  styleUrls: ['./dashboard-sidebar-content-set-status.component.scss']
})
export class DashboardSidebarContentSetStatusComponent implements OnChanges {
  @Output() closeSetStatus = new EventEmitter();
  @Output() saveStatus = new EventEmitter();
  @Input() currentStatus: string = '';
  statusInput: string;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes['currentStatus']?.currentValue) this.statusInput = statusOpts.includes(this.currentStatus) ? null: this.currentStatus;
  }

  onCloseSetStatus() {
    this.closeSetStatus.emit()
  }

  onSaveStatus() {
    this.saveStatus.emit(this.statusInput ?? this.currentStatus)
  }
}

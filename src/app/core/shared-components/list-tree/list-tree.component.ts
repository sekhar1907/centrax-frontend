import { Component, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'list-tree',
  templateUrl: './list-tree.component.html',
  styleUrls: ['./list-tree.component.scss']
})
export class ListTreeComponent {
  @Input() nodes: TreeNode[] = [];
  @Input() appearance: string = 'appearance-1'
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blank-signature-line',
  templateUrl: './blank-signature-line.component.html',
  styleUrls: ['./blank-signature-line.component.scss']
})
export class BlankSignatureLineComponent {
  @Input() signatureWidth: string = '100px';
}

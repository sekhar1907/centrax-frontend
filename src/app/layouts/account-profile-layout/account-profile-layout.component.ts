import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountProfileLayoutFooterComponent } from './account-profile-layout-footer/account-profile-layout-footer.component';
import { AccountProfileLayoutHeaderComponent } from './account-profile-layout-header/account-profile-layout-header.component';

@Component({
  selector: 'app-account-profile-layout',
  templateUrl: './account-profile-layout.component.html',
  styleUrls: ['./account-profile-layout.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    AccountProfileLayoutFooterComponent,
    AccountProfileLayoutHeaderComponent
  ]
})
export class AccountProfileLayoutComponent {

}

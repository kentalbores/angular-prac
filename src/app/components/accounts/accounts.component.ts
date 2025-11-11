import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordManagerService } from '../../services/password-manager.service';
import { PlatformAccount } from '../../models/platform-account.model';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, AccountFormComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  platformName: string = '';
  accounts: PlatformAccount[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passwordManagerService: PasswordManagerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.platformName = params['name'];
      if (this.platformName) {
        this.loadAccounts();
      }
    });
  }

  loadAccounts() {
    this.loading = true;
    this.error = null;

    this.passwordManagerService.getPlatformAccounts({ platform: this.platformName })
      .subscribe({
        next: (accounts) => {
          this.accounts = accounts || [];
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load accounts. Please try again.';
          this.loading = false;
          this.accounts = [];
        }
      });
  }

  onAccountAdded(newAccount: PlatformAccount) {
    if (newAccount && newAccount.platform === this.platformName) {
      this.accounts.push(newAccount);
      setTimeout(() => {
        this.loadAccounts();
      }, 2000);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

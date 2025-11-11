import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordManagerService } from '../../services/password-manager.service';
import { PlatformAccount } from '../../models/platform-account.model';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent {
  @Input() platform: string = '';
  @Output() accountAdded = new EventEmitter<PlatformAccount>();

  accountForm: FormGroup;
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private passwordManagerService: PasswordManagerService
  ) {
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit() {
    if (this.accountForm.valid && this.platform) {
      this.loading = true;
      this.error = null;
      this.success = false;

      const formValue = this.accountForm.value;
      const request = {
        platform: this.platform,
        username: formValue.username.trim(),
        passsword: formValue.password
      };

      this.passwordManagerService.createAccount(request)
        .subscribe({
          next: (response) => {
            this.success = true;
            this.accountForm.reset();
            
            const newAccount: PlatformAccount = {
              id: response.message || 'temp-id-' + Date.now(),
              platform: this.platform,
              username: formValue.username.trim(),
              password: formValue.password,
              row_number: 0
            };

            setTimeout(() => {
              this.loading = false;
              this.accountAdded.emit(newAccount);
            }, 500);

            setTimeout(() => {
              this.success = false;
            }, 3000);
          },
          error: (error) => {
            this.error = 'Failed to create account. Please try again.';
            this.loading = false;
          }
        });
    }
  }

  get username() {
    return this.accountForm.get('username');
  }

  get password() {
    return this.accountForm.get('password');
  }
}

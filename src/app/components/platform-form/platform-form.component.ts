import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-platform-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './platform-form.component.html',
  styleUrl: './platform-form.component.css'
})
export class PlatformFormComponent {
  @Output() platformAdded = new EventEmitter<string>();

  platformForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.platformForm = this.fb.group({
      platformName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.platformForm.valid) {
      const platformName = this.platformForm.value.platformName.trim().toLowerCase();
      this.platformAdded.emit(platformName);
      this.platformForm.reset();
    }
  }

  get platformName() {
    return this.platformForm.get('platformName');
  }
}

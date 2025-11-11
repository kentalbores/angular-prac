import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PasswordManagerService } from '../../services/password-manager.service';
import { PlatformFormComponent } from '../platform-form/platform-form.component';

@Component({
  selector: 'app-platforms',
  standalone: true,
  imports: [CommonModule, PlatformFormComponent],
  templateUrl: './platforms.component.html',
  styleUrl: './platforms.component.css'
})
export class PlatformsComponent implements OnInit {
  platforms: string[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private passwordManagerService: PasswordManagerService
  ) { }

  ngOnInit() {
    this.loadPlatforms();
  }

  loadPlatforms() {
    this.loading = true;
    this.error = null;

    this.passwordManagerService.getAllPlatforms().subscribe({
      next: (platforms) => {
        this.platforms = platforms || [];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load platforms. Please try again.';
        this.loading = false;
      }
    });
  }

  onPlatformClick(platform: string) {
    this.router.navigate(['/platform', platform]);
  }

  onPlatformAdded(platform: string) {
    if (!this.platforms.includes(platform)) {
      this.platforms.push(platform);
    }
  }
}

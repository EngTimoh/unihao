import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../services/supabase-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  session: any;
  avatarUrl: string | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.supabaseService.session$.subscribe((session) => {
      this.session = session;
      this.setAvatar(session);
      this.cdr.markForCheck();
    });
  }

  setAvatar(session: any) {
    if (session?.user?.user_metadata?.avatar_url) {
      this.avatarUrl = session.user.user_metadata.avatar_url;
    } else {
      this.avatarUrl = 'https://ui-avatars.com/api/?name=' + (session?.user?.email || 'User') + '&background=random';
    }
  }

  async logout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/']);
  }
}

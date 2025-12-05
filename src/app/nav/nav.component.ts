import { Component, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private supabaseService: SupabaseService, private router: Router) { }

  ngOnInit() {
    this.supabaseService.getSession().then((session) => {
      this.session = session;
    });

    this.supabaseService.authChanges((_, session) => {
      this.session = session;
    });
  }

  async logout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/']);
  }
}

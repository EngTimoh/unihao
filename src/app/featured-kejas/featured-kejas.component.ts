import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase-service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-featured-kejas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './featured-kejas.component.html',
  styleUrls: ['./featured-kejas.component.css'],  // ✅ fixed
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedKejasComponent implements OnInit {

  users: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef   // ✅ inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.supabaseService.getData('hostels');
      console.log('Loaded users:', this.users);

      this.cdr.markForCheck();  
    } catch (err) {
      console.error('Error loading users:', err);
    }
  }
}

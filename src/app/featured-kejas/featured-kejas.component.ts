import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-kejas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-kejas.component.html',
  styleUrls: ['./featured-kejas.component.css'],  // ✅ fixed
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedKejasComponent implements OnInit {

  hostels: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadHostels();
  }

  async loadHostels() {
    try {
      this.hostels = await this.supabaseService.getData('hostels');
      console.log('Loaded hostels:', this.hostels);

      this.cdr.markForCheck();
    } catch (err) {
      console.error('Error loading hostels:', err);
    }
  }
}

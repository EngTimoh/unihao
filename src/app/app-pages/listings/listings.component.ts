import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingsComponent implements OnInit {

  hostels: any[] = [];  // holds all hostels

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadHostels();
  }

  async loadHostels() {
    try {
      this.hostels = await this.supabaseService.getData('hostels');
      console.log('Loaded hostels:', this.hostels);
      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error loading hostels:', error);
    }
  }
}

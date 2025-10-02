import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SupabaseService } from '../services/supabase-service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-locations',
  imports: [NgFor],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsComponent {

  locations: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef   
  ) {}

  ngOnInit() {
    this.loadLocations();
  }

  async loadLocations() {
    try {
      this.locations = await this.supabaseService.getData('locations');
      console.log('Loaded users:', this.locations);

      this.cdr.markForCheck();  
    } catch (err) {
      console.error('Error loading users:', err);
    }
  }
 }

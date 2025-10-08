import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Needed for [(ngModel)]

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingsComponent implements OnInit {

  locations: any[] = [];  //add here

  hostels: any[] = [];           // all hostels from Supabase
  filteredHostels: any[] = [];   // filtered list

  // filter variables
  searchTerm: string = '';
  location: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  type: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadLocations();

    this.loadHostels();
  }

  // ✅ Load all hostels from Supabase
  async loadHostels() {
    try {
      this.hostels = await this.supabaseService.getData('hostels');
      this.filteredHostels = [...this.hostels]; // initially show all
      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error loading hostels:', error);
    }
  }

  // load locations
  async loadLocations() {
    try {
      this.locations = await this.supabaseService.getData('locations');
      console.log('Loaded locations:', this.locations);
      this.cdr.markForCheck();
    } catch (err) {
      console.error('Error loading locations:', err);
    }
  }

  // ✅ Dynamic filtering
  filterHostels() {
    this.filteredHostels = this.hostels.filter((h) => {
      const matchesSearch = h.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesLocation = !this.location || h.location.toLowerCase() === this.location.toLowerCase();
      const matchesType = !this.type || h.type.toLowerCase() == this.type.toLowerCase();
      const matchesMinPrice = !this.minPrice || h.rps >= this.minPrice;
      const matchesMaxPrice = !this.maxPrice || h.rps <= this.maxPrice;


      return matchesSearch && matchesLocation && matchesMinPrice && matchesMaxPrice && matchesType;
    });

    this.cdr.markForCheck();
    console.log(this.location, this.type);

  }

  // ✅ Reset filters
  resetFilters() {
    this.searchTerm = '';
    this.location = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.type = '';

    this.filteredHostels = [...this.hostels];
    this.cdr.markForCheck();
  }
}

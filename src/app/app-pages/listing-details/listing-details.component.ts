import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase-service';

@Component({
    selector: 'app-listing-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './listing-details.component.html',
    styleUrls: ['./listing-details.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingDetailsComponent implements OnInit {
    listing: any = null;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private supabaseService: SupabaseService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadListing(id);
        }
    }

    async loadListing(id: string) {
        try {
            this.loading = true;
            // Assuming 'hostels' table has an 'id' column. Adjust if necessary.
            const { data, error } = await this.supabaseService.client
                .from('hostels')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            this.listing = data;
        } catch (err) {
            console.error('Error loading listing:', err);
        } finally {
            this.loading = false;
            this.cdr.markForCheck();
        }
    }

    async bookNow() {
        try {
            const session = await this.supabaseService.getSession();
            if (!session) {
                alert('Please login to book this hostel.');
                this.router.navigate(['/login']);
                return;
            }

            const userId = session.user.id;
            const hostelId = this.listing.id;

            await this.supabaseService.insertData('bookings', {
                user_id: userId,
                hostel_id: hostelId,
                status: 'pending' // Default status
            });

            alert('Booking request sent successfully!');
        } catch (err: any) {
            console.error('Error booking hostel:', err);
            alert('Failed to book hostel: ' + err.message);
        }
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHeroComponent } from '../../home-hero/home-hero.component';
import { FeaturedKejasComponent } from '../../featured-kejas/featured-kejas.component';
import { LocationsComponent } from '../../locations/locations.component';
import { FooterComponent } from '../../footer/footer.component';
import { FeedbackComponent } from '../../feedback/feedback.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeroComponent, FeaturedKejasComponent, LocationsComponent, FeedbackComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingsComponent { }

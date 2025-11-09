import { Component, inject, input } from '@angular/core';
import { AlertServices } from '../../../services/alert-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-banner',
  imports: [CommonModule],
  templateUrl: './alert-banner.html',
  styleUrl: './alert-banner.css'
})

export class AlertBanner {
  readonly alertService = inject(AlertServices);
}

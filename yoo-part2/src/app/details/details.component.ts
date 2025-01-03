import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '../types';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  @Input() photo: Photo | undefined = undefined;
  @Output() back: EventEmitter<void> = new EventEmitter();

  constructor(private photosService: PhotosService) {
    // this.photo = photosService.getPhotoById(this.photo?.id);
  }

  public handleBackClick() {
    this.back.emit();
  }
}

import { Component, signal, WritableSignal } from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { CommonModule } from '@angular/common';
import { PhotosService } from '../photos.service';
import { Photo } from '../types';
import { map } from 'rxjs';
import { ImageWrapperComponent } from '../image-wrapper/image-wrapper.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DetailsComponent, CommonModule, ImageWrapperComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public photos: WritableSignal<Photo[]> = signal([] as Photo[]);
  public activePhoto: Photo = {} as Photo;

  constructor(private photosService: PhotosService) {
    this.getPhotos();
  }

  public getPhotos() {
    const offset = 1400;
    this.photosService
      .getPhotos()
      .pipe(
        map((photos: Photo[]) =>
          photos.filter(
            (photo: Photo) => photo.id >= offset && photo.id < offset + 10
          )
        )
      )
      .subscribe((photos) => {
        console.log('LOADED');
        this.photos.set(photos);
      });
  }

  public isMainPageActive(): boolean {
    return this.activePhoto.id === undefined;
  }

  public handleBackButtonClicked(): void {
    this.activePhoto = {} as Photo;
  }

  public setActivePhoto(photo: Photo) {
    this.activePhoto = photo;
  }
}

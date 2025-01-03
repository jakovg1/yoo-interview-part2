import { Component } from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { CommonModule } from '@angular/common';
import { PhotosService } from '../photos.service';
import { Photo } from '../types';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DetailsComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public photos: Photo[] = [];
  public activePhoto: Photo | undefined = undefined;

  constructor(private photosService: PhotosService) {
    this.photos = [
      {
        albumId: 1,
        id: 1,
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
      },
      {
        albumId: 1,
        id: 2,
        title: 'reprehenderit est deserunt velit ipsam',
        url: 'https://via.placeholder.com/600/771796',
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
      },
      {
        albumId: 1,
        id: 3,
        title: 'officia porro iure quia iusto qui ipsa ut modi',
        url: 'https://via.placeholder.com/600/24f355',
        thumbnailUrl: 'https://via.placeholder.com/150/24f355',
      },
      {
        albumId: 1,
        id: 4,
        title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
        url: 'https://via.placeholder.com/600/d32776',
        thumbnailUrl: 'https://via.placeholder.com/150/d32776',
      },
    ];
    this.getPhotos();
  }

  public getPhotos() {
    this.photosService
      .getPhotos()
      //   .pipe(filter((photo: Photo) => photo.id <= 100))
      .subscribe((photos) => {
        console.log('LOADED');
        this.photos = photos;
      });
  }

  public setActivePhoto(photo: Photo | undefined) {
    this.activePhoto = photo;
  }
}

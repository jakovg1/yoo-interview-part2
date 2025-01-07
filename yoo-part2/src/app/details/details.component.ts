import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Photo } from '../types';
import { PhotosService } from '../photos.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DETAILS_TITLE } from '../constants';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  public photo = signal<Photo>({} as Photo);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photosService: PhotosService,
    private titleService: Title
  ) {
    this.photo.set(this.photosService.getActivePhoto());
    const id = route.snapshot.params['id'];

    this.photosService.getPhotoById(id).subscribe((photo) => {
      this.titleService.setTitle(`${DETAILS_TITLE}: ${id}`);
      this.photo.set(photo);
    });
  }

  public handleBackClick() {
    this.router.navigate(['']);
  }
}

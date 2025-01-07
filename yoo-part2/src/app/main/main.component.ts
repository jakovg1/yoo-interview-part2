import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { CommonModule } from '@angular/common';
import { PhotosService } from '../photos.service';
import { Photo } from '../types';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ImageWrapperComponent } from '../image-wrapper/image-wrapper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    DetailsComponent,
    CommonModule,
    ImageWrapperComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public photos: WritableSignal<Photo[]> = signal([] as Photo[]);
  public activePhoto: Photo = {} as Photo;
  public isLoading: boolean = true;

  public filterControl: FormControl = new FormControl('');
  public filterSignal = toSignal(this.filterControl.valueChanges);

  public displayedPhotos: Signal<Photo[]> = computed(() => {
    const filter = this.filterSignal() || '';
    return this.photos().filter((photo) => photo.title.includes(filter));
  });

  constructor(private photosService: PhotosService, private router: Router) {
    this.getPhotos();
  }

  public getPhotos() {
    const offset = 1150;
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
        this.photos.set(photos);
        this.isLoading = false;
      });
  }

  public isMainPageActive(): boolean {
    return this.activePhoto.id === undefined;
  }

  public handleBackButtonClicked(): void {
    this.activePhoto = {} as Photo;
  }

  public setActivePhoto(photo: Photo) {
    this.photosService.setActivePhoto(photo);
    this.router.navigate(['/details', photo.id]);
  }
}

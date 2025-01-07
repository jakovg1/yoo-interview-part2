import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './types';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  public url = 'https://jsonplaceholder.typicode.com/photos';
  public activePhoto = signal<Photo>({} as Photo);

  constructor(private http: HttpClient) {}

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url);
  }

  public getPhotoById(id: number): Observable<Photo> {
    return this.http.get<Photo>(this.url + `/${id}`);
  }

  public getActivePhoto(): Photo {
    return this.activePhoto();
  }

  public setActivePhoto(photo: Photo): void {
    this.activePhoto.set(photo);
  }
}

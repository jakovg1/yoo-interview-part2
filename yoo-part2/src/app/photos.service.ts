import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './types';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  public url = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url);
  }

  public getPhotoById(id: number): Observable<Photo> {
    return this.http.get<Photo>(this.url + `/${id}`);
  }
}

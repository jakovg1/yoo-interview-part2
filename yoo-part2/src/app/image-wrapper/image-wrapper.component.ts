import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  Input,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-image-wrapper',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './image-wrapper.component.html',
  styleUrl: './image-wrapper.component.scss',
})
export class ImageWrapperComponent implements OnInit {
  public src = input.required<string>();
  public placeholder = input.required<string>();

  public displayedImage = signal('');
  public isLoading: boolean = true;

  ngOnInit() {
    this.displayedImage.set(this.placeholder());
  }

  public onLoad(): void {
    this.isLoading = false;
    this.displayedImage.set(this.src());
  }

  public onError(): void {
    // console.log('ERROR ', this.src());
    this.isLoading = false;
    this.displayedImage.set(this.placeholder());
    //TODO: specifiy image for failed load?
  }
}

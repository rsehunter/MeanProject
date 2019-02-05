import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { Photo } from '../photo.model';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent {

  public cols = 3;
  @Input('list') photos: Photo[];
  constructor(
    public dialog: MatDialog,
    private overlay: Overlay
  ) {}


  openDialog(photo: Photo): void {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      data: photo,
      scrollStrategy,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  convertUrl(url: string): string {
    return "./assets/" + url + ".jpg";
  }
}


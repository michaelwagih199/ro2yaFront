import { Component, Inject, OnInit } from '@angular/core';
import { FileServiceService } from '../../../../../admin-home/services/file-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  imageSrc!: string;
  imageToShow: any;
  isLoading: boolean = false;
  cycleId: any;
  url: any;
  fileName: any;
  private baseUrl = `${environment.baseUrl}/files`;

  constructor(
    private service: FileServiceService,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<ImagesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data != null) {
      this.cycleId = data;
    } else {
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getCycleDocuments(this.cycleId).subscribe(
      (response) => {
        this.isLoading = false;
        this.fileName = response.fileName;
        this.url = `${this.baseUrl}/download/${response.fileName}`
        this.getImageFromService();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImageFromService() {
    this.isLoading = true;
    this.service.getImageByName(this.fileName).subscribe(
      (data) => {
        this.isLoading = false;
        this.createImageFromBlob(data);
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onDocsDownload() {
    this.isLoading = true;
    this.service.getImage(this.url).subscribe((response) => {
      this.isLoading = false;
      let blob: any = new Blob([response], {
        type: 'text/json; charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, this.fileName);
      // this.loading = false
    });
  }

  close() {
    this.dialogRef.close();
  }
}

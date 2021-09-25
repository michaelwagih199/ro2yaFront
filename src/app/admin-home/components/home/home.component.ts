import { CenterService } from 'src/app/admin-home/services/center.service';
import { Component, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { FileServiceService } from '../../services/file-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';

interface ImagesModel {
  src: string;
  header: string;
  discription: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  imageSrc!: string;
  imageToShow: any;

  constructor(
    private service: FileServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getImageFromService();
  }


  images: ImagesModel[] = [
    { src: 'https://gentiumhealthcare.com/wp-content/uploads/2021/03/pspweb-min.jpg', header: 'Polimigos Eco Systems', discription: '' },
    { src: 'assets/home2.jpg', header: 'Together We Can', discription: '' },
    { src: 'assets/home5.jpg', header: 'Never Stop Dreaming', discription: '' },
  ];

  getImageFromService() {
    // this.isImageLoading = true;
    this.service.getImageByName('31204.jpg').subscribe(
      (data) => {
        this.createImageFromBlob(data);
        // this.isImageLoading = false;
      },
      (error) => {
        // this.isImageLoading = false;
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

  onDocsDownload(url: any, fileName: any) {
    console.log(fileName);
    this.service.getImage(url).subscribe((response) => {
      let blob: any = new Blob([response], {
        type: 'text/json; charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, fileName);
      // this.loading = false
    })
  }
}

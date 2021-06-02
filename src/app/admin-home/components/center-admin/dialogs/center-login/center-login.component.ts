import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CentersSettingService } from '../../../../../setting/services/centers-setting.service';

@Component({
  selector: 'app-center-login',
  templateUrl: './center-login.component.html',
  styleUrls: ['./center-login.component.scss'],
})
export class CenterLoginComponent implements OnInit {
  notifiacation: any = '';
  isLoading: boolean = false;
  validateForm!: FormGroup;
  userName: any;
  password: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private centerSettingService: CentersSettingService
  ) {}

  ngOnInit(): void {
    this.validateform();
  }

  /**
   * event
   */

  onLogin() {
    this.isLoading = true;
    this.centerSettingService
      .loginToCenters(this.userName, this.password)
      .subscribe(
        (data) => {
          console.log(data);
          
          this.isLoading = false;
          if (data.message == 'bass user') {
            this.reloadPage(data.object.hospital.id);
          } else {
            this.notifiacation = 'Please Check UserName Or Password';
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
          
        }
      );
  }

  validateform() {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  reloadPage(id:any) {
    this.router.navigateByUrl(`/admin/centerActions/${id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserLoginModel } from 'src/app/shared/UserLogin.model';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userloginvar: UserLoginModel;
  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/inside/home');
      console.log(localStorage);

    this.loginForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
    this.resetForm();
  }
  resetForm() {
    this.userloginvar = {
      UserName: '',
      Password: ''
    }
  }

  onSubmit() {
    this.userloginvar.UserName = this.loginForm.get('UserName').value;
    this.userloginvar.Password = this.loginForm.get('Password').value;
    if (this.userloginvar.Password != '') {
      this.service.Login(this.userloginvar).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/inside/home');
      },
        (err) => {
          if (err.status == 400)
            this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          else
            console.log(err);
        });
    }
  }


}

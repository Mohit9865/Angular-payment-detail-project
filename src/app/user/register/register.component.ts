import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from 'src/app/shared/confirm-password.validator';
import { UserService } from 'src/app/shared/user.service';
import { UserModel } from 'src/app/shared/user.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  registerVariable: UserModel;
  constructor(private fb: FormBuilder, private service: UserService, private toastr: ToastrService,private route:Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      Username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      fulname: ['', Validators.required],
      Passwords: this.fb.group({
        Password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        ConfirmPassword: ['', Validators.required]
      }, { validator: MustMatch('Password', 'ConfirmPassword') })
    });

    this.resetForm();

  }

  resetForm() {
    this.registerVariable = {
      UserName: '',
      Email: '',
      FullName: '',
      Password: ''
    }
  }
  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.registerVariable.UserName = this.registrationForm.get('Username').value;
    this.registerVariable.Email = this.registrationForm.get('email').value;
    this.registerVariable.FullName = this.registrationForm.get('fulname').value;
    this.registerVariable.Password = this.registrationForm.get('Passwords.ConfirmPassword').value;

    if (this.registerVariable.Password != '') {
      this.service.registeration(this.registerVariable).subscribe((res: any) => {
        if(res.Succeeded == true){
          this.toastr.success('New user created!', 'Registration successful.');
          this.registrationForm.reset();
          this.resetForm();
          this.route.navigate(['/user/login']);
        }
        else{
          res.Errors.forEach(element => {
            switch(element.code){
              
                case 'DuplicateUserName':
                  this.toastr.error('Username is already taken','Registration failed.');
                  break;
  
                default:
                this.toastr.error(element.Description,'Registration failed.');
                  break;

            }
          });
          
          
        }
      },
        (err) => { console.log(err) })
    }
  }

}

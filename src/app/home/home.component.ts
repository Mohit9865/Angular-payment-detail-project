import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { profilemodel } from '../shared/getProfile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private service: UserService) { }
  userDetails:profilemodel;
 
  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      (res:profilemodel) => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  getstarted(){
    // console.log("wheater function is working")
    this.router.navigate(['/inside/payment']);
  }
 
}

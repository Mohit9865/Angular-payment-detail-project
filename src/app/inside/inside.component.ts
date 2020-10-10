import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { profilemodel } from '../shared/getProfile.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.css']
})
export class InsideComponent implements OnInit {

  constructor(private router:Router, private service: UserService,private modalService: BsModalService) { }

  userDetails:profilemodel;
  modalRef: BsModalRef;

 
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

  openModal(template: TemplateRef<any>) {
    
    // this.modaldetail.CardNumber
   
      this.modalRef = this.modalService.show(template);
    
  }
  
    onLogout() {
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
    }
  

}

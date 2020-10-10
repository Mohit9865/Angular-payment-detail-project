import { Component, OnInit,  ViewChild,Input } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailComponent } from '../payment-detail/payment-detail.component';
import { PaymentDetailsListComponent } from '../payment-details-list/payment-details-list.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @ViewChild(PaymentDetailComponent) formchild:PaymentDetailComponent;
 passdatatoform:PaymentDetail;
  constructor() { }

  ngOnInit(): void {
    // this.refreshdata();
    // this.form2child.refreshlist();
  }

  

  passtoform(pd:PaymentDetail){
    this.passdatatoform = pd;
    this.formchild.edit(pd);
  }

}

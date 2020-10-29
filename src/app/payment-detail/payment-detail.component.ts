import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
// import { PaymentDetailsListComponent } from '../payment-details-list/payment-details-list.component';
// import { PaymentDetailsListComponent } from '../payment-details-list/payment-details-list.component';
@Component({
  // providers: [PaymentDetailsListComponent],
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  public paymentForm: FormGroup;
  paymentdetail: PaymentDetail;
  datePickerConfig: Partial<BsDatepickerConfig>;
  loading =  false;
  constructor(private fb: FormBuilder, private paymentservice: PaymentDetailService, private toaster: ToastrService, private datepipe: DatePipe) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      minDate: new Date(2020, 8, 1),
      pickTime: false,
      dateInputFormat: 'MM/YY'
    });
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardowner: ['', Validators.required],
      cardnumber: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16)])],
      expiredate: ['', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(5)])],
      cvv: ['', Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3)])],
      phone: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])]
    });
    this.resetForm();

  }
  edit(pd: PaymentDetail) {
    this.paymentForm.patchValue({
      cardowner: pd.CardOwnerName,
      cardnumber: pd.CardNumber,
      expiredate: pd.ExpirationDate,
      cvv: pd.CVV,
      phone:pd.PhoneNumber
    });
    this.paymentdetail = pd;
  }

  resetForm() {
    this.paymentdetail = {
      PMID: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: '',
      PhoneNumber:''
    }
  }

  onsubmit() {
    this.loading = true;
    this.paymentdetail.CardOwnerName = this.paymentForm.get('cardowner').value;
    this.paymentdetail.CardNumber = this.paymentForm.get('cardnumber').value;
    this.paymentdetail.ExpirationDate = this.datepipe.transform(this.paymentForm.get('expiredate').value, 'MM/yy');
    this.paymentdetail.CVV = this.paymentForm.get('cvv').value;
    this.paymentdetail.PhoneNumber = this.paymentForm.get('phone').value;
    // console.log(this.paymentdetail.ExpirationDate);
    // console.log(this.paymentForm.value);
    if (this.paymentdetail.PMID == 0) {
      this.paymentservice.postPayment(this.paymentdetail).subscribe(
        (data) => {
          // this.formrefresh.ngOnInit();
          this.paymentForm.reset();
          this.resetForm();
          this.toaster.success('Submitted Sccessfully', 'Payment Detail Register');
          this.ngOnInit();
          this.paymentservice.refreshlisting();
          this.loading = false;
        },
        (err) => console.log(err)
      );
    } else {
      this.paymentservice.updatePaymentDetail(this.paymentdetail).subscribe((data) => {
        this.toaster.show('Updated Successfully', 'Payment Detail Register');
        // this.formrefresh.ngOnInit();
        this.paymentForm.reset();
        this.resetForm();
        this.ngOnInit();
        this.paymentservice.refreshlisting();
        this.loading = false;
      },

        (err) => console.log(err))
    }


  }

}

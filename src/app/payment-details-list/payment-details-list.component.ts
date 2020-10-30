import { Component, OnInit, Output, EventEmitter, ViewChild, Input, TemplateRef } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalcontentComponent } from '../modalcontent/modalcontent.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-payment-details-list',
  templateUrl: './payment-details-list.component.html',
  styleUrls: ['./payment-details-list.component.css']
})
export class PaymentDetailsListComponent implements OnInit {
  // @ViewChild(PaymentDetailsComponent)

  @Output() passdetail = new EventEmitter<PaymentDetail>();
  listofdetail: PaymentDetail[];
  filteredNumber1: PaymentDetail[];
  modaldetail: PaymentDetail;
  paymentdetailforedit: PaymentDetail;
  modalRef: BsModalRef;
  private _searchTerm: string;
  constructor(public service: PaymentDetailService, private toaster: ToastrService, private modalService: BsModalService) { }


 
  ngOnInit(): void {
    this.service.refreshlisting()


    // setTimeout(() => {
    //   this.refreshlist();
    // }, 5000);



  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.service.filteredNumber = this.filterCard(value);
  }

  filterCard(searchString: string) {
    return this.service.ListOfdetails.filter(card =>
      card.CardNumber.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }


  // getCardlist() {
  //   this.service.getPaymentDetail().subscribe(data => {
  //     this.listofdetail = data
  //   },
  //     (err) => console.log(err)
  //   );
  //   this.service.filteredNumber = this.listofdetail;
  // }

  

  openModal(template: TemplateRef<any>, pd: PaymentDetail) {
    this.modaldetail = pd;
    // this.modaldetail.CardNumber
    if (this.modaldetail.PMID != null) {
      this.modalRef = this.modalService.show(template);
    }
  }

  editdetails(pd: PaymentDetail) {
    this.passdetail.emit(pd);
  }

  delete(pd: number) {
    this.service.deleteDetail(pd).subscribe(
      (res) => {
        this.toaster.info('Deleted SuccessFully', 'Payment Detail Register')
        this.ngOnInit();
        this.service.refreshlisting();
      },
      (err) => console.log(err)

    )
  }

}

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ContactsService} from '../services/contacts-service';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
@Component({
  selector: 'contact-details-edit',
  template: `<form [ngFormModel]="contactForm" class="contact-details-new">
  <input ngControl="id" type="hidden">
  <div class="contact-title-holder">
    <div class="media">

      <div ngControlGroup="name" class="media-body">
        <div class="form-group">
          <input ngControl="first" type="text" class="form-control" id="name" placeholder="First Name">
        </div>
        <div class="form-group">
          <input ngControl="last" type="text" class="form-control" id="name" placeholder="Last Name">
        </div>
      </div>
    </div>
  </div>
  <div class="media-body">

      <input ngControl="company" type="text" class="form-control" id="company" placeholder="Company">

  </div>
  <div class="media-body">

      <input ngControl="avatar" type="text" class="form-control" id="company" placeholder="url">

  </div>
  <dl class="dl-horizontal">
    <dt>home:</dt>
    <dd>
      <input ngControl="phone" type="text" class="form-control" id="home-" placeholder="Home Phone">
    </dd>
    <dt>address:</dt>
    <dd ngControlGroup="address">
      <div class="form-group">
        <input ngControl="city" type="text" class="form-control" id="city" placeholder="City">
      </div>
      <div class="form-group">
        <input ngControl="state" type="text" class="form-control" id="state" placeholder="State">
      </div>
      <div class="form-group">
        <input ngControl="streetAddress" type="text" class="form-control" id="streetAddress" placeholder="Street Address">
      </div>
      <div class="form-group">
        <input ngControl="zipCode" type="text" class="form-control" id="zipCode" placeholder="Zip Code">
      </div>
    </dd>
    <dt>email:</dt>
    <dd>
      <div class="form-group">
        <input ngControl="email" type="email" class="form-control" id="email" placeholder="Email">
      </div>
    </dd>
  </dl>
  <button (click)="onSubmit($event)">Update</button>
</form>

  `
})
export class ContactDetailsEdit{
  @Output() submit = new EventEmitter();

  @Input() contact;
  contactForm:ControlGroup;

  onSubmit(event){
    event.preventDefault();

    this.submit.emit(this.contactForm.value);
  }

  constructor(public builder:FormBuilder){}

  ngOnInit(){
    this.contactForm = this.builder.group({
      id: [this.contact.id],
      name: this.builder.group({
        first: [this.contact.name.first, Validators.required],
        last: [this.contact.name.last, Validators.required]
      }),
      avatar: [this.contact.avatar, Validators.required],
      company: [this.contact.company, Validators.required],
      phone: [this.contact.phone, Validators.required],
      email: [this.contact.email, Validators.required],
      address: this.builder.group({
        city: [this.contact.address.city, Validators.required],
        state: [this.contact.address.state, Validators.required],
        streetAddress: [this.contact.address.streetAddress, Validators.required],
        zipCode: [this.contact.address.zipCode, Validators.required],
      })
    });
  }

}

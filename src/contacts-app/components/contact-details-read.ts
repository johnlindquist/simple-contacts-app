import {Component, Input} from "angular2/core";
import {ContactsService} from '../services/contacts-service';
@Component({
  selector: 'contact-details-read',
  template: `
    <div class="contact-details">

      <div class="contact-title-holder">
        <div class="media">
          <div class="media-left">
            <img [src]="contact.avatar" class="avatar"/>
          </div>
          <div class="media-body media-middle">
            <h2 class="title">{{contact.name.first}} {{contact.name.last}}</h2>
            <h5 class="subtitle">{{contact.company}}</h5>
          </div>
        </div>
      </div>

      <dl class="dl-horizontal">
        <dt>home:</dt>
        <dd>{{contact.phone}}</dd>
        <dt>address:</dt>
        <dd>{{contact.address.streetAddress}}</dd>
        <dd>{{contact.address.city}}, {{contact.address.state}} {{contact.address.zipCode}}</dd>
        <dt>email:</dt>
        <dd>{{contact.email}}</dd>
      </dl>

    </div>
  `
})
export class ContactDetailsRead{
  @Input() contact;


  ngOnInit(){
    console.log(this.contact);

  }
}

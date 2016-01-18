import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ContactsService} from '../services/contacts-service';
import {ContactDetailsRead} from './contact-details-read';
import {ContactDetailsEdit} from './contact-details-edit';

@Component({
  selector: 'contact-details',
  directives: [ContactDetailsRead, ContactDetailsEdit],
  template: `
  <div [ngSwitch]="state">
    <contact-details-read *ngSwitchWhen="READ" [contact]="contact"></contact-details-read>
    <contact-details-edit
      *ngSwitchWhen="EDIT"
      [contact]="contact"
      (submit)="onSubmit($event)"
      >
    </contact-details-edit>

  </div>

    <div class="contact-edit">
      <button
       class="btn btn-default btn-edit"><span class="glyphicon glyphicon-plus"></span></button>
      <button
        (click)="state = EDIT"
        class="btn btn-default"
        >Edit
      </button>
    </div>
  `

})
export class ContactDetails{
  @Input() contact;

  @Output() submit = new EventEmitter();

  READ = "read";
  EDIT = "edit";

  state = this.READ;

  onSubmit(contact){
    this.submit.emit(contact);
    this.state = this.READ;
  }
}

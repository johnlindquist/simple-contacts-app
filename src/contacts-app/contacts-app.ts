import {Component} from 'angular2/core';
import {ContactList} from './components/contact-list';
import {ContactDetails} from './components/contact-details';
import {ContactsService} from './services/contacts-service';

@Component({
    selector: 'contacts-app',
    directives: [ContactList, ContactDetails],
    template: `
<style>
  contact-list {
    display: flex;
    width: 40%;
    background-color: #EDF4F7;
    padding: 10px;
    overflow-y: hidden;
    flex-direction: column;

  }
  contact-details {
    display: flex;
    flex-direction: column;
    width: 60%;
    overflow-y: auto;
  }
</style>


<main class="app">

  <contact-list
    *ngIf="contactService.selectedContact"
    [contactGroups]="contactService.sortedContactGroups"
    [selectedContact]="contactService.selectedContact"
    (select)="contactService.loadContact($event.id)"
  ></contact-list>

  <contact-details
    *ngIf="contactService.selectedContact"
    [contact]="contactService.selectedContact"
    (submit)="contactService.putContact($event)"
    >
  </contact-details>

</main>
`
})
export class ContactsApp{
  constructor(public contactService:ContactsService){
    contactService.loadContacts(true);
  }
}


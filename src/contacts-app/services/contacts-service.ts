import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactsService {
  selectedContact;
  contactGroups;
  sortedContactGroups;

  constructor(public http:Http){}

  loadContacts(firstLoad) {
    const callback = firstLoad
      ? this.firstSetupContacts.bind(this)
      : this.setupContacts.bind(this);

    this.http
      .get('http://localhost:3000/people')
      .map((res)=> res.json())
      .subscribe(callback);
  }

  loadContact(id) {
    this.http
      .get('http://localhost:3000/people/' + id)
      .map((res)=> res.json())
      .subscribe(this.setupContact.bind(this));
  }

  refreshContacts(contact){
    this.loadContacts(false);
    this.loadContact(contact.id);
  }

  putContact(contact){
    this.http
      .put(
        'http://localhost:3000/people/' + contact.id,
        JSON.stringify(contact),
        {
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
      .map(res => res.json())
      .subscribe(this.refreshContacts.bind(this));
  }

  setupContact(contact){
    this.selectedContact = contact;
  }

  firstSetupContacts(contacts) {
    this.contactGroups = this.groupContacts(contacts);
    this.sortedContactGroups = this.sortContactGroups(this.contactGroups);

    const firstContact = this.sortedContactGroups[0].contacts[0];

    this.loadContact(firstContact.id);
  }

  setupContacts(contacts) {
    this.contactGroups = this.groupContacts(contacts);
    this.sortedContactGroups = this.sortContactGroups(this.contactGroups);
  }

  sortContactGroups(contactGroups) {
    return contactGroups.sort(function (a:any, b:any) {
      if (a.letter > b.letter) return 1;
      if (a.letter < b.letter) return -1;
      return 0;
    })
  }

  groupContacts(contacts) {
    return contacts.reduce((acc:any, curr:any)=> {
      const letter = curr.name.last.substr(0, 1);
      const i = acc.findIndex((elm:any)=> elm.letter === letter);

      if (i > -1) acc[i].contacts.push(curr);
      else acc.push({letter, contacts: [curr]});

      return acc;
    }, [])
  }
}

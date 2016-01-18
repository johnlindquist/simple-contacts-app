import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'contact-list',
  template: `<style>
  .list {
    overflow-y: auto;
  }

  .selected{
    background-color: #EDF1F7;
  }
  .selected:focus{
    background-color: #EDF1F7;
  }

</style>

<h3><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Contacts</h3>
<div class="list">
  <div *ngFor="#contactGroup of contactGroups">
    <h4 class="small">{{contactGroup.letter}}</h4>
    <div class="list-group">
      <button
        *ngFor="#contact of contactGroup.contacts"
        type="button"
        class="list-group-item"
        (click)="select.emit(contact)"
        [ngClass]="{selected:contact.id === selectedContact.id}"
      >{{contact.name.last}}, {{contact.name.first}}
      </button>
    </div>
  </div>
</div>
`
})
export class ContactList {
  @Output() select = new EventEmitter();
  @Input() contactGroups;
  @Input() selectedContact;
}



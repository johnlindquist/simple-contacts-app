import {bootstrap} from 'angular2/platform/browser';
import {ContactsApp} from './contacts-app/contacts-app';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ContactsService} from './contacts-app/services/contacts-service';

bootstrap(ContactsApp, [HTTP_PROVIDERS, ContactsService]);

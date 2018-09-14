import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contacts: any;

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getAllContacts()
      .subscribe(
        contacts => {
          this.contacts = contacts;
        }
      );
  }

}

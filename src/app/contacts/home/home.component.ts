import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  contacts: Contact[];
  dataSource;
  displayedColumns = [
    'firstName',
    'lastName',
    'id'
  ];

  applyFilter(filterValue: string) {
    console.log('Filter Value: ', filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


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
          this.dataSource = new MatTableDataSource(contacts);
          this.dataSource.sort = this.sort;
        }
      );
  }

}

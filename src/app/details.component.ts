import { Component, Output, EventEmitter, Input } from '@angular/core';

import { DATA } from '../services/mock';


@Component({
  selector: 'app-booking-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class BookingDetailsComponent {
    title = 'Booking No.';
    email = 'E-mail:';
    bookingCode = DATA.bookingCode;
    passengers = DATA.passengers;
    contactDetails = DATA.contactDetails[0];
    segments = DATA.itinerary.connections;

    @Output() onDetailsHide: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    bookingDetailsHide(value) {
        this.onDetailsHide.emit(value);
    }
    
    printBooking() {
        alert('Generate a printable layout and print it!');
    }
}

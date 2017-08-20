import { Component, Output, EventEmitter } from '@angular/core';

import { DATA } from '../services/mock';

@Component({
  selector: 'app-booking-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class BookingDetailsComponent {
    // I prefer not to use hard coded text, text should come from library like i18n or some content manager.
    title = 'Booking No';
    flight = 'Flight';
    passengersTitle = 'Passenger(s)';
    email = 'E-mail';
    departAirPort = 'Departure';
    departTime = 'Depart on';
    arriveAirPort = 'Arrival';
    arriveTime = 'Arrive on';
    airplane = 'Airplane model';
    chickin = 'Check-in';
    close = 'Close';

    // Just to make mock data more clear.
    bookingCode = DATA.bookingCode;
    passengers = DATA.passengers;
    contactDetails = DATA.contactDetails[0];
    departFrom = DATA.itinerary.connections.segments.departFrom;
    arriveOn = DATA.itinerary.connections.segments.arriveOn;
    operatingFlight = DATA.itinerary.connections.segments.marketingFlight.operatingFlight;

    // Emitting an event to let parent know when closing the booking details.
    @Output() onDetailsHide: EventEmitter<boolean> = new EventEmitter<boolean>();

    checkIn() {
        alert('Continue to check-in!');
    }
}

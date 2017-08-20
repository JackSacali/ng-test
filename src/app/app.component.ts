import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BookingDetailsComponent } from './details.component';

import { DATA } from '../services/mock';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  header = 'Check-In';
  title = 'Retrieve your booking';
  description = 'You can find your booking by filling out your family name and the booking code in your booking confirmation.';
  code = 'Booking code';
  familyName = 'Family name';
  submit = 'Retrieve booking';
  codeAlert = 'Required (5 or 6 characters, A-Z, 2-9).';
  familyNameAlert = 'Required (2 to 30 characters, only letters).';
  bookings = DATA;
  hideBookingDetails = true;
  retrieveBookingForm: FormGroup; // our model driven form
  submitted: boolean; // keep track on whether form is submitted

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.retrieveBookingForm = this._fb.group({
        code: ['', [<any>Validators.required, <any>Validators.minLength(5), <any>Validators.maxLength(6), <any>Validators.pattern('[A-Za-z2-9]*') ]],
        familyName: ['', [<any>Validators.required, <any>Validators.minLength(2), <any>Validators.maxLength(30), <any>Validators.pattern('[A-Za-z]*') ]],
    });
    console.log(this.bookings);
  }

  searchBooking(model) {
    if ( model.code === this.bookings.bookingCode ) {
      const familyName = model.familyName.toUpperCase();
      if ( familyName === this.bookings.passengers.lastName ) {
        console.log('found it!');
        this.hideBookingDetails = false;
      } else {
        alert('Please check your family name!');
      }
    } else {
      alert('Booking not found! Please, check your inputs');
    }
  }

  setHidden(value) {
    console.log(value);
  }

  onDetailsHide(value) {
    this.hideBookingDetails = value;
    console.log(this.hideBookingDetails);
  }

  check(model, isValid: boolean) {
    this.submitted = true; // set form submit to true
    isValid && this.searchBooking(model);
  }
}

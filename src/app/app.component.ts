import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingDetailsComponent } from './details.component';

import { DATA } from '../services/mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // I prefer not to use hard coded text, text should come from library like i18n or some content manager.
  header = 'Check-In';
  title = 'Retrieve your booking';
  description = 'You can find your booking by filling out your family name and the booking code in your booking confirmation.';
  code = 'Booking code';
  familyName = 'Family name';
  submit = 'Retrieve booking';
  codeAlert = 'Required (5 or 6 characters, A-Z, 2-9).';
  familyNameAlert = 'Required (2 to 30 characters, only letters).';

  // Mock data.
  bookings = DATA;

  // Initiate a state of hidden for the detailes component.
  hideBookingDetails = true;

  // Initiate a model driven form group.
  retrieveBookingForm: FormGroup;

  // Track on whether form is submitted.
  submitted: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Generating the form fields with validation condetions.
    this.retrieveBookingForm = this.formBuilder.group({
        code: ['', [<any>Validators.required,
          <any>Validators.minLength(5),
          <any>Validators.maxLength(6),
          <any>Validators.pattern('[A-Za-z2-9]*') ]],
        familyName: ['', [<any>Validators.required,
          <any>Validators.minLength(2),
          <any>Validators.maxLength(30),
          <any>Validators.pattern('[A-Za-z]*') ]],
    });
  }

  // Fake service / API request.
  searchBooking(model) {
    if ( model.code === this.bookings.bookingCode ) {
      const familyName = model.familyName.toUpperCase();
      if ( familyName === this.bookings.passengers.lastName ) {
        this.hideBookingDetails = false;
      } else {
        alert('Please check your family name!');
      }
    } else {
      alert('Booking not found! Please, check your code and family name!');
    }
  }

  // Function to hide the booking detailes, fired from child component.
  onDetailsHide() {
    this.hideBookingDetails = true;
  }

  // Form submit if vaild.
  submitForm(model, isValid: boolean) {
    this.submitted = true;

    // I use shortened if statment when it's clear like this, less code better performance.
    isValid && this.searchBooking(model);
  }
}

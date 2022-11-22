/// <reference types="@types/googlemaps" />
import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'AutocompleteComponent',
    template: `
      <input class="input"
        type="text"
        [(ngModel)]="autocompleteInput"
        #addresstext style="padding: 12px 20px; border: 1px solid #ccc; width: 400px"
        >
    `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
    @Input() adressType: string;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    ngOnInit() {
        console.log("autocomplete iti")
    }

    ngAfterViewInit() {
        console.log("getPlaceAutocomplete iti")
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        console.log("getPlaceAutocomplete iti 5555")
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'US' },
                //types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            console.log("something")
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
        console.log("getPlaceAutocomplete iti done")
    }

    invokeEvent(place: Object) {
        console.log("something2")
        this.setAddress.emit(place);
    }

}
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor() { }
	ngOnInit() {
		firebase.initializeApp({
			apiKey: 'AIzaSyDGR5DMyjSLH-xnStQTObIiZcqnaEuOnx8',
			authDomain: 'shop-it-63921.firebaseapp.com'
		});

	}
}

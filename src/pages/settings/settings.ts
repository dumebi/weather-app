import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {WeatherPage} from '../weather/weather';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [WeatherService]
})
export class SettingsPage {
  weatherService;
  nav;
  weather;
  searchStr;
  results;
  zmw;
  defaultCity;

  static get parameters(){
    return [[NavController],[WeatherService]];
  }

  constructor(nav, weatherService) {
    this.nav = nav;
    this.weatherService = weatherService;
  }

  ngOnInit(){
    this.getDefaultCity();
  }

  getQuery(){
    this.weatherService.searchCities(this.searchStr).subscribe(res => {
      this.results = res.RESULTS;
    });
  }

  getDefaultCity(){
    if(localStorage.city !== undefined){
      this.defaultCity = JSON.parse(localStorage.city).name;
    }else{
      this.defaultCity = '';
    }
  }

  setDefaultCity(city){
    this.results = [];

    if(typeof(Storage) !== "undefined"){
      localStorage.city = JSON.stringify(city);
      this.searchStr = city.name;
      this.getDefaultCity();
    }else{
      console.log("LocalStorage is not supported");
    }
    console.log(city);
  }

  saveChanges(){
    this.nav.setRoot(WeatherPage);
  }

}

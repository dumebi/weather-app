import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
  providers: [WeatherService]
})
export class WeatherPage {
  weatherService;
  city;
  state;
  weather;
  searchStr;
  results;
  zmw;

  static get parameters(){
    return [[WeatherService]];
  }

  constructor(weatherService, public navCtrl: NavController) {
    this.weatherService = weatherService;
  }

  ngOnInit(){
    this.getDefaultCity();
    this.weatherService.getWeather(this.zmw).subscribe(weather => {
      this.weather = weather.current_observation;
    });
  }

  getQuery(){
    this.weatherService.searchCities(this.searchStr).subscribe(res => {
      this.results = res.RESULTS;
    });
  }

  chooseCity(city){
    this.results = [];
    this.searchStr = '';
    this.weatherService.getWeather(city.zmw).subscribe(weather => {
      this.weather = weather.current_observation;
    });
  }

  getDefaultCity(){
    if(localStorage.city !== undefined){
      this.zmw = JSON.parse(localStorage.city).zmw;
    }else{
      this.zmw = '94125.1.99999';
    }

  }

}

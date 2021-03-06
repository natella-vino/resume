﻿
function Car(manufacturer, model, year) {
    this.manufacturer = manufacturer;
    this.model = model;
    if (year === undefined) {
        year = new Date().getFullYear();
    }

    this.year = year;
    this.price = null;
    this.currency = null;
    this.toString = function () {
        return manufacturer + " " + model + " " + year;
    };
  
    this.getCountry = function () {
    switch (this.manufacturer.toLowerCase()) {
        case 'bmw':
	    case 'audi':
        return 'Germany';

        case 'toyota':
        return 'Japan';
	  }
    };

}



var bmw = new Car("BMW", "X5", 2010),
    audi = new Car("Audi", "Q5", 2012),
    toyota = new Car("Toyota", "Camry");

function CarDealer(name) {
    var activeCurrencies = ["$", "€"];
    this.name = name;
    this.cars = [];
    this.setPrice = function (car_id, price) {
        for (var p = 0; p < this.cars.length; p++) {
            if (this.cars[p].toString() == car_id) {
                var currency = price.substr(0, 1);
                for (var c in activeCurrencies) {
                    if (activeCurrencies[c] == currency) {
                        this.cars[p].currency = activeCurrencies[c];
                        break;
                    }
                }
                if (this.cars[p].currency == null)
                    throw "Unknown currency " + price;

                var amount = price.substr(1, price.length - 1);
                this.cars[p].price = parseFloat(amount);
                return;
            }
        }
        throw "Car " + car_id + " not found";
    }
    this.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (!Car.prototype.isPrototypeOf(arguments[i])) {
                throw "Unsupported object";
            }
            for (var indx in this.cars) {
                if (this.cars[indx].toString() == arguments[i].toString) {
                    throw "Duplicate car:" + arguments[i].toString();
                }
            }
            this.cars.push(arguments[i]);
        }
        return;
    }
    this.list = function () {
        var car_list = [];
        for (var car in this.cars ) {
            car_list.push(this.cars[car].toString());
        }
        var result = car_list.join(', ');
        return result;

    }
    this.listByCountry = function (country) {
        var car_list_by_country = [];
        for (var k in this.cars) {
        if (this.cars[k].getCountry() == country) {
                car_list_by_country.push(this.cars[k].toString());
            }
        }
        return car_list_by_country;
    }
}



var yandex = new CarDealer('Яндекс.Авто');
yandex.add(toyota);
yandex.add(bmw, audi);
yandex.list();
yandex.setPrice('BMW X5 2010', '€2000');
yandex.listByCountry('Japan');
   
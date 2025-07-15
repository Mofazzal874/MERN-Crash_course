// js classes are not actually OOP classes 
// ES6 classes are syntactic sugar over prototypes
// they are not classes in the traditional sense
// they are just a way to create objects with a constructor function
// and a prototype chain
// they do not have private members, static methods, or inheritance in the traditional sense
// they are just a way to create objects with a constructor function and a prototype chain



// So : JS classes are actually templates for creating objects. 
//if you don't provide a constructor, it will create an empty empty constructor function and an empty prototype object.// You can add methods to the prototype object, and they will be available to all instances of the class.


class Car{ 
    constructor(name ,year){
        this.name = name; 
        this.year = year; 
    }
}

const bmw = new Car("BMW", 2020) ; 




//Class Methods :


class Car2{
    constructor(name , year){
        this.name = name; 
        this.year = year; 
    }
    getDetails() {
        return `${this.name} was made in ${this.year}`;
    }
    static getClassName() {
        return "Car2";
    }
    getSpeed(speed){
        return `${this.name} can go at a speed of ${speed} km/h`;
    }
}
const audi = new Car2("Audi", 2021);
console.log(audi.getDetails()); // Audi was made in 2021



// Javascript class Static method: 
// - you cannot call a static method on an object instance , only on an object class.

console.log(Car2.getClassName()); // Car2


// javascript inheritance: 

class Vehicle{
    constructor(name, year){
        this.name = name; 
        this.year = year; 
    }
    getDetails() {
        return `${this.name} was made in ${this.year}`;
    }
}


class Car3 extends Vehicle{
    constructor(name , year , speed){
        super(name, year); 
        this.speed = speed; 
    }

    getSpeed(){
        return `${this.name} can go at a speed of ${this.speed} km/h`;

    }
}

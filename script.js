"use strict";

const form = document.querySelector(".form");
const type = document.getElementById("type");
const mark = document.getElementById("mark");
const model = document.getElementById("model");
const year = document.getElementById("year");
const transmission = document.querySelectorAll(".transmission");
const add = document.getElementById("add");
const table = document.querySelector("table").childNodes[3];

const cars = [];

let del = document.querySelectorAll(".delete");

class Auto {
  constructor(mark, model, year, transmission) {
    this.mark = mark;
    this.model = model;
    this.year = year;
    this.transmission = transmission;
    this.id = Auto.id;
    Auto.incrementId();
  }

  static id = 0;

  static incrementId() {
    Auto.id++;
  }

  addTable = () => {
    let row = document.createElement("tr");
    row.id = `car${this.id}`;
    row.innerHTML = `<td>${this.type}</td>
    <td>${this.mark}</td>
    <td>${this.model}</td>
    <td>${this.year}</td>
    <td>${this.transmission}</td>
    <td>${this.drive}</td>
    <td>${this.fuel}</td>
    <td><button id="${this.id}" class="delete">Удалить</button></td>`;
    table.append(row);
    del = document.querySelectorAll(".delete");
  };

  remove = (btnId, arrId) => {
    cars.splice(arrId, 1);
    const row = document.getElementById(`car${btnId}`);
    localStorage.setItem("cars", JSON.stringify(cars));
    row.remove();
  };
}

class Sedan extends Auto {
  constructor(mark, model, year, transmission) {
    super(mark, model, year, transmission);
    this._fuel = "gas";
    this.type = "sedan";
  }
  get fuel() {
    return this._fuel;
  }
  set drives(str) {
    this.drive = str;
  }
}
class Suv extends Auto {
  constructor(mark, model, year, transmission) {
    super(mark, model, year, transmission);
    this._fuel = "disel";
    this.type = "suv";
  }
  get fuel() {
    return this._fuel;
  }
  set drives(str) {
    this.drive = str;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let transmissions = "";
  transmission.forEach((item) => {
    if (item.checked) {
      transmissions = item.value;
    }
  });
  switch (type.value) {
    case type.options[1].value:
      const car1 = new Sedan(
        mark.value,
        model.value,
        year.value,
        transmissions
      );
      car1.drives = "front-wheel drive";
      cars.push(car1);
      car1.addTable();
      localStorage.setItem("cars", JSON.stringify(cars));
      delListener();
      break;
    case type.options[2].value:
      const car2 = new Suv(mark.value, model.value, year.value, transmissions);
      car2.drives = "all-wheel drive";
      cars.push(car2);
      car2.addTable();
      localStorage.setItem("cars", JSON.stringify(cars));
      delListener();
      break;
  }
  type.options[0].selected = true;
  mark.value = "";
  model.value = "";
  mark.value = "";
  year.value = "";
  transmission.forEach((item) => {
    item.checked = false;
  });
});

const delListener = () => {
  del.forEach((btn) => {
    btn.addEventListener("click", () => {
      cars.forEach((car) => {
        if (car.id == btn.id) {
          car.remove(btn.id, cars.indexOf(car));
        }
      });
    });
  });
};

const start = function () {
  if (JSON.parse(localStorage.getItem("cars"))) {
    for (let i = 0; i < JSON.parse(localStorage.getItem("cars")).length; i++) {
      let car = JSON.parse(localStorage.getItem("cars"))[i];
      if (car.type === "sedan") {
        const car1 = new Sedan(car.mark, car.model, car.year, car.transmission);
        car1.drives = car.drive;
        cars.push(car1);
        car1.addTable();
      } else {
        const car2 = new Suv(car.mark, car.model, car.year, car.transmission);
        car2.drives = car.drive;
        cars.push(car2);
        car2.addTable();
      }
    }
    delListener();
  }
};

start();

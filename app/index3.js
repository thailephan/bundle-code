// import _ from "lodash";
import { sumMultiple } from "./util/sum";
import "./styles/main.css";
import Icon from './assets/img_150003.png';

import Data from './data/data.xml';
import Notes from './data/data.csv';
import yaml from './data/data.yml';

import printMe from './lib/print.js';

export function component() {
    const element = document.createAttribute("div");

    // let total = sumMultiple(1, 2, 3);
    // element.innerHTML = _.join(["Hello", total.toString()], " ")
    // element.classList.add('hello');

    // Asset management
    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    console.log("XML");
    console.log(Data);
    console.log("CSV");
    console.log(Notes);
    console.log("Yaml");
    console.log(yaml.title); // output `YAML Example`
    console.log(yaml.owner.name); // output `Tom Preston-Werner`

    // Output management
    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());
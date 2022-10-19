import { sayHello } from "./utils/greet";

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript");
// Notice that even though we used ES2015 module syntax, TypeScript emitted CommonJS modules that Node uses.
// We’ll stick with CommonJS for this tutorial, but you could set module in the options object to change this.
// Require the filesystem module
const filesystem = require('./node_modules/graceful-fs/graceful-fs');
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");

class Svg {
  constructor() {
    this.textElement = '';
    this.shapeElement = '';
  }

  render() {// the SVG with the stored shape and text elements
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }

  setTextElement(text, color) { // set text element of the SVG with text and color
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

    
// Set the shape element of the SVG with the rendered shape
  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }

};

// prompts for the user to be used by inquirer
const questions = [
  {
    type: "input",
    name: "text",
    message: "Please enter 3 characters for the logo:",
  },
  {
    type: "input",
    name: "text-color",
    message: "Choose a color for the text:",
  },
  {
    type: "list",
    name: "shape-logo",
    message: "Choose your shape 1 = Circle, 2 = Square, 3 = Triangle :",
    choices: ["Circle", "Square", "Triangle"],
  },
  {
    type: "input",
    name: "shape",
    // Prompt for user to chose color
    message: "Choose a color for your shape",
  },
];

// log a message indicating writing to a  file
function setUpFile(newFile, data) {
  console.log("Writing [" + data + "] to file [" + newFile + "]");
  filesystem.writeFile(newFile, data, function (err) {
    if (err) {
      return console.log(err); // if we have issue wrtigin to filesystem
    }
    console.log("Success!"); // if it all goes smoothly
  });
}

async function letsGo() {
  console.log("testing testing");
  var svgText = "";
  // File to write the SVG data to
  var svgFile = "logo.svg"; 

  // Prompt the user with the defined questions and wait for their answers
  const answers = await inquirer.prompt(questions); 

  var userChoiceText   = "";
  if (answers.text.length > 0 && answers.text.length < 4) {
    userChoiceText   = answers.text;
  } else {
    // Log an error if incorrect character amount
    console.log("Oops. Text should be 1-3 characters long.");
    // Exit the function early if user input is invalid
    return; 
  } //show tex t entered
  console.log("Text: [" + userChoiceText  + "]");
  

  userChoiceTextCol = answers["text-color"];
  // show users chosen font color
  console.log("User font color: [" + userChoiceTextCol + "]"); 

  userChoiceShapeCol = answers.shape;
  // show user's chosen shape color
  console.log("User shape color: [" + userChoiceShapeCol + "]"); 

  userChoiceShape = answers["shape-logo"];
  // show user's chosen shape
  console.log("User entered shape = [" + userChoiceShape + "]");

  // pick a shape, any shape
  let userShape;
  // square
  if (userChoiceShape === "Square" || userChoiceShape === "square") {
    userShape = new Square();
    console.log("Big Ol' Square"); 
    // circle
  } else if (userChoiceShape === "Circle" || userChoiceShape === "circle") {
    userShape = new Circle();
    console.log("Big Ol' Circle"); 
    // triangle
  } else if (userChoiceShape === "Triangle" || userChoiceShape === "triangle") {
    userShape = new Triangle();
    console.log("Big Ol' Triangle");
  } else {
    // showw error for an invalid shape choice
    console.log("Big Ol' Swing and a Miss");
// set color of the shape
  }
  userShape.setColor(userChoiceShapeCol); 



  var svg = new Svg();
  svg.setTextElement(userChoiceText , userChoiceTextCol);
  svg.setShapeElement(userShape);
  svgText = svg.render(); // Generate the SVG with the user's choices

  // show svg 
  console.log("New Logo, who dis?:" + svgText);
  console.log("Success!");
  console.log("Writing shape to file...");
  // save it to out file
  setUpFile(svgFile, svgText);
}

letsGo(); // Lets go
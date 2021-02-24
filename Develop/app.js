const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let arrOfMember = [];
// Confirm if you're building a team member question
const confirmTeam = [
  {
    type: "confirm",
    message: "Do you want to build an engineering team?",
    name: "confirm_team",
  },
];
// Choose what team member the user is building question
const teamMember = [
  {
    type: "list",
    message: "What team member do you want to add",
    choices: ["Manager", "Engineer", "Intern"],
    name: "member",
  },
];

// Create questions to build a Manager
const managerQuestions = [
  {
    type: "input",
    message: "Enter your name",
    name: "manager_name",
  },
  {
    type: "input",
    message: "Enter your ID number",
    name: "manager_id",
  },
  {
    type: "input",
    message: "Enter your email address",
    name: "manager_email",
  },
  {
    type: "input",
    message: "Enter your office number",
    name: "manager_officeNumber",
  }
]

// Confirm if you're building a team member
inquirer.prompt(confirmTeam).then((answer) => {
  answer.confirm_team
    ? buildMember()
    : console.log("You're not building a team. Bye bye!");
});

// Choose what team member you're building
const buildMember = () => {
  inquirer.prompt(teamMember).then((answer) => {
    console.log(answer);
    if (answer.member === "Manager") {
      console.log("build Manager");
      buildManager();
    } else if (answer.member === "Engineer") {
      console.log("build Engineer");
    } else if (answer.member === "Intern") {
      console.log("build intern");
    }
  });
};

const buildManager = () => {
  inquirer.prompt(managerQuestions).then((answer) => {
    console.log(answer);
    arrOfMember.push(new Manager(answer.manager_name, answer.manager_id, answer.manager_email, answer.manager_officeNumber));
    console.log(arrOfMember);

  })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

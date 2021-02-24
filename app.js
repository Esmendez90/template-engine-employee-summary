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

let memberArr = [];
// Confirm if you're building a team member
const confirmTeam = [
  {
    type: "confirm",
    message: "Do you want to build an engineering team?",
    name: "confirm_team",
  },
];
// Choose what team member the user is building
const teamMember = [
  {
    type: "list",
    message: "What team member do you want to add?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "member",
  },
];

// Add additional team members or finish adding members
const addMember = [
  {
    type: "list",
    message: "What team member do you want to add?",
    choices: ["Engineer", "Intern", "I'm done adding members"],
    name: "add_member",
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
  },
];

// Create questions to build an Engineer
const engineerQuestions = [
  {
    type: "input",
    message: "Enter your name",
    name: "engineer_name",
  },
  {
    type: "input",
    message: "Enter your ID number",
    name: "engineer_id",
  },
  {
    type: "input",
    message: "Enter your email address",
    name: "engineer_email",
  },
  {
    type: "input",
    message: "Enter your github username",
    name: "engineer_github",
  },
];

// Create questions to build an Intern
const internQuestions = [
  {
    type: "input",
    message: "Enter your name",
    name: "intern_name",
  },
  {
    type: "input",
    message: "Enter your ID number",
    name: "intern_id",
  },
  {
    type: "input",
    message: "Enter your email address",
    name: "intern_email",
  },
  {
    type: "input",
    message: "Enter your school name",
    name: "intern_school",
  },
];

// Confirm if you're building a team
inquirer.prompt(confirmTeam).then((answer) => {
  answer.confirm_team
    ? buildMember()
    : console.log("You're not building a team. Bye bye!");
});

// Choose what team member you're building
const buildMember = () => {
  inquirer.prompt(teamMember).then((answer) => {
    //console.log(answer);
    if (answer.member === "Manager") {
      //console.log("build Manager");
      buildManager();
    } else if (answer.member === "Engineer") {
      //console.log("build Engineer");
      buildEngineer();
    } else if (answer.member === "Intern") {
      //console.log("build intern");
      buildIntern();
    }
  });
};

// Answer prompts to create a Manager
const buildManager = () => {
  inquirer.prompt(managerQuestions).then((answer) => {
    //console.log(answer);
    // Answers for Manager are pushed into the memberArr creating a new Manager
    memberArr.push(
      new Manager(
        answer.manager_name,
        answer.manager_id,
        answer.manager_email,
        answer.manager_officeNumber
      )
    );
    // Log the information of the new Manager
    console.log(memberArr);
    addTeamMember();
  });
};

// Answer prompts to create an Engineer
const buildEngineer = () => {
  inquirer.prompt(engineerQuestions).then((answer) => {
    //console.log(answer);
    // Answers for engineer are pushed into the memberArr creating a new Engineer
    memberArr.push(
      new Engineer(
        answer.engineer_name,
        answer.engineer_id,
        answer.engineer_email,
        answer.engineer_github
      )
    );
    // Log the information of the new Engineer
    console.log(memberArr);
    addTeamMember();
  });
};

// Answer prompts to create an Intern
const buildIntern = () => {
  inquirer.prompt(internQuestions).then((answer) => {
    //console.log(answer);
    // Answers for intern are pushed into the memberArr creating a new Intern
    memberArr.push(
      new Intern(
        answer.intern_name,
        answer.intern_id,
        answer.intern_email,
        answer.intern_school
      )
    );
    // Log the information of the new Intern
    console.log(memberArr);
    addTeamMember();
  });
};

// If the user wants to create additional members...
const addTeamMember = () => {
  inquirer.prompt(addMember).then((answer) => {
    switch (answer.add_member) {
      // If the user chooses Engineer then the function to build an Engineer will run
      case "Engineer":
        buildEngineer();
        break;
        // If the user chooses Intern then the function to build an Intern will run
      case "Intern":
        buildIntern();
        break;
        // Otherwise, the data should be displayed in an HTML file
      default:
        console.log("Display data");
    }
  });
};

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

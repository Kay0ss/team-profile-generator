const fs = require("fs");
const inquirer = require("inquirer");
const engineer = require("./lib/engineer");
const manager = require("./lib/manager");
const intern = require("./lib/intern");

const employees = [];

function init() {
    genHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        message: "Please enter new member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select the role of the new member",
        choices: ["intern", "engineer", "manager"],
        name: "role"
    },
    {
        
    }])
}
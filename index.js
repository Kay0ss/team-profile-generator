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
        message: "What is the new member's Id?",
        name: "id"
    },
    {
        message: "What is the new team members email?",
        name: "email"


    }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "intern") {
            roleInfo = "name of school";
        } else if (role === "engineer") {
            roleInfo = "github username";
        } else {
            roleInfo = "office number"
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add any more members?",
            choices: ["yes","no"],

            name: "moreMembers"
        }])
        .then(function({roleInfo, moreMembers}) {
            let newMember;
            if (role === "engineer") {
                newMember = new engineer(name, id, email, roleInfo);
            } else if (role === "intern") {
                newMember = new intern(name, id, email, roleInfo);
            }else {
                newMember = new manager(name, id, email, roleInfo);
            }
            employees.push(newMember);
            console.log(newMember);
            genHtml(newMember)
            console.log(genHtml)
            console.log("second new member" + newMember)
            .then(function(){
                if (moreMembers === 0) {
                    addMember();
                }else{
                    finishHtml();
                }
            });
        });
    });
}

    function genHtml() {
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Profile</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
            <nav class="navbar navbar-dark bg-dark mb-5">
                <span class="navbar-brand mb-0 h1 w-100 text-center">Profile</span>
            </nav>
            <div class="container">
                <div class="row">`;
        
                fs.writeFile("./output/team.html", html, function(err){
                    if (err) {
                        console.log(err);
                    }
                });
            console.log("start");
    }

    function addHtml(member) {
        return new Promise(function(resolve, reject){
            const name = member.getName();
            const role = member.getRole();
            const id = member.getId();
            const email = member.getEmail();
            let data = "";
            if (role === "engineer") {
                const gitHub = member.getGithub();
                data = `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Engineer</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address: ${email}</li>
                    <li class="list-group-item">GitHub: ${gitHub}</li>
                </ul>
                </div>
            </div>`;
            } else if (role === "intern") {
                const school = member.getSchool();
                data = `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Intern</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address: ${email}</li>
                    <li class="list-group-item">School: ${school}</li>
                </ul>
                </div>
            </div>`;
            } else {
                const officePhone = member.getOfficeNumber();
                data = `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Manager</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address: ${email}</li>
                    <li class="list-group-item">Office Phone: ${officePhone}</li>
                </ul>
                </div>
            </div>`
            }
            console.log("adding team member");
            fs.appendFile("./output/team.html", data, function (err) {
                if (err) {
                    return reject(err);
                };
                return resolve();
            });
        }); 
        

        


    }

    function finishHtml() {
        const html = ` </div>
        </div>
        
    </body>
    </html>`;
    
        fs.appendFile("./output/team.html", html, function (err) {
            if (err) {
                console.log(err);
            };
        });
        console.log("end");
    }
    
    // addMember();
    // startHtml();
    // addHtml("hi")
    // .then(function() {
    // finishHtml();
    // });
    init();
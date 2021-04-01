# Angular TourOfHeroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.
First Project using Angular Framework and Firebase.
##How to use it
## Via Script (Linux Ubuntu 18.* and 20.*)

Copy the script `script.sh` into a file ending with `.sh`
Then in a terminal use `chmod +x nameOfTheFile.sh`.

Launch the script with the command `. script.sh` and not `./script.sh` !!!

Navigate to `http://localhost:81`. 

##Git Clone : Classic and Docker
You can clone the project using http with `git clone "https://github.com/Crakenar/Angular_Tour_Heroes.git"`

Or You can clone the project using ssh with `git clone "git@github.com:Crakenar/Angular_Tour_Heroes.git"`

1 - Classic 

In a terminal you can run `ng serve --open`. Navigate to `http://localhost:4200/`. 
    The app will automatically reload if you change any of the source files. 
    
2 - Docker

In a terminal `sudo docker build -t angular-tourofheroes-image`.
Then `sudo docker run -p 81:80 angular-tourofheroes-image`.
Naviguate to `http://localhost:81`.

## Code Editing

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests (none)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


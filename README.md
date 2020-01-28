# VIST Frontend

This is the frontend of [VIST](https://vist.informatik.hu-berlin.de/), further described by Jurica Ševa et al. in ["VIST - A Variant-Information Search Tool for precision oncology."](https://link.springer.com/content/pdf/10.1186%2Fs12859-019-2958-3.pdf)

## Setup

* Download and install [Node.js](https://nodejs.org)
* Download and install the [Angular CLI](https://cli.angular.io/) with `npm i -g @angular/cli`
* Clone the project with `git clone https://github.com/dlw93/vist-frontend.git`

## Build

* Change into the project directory with `cd vist-frontend`
* Run `npm install` to download the project's requirements
* Start the build process with `ng build --prod --deploy-url /vist-frontend/`

## Installation

* Remove the old frontend with `rm -r /home/docClass/webApp<branch>/vist-frontend`
* Still from within the project directory, put the new frontend in place with `mv ./dist/vist-frontend /home/docClass/webApp<branch>/`

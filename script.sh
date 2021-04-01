#!/bin/bash

echo "Make sur there is no folder named Angular_Tour_Heroes "
echo "If there is, make sure it is empty"
echo $PWD
echo "Cloning repertory"
git clone "https://github.com/Crakenar/Angular_Tour_Heroes.git" $PWD/Angular_Tour_Heroes
cd "Angular_Tour_Heroes";
echo "install npm dependencies"
sudo npm install
echo "npm audit fix"
sudo npm audit fix
echo "ng build prod"
sudo ng build --prod
echo "create docker images"
echo $PWD
sudo docker build -t angular_tour_heroes_image .
echo "Maybe your port 81 is already used"
firefox -P 'Another Profile' http://localhost:81
echo "Refresh the page"
sudo docker run -p 81:80 angular_tour_heroes_image

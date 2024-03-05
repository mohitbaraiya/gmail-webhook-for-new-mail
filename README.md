# Gmail webhook for recieve notifications on new email recieved

## google setup

### step 1

create a google developer account

create your google developer account at https://console.cloud.google.com

### step 2

create a new project or use existing

create your your first project in google console or use any exists project

### step 3

get credentials

select you project and go to the "APIs & Services" and go to "Creditials" and add O Auth client then download its credintial json file and put it into root of the project and rename it with "credentials.json"

### step 4

setup notification in google console

in navigation menu find for "Pub/Sub" and create a new topic under this menu with permmission of "Pub/Sub Publisher" for "gmail-api-push@system.gserviceaccount.com"

### step 5

run project

run the following command at root of the project

1. npm ci
2. npm start

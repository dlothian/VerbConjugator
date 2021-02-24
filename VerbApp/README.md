## Requirements
This project requires:

    - [npm] (https://www.npmjs.com/get-npm) >= 6.14.7 
    
    - [ionic] (https://ionicframework.com/docs/intro/cli) >= 6.13.1 
    
    - [cordova] (https://ccoenraets.github.io/cordova-tutorial/create-cordova-project.html) >= 9.0.0
    
## Inital Test
This project comes initialized as a French conjugator. To see how it looks, navigate to the current directory and run the following:
    `ionic serve`
This will open this ionic project in your browser. 

If you would like to see it on a phone emulator, run the following:
    `ionic cordova emulate ios` to emulate on an ios device (iphone or ipad)
    `ionic cordova emulate andriod` to emulate on an andriod device

**Please note that you can only emulate an iOS device if you have XTools, which is typically only available on Macs (OSX machines).

## Make Your Own App
If you haven't already formatted your language's data, please navigate to the `VerbConjugator/DataBuilder` directory and following the instructions detailed in the instructions.

### Move JSON folder
Once you have completed the data building instructions, it should have produced a directory entitled `JSON`. Copy that folder into the following directory:
    `VerbConjugator/VerbApp/src/assets`

There is already a JSON folder in this directory. It contains the french data, so please delete it. If you'd like to look at it for reference, refer back to this repository.

### Tooltips
Create a file called `tooltip.json` in the `VerbConjugator/VerbApp/src/assets/JSON` folder. This file will have all the information in the tool tips in the apps. This will be any information you'd like your user to know about each category they have to choose from. For example, in the French `tooltip.json` folder

### Choose Colours

## Navigating

### /app

Contains all components, modules, pages, services and styles.

### /assests

Contains images, sample-data json’s, and any other asset required.

### /environments

Contains configuration files used by the Angular CLI to manage the different environment variables.

### /theme

Contains relevant files related to over theme (i.e. colors) of app. To change colors, see the contained css file.


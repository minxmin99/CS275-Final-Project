***Repository of CS 275 Final Project in Developing Webapp***

A walkthrough of what I did:
- Have visual studio code (not Visual Studio which is heavier) 
- Install packages Ionic 4 Snippet on VS Code
- Type npm init in the fog-off directory  
- Make sure npm install ionic as well (it should install all dependencies for Ionic)

- The main development should focus in src/app
- I picked the tabbed template to with 3 tabs to begin with
	+ Profile
	+ Map
	+ Achievement
	(But this could change later)
	
**Notes**: 
- To emulate app on virtual mobile: You need to install dependencies for either iOS (Mac only) or Android Studio SDK
	+ iOS: xcode-select install
	+ Android: Install Android Studio, SDK 28, Gradle and Android Virtual Devices (AVD)
	
To start the app on localhost:8100
- On terminal, go inside fog-off directory and type ionic serve (**Edit**: if you want to use Google Map, use *ionic cordova run browser* or *ionic cordova emulate ios/android* depends on your chosen platform)
	+ Browser: Should things go fine, after a couple seconds, your default browser will automatically open a new tab with the app running 
	+ Mobile: AVD on Android or Emulator on iOS will appear with the app opened. 


Timeline (Gantt Chart): https://docs.google.com/spreadsheets/d/1nT4qISeFakcFasjLV0tdjEuxMHh_RKpYyQsrmjzY_fc/edit?usp=sharing

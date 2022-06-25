# ManyVoice [](https://emojipedia.org/speaking-head/)🗣️
  * A fully functional group voice chat system for Manyland.
  * I figured I'd toss my hat in the ring once again with some more communications scripts.
  * Hopefully everything feels intuitive and engrained into the game.
  * Anyway, I hope you enjoy.
  * Made by *Zoltar*

### Deployment

Navigate to [Manyland](http://manyland.com).
Open your browsers **Developer Console** and run the following command.

```js

$.getScript('https://cdn.jsdelivr.net/gh/ZoltarML/ManyVoice@latest/voiceClient.js')

```

Congrats! Many Voice has been successfully installed!

# **NOTICE**
 * To chat with others using this script they must *also* be running it.
 * Should they not be running it they will not be able to see world rooms.
 * You must also allow the program access to your microphone.

# Features

While making **ManyVoice** I attempted to make it as intuitive and simple as possible, but there are still some elements that may need explaining.

## Rooms[](https://emojipedia.org/house/) 🏠
 - Within the new menu item, you have the ability to make or join a **Room**.
 - A Room is a group where multiple people can speak at the same time; can only be ended by the host.
 
* **Creating a Room:**
	* When creating a room you must press the plus `(+)` icon in the upper right hand corner of the window.
	* You will then be prompted to enter a **name** and decide whether the room is **private**
		> If the room is private you will be prompted to enter a password for it.
	* Finally click **Done**, and just like that you've created a room!
			*note: if you are currently in another Room, you will be forced out of that Room and into the on you just created*
      
 ![](https://gyazo.com/a684e5c031848fe16490618f1048c3f9.gif)
			
* **Joining a Room:**
	* If you don't want to make a room, you can always **join** one.
	* Inside of the new menu item, you'll immediately see all the **Rooms** that have been created in your current world. 
	* On the right of the Room entry, you will either see a padlock or the number of people present in the Room.
		>**Padlock:** indicates that a room is private and requires a password to join
	* Upon clicking the Room, you will be either allowed in, *or* prompted for a password depending on if its private or not.
		*note: if you are in another Room when joining a different one, you will be **forced** to leave. If you are the host of said room, it well **close** the Room.*

![](https://gyazo.com/e2d75d06f5ea4e1941fe50e91ac76a04.gif)

## Call[](https://emojipedia.org/telephone-receiver/) 📞
- This section will refer to the screen present after creating or joining a world group.
* **Callers:**
	* Upon joining/creating a Room, you will see a list of the current **Callers**
	*  In this list you can monitor who is currently speaking
		> Name will light up green when  speaking.	
	* *TODO: add mute feature and volume decrease*
	* Whenever a caller leaves, they will be removed from the **caller list**, followed by a sound. 
	* When a caller joins, their name will be added to the list, followed by the join sound.
	
* **Interface:**
	* On the bottom of the new screen you will see three buttons, **mute**, **deafen**, and **hang up**.
	* **Mute:** pressing the mute button will stop your Microphone from picking up sound.
	* **Deafen:** will stop you from hearing everyone else.
	* **Hang Up:** removes you from Room or ends Room if you are the host. 
		
![](https://gyazo.com/5bdf1f22cf0dd7f5b05e0623fd39e83a.gif)

## Built With

* [Manyland Auto Deobfuscator](https://github.com/parseml/many-deobf) - Used to stay up to date with Manyland obfuscation.
* [Puppeteer](https://github.com/puppeteer/puppeteer) - Used for updating cookies.
* [Socket.io](https://socket.io/) - Used socket creation and handling.
* [Express](https://expressjs.com/) - Powerful web framework for Nodejs.
* [Request-Promise-Native](https://github.com/request/request-promise-native) - Used to send request to Manyland.


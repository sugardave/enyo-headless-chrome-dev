This is an example application that demonstrates a combination of *enyo.Object*s and application structure that allow Enyo developers to develop and test headless applications in Chrome (or other supported WebKit browser).

For the impatient, the important bits are **App.js**, **WindowManager.js**, and the naming of the window *startup* in **index.html**.
#How To Use
Include **App.js** and **WindowManager.js** in your application and use the **App** object's **openCard()** method when you want to open a new card or tab.  An example, assuming enyo.application.app holds the object:

<code>enyo.application.app.openCard(*name*, *inProps*);</code>

Where *inProps* has the following required properties:

- **path** (the application path to the card's/kind's HTML)
- **browserKind** (the name of the *enyo.Component* kind that represents the view)

It is highly recommended to understand and mimic the following application structure to get the most out of this example.

##Application Structure
###Root directory
This is normal and contains **appinfo.json**, **depends.js**, **index.html**, and a **source** directory.  Everything is pretty standard with some notes following:
####index.html
- Renames the headless window object to *startup* (which is checked in **WindowManager.js** to perform the magic)
- Sets the unload handler on the headless window so that the application will exit correctly
- Sets the relaunch handler on the headless window so that the application will relaunch correctly
####depends.js
- Loads **App.js**, **WindowManager.js**, and the **views** directory (more on that later)

---
###source directory
This directory contains (you might guess) the meat of the source of the application.
####source/controllers
The resting place of **App.js** and **WindowManager.js**.  These are *enyo.Object*s that work together for your coding pleasure.
#####App.js
- Ultimately called by the root **index.html** to either start or relaunch the application.
- **startup()** handles the logic of what to do based on window parameters
- **openCard()** calls the same method in **WindowManager.js** with the desired parameters
#####WindowManager.js
<ul>
<li>Maintains a <strong>uniqueCards</strong> object which allow optional forcing of the same card/kind to be created rather than using the existing one</li>
</li>
<li>Checks the running environment
<ul>
<li>On a webOS device, behaves normally when opening new windows</li>
<li>In the browser, performs one of two operations:
<ul>
<li>If a window named <em>startup</em> exists, creates a new kind (more on that later)</li>
<li>If no window named <em>startup</em> exists, opens a new window to the kind's directory
</ul>
</li>
</ul>
</li>
</ul>
####source/views
There is a **depends.js** which only loads the directories that are in **source/views**. These directories house the various cards used by the application.  This example has two; **regular** and **specialized**.

The names are unimportant (other than being used by other parts of the application).  What is important is that each view directory houses its own HTML, depends.js, and kind definition(s) loaded in that depends.js.  See the source code and it will be clearer.

Further, the kinds are of type *enyo.Component* and their kind name is passed as one of the properties used by the WindowManager when running in the browser to create the correct kind when necessary (on startup).  These kinds handle rendering their components.  Therefore, in the view's HTML, you merely instantiate the kind.

In this example, the regular view will be loaded as the first card in webOS or the empty/new browser window and tapping the "Open New Card" button will open a new card in webOS or a new tab in the browser.
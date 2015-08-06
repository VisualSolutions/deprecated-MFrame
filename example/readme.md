#Framework QA Getting Started

##Installing dependencies

In order to test the framework application it is required that you install NodeJS. This can be hard to do on Windows since it does not have a built in UNIX command line and handles permissions differently than Mac OS X or Linux. That being said, if it works better organizationally to have it run on Windows, it's not impossible. I will provide steps for both installs. I can also provide further assistance if anyone needs it. The server team also has experience installing NodeJS on Windows and may be of help if you need it.

###Install NodeJS

####Install NodeJS on Mac OS X

  1. https://nodejs.org/ - Click the 'INSTALL' button
  2. Open and install the `pkg` file
  3. Open Terminal and type `node` and hit enter
  4. Do the same with `npm`
  5. If either commands don't work then your PATH is not configured properly... You may want a dev's help at this point. Otherwise you are done installing NodeJS


  To fix the PATH:

  1. Make sure the Terminal is pointed to your `/user_name` home directory and enter `nano .bash_profile`
  2. The previous step created a `.bash_profile` file which will now be open in the Nano Terminal editor. Copy this line into the editor:

      `export PATH="$PATH:/usr/local/bin/"`

  3. Type `ctrl + o` and hit `return` to save. Type `ctrl + x` to exit the editor.
  4. Now in the command line enter `source .bash_profile`
  5. Enter `echo $PATH` into the Terminal and make sure your changes show up. Also enter `node` and `npm` to ensure they are working.

####Install NodeJS on Windows 7

  1. https://msysgit.github.io/ - Install Git for Windows
  2. https://github.com/coreybutler/nvm-windows/releases  - Find the latest release (1.0.6 as of writing this) and click the `nvm-setup.zip` file to download it. Unzip the `.exe`, run and install it.
  3. Open `Git Bash` and enter `nvm` to see that it's working. If not then contact Vladimir or I.
  4. Enter `nvm install latest`, then `nvm use latest`
  5. Enter `npm` and `node` to ensure that they are working.

###Install Grunt-cli and Bower

In Terminal or Git Bash enter `npm install -g grunt-cli bower`

###Setup Test application

  1. https://github.com/VisualSolutions/template-framework - Download ZIP
  2. Extract zip file somewhere
  3. In Terminal or Git Bash, enter `cd path/to/../template-framework`
  4. Enter `npm install`
  5. Enter `bower install`
  6. Enter `grunt example` - Your default browser should open up with the template loaded

##Testing the application
###Sprint 1 Features (Not Required, but for awareness)

  1. Open `template-framework/example/config.json` in a text editor
  2. There are three main objects in this JSON, two `text` and one `image`. Under where it says `styles` there are a number of CSS styles that can be altered. The `value` property determines the actual CSS value and should be the only thing you change. Each style has different types of values. If the style is a color then it will accept hex values as well as RGBA. Other styles will have an options `property` which is an array of possible options to choose from. If you would like to add more values than are available (just in the `value` property, don't change anything else) you can search the `cssProperty` online and find more.

###Sprint 2 Features

####Grid System

The grid system divides elements (including the window) into a 24x24 grid and allows developers to setup different grid values based on the aspect ratio of the window. For Example:
````javascript

{
  pathName: 'myElement',
  left: {
    ls: 8,
    pt: 2
  },
  top: {
    ls: 4,
    pt: 2
  },
  height: {
    ls: 16,
    pt: 8
  },
  width: {
    ls: 14,
    pt: 20
  }
}
````
`myElement` is an ID (created by the developer) that is added to the element through the `mv-grid` HTML attribute. For `mv-text` and `mv-image` this value is the same path used to assign its configuration value.

`<div class="foo" mv-grid="myElement"></div>`

`<mv-image class="left-image" path="myElement"></mv-image>`

Assuming that this element's only parent is the `body` tag, if the window is in landscape, the element will be 14x16 grid units in size, 8 grid units from the left, 4 grid units from the top. `ls` stands for landscape. `pt` stands for portrait.

When elements are nested within each other, the grid for the child element will be based on the size of the parent element.

  To start using the system:

  1. Open `template-framework/example/template.js` in a text editor
  2. You will see a `gridConfig.setConfig()` function with multiple grid configuration setup inside.
  3. Play around with the values (0 - 24) and refresh the page in different aspect ratios to see the results.

Chances are that you are going to change a number and it's going to make everything look awful because the element is in a weird place. Try to visualize how you want the template to look and tweak the numbers based on that instead of entering random numbers. Also remember that certain elements are nested within each other. Refer to the `template.html` file to see the structure of elements on the page.


###Sprint 3 Features

####Animation System

The animation system provides animation settings from the 'config.json' file and allows for components to play these
animations. There are three animation stages for each component. Intro - The animation played on entrance, Loop - The
 animation played the entire time the element is on the screen, and Outro - The animation played when the template is
  about to change.

  In each component in the 'config.json' file, you will see a section labeled 'animation'

````javascript
"animation": {
        "name": "Basic Fade In",
        "intro": {
          "animation": "fadeIn",
          "timingFunction": "ease-out",
          "duration": 4
        },
        "loop": {
            "animation": "jello",
            "timingFunction": "linear",
            "duration": 4
        },
        "outro": {
            "animation": "fadeOut",
            "timingFunction": "ease-in",
            "duration": 4
        }
      }
````

For each animation stage there is an animation name, timing function, and duration. The animation name is a CSS class
 that is either included in [animate.css](https://daneden.github.io/animate.css/) or made special by me. These
 animations may not appear correct while looping (since I didn't make them, and they weren't made for that) so if you
 want to you can make a note of it and I'll edit it, or I will fix them on a per-need basis. There are many.

 The timing functions are:
    -linear
    -ease-in
    -ease-out
    -ease
    -ease-in-out

 To test the system:

1. Open `config.json` in a text editor
2. Find the component you want to animate
3. Look at the [animate.css](https://daneden.github.io/animate.css/) site to determine an animation name.
4. Choose a timing function from the list above
5. Set a duration
6. Save and refresh (run grunt if you haven't already)
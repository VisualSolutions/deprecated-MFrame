#Framework Documentation

##What is MFrame?
MFrame is a AngularJS module framework for building MVision templates. It allows you to utilize reusable Angular
directives as template media components. Underneath the components are services which do things like load and parse
the config file, manage the playback of animations, and create aspect-ratio responsive templates that adapt to every
screen (more on this later).


Developers are not required to use MFrame in order to build their own Mvision HTML templates but it certainly makes the
process much faster and easier. We will go over the extra steps required to wire-up your own config loader later on.

##Dependencies
MFrame doesn't require that you install any extra dependencies. However, it comes pre-bundled with AngularJS and
[animate.css](https://daneden.github.io/animate.css/). If you are not familiar with either of these please spend some time reading through their documentation.
 As this framework is built as an AngularJS module, it is required that you have an understanding Angular (What
 directives are, How to make a module, How to use services).

 If you are completely new to AngularJS, don't worry. This framework has been designed to be easy for a developer to
 use. You don't need to be an AngularJS expert in order to use this and the steps will be laid out in detail in this
  guide. With just this guide and the seed-template you should be able to setup a simple template DOM to style with
  CSS in under an hour.

 If you are completely new to HTML and JS, this is not for you.

##Services
###Config Loader
This service handles the loading and parsing of the `mframe.json` file. This service is the simplest immediate
benefit of using the framework. The config file contains the user defined attributes for every media component.
Including content, JS functionality (image scaling, font scaling), and CSS styles. This will be outlined more when we
talk about wiring up your own config loader.

To use the service, just make sure that `mframe.json` is in the same directory as your `index.html`. We will
handle the rest when we setup our components.

###Grid System
The grid system is a way of sizing and positioning elements based on the aspect ratio of the screen. It works by
creating a 24x24 grid on the window and any element positioned within it. This is similar to [Twitter
Bootstrap](www.getbootstrap.com) except that it handles vertical as well as horizontal units (and it works based on
aspect ratio instead of
window width).


Use the gridConfig service within your controller (`/scripts/controllers/template.js`) to setup your grid
configurations. Here's an example:


    angular.module('myTemplate')
      .controller('TemplateCtrl', function(gridConfig) {
        gridConfig.setConfig(gridConfiguration);

        var gridConfiguration = [
          {
            pathName: 'mainImage',
            left: {
              ls: 1,
              pt: 1
            },
            top: {
              ls: 2,
              pt: 1
            },
            width: {
              ls: 7,
              pt: 22
            },
            height: {
              ls: 18,
              pt: 9
            }
          }
        ];
    });


##Components
Media components consist of HTML Element directives that handle MFrame services for you out of the box.



##W.I.P...
###Install NodeJS

 [NodeJS Website](https://nodejs.org/)

 If you are unfamiliar with NodeJS or NPM, please take a moment to check [this](https://docs.npmjs
 .com/getting-started/what-is-npm) out

###Install Grunt-cli and Bower

`npm install -g grunt-cli bower`

Take a look at the [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) websites for more information about
these amazing tools.

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
    linear,
    ease-in,
    ease-out,
    ease,
    ease-in-out,

 To test the system:

1. Open `config.json` in a text editor
2. Find the component you want to animate
3. Look at the [animate.css](https://daneden.github.io/animate.css/) site to determine an animation name.
4. Choose a timing function from the list above
5. Set a duration (0.1 - 10.0)
6. Save and refresh (run grunt if you haven't already)
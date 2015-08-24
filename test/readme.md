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
 As this framework is built as an AngularJS module, it is required that you have an understanding of Angular (What
 directives are, How to make a module, How to use services).

 If you are completely new to AngularJS, don't worry. This framework has been designed to be easy for a developer to
 use. You don't need to be an AngularJS expert in order to use this and the steps will be laid out in detail in this
  guide. With just this guide and the seed-template you should be able to setup a simple template DOM to style with
  CSS in under an hour.

 If you are completely new to HTML and JS, this is not for you.

##Quick Start

  To run the test application:

    :seed-template $   npm install -g grunt-cli bower
    :seed-template $   npm install
    :seed-template $   bower install
    :seed-template $   grunt test

  Available directives:

    <mv-text path="uniqueId"/>
    <mv-image path="uniqueId"/>

  Services to be called from main controller:

    playbackManager.init($scope, $element[0]); // Sets up component animations and cancels playback at appropriate time

    gridConfig.setConfig(configArrayOrObject); // Creates or adds grid configurations (read guide below for more info)



##Getting Started


###Config Loader
This service handles the loading and parsing of the `mframe.json` file. This file contains the user defined
attributes for every media component, including content, JS functionality (image scaling, font scaling), and CSS
styles. This will be outlined more when we talk about wiring up your own config loader.

To use the service, just make sure that `mframe.json` is in the same directory as your `index.html`. We will
handle the rest when we setup our components.

###Grid System
The grid system is a way of sizing and positioning HTML elements based on the aspect ratio of the screen. This
 way you can have the template behave differently if it is in portrait mode or landscape mode (or other more specific
  classes). It works by creating a 24x24 grid on the window and any element positioned within it. This is similar to
 [Twitter Bootstrap](www.getbootstrap.com) except that it handles vertical as well as horizontal units (and it works
 based on aspect ratio instead of window width).


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

The `pathName` is a unique ID that you can name whatever you want. We will use this later to link the config to the
component.

`left, top, width, height` are all related to the size or position of the component and are part of a 48x48 grid.
`ls`, and `pt` refer to *landscape* and *portrait*. The grid system detects the aspect ratio of the screen and
returns it's corresponding class. The classes from tallest to shortest are:

        spt    small portrait,
        mpt    medium portrait,
        lpt    large portrait,
        pt     portrait (fullscreen),
        tsq    tall square,
        sq     square,
        wsq    wide square,
        ls     landscape(fullscreen),
        lls    large landscape,
        mls    medium landscape,
        sls    small landscape

In the configuration shown above, the component, 'mainImage', will be 7 grid units wide when the template is in
landscape and 22 grid units wide when the template is in portrait mode. You can list any of the available classes in
your config. Feel free to play around with the values inside the test template and see what happens to the different
components when you refresh the page.

###Animations
Most complex animations should be written into your template with CSS. However, MFrame allows you to setup intro,
loop, and outro animations on a per-component basis. By setting an animation within MFrame's animation system, you
can allow users to select between different animation groups that you provide. You will be able to setup your
animations on a component basis from within the HTML Editor. See the HTML Editor documentation for more info on
setting these up.

###Components
Media components consist of Angular directives that handle MFrame services for you out of the box. All you need to do
 is insert them into your HTML with a path name:

    <mv-text path="myHeader"/>

The path name should be the same name that you enter into the HTML Editor when setting up this component. Each type
of component has different attributes that relate to it's media type. These attributes, as well as the different
types of components available, are listed in the [component reference]().



##W.I.P...

##Reference

###Component Attributes

####Text
	<mv-text path=”pathName”></mv-text>

Properties

* **Label**: <multi string input> The name of the component that appears in mvision’s properties panel. The text
component
 can have multiple labels (one per language).

* **Default Text**: <multi string input> The default text value or values for the component. Note: In the event there are multiple default text values, the text component becomes a drop down in MVision’s Properties panel and defaults to the first item in the list in the order they are listed in the HTML5 Template Editor. In the event default text is left blank, then there is not default text - user in MVision starts with a blank field.

* **Max Characters**: <positive, non null number input> Maximum amount of text characters allowed, including spaces, tabs,
 line returns etc. This number is used by the server to limit the number of characters a user can enter into the Text Field. This property is not used by the MV-Text component on the player side.

* **Text Format**: <string - selected by radio input> Determines whether a text field can be single line or multi-line.

* **Blacklist**: <multi string input> list of words to be filtered out of the text. For the MV-Text component, this list of strings is checked on the server side only to prevent users from entering blocked words. In the event a user types a blocked word, the MVision App will alert the user and fail to save the text value. This does not have any effect on the MV-Text Component on the player side.

* **Master Blacklist**: <checkbox toggle> determines whether the Mvision Framework’s predefined list of words will be used
 within the blacklist. As with the manual Blacklist described above, this has an effect on the server side only for the MV-Text Component (validation happens as the user enters text).

* **Opacity**: <number between 0 and 100 - slider input> The transparency of the component: 0 indicates the component is
not visible. 100 means the MV-Text component is solid.

* **Font Family**: <string input> The font to be used for the text. If the specified font is not available on the target
media player, the player will fall back to Open Sans.

* **Text Color**: <string hexadecimal input> The color to be used for the text

* **Text Alignment**: <string - radio input> The horizontal alignment of text within the component element. Possible
values are Left (default), Right, Center and Justify.

* **Vertical Alignment**: <string - radio input> The vertical alignment of text within a component element. Possible
values are Top (default), Middle, Bottom.

* **Bold**: <string - toggle button input> The font weight of the text

* **Italic**: <string - toggle button input> The angle of the text

* **Underline**: <string - toggle button input> A line that resides underneath the text

* **Strikethrough**: <string - toggle button input> A line that goes through the text

* **Background Color**: <string - hex color code> The color of the background of the component

* **Font Case**: <string - radio input> This will be a dropdown with 4 items: normal, all caps, small caps, lower caps - if "normal" is selected, the text will appear as it is typed. If "all caps" is selected, the text is showed in upper case, regardless of how it is entered by the user.










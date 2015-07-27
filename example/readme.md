#Framework QA Getting Started

##Installing dependencies

In order to test the framework application it is required that you install NodeJS. This can be hard to do on Windows since it does not have a built in UNIX command line and handles permissions differently than Mac OS X or Linux. For this reason I highly recommend that you avoid testing the framework on Windows. That being said, if it works better organizationally to have it run on Windows, it isn't impossible. I will provide steps for both installs. I can also provide further assistance if anyone needs it. The server team also has experience installing NodeJS on Windows and may be of help if you need it.

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
  5. Type `echo $PATH` and make sure your changes show up. Also enter `node` and `npm` to ensure they are working.

####Install NodeJS on Windows 7

  1. https://msysgit.github.io/ - Install Git for Windows
  2. https://github.com/coreybutler/nvm-windows/releases  - Find the latest release (1.0.6 as of writing this) and click the `nvm-setup.zip` file to download it. Unzip the `.exe`, run and install it.
  3. Open `Git Bash` and enter `nvm` to see that it's working. If not then contact me.
  4. Enter `nvm install latest`, then `nvm use latest`
  5. Enter `npm` and `node` to ensure that they are working.

###Install Grunt-cli

In Terminal or Git Bash enter `npm install -g grunt-cli`

###Setup Test application

  1.

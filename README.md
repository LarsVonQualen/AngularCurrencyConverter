# AngularCurrencyConverter

This repo holds a demo app i created for an internal Angular course at IT Minds. The corresponding slides can be found at: http://larsvonqualen.github.io/AngularCurrencyConverter/

## Windows

- Install Node from https://nodejs.org
- Install Ruby from http://rubyinstaller.org
- Install Yo, CLI tool for running Yeoman generators
  - `npm install -g yo generator-karma generator-angular`
- Install Grunt CLI, task runner used by Yo
  - `npm install -g grunt grunt-cli`
- Install Compass SASS, used by the default Yo Angular generator
  - `gem install compass`
- Install Bower, also a package manager...
  - `npm install -g bower`
- In the folder where you checked out the repo run:
  - `npm install`
  - `bower install`

You should now be able to spin up the project:
  - `grunt serve`

If you want to run your test suite:
  - `grunt test`

## OS X

If you are running with vanilla Node.js and NOT using Node Version Manager, you will have prefix most of the commands with `sudo`, specifically every `npm install -g <package>` and `gem install <package>` command.

- Install Node from https://nodejs.org
  - Alternatively install the Node Version Manager from: https://github.com/creationix/nvm
- OS X ships with a version of Ruby, but it is recommended to use Ruby Version Manager: https://rvm.io
- Install Yo, CLI tool for running Yeoman generators
  - `npm install -g yo generator-karma generator-angular`
- Install Grunt CLI, task runner used by Yo
  - `npm install -g grunt grunt-cli`
- Install Compass SASS, used by the default Yo Angular generator
  - `gem install compass`
- Install Bower, also a package manager...
  - `npm install -g bower`
- In the folder where you checked out the repo run:
  - `npm install`
  - `bower install`

You should now be able to spin up the project:
  - `grunt serve`

If you want to run your test suite:
  - `grunt test`



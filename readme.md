<img width="80px" src="https://raw.githubusercontent.com/gavlak/keg/master/app/assets/images/logo.png">

# Keg

Static website toolkit. Just download, install and you're ready to build static website with all you need. Templating (Pug), Stylus and image optimization right out of the box.

## Getting started

The only requirements are Node.js and NPM (though I prefer Yarn).

### Installation

```
$ git clone https://github.com/gavlak/keg.git project_name
$ cd project_name
    
# if you're using npm
$ npm install

# or if you're using yarn
$ yarn
```

## How to use Keg

### Directory structure

```
.
├── app
│   ├── assets
│   ├── markup
│   ├── scripts
│   └── styles
├── gulpfile.js
├── package.json
└── public
    └── assets
```

I tried to make Keg directory structure pretty simple, neat and tidy. In the root of projects the only files are `gulpfile.js` and `package.json` where all the gulp task and dependencies are defined.

Then there is directory `app`, that houses everything about the website and `public` where all the final, compiled files will be placed.

### Gulp tasks

Keg utilizes Gulp and after you sucessfuly installed Node dependencies you can start. There are few commands you should know before:

```
gulp server  # starts server at localhost:3000 and watches for file changes
gulp build   # compiles and copies all the files from app to public
```

These are the most important. There is task for each process (styles, scripts, markup) and you can of course see how they work in `gulpfile.js`.

![Keg server](https://raw.githubusercontent.com/gavlak/keg/master/keg.png)

This is what you should see in your browser after you start `gulp server`.

Notice: all the files in `app` directory will be ignored while compiling if they have `_` (underscore) at the start of the filename.


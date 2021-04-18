# About BootStack

This project is a reboot of my old [RalphvK/bootsass](https://github.com/RalphvK/bootsass). The primary purpose of BootStack is to build a good project structure around the Bootstrap 5 SCSS, to be used as a starting point when building a simple static website with styling, markup and javascript. Additionally, I would like to add a PHP component to this "scaffolding" as well, probably using the Klein.php router, in order to allow for the development of simple applications using BootStack. Ultimately, the aim of this project is therefore to build a complete stack centered around Bootstrap 5.

# Installation instructions

Clone this repository:

```
git clone https://github.com/RalphvK/bootstack.git your-project
```

Remove remote "origin". Alternatively, you can remove the git folder completely and reinitialise git.

```git remote rm origin```


Run NPM install:

```npm install```

Note: if you encounter any errors concerning Python, you may try following the steps in [this](https://gist.github.com/jtrefry/fd0ea70a89e2c3b7779c) gist.

Optionally, if Gulp-CLI is not yet installed on the system, run:

```npm install gulp-cli -g```

Run gulp to watch for changes by running the ```gulp``` script in the project root:

```npm run gulp```

You are ready to go to work!

# General Structure

The project has the following root folders:

|Directory|Description|
|---|---|
|```docs```|Contains all documentation, examples and reference materials.|
|```js```|Javascript source files, concatenated scripts from this directory are output to ```public```.|
|```public```|This is where the actual site lives. Concatenated scripts and compiled CSS will be stored in this folder, along with static html files and ```index.php``` file. This is the folder that should be deployed to the web server.|
|```scss```|SCSS source files, compiled stylesheets from this directory are output to ```public```.|
|*Future:* ```app```|This is where the future PHP component of BootStack will live.|

# Javascript files

The combined javascript file ```js/scripts.min.js``` is compiled from the index in the ```js/index.json``` file. By default it looks like this:

```json
{
    "includes": {
        "scripts": [
            "./js/partials/common/**/*.js"
        ],
        "single": [
            "./js/partials/single/**/*.js"
        ]
    }
}
```

This setup will generate two different concatenated scripts in the output folder: ```scripts.js``` and ```single.js``` - each with a minified version as well. To add a new script output, simply add a new key (the key will be the output filename) to the ```"includes": {}``` object with an array of the included glob patterns.

You can manually run the Javascript build using the following Gulp task:

```gulp concat_js```

Watch for changes using the following Gulp task:

```gulp watch```

Running ```gulp``` will run the ```watch``` task by default.

Include the javascript file with the script tag:

```html
<!-- concatenated javascript -->
<script src="js/scripts.min.js"></script>
```

# SCSS files

Each top-level ```.scss``` file in the ```/scss``` folder will generate its own set of output files in the ```public``` directory. By default, the only such file is ```style.scss```. You can add additional files to generate additional stylesheets, for example to include a separate theme, to include a subset of styles to be used on specific pages or a small additonal stylesheet that is only used on one part of the website.

The SCSS structure is loaded in sequence as follows:

1. **config** - This is where all of Bootstrap's required and optional components are included and variables are set. - *The first SCSS to be loaded is Bootstrap's base styles along with the general configuration of the project.*

2. **utilities** - Utilities are simple styles that fulfil a single purpose. - *After Bootstrap and configuration have been loaded, utilities will be included. For example, we might include a class that simply sets ```overflow: hidden;```.*

3. **components** - Components are SCSS files that can be easily reused among multiple BootStack projects. - *Components should be easily reusable to allow for increasingly fast development as the library of already developed components grows. This way, I hope to avoid having to reinvent the wheel for each project.*

4. **partials** - Partials are the non-reusable styles for a project. - *These are all styles that cannot be easily reused and are specific to this project.*

# Snippets

Included in the project are a few snippets for VS Code. My aim is to expand this collection further in the future.

### CSS/SCSS

```cfg``` - The $cgf map short-cut snippet is included for quickly referencing the $cfg file-specific config map in scss. The $cfg map is my own personal convention, and not a globally accepted practice. It outputs the following line:

```scss
map-get($cfg, 'your-property')
```

```map-get``` - Alternative for the default map-get snippet. The default snippet uses named arguments, whereas this alternative uses anonymous arguments. Most of the time, named arguments are preferred, but in the case of map-get it is often desirable to reduce visual clutter, while map-get only has two arguments of which it is immediately clear what their respective purpose is.

```scss
map-get($yourmap, 'your-property')
```

```top:left:bottom:left:``` - Since there is no short-hand for absolute positioning, this snippet is included to easily add all sides. It outputs:

```scss
top: 0;
right: 0;
bottom: 0;
left: 0;
```
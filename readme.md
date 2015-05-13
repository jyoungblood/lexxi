## LEXXI 0.3.1

(っ◕‿◕)っ♥

LEXXI is an abstraction layer *(toolkit? framework? boilerplate?)* for quickly developing internet projects with a relatively standard express stack. It ties together the technologies you would likely choose for a web application and then gets out of your way so you can make things happen.

Included by default:
- [gulp](http://gulpjs.com/)
- [express](http://expressjs.com/) (w/ [handlebars](http://handlebarsjs.com/))
- [mongoose](http://mongoosejs.com/)
- [q](https://github.com/kriskowal/q)
- [lodash](https://lodash.com/)
- [bower](https://bower.com/)

LEXXI also introduces boilerplate, lightweight*(-ish)* build scripts, and a flexible application structure that can be organized in a variety of ways.

Read the full documentation here: [http://hxgf.github.io/lexxi/](http://hxgf.github.io/lexxi/)


## Quick Start Guide

Make a directory for your new project and enter it:
```bash
mkdir cool-new-project && cd $_
```

Install LEXXI:
```bash
npm install lexxi
```

Initialize your application by copying the boilerplate:
```bash
cp -R node_modules/lexxi/boilerplate/. . && mv .npmignore .gitignore
```

Install all the modules:
```bash
npm install
```

Install the client dependencies if you want *(optional, but helpful in many cases)*:
```bash
bower install
```

This series of incantations will produce a reasonably-assembled express app that uses gulp to handle various tedious parts of the development process. [Take a look at the tree structure](https://github.com/hxgf/lexxi/tree/master/boilerplate) and it will seem pretty obvious where [all your application code lives](https://github.com/hxgf/lexxi/tree/master/boilerplate/app).


At this point, everything should be good to go...let's fire it up:
```bash
gulp dev
```

You can now point your favorite internet browser to http://localhost:3001, where, if all went well, you'll see our friend (っ◕‿◕)っ reaching out for love in a world of darkness ♥
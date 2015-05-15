## 0.3.2
- fix gulpfile to build on file change again (wtf nodemon)

## 0.3.1
- include __base variable (equivalent of __dirname)
- remove $.lexxi.global_construct()
- nl2br handlebars function that works
- use strict
- suppress npm package.json warnings ("no description", "no readme", "no repository field")

## 0.3.0
- update dependency modules with most recent stable versions
- add npm-shrinkwrap
- add actual license file
- don't include bourbon and neat by default
- add mandrill default api key config option	
- scripts-server includes global_construct() option (required for upcoming patterns)
- update readme quick start incantation to copy all the boilerplate files (include .bowerrc and .gitignore)

## 0.2.2
- add missing slashes (i am so sorry)

## 0.2.1
- robust relative path resolution
- require lexxi lib in package.json

## 0.2.0
- build css w/ bourbon/neat
- handle data w/ mongoose if db config param set
- require mongoose
- introduce lexxi utilities / handlebars helpers
- use custom hb helpers w/ lexxi hb helpers
- config localhost port
- config boilerplate (site title, site code, etc)
- bower.json needs a "title" value

## 0.1.0
- boilerplate reset
- start using semvers
- start changelog

## LEXXI 1.0.0

(っ◕‿◕)っ♥

LEXXI is an abstraction layer *(toolkit? meta-framework?)* for quickly developing internet projects with a relatively straightforward express stack. It ties together some technologies you might choose for building a web application and then gets out of your way so you can make the magic happen.

Included by default:
- [express](http://expressjs.com/) (configured with [handlebars](http://handlebarsjs.com/) and significant amount of sensible defaults)
- [mongoose](http://mongoosejs.com/)
- [q](https://github.com/kriskowal/q)
- [lodash](https://lodash.com/)
- [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs)
- [request](https://github.com/request/request)
- [moment](http://momentjs.com/)
- [math](http://mathjs.org/)
- [mime](https://github.com/broofa/node-mime)
- [gm](http://aheckmann.github.io/gm/)
- [voca](https://vocajs.com/)
- [knox](https://github.com/Automattic/knox)
- [nodemailer](https://nodemailer.com/)
- [tachyons](http://tachyons.io/)


LEXXI also introduces boilerplate, lightweight build scripts, error handling, application logging, lightweight authentication middleware, and a flexible application structure that can be organized in a variety of ways.

Read the full documentation here: [http://lexxi.hexgirlfriend.com](http://lexxi.hexgirlfriend.com)


## Install with [Yeoman](http://yeoman.io/) *(recommended)*

1\. Install the Yeoman CLI *(if you haven't already)*
```bash
npm install -g yo
```

2\. Install the LEXXI project generator
```bash
npm install -g generator-lexxi
```

3\. Run the generator in your *(empty)* new project directory
```bash
yo lexxi
```

4\. Start it up
```bash
npm run dev
```

You can now point your favorite internet browser to http://localhost:3001, where, if all went well, you'll see our friend (っ◕‿◕)っ reaching out for love in a world of darkness ♥

You are now free to develop your application as you see fit. Again, refer to the [LEXXI documentation](http://lexxi.hexgirlfriend.com) for more information about developing with this set of tools.

--------------------------------------------------

## Manual Installation

1\. Clone this repo into your (blank) project directory
```bash
git clone https://github.com/hxgf/lexxi.git .
```

2\. Disconnect your project from this repo
```bash
rm -Rf .git
```

3\. Install all the dependencies
```bash
npm install
```

4\. Start it up
```bash
npm run dev
```

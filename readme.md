## Description

A simple wiki to markdown tool.

## Installation

```bash
npm -g install wiki2md
```

## Support wiki Syntax 

* ====, heading
* [[url|des]], url 
* &lt;code&gt;
* * list 
* ^ table 

## Test

```bash
npm -g install mocha
mocha
```

## Usage

### CLI

```bash
wiki2md test.wiki > test.md

cat test.wiki | wiki2md
```

### Program

The module exports the wiki2md function, so you can use it with : 

```javascript
var wiki2md = require('wiki2md');
```

The function wiki2md takes one arguments :

* input : the wiki content you want to translate.

## License

MIT

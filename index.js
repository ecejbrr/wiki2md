var headingReg = /^(={1,6})([^=\n]+)\1/;
var headingTpl = '##############';
var codeReg = /^<code(?:\s+([^>]+))?>([\s\S]*?)<\/code>/;
var urlReg = /\[\[([^|]+)\|([^\]]+)?\]\]/;
var lineBreakReg = /\\\\\n/;
var listReg = /^(\s{2,})(\*|-) ([^\n]*)/;
var inlineCommentReg = /''([^']+)''/;


function wiki2md(wiki) {
    var start = 0;
    var rst = '';

    var process = function(source) {
        var curPos = 0
        var getChar = function() {
            return source.slice(curPos, 1)
        }

        //heading
        var tmp
        if (getChar() == '=') {
            tmp = source.match(headingReg)
            if (tmp) {
                rst += headingTpl.slice(0, (7 - tmp[1].length)) + tmp[2]
                curPos += tmp[0].length
            } else {
                rst += '='
                curPos++
            }
        }

        if (getChar() == '\n') {
            rst += '\n'
            curPos += 1
        }

        //code
        if (getChar() == '<') {
            tmp = source.match(codeReg)
            if (tmp) {
                rst += '\n'
                rst += '```' + (tmp[1] === undefined ? '' : tmp[1])
                rst += tmp[2]
                rst += '```'
                curPos += tmp[0].length
            } else {
                rst += '<'
                curPos++
            }
        }

        //list
        if (getChar() == ' ') {
            tmp = source.match(listReg)
            if (tmp) {
                rst += tmp[1].replace(/^\s\s/,'')
                rst += tmp[2] == '*' ? '*' : '1.'
                rst += ' '
                rst += tmp[3]
                curPos += tmp[0].length
            } else {
                rst += ' '
                curPos++
            }
        }

        //inlineComment
        if (getChar() == '\'') {
            tmp = source.match(inlineCommentReg)
            if (tmp) {
                rst += '`' + tmp[1] + '`'
                curPos += tmp[0].length
            } else {
                rst += '\''
                curPos++
            }
        }

        //url
        if (getChar() == '[') {
            tmp = source.match(urlReg)
            if (tmp) {
                rst += '[' + tmp[2] + ']' + '(' + tmp[1] + ')'
                curPos += tmp[0].length
            } else {
                rst += '['
                curPos++
            }
        }

        if (getChar() == '\\') {
            tmp = source.match(lineBreakReg)
            if (tmp) {
                rst += '\n\n'
                curPos += tmp[0].length
            } else {
                rst += '\\'
                curPos++
            }
        }

        //normal text
        if (getChar() !== '') {
            rst += getChar()
            curPos++
        }

        start += curPos

        if (start < wiki.length) {
            process(wiki.slice(start, wiki.length))
        }
    }

    process(wiki.slice(start, wiki.length))

    return rst
}

exports = module.exports = wiki2md;

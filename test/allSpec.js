var wiki2md = require('../')
var assert = require('assert')
var input
var output

describe('wiki2md', function() {

    it('header is ok', function() {
        input = '====== hello ======'
        output = '# hello '
        assert.equal(wiki2md(input), output);

        input = '===== hello ====='
        output = '## hello '
        assert.equal(wiki2md(input), output);


        input = '==== hello ===='
        output = '### hello '
        assert.equal(wiki2md(input), output);

        input = '=== hello ==='
        output = '#### hello '
        assert.equal(wiki2md(input), output);

        input = '== hello =='
        output = '##### hello '
        assert.equal(wiki2md(input), output);

        input = '= hello ='
        output = '###### hello '
        assert.equal(wiki2md(input), output);

        input = '= hello =\n==hello=='
        output = '###### hello \n#####hello'
        assert.equal(wiki2md(input), output);
    });

    it('url is ok', function() {
        input = '[[http://spm.alibaba-inc.com/spm/spmRules.htm|SPM编码规范]]'
        output = '[SPM编码规范](http://spm.alibaba-inc.com/spm/spmRules.htm)'
        assert.equal(wiki2md(input), output);
    })

    it('linebreak is ok', function() {
        input = 'hello \\\\\n'
        output = 'hello \n\n'
        assert.equal(wiki2md(input), output);
    })

    it('code parse is ok', function() {
        input = '<code>\n\
        110.75.14.33 a.tbcdn.cn\n\
        </code>'
        output = '\n```\n\
        110.75.14.33 a.tbcdn.cn\n\
        ```'
        assert.equal(wiki2md(input), output);

        input = '<code javascript>\n\
        alert(1)\n\
        </code>'
        output = '\n```javascript\n\
        alert(1)\n\
        ```'
        assert.equal(wiki2md(input), output);

        input = '<code>\n\
        110.75.14.33 a.tbcdn.cn\n\
        </code>\n\
        <code>\n\
        hello world\n\
        </code>'

        output = '\n```\n\
        110.75.14.33 a.tbcdn.cn\n\
        ```\n\
        \n```\n\
        hello world\n\
        ```'
        assert.equal(wiki2md(input), output);
    })

    it('inline comment is ok', function() {
        input = '将以下代码放置到页面\'\'<body>\'\'标签后。'
        output = '将以下代码放置到页面`<body>`标签后。'

        assert.equal(wiki2md(input), output);
    })

    it('list is ok', function() {
        input = '\
          * hello\n\
          * world\n\
           * good\n\
          * boy '
        output = '\
        * hello\n\
        * world\n\
         * good\n\
        * boy '

        assert.equal(wiki2md(input), output);

        input = '\
          - hello\n\
          - world\n\
            - good\n\
          - boy '
        output = '\
        1. hello\n\
        1. world\n\
          1. good\n\
        1. boy '

        assert.equal(wiki2md(input), output);
    })

    it('real example is ok', function() {
        input =
            '将以下代码放置到页面\'\'<body>\'\'标签后。注：仅供测试时使用，正式上线的文件，不需要加入以下代码，发布系统会统一加入\n' +
            '<code javascript>\n' +
            '<script type="text/javascript">\n' +
            '(function (d) {\n' +
            'var t=d.createElement("script");t.type="text/javascript";t.async=true;t.id="tb-beacon-aplus";\n' +
            't.setAttribute("exparams","category=&userid=&aplus");\n' +
            't.src=("https:"==d.location.protocol?"https://s":"http://a")+".tbcdn.cn/s/aplus_v2.js";\n' +
            'd.getElementsByTagName("head")[0].appendChild(t);\n' +
            '})(document);\n' +
            '<\/script>\n' +
            '<\/code>\n' +
            'spmact开关，默认关闭，不处理广告点击，在\'\'<head>\'\'标签后加入以下代码表示开启spm：\n' +
            '<code>\n' +
            '<script>\n' +
            'window._alimm_spmact_on_ = 1;\n' +
            '<\/script>\n' +
            '<\/code>\n'

        output =
            '将以下代码放置到页面`<body>`标签后。注：仅供测试时使用，正式上线的文件，不需要加入以下代码，发布系统会统一加入\n' +
            '\n```javascript\n' +
            '<script type="text/javascript">\n' +
            '(function (d) {\n' +
            'var t=d.createElement("script");t.type="text/javascript";t.async=true;t.id="tb-beacon-aplus";\n' +
            't.setAttribute("exparams","category=&userid=&aplus");\n' +
            't.src=("https:"==d.location.protocol?"https://s":"http://a")+".tbcdn.cn/s/aplus_v2.js";\n' +
            'd.getElementsByTagName("head")[0].appendChild(t);\n' +
            '})(document);\n' +
            '<\/script>\n' +
            '```\n' +
            'spmact开关，默认关闭，不处理广告点击，在`<head>`标签后加入以下代码表示开启spm：\n' +
            '\n```\n' +
            '<script>\n' +
            'window._alimm_spmact_on_ = 1;\n' +
            '<\/script>\n' +
            '```\n'

        assert.equal(wiki2md(input), output);
    })
})

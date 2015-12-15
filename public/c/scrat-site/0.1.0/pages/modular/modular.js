define("scrat-site/0.1.0/pages/modular/modular.js",function(s,n){"use strict";n.getMarkdown=function(){return'<h2 id=user-content-%E6%A6%82%E5%BF%B5>概念</h2> <blockquote> <p>工程师希望能像 <code>搭积木</code> 一样开发和维护系统，通过组装模块得到一个完整的系统。</p> </blockquote> <p>在模块化系统的结构中，模块是可组合、可分解和更换的单元，这就要求模块本身具有一定的 <code>独立性</code>，完整的前端模块化方案需要将js、css和模板维护在一起，保证模块的独立。</p> <p><img src=/public/c/scrat-site/0.1.0/pages/modular/page_1356fae.png alt=将页面以模块为单位组织起来></p> <h2 id=user-content-%E8%A7%84%E8%8C%83>规范</h2> <p>在scrat中静态资源分成 <code>模块化资源</code> 和 <code>非模块化资源</code> 两类，其中模块化资源还分为 <code>工程模块</code> 和 <code>生态模块</code> 两类。</p> <p><img src=/public/c/scrat-site/0.1.0/pages/modular/spec_62a1741.png alt=静态资源分类></p> <ul> <li><code>模块化资源</code>：具有独立性的模块所对应的静态资源。每个独立的模块将自己所需要的js、css、模板、图片等资源放在一起维护，使得模块具备独立性，引用模块的js即可。<ul> <li><code>工程模块</code>：当前工程所开发的模块。这些模块通常跟业务耦合较高。</li> <li><code>生态模块</code>：从 <a href=/#!/components>模块生态</a> 下载的模块，属于外部依赖。</li> </ul> </li> <li><code>非模块化资源</code>：虽然在模块化开发体系内，应该 <code>一切皆模块</code>，但总有不应该成为模块的资源，比如入口页面、<a href=/#!/framework>模块化框架</a>、页面启动器等。</li> </ul> <p>其目录规范为：</p> <pre><code class="hljs bash">project\n  ├─ component_modules (生态模块)\n  ├─ components        (工程模块)\n  ├─ views             (非模块化资源)\n  ├─ ...\n</code></pre> <blockquote> <p>如果把所有资源都扔到 <code>views</code> 目录下，scrat也可以退化为传统的无模块前端项目，模块化与非模块化资源之间的平衡可以由开发者自己把握。</p> </blockquote> <h2 id=user-content-%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E6%A8%A1%E5%9D%97>开发工程模块</h2> <p>在模块化系统中，开发模块将变得非常简单，比如我们要开发一个 <code>foo</code> 模块，有模板、样式、交互功能。首先，在 <code>工程模块</code> 目录下创建一个foo目录，并在其中添加js、css、模板、图片等资源：</p> <pre><code class="hljs bash">project\n  ├─ component_modules (生态模块目录)\n  ├─ components        (工程模块目录)\n  │  └─ foo\n  │     ├─ icon.png\n  │     ├─ foo.css\n  │     ├─ foo.tpl\n  │     └─ foo.js\n  ├─ views             (非模块化资源)\n  ├─ ...\n</code></pre> <h3 id=user-content-foo.js>foo.js</h3> <blockquote> <p>像写nodejs一样写js模块</p> </blockquote> <pre><code class="hljs javascript"><span class=hljs-comment>// 使用__inline函数嵌入其他资源，如果</span>\n<span class=hljs-comment>// 是图片，构建后会替换为base64字符串</span>\n<span class=hljs-keyword>var</span> tpl = __inline(<span class=hljs-string>\'foo.tpl\'</span>);\n<span class=hljs-comment>// 使用__uri函数定位资源，构建后会替换</span>\n<span class=hljs-comment>// 为部署后的绝对路径</span>\n<span class=hljs-keyword>var</span> icon = __uri(<span class=hljs-string>\'icon.png\'</span>);\n\n<span class=hljs-comment>//像nodejs那样导出API</span>\nexports.render = <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>dom</span>)</span>{\n    dom.innerHTML = tpl;\n};\nexports.icon = <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>img</span>)</span>{\n    img.src = icon;\n};\n</code></pre> <h3 id=user-content-foo.tpl>foo.tpl</h3> <blockquote> <p>模板会被嵌入到js中使用</p> </blockquote> <pre><code class="hljs html"><span class=hljs-tag>&lt;<span class=hljs-title>div</span> <span class=hljs-attribute>class</span>=<span class=hljs-value>"foo"</span>&gt;</span>\n  <span class=hljs-tag>&lt;<span class=hljs-title>h1</span> <span class=hljs-attribute>class</span>=<span class=hljs-value>"foo-title"</span>&gt;</span>hello<span class=hljs-tag>&lt;/<span class=hljs-title>h1</span>&gt;</span>\n  <span class=hljs-tag>&lt;<span class=hljs-title>p</span> <span class=hljs-attribute>class</span>=<span class=hljs-value>"foo-content"</span>&gt;</span>\n    <span class=hljs-comment>&lt;!--\n      使用相对路径定位资源，构建后\n      会被替换为部署后的绝对路径\n    --&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-title>img</span> <span class=hljs-attribute>src</span>=<span class=hljs-value>"icon.png"</span>&gt;</span>\n    blablabla\n  <span class=hljs-tag>&lt;/<span class=hljs-title>p</span>&gt;</span>\n<span class=hljs-tag>&lt;/<span class=hljs-title>div</span>&gt;</span>\n</code></pre> <h3 id=user-content-foo.css>foo.css</h3> <blockquote> <p>css也能模块化</p> </blockquote> <pre><code class="hljs css"><span class=hljs-class>.foo</span> <span class=hljs-rules>{\n  <span class=hljs-rule><span class=hljs-attribute>font-size</span>:<span class=hljs-value> <span class=hljs-number>12px</span></span></span>;\n}</span>\n<span class=hljs-class>.foo-title</span> <span class=hljs-rules>{\n  <span class=hljs-comment>/* 使用相对路径引用资源 */</span>\n  <span class=hljs-rule><span class=hljs-attribute>background</span>:<span class=hljs-value> <span class=hljs-function>url</span>(icon.png) no-repeat</span></span>;\n  <span class=hljs-rule><span class=hljs-attribute>padding-left</span>:<span class=hljs-value> <span class=hljs-number>30px</span></span></span>;\n  <span class=hljs-rule><span class=hljs-attribute>font-size</span>:<span class=hljs-value> <span class=hljs-number>15px</span></span></span>;\n}</span>\n<span class=hljs-class>.foo-content</span> <span class=hljs-rules>{\n  <span class=hljs-rule><span class=hljs-attribute>padding</span>:<span class=hljs-value> <span class=hljs-number>10px</span></span></span>;\n}</span>\n</code></pre> <blockquote> <p>将源码中的相对路径构建后替换为部署后的绝对路径，是模块独立性的基本保证。只有将模块所需的样式、结构、逻辑都维护在一起，并且部署后还能定位到，才能保证模块独立可用。</p> </blockquote> <p>关于工程模块的一些约定：</p> <ol> <li>与目录同名的js为模块主文件。即foo.js是foo模块的主文件。</li> <li>与js同名的css文件会自动建立依赖关系。比如foo.js自动依赖foo.css。</li> <li>任何文件命名没有约束，主文件的与目录同名要求只是为了引用方便而已。</li> <li>在代码中使用工程相对路径开发，scrat构建会后自动替换成绝对路径。</li> </ol> <h2 id=user-content-%E5%AE%89%E8%A3%85%E7%94%9F%E6%80%81%E6%A8%A1%E5%9D%97>安装生态模块</h2> <p>使用生态模块可以提高开发效率，scrat采用 <a href=https://github.com/component>component</a> 规范作为生态规范，因此用户可以从component生态中直接下载组件供项目使用。</p> <p>从生态安装模块之前，需要先在工程中创建一个 <code>component.json</code> 文件，内容为空的json内容 <code>{}</code> 即可：</p> <pre><code class="hljs bash">project\n  ├─ component_modules (生态模块目录)\n  ├─ components\n  ├─ views\n  ├─ component.json    (生态依赖描述)\n  ├─ ...\n</code></pre> <p>component有很丰富的组件生态，比如 <a href=https://github.com/FortAwesome/Font-Awesome>FortAwesome/Font-Awesome</a> 字体图标库，可以使用scrat直接从GitHub下载放到项目中使用。</p> <p>在项目目录下执行：</p> <pre><code class="hljs bash">scrat install FortAwesome/Font-Awesome\n</code></pre> <p><img src=/public/c/scrat-site/0.1.0/pages/modular/install_69b6e49.gif alt="使用scrat install来安装font-awesome"></p> <p>安装完成后，<code>component_modules</code>目录下下会出现font-awesome模块的安装文件：</p> <pre><code class="hljs bash">project\n  ├─ component_modules (生态模块目录)\n  │  └─ FortAwesome-Font-Awesome\n  │      └─ <span class=hljs-number>4.1</span>.<span class=hljs-number>0</span>\n  │         ├─ component.json\n  │         ├─ css\n  │         │  └─ font-awesome.css\n  │         └─ fonts\n  │            ├─ FontAwesome.otf\n  │            ├─ fontawesome-webfont.eot\n  │            ├─ fontawesome-webfont.svg\n  │            ├─ fontawesome-webfont.ttf\n  │            └─ fontawesome-webfont.woff\n  ├─ components\n  ├─ views\n  ├─ component.json    (生态依赖描述)\n  ├─ ...\n</code></pre> <p><code>component.json</code>文件也记录了安装的模块名及其版本：</p> <pre><code class="hljs json">{\n  "<span class=hljs-attribute>dependencies</span>": <span class=hljs-value>{\n    "<span class=hljs-attribute>FortAwesome/Font-Awesome</span>": <span class=hljs-value><span class=hljs-string>"4.1.0"</span>\n  </span>}\n</span>}\n</code></pre> <p>这样，一个来自生态的模块就可以在项目中直接使用了。</p> <blockquote> <p>有关模块生态的更多内容请阅读 <a href=/#!/components>这里</a>。</p> </blockquote> <h2 id=user-content-%E5%BC%95%E7%94%A8%E6%A8%A1%E5%9D%97>引用模块</h2> <p>开发或安装好一个模块之后，需要做的仅仅就是使用它们。由于资源分为模块化和非模块化两类，因此在不同的资源下引用模块是有所不同的。</p> <h3 id=user-content-%E5%9C%A8%E6%A8%A1%E5%9D%97%E5%8C%96js%E4%B8%AD%E5%BC%95%E7%94%A8%E6%A8%A1%E5%9D%97>在模块化js中引用模块</h3> <blockquote> <p>如nodejs般使用require函数就可以了</p> </blockquote> <pre><code class="hljs javascript"><span class=hljs-comment>// 引用其他模块</span>\n<span class=hljs-keyword>var</span> foo = <span class=hljs-built_in>require</span>(<span class=hljs-string>\'foo\'</span>);\n<span class=hljs-comment>// 引用当前目录下的文件</span>\n<span class=hljs-keyword>var</span> conf = <span class=hljs-built_in>require</span>(<span class=hljs-string>\'./conf.js\'</span>);\n<span class=hljs-comment>// 调用模块接口</span>\nfoo.render(<span class=hljs-built_in>document</span>.body);\n</code></pre> <h3 id=user-content-%E5%9C%A8%E6%A8%A1%E5%9D%97%E5%8C%96css%E4%B8%AD%E5%BC%95%E7%94%A8%E6%A8%A1%E5%9D%97>在模块化css中引用模块</h3> <blockquote> <p>使用注释中的@require xxx来标记依赖</p> </blockquote> <pre><code class="hljs css"><span class=hljs-comment>/**\n * 引用模块\n * @require font-awesome\n *\n * 引用文件\n * @require ./bar.css\n */</span>\n\n<span class=hljs-class>.foo</span> <span class=hljs-class>.fa</span> <span class=hljs-rules>{\n    <span class=hljs-rule><span class=hljs-attribute>font-size</span>:<span class=hljs-value> <span class=hljs-number>20px</span></span></span>;\n}</span>\n</code></pre> <h3 id=user-content-%E5%9C%A8%E9%9D%9E%E6%A8%A1%E5%9D%97%E5%8C%96%E6%96%87%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%A8%A1%E5%9D%97>在非模块化文件中使用模块</h3> <p>非模块化文件通过 <a href=/#!/framework>模块化框架</a> 来异步加载需要的模块，比如项目的主页面：</p> <pre><code class="hljs html">...\n<span class=hljs-tag>&lt;<span class=hljs-title>script</span> <span class=hljs-attribute>src</span>=<span class=hljs-value>"path/to/scrat.js"</span>&gt;</span><span class=undefined></span><span class=hljs-tag>&lt;/<span class=hljs-title>script</span>&gt;</span>\n<span class=hljs-tag>&lt;<span class=hljs-title>script</span>&gt;</span><span class=javascript>\n  <span class=hljs-comment>// 构建后会将__FRAMEWORK_CONFIG__变量</span>\n  <span class=hljs-comment>// 替换成框架配置，比如依赖关系、模块别名等</span>\n  <span class=hljs-built_in>require</span>.config(__FRAMEWORK_CONFIG__);\n  <span class=hljs-comment>// scrat会将模块所依赖的资源都加载完成后</span>\n  <span class=hljs-comment>// 再执行回调函数</span>\n  <span class=hljs-built_in>require</span>.async([<span class=hljs-string>\'foo\'</span>, <span class=hljs-string>\'font-awesome\'</span>], <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>foo</span>)</span>{\n      foo.render(<span class=hljs-built_in>document</span>.body);\n  });\n</span><span class=hljs-tag>&lt;/<span class=hljs-title>script</span>&gt;</span>\n...\n</code></pre> <blockquote> <p>模块化框架的具体工作原理请阅读 <a href="/#!/framework?title=工作原理">这里</a>。</p> </blockquote> <h2 id=user-content-%E5%BC%80%E5%8F%91%E6%8A%80%E5%B7%A7>开发技巧</h2> <h3 id=user-content-1.%20%E8%AE%BE%E7%BD%AE%E5%88%AB%E5%90%8D>1. 设置别名</h3> <p>模块的主文件有一个默认的别名，比如文件 <code>components/foo/foo.js</code> 的别名是 <code>foo</code>，这样可以通过 <code>require(&#39;foo&#39;)</code> 来引用它，但模块内的其他文件就没有这样的待遇，主要考虑是非主文件通常是在模块内通过文件路径引用的，比如 components/foo/bar.js，没有别名，它通常是被foo模块的主文件使用的，因此在foo.js中用 <code>require(&#39;./bar.js&#39;)</code> 引用即可，其他模块要使用它也可以通过相对路径来引用，但书写起来略麻烦，如果希望它也能有一个别名，也可以在scrat工具配置文件 <code>fis-conf.js</code> 中设置：</p> <pre><code class="hljs javascript">fis.config.set(<span class=hljs-string>\'framework.alias.foo-bar\'</span>, <span class=hljs-string>\'components/foo/bar.js\'</span>);\n</code></pre> <p>这样就可以在其他模块化文件中通过 <code>require(&#39;foo-bar&#39;)</code> 来直接引用了。</p> <blockquote> <p>更多框架配置请阅读 <a href="/#!/settings?title=framework">这里</a></p> </blockquote> <h3 id=user-content-2.%20%E5%B7%A5%E7%A8%8B%E6%A8%A1%E5%9D%97%E6%94%AF%E6%8C%81%E5%A4%9A%E7%BA%A7%E7%9B%AE%E5%BD%95>2. 工程模块支持多级目录</h3> <p>多级目录可以帮助业务合理的规划模块拆分，比如scrat与 <a href="http://vuejs.org/">vue.js</a> 结合的时候，可以按照vue的概念来划分模块：</p> <pre><code class="hljs bash">project\n  ├─ components    (工程模块)\n  │  ├─ directive  (directive)\n  │  │  └─ more\n  │  ├─ filter     (filter)\n  │  │  └─ data\n  │  ├─ component  (组件)\n  │  │  ├─ header\n  │  │  └─ footer\n  │  └─ page       (页面)\n  │     ├─ index\n  │     └─ detail\n  ├─ ...\n</code></pre> <p>模块和id别名的对应关系如下：</p> <table> <thead> <tr> <th>工程文件</th> <th>别名</th> </tr> </thead> <tbody> <tr> <td>components/foo/foo.js</td> <td>foo</td> </tr> <tr> <td>components/foo/bar.js</td> <td>无</td> </tr> <tr> <td>components/foo/bar/bar.js</td> <td>foo/bar</td> </tr> <tr> <td>components/foo/bar/foo.js</td> <td>无</td> </tr> <tr> <td>components/foo/foo/foo.js</td> <td>foo/foo</td> </tr> </tbody> </table>'}});
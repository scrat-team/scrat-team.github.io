define("scrat-site/0.1.0/pages/settings/settings.js",function(s,a){"use strict";a.getMarkdown=function(){return'<h2 id=user-content-fis-conf.js>fis-conf.js</h2> <p>scrat是基于 <a href=http://fis.baidu.com>fis</a> 打造的前端集成解决方案，其配置风格也遵循fis的设计规范，项目根目录下的 <code>fis-conf.js</code> 文件即为工具配置文件。</p> <pre><code class="hljs bash">project\n  ├─ component_modules (生态组件目录)\n  ├─ components        (模块化资源目录)\n  ├─ views             (非模块化资源目录)\n  └─ fis-conf.js       (构建工具配置文件)\n</code></pre> <h2 id=user-content-name>name</h2> <blockquote> <p>项目名（必须设置）</p> </blockquote> <ul> <li>类型：<code>string</code></li> <li>解释：每个scrat项目需要指定一个项目名，构建时会将项目名作为发布路径中的一部分，这样可以在一台机器上部署多个项目的构建结果。</li> <li>示例：<pre><code class="hljs javascript">fis.config.set(<span class=hljs-string>\'name\'</span>, <span class=hljs-string>\'my_proj\'</span>);\n</code></pre> </li> </ul> <h2 id=user-content-version>version</h2> <blockquote> <p>项目版本（必须设置）</p> </blockquote> <ul> <li>类型：<code>string</code></li> <li>解释：每个scrat项目需要指定一个项目版本，构建时会将项目版本作为发布路径的一部分，这样可以在一个项目下部署多个版本的构建结果。</li> <li>示例：<pre><code class="hljs javascript">fis.config.set(<span class=hljs-string>\'version\'</span>, <span class=hljs-string>\'1.0.1\'</span>);\n</code></pre> </li> </ul> <h2 id=user-content-framework>framework</h2> <blockquote> <p><a href=/!#/todo>前端框架</a> 相关的构建配置</p> </blockquote> <p>scrat的模块化开发方案采用前端框架与构建工具结合的方式实现静态资源管理与性能优化等方案。配置中的framework节点下的各种数据将传递给前端框架作为运行时框架配置。</p> <p><img src=/public/c/scrat-site/0.1.0/pages/framework/source_0542a9b.png alt=框架运行原理></p> <p>源码中使用 <code>__FRAMEWORK_CONFIG__</code> 占位，scrat构建后会将其替换为framework配置节点的数据，得到框架运行配置，从而实现前端模块化管理的相关功能：</p> <p><img src=/public/c/scrat-site/0.1.0/pages/framework/release_914e063.png alt=框架运行原理></p> <p>有关前端框架与工具配合的工作原理介绍请阅读 <a href="/#!/framework?title=工作原理">这里</a></p> <h3 id=user-content-framework.cache>framework.cache</h3> <ul> <li>类型：<code>boolean</code></li> <li>解释：设置前端框架是否开启静态资源本地缓存。设置该配置为 <code>true</code>，并且在scrat构建时加 <code>--optimize</code> 或 <code>-o</code> 参数才会生效。</li> <li>示例：<br>fis-conf.js配置<pre><code class="hljs javascript">fis.config.set(<span class=hljs-string>\'framework.cache\'</span>, <span class=hljs-literal>true</span>);\n</code></pre> 构建命令<pre><code class="hljs bash">scrat release -o\n</code></pre> 源码<pre><code class="hljs javascript"><span class=hljs-built_in>require</span>.config(__FRAMEWORK_CONFIG__);\n</code></pre> 构建后<pre><code class="hljs javascript"><span class=hljs-built_in>require</span>.config({ cache: <span class=hljs-literal>true</span> });\n</code></pre> </li> </ul> <h3 id=user-content-framework.combo>framework.combo</h3> <ul> <li>类型：<code>boolean</code></li> <li>解释：设置前端框架是否开启静态资源combo合并。在scrat构建时加 <code>--pack</code> 或 <code>-p</code> 参数即可生效。</li> <li>示例：<br>构建命令<pre><code class="hljs bash">scrat release -p\n</code></pre> 源码<pre><code class="hljs javascript"><span class=hljs-built_in>require</span>.config(__FRAMEWORK_CONFIG__);\n</code></pre> 构建后<pre><code class="hljs javascript"><span class=hljs-built_in>require</span>.config({ combo: <span class=hljs-literal>true</span> });\n</code></pre> </li> </ul> <h3 id=user-content-framework.combopattern>framework.comboPattern</h3> <ul> <li>类型：<code>string</code></li> <li>解释：指定combo的url格式，默认是 <code>/??%s</code>，要开启combo才有效。</li> <li>示例：<br>fis-conf.js配置<pre><code class="hljs javascript">fis.config.set(<span class=hljs-string>\'framework.combo\'</span>, <span class=hljs-literal>true</span>);\nfis.config.set(<span class=hljs-string>\'framework.comboPattern\'</span>, <span class=hljs-string>\'/combo??%s\'</span>);\n</code></pre> 构建命令<pre><code class="hljs bash">scrat release -p\n</code></pre> 源码<pre><code class="hljs javascript"><span class=hljs-built_in>require</span>.config(__FRAMEWORK_CONFIG__);\n</code></pre> 构建后<pre><code class="hljs javascript"><span class=hljs-built_in>require</span>.config({\n  combo: <span class=hljs-literal>true</span>,\n  comboPattern: <span class=hljs-string>\'/combo??%s\'</span>\n});\n</code></pre> 通过combo服务请求模块化资源时，url格式为：<br><a href=http://example.com/combo??a.js,b.js>http://example.com/combo??a.js,b.js</a></li> </ul> <h3 id=user-content-framework.urlpattern>framework.urlPattern</h3> <ul> <li>类型：<code>string</code></li> <li>解释：请求模块化静态资源时的url格式，默认是 <code>/c/%s</code>。</li> <li>示例：<br>fis-conf.js配置<pre><code class="hljs javascript">fis.config.set(<span class=hljs-string>\'framework.urlPattern\'</span>, <span class=hljs-string>\'/public/c/%s\'</span>);\n</code></pre> 构建命令<pre><code class="hljs bash">scrat release\n</code></pre> 源码<pre><code class="hljs javascript"><span class=hljs-built_in>require</span>.config(__FRAMEWORK_CONFIG__);\n</code></pre> 构建后<pre><code class="hljs javascript"><span class=hljs-built_in>require</span>.config({\n  urlPattern: <span class=hljs-string>\'/public/c/%s\'</span>\n});\n</code></pre> 通过combo服务请求模块化资源时，url格式为：<br><a href=http://example.com/public/c/a.js>http://example.com/public/c/a.js</a></li> </ul> <h3 id=user-content-framework.alias>framework.alias</h3> <ul> <li>类型：<code>object</code></li> <li>解释：自定义别名。有些模块化资源不具有默认别名时，可以通过次配置指定，key是别名，value是文件的工程路径。</li> <li>示例：<br>fis-conf.js配置<pre><code class="hljs javascript">fis.config.set(<span class=hljs-string>\'framework.alias\'</span>, {\n  <span class=hljs-string>\'bar\'</span> : <span class=hljs-string>\'components/foo/bar.js\'</span>,\n  <span class=hljs-string>\'$$\'</span> : <span class=hljs-string>\'components/foo/a.js\'</span>\n});\n<span class=hljs-comment>/* 或者：\n fis.config.set(\'framework.alias.bar\', \'components/foo/bar.js\');\n fis.config.set(\'framework.alias.$$\', \'components/foo/a.js\');\n*/</span>\n</code></pre> 源码中引用：<pre><code class="hljs javascript"><span class=hljs-keyword>var</span> bar = <span class=hljs-built_in>require</span>(<span class=hljs-string>\'bar\'</span>);\n<span class=hljs-keyword>var</span> $$ = <span class=hljs-built_in>require</span>(<span class=hljs-string>\'$$\'</span>);\n</code></pre> </li> </ul> <h2 id=user-content-settings>settings</h2> <blockquote> <p>构建工具插件运行配置</p> </blockquote> <p>scrat使用的插件大都是对原插件的包装调用，代码非常简单，但有时需要对插件进行配置，因此settings节点可以把相应配置传给插件在运行时读取使用，以下列举scrat内置的插件及其配置方式。</p> <h3 id=user-content-settings.parser.marked>settings.parser.marked</h3> <blockquote> <p>将 <code>md</code> 后缀的文件解析为html内容。</p> </blockquote> <ul> <li>插件名称：<a href=https://github.com/fouber/fis-parser-marked>fis-parser-marked</a></li> <li>插件来源：<a href=https://github.com/chjj/marked>marked</a></li> <li>配置文档：<a href=https://github.com/chjj/marked#options-1>https://github.com/chjj/marked#options-1</a></li> <li>注意事项：在scrat中，md文件默认不会发布出来，通常是在js、html等文件中嵌入使用的。</li> <li>使用示例：<br>fis-conf.js配置<pre><code class="hljs javascript">fis.config.set(<span class=hljs-string>\'settings.parser.marked\'</span>, {\n  gfm: <span class=hljs-literal>true</span>,\n  tables: <span class=hljs-literal>true</span>,\n  breaks: <span class=hljs-literal>false</span>\n});\n</code></pre> 某md文件：<pre><code class="hljs markdown"><span class=hljs-header># hello world</span>\n</code></pre> 在js文件中使用 <code>__inline(path)</code> 函数嵌入资源：<pre><code class="hljs javascript"><span class=hljs-keyword>var</span> html = __inline(<span class=hljs-string>\'foo.md\'</span>);\n</code></pre> 该js文件构建后：<pre><code class="hljs javascript"><span class=hljs-keyword>var</span> html = <span class=hljs-string>\'&lt;h1&gt;hello world&lt;/h1&gt;\'</span>;\n</code></pre> 在html文件中使用 <code>link</code> 标签加 <code>?__inline</code> 标记嵌入资源：<pre><code class="hljs html">...\n<span class=hljs-tag>&lt;<span class=hljs-title>link</span> <span class=hljs-attribute>rel</span>=<span class=hljs-value>"import"</span> <span class=hljs-attribute>href</span>=<span class=hljs-value>"foo.md?__inline"</span>/&gt;</span>\n...\n</code></pre> 该html文件构建后：<pre><code class="hljs html">...\n<span class=hljs-tag>&lt;<span class=hljs-title>h1</span>&gt;</span>hello world<span class=hljs-tag>&lt;/<span class=hljs-title>h1</span>&gt;</span>\n...\n</code></pre> </li> </ul> <h3 id=user-content-settings.parser.stylus>settings.parser.stylus</h3> <blockquote> <p>将 <code>styl</code> 后缀的文件解析为css内容。</p> </blockquote> <ul> <li>插件名称：<a href=https://github.com/fouber/scrat-parser-stylus>scrat-parser-stylus</a></li> <li>插件来源：<a href=https://github.com/LearnBoost/stylus>stylus</a></li> <li>配置文档：无需配置</li> <li>使用示例：<br>某styl文件<pre><code class="hljs bash">fonts = helvetica, arial, sans-serif\nborder-radius()\n  -webkit-border-radius arguments\n  -moz-border-radius arguments\n  border-radius arguments\nbody\n  padding <span class=hljs-number>50</span>px;\n  font <span class=hljs-number>14</span>px/<span class=hljs-number>1.4</span> fonts;\na.button\n  border-radius(<span class=hljs-number>5</span>px)\n</code></pre> 构建后：<pre><code class="hljs css"><span class=hljs-tag>body</span> <span class=hljs-rules>{\n  <span class=hljs-rule><span class=hljs-attribute>padding</span>:<span class=hljs-value> <span class=hljs-number>50px</span></span></span>;\n  <span class=hljs-rule><span class=hljs-attribute>font</span>:<span class=hljs-value> <span class=hljs-number>14px</span>/<span class=hljs-number>1.4</span> helvetica, arial, sans-serif</span></span>;\n}</span>\n<span class=hljs-tag>a</span><span class=hljs-class>.button</span> <span class=hljs-rules>{\n  <span class=hljs-rule><span class=hljs-attribute>-webkit-border-radius</span>:<span class=hljs-value> <span class=hljs-number>5px</span></span></span>;\n  <span class=hljs-rule><span class=hljs-attribute>-moz-border-radius</span>:<span class=hljs-value> <span class=hljs-number>5px</span></span></span>;\n  <span class=hljs-rule><span class=hljs-attribute>border-radius</span>:<span class=hljs-value> <span class=hljs-number>5px</span></span></span>;\n}</span>\n</code></pre> </li> </ul> <h3 id=user-content-settings.parser.handlebars>settings.parser.handlebars</h3> <blockquote> <p>将 <code>handlebars</code> 后缀的文件预编译为 <a href="http://handlebarsjs.com/">handlebars</a> 运行时模板</p> </blockquote> <h3 id=user-content-settings.optimizer.uglify-js>settings.optimizer.uglify-js</h3> <blockquote> <p>调用 <a href=/#!/todo>uglify-js</a> 压缩js文件</p> </blockquote> <h3 id=user-content-settings.optimizer.clean-css>settings.optimizer.clean-css</h3> <blockquote> <p>调用 <a href=/#!/todo>clean-css</a> 压缩css、styl文件</p> </blockquote> <h3 id=user-content-settings.optimizer.html-minifier>settings.optimizer.html-minifier</h3> <blockquote> <p>调用 <a href=/#!/todo>html-minifier</a> 压缩tpl、md文件</p> </blockquote> <h3 id=user-content-settings.lint.jshint>settings.lint.jshint</h3> <blockquote> <p>调用 <a href=/#!/todo>jshint</a> 校验js代码</p> </blockquote> <h3 id=user-content-settings.spriter.csssprites>settings.spriter.csssprites</h3> <blockquote> <p>css雪碧图处理配置</p> </blockquote>'}});
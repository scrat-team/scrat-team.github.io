define("scrat-site/0.1.0/pages/settings/settings.js",function(s,e){"use strict";e.getMarkdown=function(){return"<h2 id=fis-conf-js>fis-conf.js</h2> <p>scrat是基于 <a href=http://fis.baidu.com>fis</a> 打造的前端集成解决方案，其配置风格也遵循fis的设计规范，项目根目录下的 <code>fis-conf.js</code> 文件即为工具配置文件。</p> <pre><code class=\"hljs bash\">project\n  ├─ component_modules (生态组件目录)\n  ├─ components        (模块化资源目录)\n  ├─ views             (非模块化资源目录)\n  └─ fis-conf.js       (构建工具配置文件)\n</code></pre> <h2 id=name>name</h2> <blockquote> <p>项目名（必须设置）</p> </blockquote> <ul> <li>类型：<code>string</code></li> <li>解释：每个scrat项目需要指定一个项目名，构建时会将项目名作为发布路径中的一部分，这样可以在一台机器上部署多个项目的构建结果。</li> <li>示例：<pre><code class=\"hljs javascript\">  fis.config.set(<span class=hljs-string>'name'</span>, <span class=hljs-string>'my_proj'</span>);\n</code></pre> </li> </ul> <h2 id=version>version</h2> <blockquote> <p>项目版本（必须设置）</p> </blockquote> <ul> <li>类型：<code>string</code></li> <li>解释：每个scrat项目需要指定一个项目版本，构建时会将项目版本作为发布路径的一部分，这样可以在一个项目下部署多个版本的构建结果。</li> <li>示例：<pre><code class=\"hljs javascript\">  fis.config.set(<span class=hljs-string>'version'</span>, <span class=hljs-string>'1.0.1'</span>);\n</code></pre> </li> </ul> <h2 id=framework>framework</h2> <h3 id=framework-cache>framework.cache</h3> <h3 id=framework-combo>framework.combo</h3> <h3 id=framework-combopattern>framework.comboPattern</h3> <h3 id=framework-urlpattern>framework.urlPattern</h3> <h3 id=framework-alias>framework.alias</h3> <h2 id=settings>settings</h2> <h3 id=settings-parser-marked>settings.parser.marked</h3> <h3 id=settings-parser-stylus>settings.parser.stylus</h3> <h3 id=settings-parser-handlebars>settings.parser.handlebars</h3> <h3 id=settings-optimizer-uglify-js>settings.optimizer.uglify-js</h3> <h3 id=settings-optimizer-clean-css>settings.optimizer.clean-css</h3> <h3 id=settings-optimizer-html-minifier>settings.optimizer.html-minifier</h3> <h3 id=settings-lint-jshint>settings.lint.jshint</h3> <h3 id=settings-spriter-csssprites>settings.spriter.csssprites</h3> <h2 id=modules>modules</h2> <h3 id=modules-parser>modules.parser</h3> <h3 id=modules-preporcessor>modules.preporcessor</h3> <h3 id=modules-postprocessor>modules.postprocessor</h3> <h3 id=modules-lint>modules.lint</h3> <h3 id=modules-test>modules.test</h3> <h3 id=modules-optimizer>modules.optimizer</h3> <h3 id=modules-prepackager>modules.prepackager</h3> <h3 id=modules-packager>modules.packager</h3> <h3 id=modules-spriter>modules.spriter</h3> <h3 id=modules-postpackager>modules.postpackager</h3>"}});
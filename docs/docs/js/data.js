window.DOC_DATA={"locales":[{"name":"zh","text":"中文","title":"Dawn","links":[{"text":"GitHub","url":"https://github.com/alibaba/dawn"}],"groups":[{"name":"guide","text":"使用指南","docs":[{"content":"# 使用入门\n\n### Dawn 是什么？\n\nDawn 取「黎明、破晓」之意， 是「阿里云业务运营前端团队」的构建工具，现已完全开源，简化并统一了开发人员的日常构建与开发相关的工作，将开发过程抽象为 5 个阶段和 1 个常用操作（init/dev/test/build/publish + add）。\n\n\n### 有什么的特点？\n\n- 采用中间件技术，封装常用功能，易于扩展，方便重用\n- 支持 pipeline 让多个 task 协同完成构建任务\n- 简单、一致的命令行接口，易于开发人员使用\n- 支持基于「中心服务」管理中件间和工程模板\n- 支持搭建私有中心服务，并统一下发构建规则，易于团队统一管理\n\n\n### 安装和更新\n\n依赖的环境、软件及其版本：\n- Node.js v7.6.0 及以上版本\n- Mac/Linux (Windows 基本支持未经严格测试)\n\n安装或更新 Dawn:\n\n```sh\n$ [sudo] npm install dawn -g\n```\n中国大陆用户可以使用 cnpm 加速安装\n\n\n### 初始化工程\n\n```sh\n$ dn init [template] [options]\n```\n\n示例：\n```sh\n$ dn template \n? Found 5 templates, press enter to initialize the project (Use arrow keys)\n❯ 1. mobx       : Mbox Project Template\n  2. dva        : Dva Project Template (for WB)\n  3. front      : Front Project Template\n  4. node       : Node.js Project Template\n  5. middleware : Middleware Project Template\n```\n选择一个工程类型，回车即可按向导初始化一个工程，还可以通过 `-t` 或 `--template` 直接按指定的模板名称，直接初始化工程。\n\n\n### 启动开发服务\n\n```sh\n$ dn dev \n```\n如果是一个「前端」工程通常会启动构建进程并监听文件的变化，通常，还会启动一个 `Web Server`，并自动打开浏览器。\n\n\n### 执行检查和测试\n\n```sh\n$ dn test\n```\n通过在 test 的时候会先进行「语法检查」（通过 eslint），然后执行「单元测试」和「E2E 测试」。\n\n\n### 构建工程\n\n```\n$ dn build\n```\n\n执行构建任务，不同的工程类型的构建过程和结果可能不同，取决于初始化工程时使用的工程模板。\n完成后，会在当前项目的根目录产生 **build** 目录，这是构建结果，当时也可以指定为其它目录名称。\n\n\n### 发布工程\n\n```\n$ dn publish\n```\n\n可以通过 publish 命将发布代码或构建结果，不同的工程模板决定了最终发布位置，是否支持 publish 命令决定于选择的「工程模板」。\n\n\n### 执行自定义任务\n\ninit/dev/build/test/publish 这几个命令可以直接作为「子命令」写在 dn 后边，对于其它名称的 pipie 需要使用 `run` 命令\n\n编辑 .dawn/pipe.yml\n\n```yaml\ndemo:\n  - name: shell\n    script:\n      - echo demo\n```\n\n可以通过如下方法执行 demo\n\n```sh\ndn run demo\n```","group":"guide","name":"getting-started","title":"使用入门","index":0},{"content":"# 配置 Pipeline\n\nDawn 的每个工程中都需要包含对应的 pipeline 配置，在 pipe 配置中定义了「每个命令」对应的任务，配置可以是 `yml/json/js` 格式，但是通常建议用更易于阅读取的 yml 格式，需要放到「工程根目录」，配置的名称为 `.dawn` 可以是一个目录，也可以是一个文件。\n\n### 使用单一个配置文件\n\n在工程根目录新建一个 `.dawn.yml` (也可以是 .dawn.json 或 .dawn.js)，下边是 `yml` 格式的配置\n\n```yml\npipe:\n  build:\n    - name: lint\n    - name: webpack\n      output: dist\n```\n\n如上配置，在执行 `dn build` 时，就会先进行语法检查，然后用 webpack 完成项目构建并将构建结果放入 dist 目录。\n\n### 使用目录作为配置\n\n在工程根目录新一个 `.dawn` 的目录，然后在 `.dawn` 目录中新建一个 pipe.yml 的文件，如下\n\n```\nbuild:\n  - name: lint\n  - name: webpack\n    output: dist\n```\n\n如上示例，「目录形式」的配置的和前一个「文件形式」的配置一样，执行 `dn build` 就可以完成构建\n\n### Pipe 的执行\n\n每个 pipe 中可以放任意多个「中件间」，在执行时会创建一个 `context` 实例，然后，依次执行每个中件间，所有中件间都能访问 `context` 实例对象。\n\n示例\n```\ndemo:\n  - name: shell\n    script:\n      - echo 1\n  - name: shell\n    script:\n      - echo 2\n  - name: shell\n    script:\n      - echo 3\n```\n\n执行 `dn run demo`，控制台将会执次打印 `1 2 3`，每个中件间的选项配置有两个「保留的名称」\n\n- name: 用于指定中件间 package 名称，可以是完整的名称 `dn-middleware-xxx` 也可以是省略前端的 `xxx`\n- location: 用于指定中件间入口文件的位置，一般用于本地调试，或内置在模板中不想独立发布的中件间\n\n不同的中间件通常会有对应的其他配置项，可以参考中间件自身的说明文档。","group":"guide","name":"pipeline","title":"配置 Pipeline","index":1},{"content":"# 制作一个模板\n\n通常您应先看看是否已经存满足您需求的模板，查看「推荐的模板」，可以通过如下命令：\n\n```sh\n$ dn template [keyword]\n```\n\n示例\n```sh\ndn template \n? Found 5 templates, Press enter to view the document (Use arrow keys)\n❯ 1. mobx       : Mbox Project Template\n  2. dva        : Dva Project Template (for WB)\n  3. front      : Front Project Template\n  4. node       : Node.js Project Template\n  5. middleware : Middleware Project Template\n```\n\n通过「上下方向键」可以选择指定模板，然后「回车」可以查看对应模板的在线使用说明。\n\n\n当时您准备在开发一个模板时，通常只需要通过已有的工程模板创建一个工程，然后在些基础上，调整 pipeline 配置，或调整目录结构，也可添加好其它依赖，并在模板中添加各类文件示例。当然，也可以直接在一个空目录中创建一个全新的模板，每一个工程模板就是一个 npm 包，但是，要求必须命名为 `dn-template-xxx` ，然后，通过 npm 发布就行了。\n\n### *.template 文件\n\n如果一个模板中有 `*.template` 文件，在用此模板创建的工程用，用以此产生对应的文件，比如，在模板中有两个文件`.dawn.yml` 和 `.dawn.yml.template` ，那么最终用这个模板创建的工程中的  `.dawn.yml` 会和 模板中的 `.dawn.yml.template` 一致，而不是模板中的 `.dawn.yml`\n\n通常模板中的 `.gitignore` 需要利用这个特性，模板在通过 npm 包发布后会丢失 `.gitignore`，如果希望你的模板创建的工程中有一个默认的 `.gitignore`，那么需要在模板中添加 `.gitignore.tempate` \n\n### 提交到推荐列表\n如果希望，将你的模板加入到「推荐模板列表」，请 fork 后，编辑 docs/template.yml，然后，发起一个 Pull Request 就行了。","group":"guide","name":"template","title":"制作模板","index":2},{"content":"# 开发一个中间件\n\n\n通常，应该先看看是否已经存满足您需求的中件间，查看「推荐的中间件」，可以通过如下命令：\n\n```sh\n$ dn middleware [keyword]\n```\n\n示例:\n```sh\n$ dn middleware webpack\n? Found 3 middlewares, Press enter to view the document (Use arrow keys)\n❯ 1. webpack        : 基于 Webpack 的构建中间件（无缝升级）\n  2. webpack2       : 基于 Webpack2 的构建中间件\n  3. webpack1       : 基于 Webpack1 的构建中间件\n```\n\n通过「上下方向键」可以选择指定中件间，然后「回车」可以查看对应中件间的在线使用说明。\n\n当您决定要开发一个新的中件间时，您可以通过 dn init 命令，然后选择「中件间工程模板」即可快速创建一个「中件间」，如下：\n\n```sh\n$ dn init\n? Found 5 templates, press enter to initialize the project\n  1. mobx       : Mbox Project Template\n  2. dva        : Dva Project Template (for WB)\n  3. front      : Front Project Template\n  4. node       : Node.js Project Template\n❯ 5. middleware : Middleware Project Template\n```\n\nDN 中间件和 Koa 中件间类似，中件间核心基础代码结构如下：\n\n```js\n/**\n * 这是一个标准的中间件工程模板\n * @param {object} opts cli 传递过来的参数对象 (在 pipe 中的配置)\n * @return {AsyncFunction} 中间件函数\n */\nmodule.exports = function (opts) {\n\n  //外层函数的用于接收「参数对象」\n  //必须返回一个中间件处理函数\n  return async function (next) {\n\n    //在这里处理你的逻辑\n    this.console.log('This is an example');\n\n    //next 触发后续执行\n    //如果需要在后续中间件执行完成再做一些处理\n    //还可以 await next(); 并在之后添加逻辑\n    next();\n\n  };\n\n};\n```\n\n中间件就是一个标准和 npm 包，但是要求必须命名为 `dn-middleware-xxx` 这样的格式，开发完成后直接通过 npm 发布就行了。\n\n### 提交到推荐列表\n如果希望，将你的中件间加入到「推荐中件间列表」，请 fork 后，编辑 docs/middleware.yml，然后，发起一个 Pull Request 就行了。","group":"guide","name":"middleware","title":"开发中件间","index":3}]},{"name":"service","text":"中心服务","docs":[{"content":"# 用户配置\n\nDawn 目前主要有三个配置项：\n\n- server: 要连接的中心服务，默认连接公共服务，也可以连接「私有中心服务」\n- registry: npm 源，默认连接 cnpm 源\n- cacheTTL: 缓存时长，设定远程配置的最大缓存时长\n\n### 通过命令更改配置\n\n```sh\n$ dn config [name] [value]\n```\n\n当省略 `value` 时，会让用户在「默认值、历史、输入值」先择。当省略 `name` 时会让用户先选择配置项的「名称」，然后，再让用户选择或输入「值」\n\n示例一：\n\n```sh\n$ dn config server http://your_server_url\n```\n\n上边的示例，将会新「中心服务」更改为 `your_server_url`\n\n示例二：\n\n```\n$ dn config server\n```\n将会有如下提示\n\n```sh\n? Please enter or select configuration value (Use arrow keys)\n❯ Enter a new configuration value\n  default : http://default_url/${name}.yml\n```\n\n会提示用户输入一个新的 URL 或选择默认的 URL，当选择输入或输入空时，将会使用默认 server 配置\n\n### 通过 .dawnrc 更改配置\n\n除了命令方式也可以手动编辑 `.dawnrc` 文件更改配置\n\n示例\n```sh\n$ vim ~/.dawnrc\n``` \n\n.dawnrc 格式如下\n\n```yml\nserver: your_server_url\nregistry: your_registry_url\ncacheTTL: your_ttl\n```","group":"service","name":"client","title":"用户配置"},{"content":"# 团队配置\n\n如果你在一个团队，并希望团队成员使用 dawn 时能有一些公共配置，或下发一些统一的构建规则，那么可以「搭建一个私有的中心服务」\n\nDawn 的私有服务端搭建成本「极低」，不需要下载任务服务端程序，只需要有一个支持静态文件的 Web Server 即可，如果没有，在 GitHub 或 GitLab 上，新建一个 repo 也行，只要能托管静态文件即可，当然你也可用基于动态服务搭建 dawn 中心服务\n\n假如，你现在有一个 Web Server，并可能过 `http://your_server_url/<name>.yml` 访问，比如 \n\n- http://your_server_url/template.yml\n- http://your_server_url/middleware.yml\n- http://your_server_url/pipe.yml\n- http://your_server_url/rc.yml\n\n### template.yml\n\ntemplate.yml 用于管理中心服务上的所有「推荐的模板列表」，用户在执行 `dn init` 时列出的模板列表，就是在 template.yml 配置的列表，格式如下\n\n```yml\nfront: \n  location: 'dn-template-front'\n  summary: 'Front Project Template'\n\nnode: \n  location: 'dn-template-node'\n  summary: 'Node.js Project Template'\n  \nmiddleware: \n  location: 'dn-template-middleware'\n  summary: 'Middleware Project Template'\n```\n\n顶层的 `key` 就是模板的名称，比如上边的 `front`、`node`，通过 `location` 指定模板对应的 npm 包名\n\nlocation 还可以指定 scope 或 version，示例\n\n```yml\nfront: \n  location: '@scope/dn-template-front'\n  summary: 'Front Project Template'\n\nnode: \n  location: 'dn-template-node@1.0.0'\n  summary: 'Node.js Project Template'\n\nmiddleware: \n  location: '@scope/dn-template-middleware@1.0.0'\n  summary: 'Middleware Project Template'\n```\n\n连接对应的 `server` 后，可以通过 `dn template [keyword]` 查询对应的模板\n\n**注意**\n所有不在中心服务 template 列表中的模板也可用于初始化工程，需要用 `-t` 或 `--template` 参数指定模板包名称，如下\n```sh\n$ dn init -t <package_name>\n``` \n\npackage_name 可以是完整的包名称，也可以不带默认前缀。\n\n### middleware.yml\n\nmiddleware.yml 用于管理「推荐的中间件列表」，格式如下\n\n```yml\nshell: \n  location: '@ali/dn-middleware-shell'\n  summary: 可执行 shell 的中间件\n```\n\n配置格式及各字段和 template 一致，添加到 `middleware.yml` 中的「中件间」，在 dawn 连接到对应的 `serveer` 后，在配置 `pipe` 时，除了可以完整的包名、不带前缀的包名，也可以命名用配置的中的 `key` 如上边示例中的 `shell`。\n\n连接对应的 `server` 后，可以通过 `dn middleware [keyword]` 查询对应的模板\n\n\n### pipe.yml\n\npipe 是团队统一构建规则的核心，用户在连接某一个 `server` 后，在执行对应的命令时，会先合并「远程统一的 pipe 配置」，然后，再执行对应的的 pipeline，格式如下：\n\n```yml\n# 前置规则，会合并到工程本地配置的前边\nbefore:\n  test:\n    - name: lint\n\n# 后置规则，会合并到工程本地配置的后边\nafter:\n  test:\n    - name: shell\n      script:\n        - echo done\n```\n如上，中心 `pipe` 分为 `before` 和 `after` 两大部分，每部分和本地 `pipe` 格式一致，上边的示例，让强制让所有工程，在执行 `dn test` 时都会进行 `lint` 检查语法。\n\n注意：如果本地配置中已有 `lint` 配置，不会重复执行。\n\n### rc.yml\n\n我们知道本地 `.dawnrc` 中支持三项配置 `server`、`registry`、`cacheTTL`，但是中心服务的 `rc.yml` 只支持 `registry`、`cacheTTL` 两项配置，并且是在本地 `.dawnrc` 没有指定任何值时才会有效，也就是说本地配置高于远程配置。","group":"service","name":"server","title":"团队配置"}]},{"name":"middleware","text":"常用中间件","docs":[]},{"name":"template","text":"常用模板","docs":[]}]}]};
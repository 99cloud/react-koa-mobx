# React-koa-mobx

## Features

1. BaseList 组件类
1. DetailBase 组件类
1. FormModal(Form、Step Form、CodeForm)
1. ...

## Todos

1. enzyme & cypress 单元测试
1. 支持菜单栏切换到顶部
1. ...

## Need to fix

1. <Spin wrapperClassName="page-loading" /> 位置
1. Icon SVG组件无法捕获hover事件，外层加span可解决

## Developer Guide

### Preparation

Make sure the following software is installed and added to the \$PATH variable:

- Node.js 8+ ([installation with nvm](https://github.com/creationix/nvm#usage))
- Yarn 1.19.1+

Install yarn with npm:

```sh
npm install -g yarn
```

Fork the repository, then clone your repository and install the dependencies:

```sh
yarn
```

Note: If you are in China Mainland, execute the following command before running the command above for faster installation.

```sh
yarn config set registry https://registry.npm.taobao.org
```

### Start App

```sh
yarn start
```

Now, you can access http://localhost:8000 to view the app.

### Run tests

```sh
yarn test
```

### I18n

1. Mark the text to be translated。examples: <code>t('Name')</code>
1. Scanner by run the command:

````
grunt
````

1. Add translates in translation.json

```
{
  "Age": "年龄",
  "Name": "名称",
}
```

1. The parameter passed in the t function is a variable, which cannot be scanned automatically and needs to be manually added to <code>/zh/translation.json</code>

### Build App for production

The project can be built for production by using the following task:

```sh
yarn build
```

To build and serve from dist, using the following task:

```sh
yarn serve
```

To build App to an image, run the following task after `yarn build`:

```sh
docker build -t console .
```

Test App image by run:

```sh
./docker-run
```


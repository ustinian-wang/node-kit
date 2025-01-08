# node-kit

node-kit是一个Node.js模块，提供了一些实用的工具和功能，旨在帮助开发者更方便地处理文件系统和HTTP请求。

## 特性

* 文件系统工具：提供了创建文件、遍历目录和检查文件是否存在的功能。
* HTTP工具：提供了发送HTTP POST请求的功能，包括发送WCRobot消息和Markdown消息。

## 使用

> 还没有发布到npm，正在开发中

1. 安装：使用npm安装node-kit模块：`npm install @ustinian-wang/node-kit`
2. 导入：在你的Node.js项目中导入node-kit模块：`import * as nodeKit from '@ustinian-wang/node-kit';`
3. 使用：根据需要使用node-kit提供的工具和功能。例如，使用`nodeKit.createFileIfNotExist`创建文件，使用`nodeKit.sendWCRobotMD`发送WCRobot Markdown消息。

## 文档

* [文件系统工具文档](docs/fs-utils.md)
* [HTTP工具文档](docs/http-utils.md)
* [WCRobot消息发送文档](docs/wc-robot.md)

## 贡献

如果你想为node-kit贡献代码或报告问题，请访问我们的[GitHub仓库](https://github.com/ustinian-wang/node-kit)。

## 许可证

node-kit根据MIT许可证发布。

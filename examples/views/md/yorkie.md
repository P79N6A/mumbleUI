# fes-yorkie
配置 Git Hook ，可配置的hook如下：
```
[
  "applypatch-msg",
  "pre-applypatch",
  "post-applypatch",
  "pre-commit",
  "prepare-commit-msg",
  "commit-msg",
  "post-commit",
  "pre-rebase",
  "post-checkout",
  "post-merge",
  "pre-push",
  "pre-receive",
  "update",
  "post-receive",
  "post-update",
  "push-to-checkout",
  "pre-auto-gc",
  "post-rewrite",
  "sendemail-validate"
]

```


## 安装 Node 
Fes 必须在 Node6 以上版本环境运行。从[NodeJs 官网](https://nodejs.org/zh-cn/)下载 Node, 然后安装。

## 安装 wnpm 
npm install @webank/wnpm -g --registry=http://wnpm.weoa.com:8001

## 安装 Fes
wnpm install @webank/fes2 -g

## 安装 Git Hook
fes-yorkie install

安装完成会在目录下创建.gitHooks.json文件，默认内容如下：
```json
{
    "pre-commit": "fes2 lint"
}
```
"fes2 lint" 为可执行命令，自定义即可。

## 卸载 Git Hook
fes-yorkie uninstall





# API (token + ip授权)

## 获取长短链接映射（*）

如果映射存在，则直接获取长链接对应的短链接；如果不存在，则获取原链接
post /rsq/shorturl
body(JSON): {longUrl:"http://www.rishiqing.com/task?t=12343wefw32f32sf32"}

return value:
{
    errcode: 0,
    longUrl: "http://www.rishiqing.com/task?t=12343wefw32f32sf32",
    shortCode: "dIfw8Ds0",
    shortDomain: "rurl.ltd"
}


## 删除长短链接映射

根据longUrl或者shortCode删除映射
post /rsq/shorturl/delete
body(JSON): {longUrl:"http://www.rishiqing.com/task?t=12343wefw32f32sf32"}
或
body(JSON): {shortCode:"E9die0hq"}

return value:
{
    errcode: 0,
    longUrl: "http://www.rishiqing.com/task?t=12343wefw32f32sf32",
    shortCode: "E9die0hq"
}

## 通过长短链接映射
post /rsq/shorturl/query
body(JSON): {longUrl:"http://www.rishiqing.com/task?t=12343wefw32f32sf32"}
或
body(JSON): {shortCode:"E9die0hq"}

return value:
{
    errcode: 0,
    longUrl: "http://www.rishiqing.com/task?t=12343wefw32f32sf32",
    shortCode: "E9die0hq",
    shortDomain: "rurl.ltd"
}

# 公共访问API（*）

## 短链接访问

# 问题整理

## 接口安全验证问题
token和ip白名单
## 唯一索引
设置唯一索引
## 发生shortCode值碰撞之后需要记录
碰撞记录表

## 统计短链接访问次数
## 统计短链接最后访问时间

# 启动流程

## 方式1：使用dotenv配置环境变量

1. npm全局安装dotenv模块
```npm install dotenv -g```

2. 在项目根目录下新建.env文件
在.env文件中配置基本项，示例如下：
```
MONGO_URL=mongodb://123.123.123.123:27017/shortUrl
MONGO_USER=username
MONGO_PWD=password

LOG_LEVEL=debug
LOG_LOG_FILE=./logs/winston.log
LOG_EXCEPTION_FILE=./logs/exception.log

SYS_SHORT_URL_DOMAIN=a.com

SECURITY_WHITE_LIST=114.114.114.114/32,127.0.0.1/24
SECURITY_BLACK_LIST=
```

3. 使用node -r参数，预加载dotenv模块，读入环境变量
node:
```node -r dotenv/config bin/www dotenv_config_path=./.env```

nodemon:
```nodemon -r dotenv/config bin/www dotenv_config_path=./.env```


# mongodb 初始化

1. 使用mongo客户端登录mongodb

2. 新建admin
```
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: "abc123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

3. 修改mongodb的配置文件
配置security.authorization为enabled
**重启mongodb**

4. mongo客户端使用创建的admin账号重新登录
```
use admin
db.auth("myUserAdmin", "abc123" )
```

5. 为指定库创建账号
```
use test
db.createUser(
  {
    user: "myTester",
    pwd: "xyz123",
    roles: [ { role: "readWrite", db: "test" },
             { role: "read", db: "reporting" } ]
  }
)
```

# 开发启动流程

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

## 方式2

some test...
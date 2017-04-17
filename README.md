# 请求权限验证

## token认证

在beta或prod相应的地址url中加入token参数，例如
http://123.123.123.123:3000/rsq/shorturl?token=xxxxxxxxxxxxxxxxxxxxx

ip地址和token值，向部署人员索取

## ip认证

请求会限制内网ip访问，提交需要访问短链接服务器的内网ip地址。

# API (token + ip授权)

## 获取长短链接映射（*）

如果映射存在，则直接获取长链接对应的短链接；如果不存在，则获取原链接

### 请求方式：
post /rsq/shorturl
body(JSON): {longUrl:"http://www.rishiqing.com/task?t=12343wefw32f32sf32"}

### 返回值：
return value:
{
    errcode: 0,
    longUrl: "http://www.rishiqing.com/task?t=12343wefw32f32sf32",
    shortCode: "dIfw8Ds0",
    shortDomain: "rurl.ltd"
}


## 删除长短链接映射

根据longUrl或者shortCode删除映射

### 请求方式：
post /rsq/shorturl/delete
body(JSON): {longUrl:"http://www.rishiqing.com/task?t=12343wefw32f32sf32"}
或
body(JSON): {shortCode:"E9die0hq"}

### 返回值：
return value:
{
    errcode: 0,
    longUrl: "http://www.rishiqing.com/task?t=12343wefw32f32sf32",
    shortCode: "E9die0hq"
}

## 通过长短链接映射

### 请求方式：
post /rsq/shorturl/query
body(JSON): {longUrl:"http://www.rishiqing.com/task?t=12343wefw32f32sf32"}
或
body(JSON): {shortCode:"E9die0hq"}

### 返回值：
return value:
{
    errcode: 0,
    longUrl: "http://www.rishiqing.com/task?t=12343wefw32f32sf32",
    shortCode: "E9die0hq",
    shortDomain: "rurl.ltd"
}

# 公共访问API（*）

## 短链接访问

通过rurl.ltd/{shortCode}访问短链接。shortCode为8位短链接代码值
如果shortCode不存在，则返回code not exist错误
如果shortCode存在，则根据长短链接映射，跳转到指定的长链接映射上。

# 服务器集成

beta与prod访问地址不一样

# 问题整理

## 接口安全验证问题
token和ip白名单验证
## 唯一索引
设置shortCode唯一索引
## 发生shortCode值碰撞之后需要记录
碰撞记录表

## 统计短链接访问次数

## 统计短链接最后访问时间


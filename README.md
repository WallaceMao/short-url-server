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

# 坑


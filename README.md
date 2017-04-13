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

## 通过长链接查询短链接

## 通过短链接查询长链接

# 公共访问API（*）

## 短链接访问

# 问题整理

## 唯一索引
## 统计短链接访问次数
## 统计短链接最后访问时间
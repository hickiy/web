# 路由优先级

## location 指令路径匹配规则优先级

| 模式               | 优先级                                                                     |
| ------------------ | -------------------------------------------------------------------------- |
| location=/url      | 开头表示精确匹配,只有匹配上才生效                                          |
| location^-/ur      | ^~开头表示前缀匹配                                                         |
| location-pattern   | ~开头表示区分大小写的正则匹配                                              |
| location-\*pattern | ~\*开头表示不区分大小写的正则匹配                                          |
| location/url       | 不带任何开头的也表示前缀匹配，但是优先级在正则匹配之后                     |
| location=/         | 通配匹配任何未匹配到其他 location 的请求都会匹配到，当于 switch 的 default |

## 获取 ssl 证书

```bash
// 使用certbot linux包生成、部署、更新https证书

```

## 针对类型配置缓存

```nginx
location ~ \.(js|css|png|jpg|ttf|otf|woff|ico)$ {
      try_files $uri /operation/$uri;
      add_header Cache-Control 'max-age=86400';
      add_header Last-Modified "";
      etag off;
      access_log off;
}
```

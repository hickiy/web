# 代理示例

```nginx
proxy_cache_path /var/www/jsdelivr.cache levels=2:2 use_temp_path=off keys_zone=jsdelivr:50m inactive=180d max_size=500m;

server
{
    listen 443 ssl;
    server_name jsdelivr.example.com; # 替换成你的域名

    # ssl 证书配置
    ssl_certificate 你的证书;
    ssl_certificate_key 你的证书私钥;
    ssl_trusted_certificate  你的证书链;

    # ssl 连接配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    server_tokens off;
    fastcgi_param   HTTPS               on;
    fastcgi_param   HTTP_SCHEME         https;

    # 日志配置
    access_log /usr/local/nginx/logs/jsdelivr.log;

    location /
    {
        proxy_pass https://cdn.jsdelivr.net;  # 将流量转发到https://cdn.jsdelivr.net
        proxy_ssl_server_name on; # 因采用https，所以需要使用SNI指明主机名
        proxy_set_header Host cdn.jsdelivr.net; # 设置请求头主机名
        # 记录代理信息
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        # 设置HTTP协议，并建立长连接
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        # X-Cache表明请求是否命中缓存
        add_header X-Cache $upstream_cache_status;
        # 禁用源站的cookie和浏览器缓存设置
        proxy_ignore_headers Set-Cookie Cache-Control expires;
        # 设置缓存的key_zone名称，必须与proxy_cache_path中的设置一致
        proxy_cache jsdelivr;
        # 设置缓存的key名称
        proxy_cache_key $host$uri$is_args$args;
        # 设置缓存的条件，只缓存状态码200的请求，缓存时限为180天
        proxy_cache_valid 200  180d;
        # 设置缓存的失效日期为180天
        expires 180d;
        # 禁用源站的Access-Control-Allow-Origin请求头
        proxy_hide_header Access-Control-Allow-Origin;
        add_header Access-Control-Allow-Origin "https://caijinbo.top";
    }
}
```

::: tip

1. 缓存文件配置 proxy_cache_path

- path 为缓存文件存放路径
- levels 为缓存文件目录的层次结构，levels=2:2 表示两级目录都使用 2 位 16 进制数命名
- use_temp_path 表示临时文件是否直接存放于缓存目录中，如果该值为 off，则临时文件将直接放在缓存目录中；反之，则需要用 proxy_temp_path 设置一个目录。为了减少不必要的拷贝，建议设为 off
- keys_zone=jsdelivr:50m 表示该区域的名称为 jsdelivr，大小为 50m，这样 nginx 可以快速判断一个 request 是否命中缓存，1m 可以存储 8000 个 key，10m 可以存储 80000 个 key
- inactive 表示未被访问文件在缓存中保留时间
- max_size 为最大缓存空间，如果不指定，会使用掉所有磁盘空间。当达到配额后，会删除最少使用的 cache 文件。

:::

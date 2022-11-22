# mysql相关

## 查询
- 查询所有数据库： `show databases`
- 使用数据库： `use koa_weibo`
- 查询user表
    - 所有数据
        - `select * from users`
    - 用户名和昵称的数据
        - `select username, nickname from users`
    - 查验用户是否符合登录数据(通过where操作)
        - `select username, nickname from users where username='周杰伦' and `password`='jaychou'`
- 常用操作
```
-- show databases;

-- 使用对应的数据库 
use koa_weibo;

-- 查询
-- 查询users表所有数据
-- select * from users;
-- 查询users表中用户名和昵称
-- select username, nickname from users;
-- 查验用户是否符合登录数据(通过where操作)
-- select username, nickname from users where username="吕迪格" and `password`='godlovelv';

-- select * from blogs;
-- 查询倒叙最新的微博数据
-- select * from blogs order by id desc;

-- 查询总数
-- select count(*) as total from blogs;
select count(id) as total from blogs;
-- 分页查询(倒叙查询，limit 2限制每页2条数据，offset 2偏移跳过2条)
select * from blogs order by id desc limit 2 offset 2;




-- 新增
-- insert into users (username,`password`,nickname) values ('小白', 'qa123456', '可爱的小白');
-- insert into users (username, `password`, nickname) values ('吕迪格', 'godlovelv', '车场大后卫');
-- insert into users (username, `password`, nickname) values ('中国YYDS', 'chinayyds', '中国永远的神');

-- insert into blogs (title, content, userid) values ('#中美元首交换意见#', '国家主席习近平应约于北京时间3月18日晚同美国总统拜登就中美关系和双方共同关心的问题交换意见。', 1);
-- insert into blogs (title, content, userid) values ('尤文击败皇马今夏免签吕迪格，年薪700万欧', '吕迪格和切尔西的合同今夏到期，双方至今没有续约。《米体》称尤文已经敲定他，双方将签约四年，年薪700万欧，而且他在尤文可以大幅减税。', 4);
-- insert into blogs (title, content, userid) values ('中美元首视频通话释放这些信号', '国家主席习近平18日晚应约同美国总统拜登视频通话,两国元首就中美关系和乌克兰局势等共同关心的问题坦诚深入交换了意见', 5);


-- 更新
-- update users set `password`='samsung' where id=6;


-- 删除
-- delete from users where id=2;


-- 连表查询
select * from blogs inner join users on users.id = blogs.userid;  -- 不一定有外键
-- 指定条件连表查询
select blogs.*, users.username,users.nickname
from blogs inner join users on users.id = blogs.userid
where users.username = '中国YYDS';
```

# redis
- 内存数据库（mysql是硬盘数据库）

## 启动redis
`redis-server`

## 查看redis
`redis-cli`
```
// keys * 查看所有存入的redis key
// get key 查看对应key的值
// ttl key 查看对应key的过期时间
```


# 单元测试
- 单个功能或接口，给定输入，得到输出。看输出是否符合要求
- 需手动编写用例代码，然后统一执行
- 意义： 能一次性执行所有单测，短时间内验证所有功能是否正常
## 使用 jest
- *.test.js 文件
- 常用的断言
- 测试 http 接口

安装`npm i jest -D`

网络请求测试：安装`npm i supertest - D`

# jwt vs session
- 为了解决：登录 & 存储登录用户的信息
- jwt 用户信息加密存储在客户端，不依赖 cookie，可跨域
- session 用户信息存储在服务端，依赖 cookie，默认不可跨域



# 技术方案设计
- 架构设计
    架构是什么，模块之间怎么划分，层次是什么，什么样的先后顺序关系，什么样的引用连接关系等
- 页面（模板，路由）和API设计
    系统分为多少个页面，每个页面是通过哪些模板组成的，是什么样的路由，以及这个系统中后端需要提供的哪些API得知道，比如有个API叫关注，有个API叫加载更多，有个API叫登录叫注册等
- 数据模型设计
    我们这个数据在存储的时候到底要怎么划分，比如说我们要建几个表，表和表之间有什么关系
    - 四张表：blogs users userRelations blogRelations
    - 各个表之间的关系(外键)
    - 记住“三大范式”

## 页面和API




# 功能列表
- 用户管理(登录和注册)
- 用户设置(修改基本信息，修改密码，退出登录)
- 创建微博，暂不显示微博列表
- 个人主页，显示个人微博列表和个人信息，暂不做关注功能
- 广场页(使用缓存)
- 关注和取消关注，显示粉丝和关注人
- 首页
- @ 和回复
- @ 提到我的

## 用户管理
- 页面：模板和路由
- 数据建模
- 开发注册功能
- 开发登录功能
- 抽离 loginCheck 中间件
- 单元测试

### 页面：模板和路由

### 数据建模
遇到了seq.sync无法同步，报错显示`No database selected`

### 开发注册功能
- 开发注册接口
- 密码加密 & 用户信息验证
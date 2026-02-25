# Shanghe Corporate Website MVP (Next.js + PostgreSQL + Docker)

一个从 0 开始的公司官网骨架 + 可跑 MVP，支持多语言、后台管理、新闻、联系表单、比赛报名与导出。

## 技术栈
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Docker / Docker Compose

## 核心能力
- 多语言路由：`/zh` `/en` `/ru`（语言配置在 `lib/i18n.ts`，可扩展）
- 前台页面：home/about/services/projects/platforms/news/news detail/contact/competition
- 响应式：桌面与手机适配（移动端汉堡菜单，卡片自动 1 列）
- 后台：`/admin` 登录，管理页面内容/新闻，查看联系提交和比赛报名
- 比赛页：PDF 下载（按 locale 回退）、报名入库、后台 CSV 导出
- 表单防垃圾：honeypot + 简单内存限流

## 快速开始（本地）

### 方式 A（推荐开发）
1. 复制环境变量：
```bash
cp .env.example .env
```
2. 启动数据库：
```bash
docker compose up -d db
```
3. 安装依赖并迁移：
```bash
npm install
npx prisma migrate deploy
npm run db:seed
```
4. 启动开发：
```bash
npm run dev
```
5. 打开：
- 前台: `http://localhost:3000/zh`
- 后台: `http://localhost:3000/admin/login`

默认管理员（可通过 `.env` 覆盖）：
- email: `admin@example.com`
- password: `Admin123456`

### 方式 B（容器一键）
```bash
docker compose up -d --build
```

## 里程碑验收

### 里程碑 1：骨架 + 多语言 + 响应式
- 检查路径：`/zh` `/en` `/ru`
- 点击 🌐 切换语言，保持当前页面路径
- 手机模式（DevTools：iPhone 12）下检查无横向滚动，汉堡菜单可用

### 里程碑 2：后台 + 新闻 CRUD
1. 登录 `/admin/login`
2. 进入 `/admin/news/new` 创建 zh/en/ru 新闻
3. 前台访问 `/zh/news` 与 `/zh/news/<slug>` 验证渲染

### 里程碑 3：联系表单闭环
1. 前台 `/zh/contact` 提交表单
2. 后台 `/admin/submissions` 查看记录

### 里程碑 4：比赛闭环
1. 首页点击“查看大赛详情”进入 `/zh/competition`
2. 点击下载资料（默认 `/files/competition.pdf`，支持 locale 文件回退）
3. 提交报名
4. 后台 `/admin/registrations` 查看记录
5. 点击 Export CSV 下载导出

## 多语言扩展
1. 在 `lib/i18n.ts` 添加新语言 code/nativeName
2. 在 `lib/dictionaries.ts` 补充文案
3. 在后台新闻/页面内容中填写新语言字段
4. 如需比赛资料多语言，添加 `public/files/competition_<locale>.pdf`

## 生产部署（阿里云/腾讯云 Ubuntu）

### 1) 安装 Docker
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# 重新登录
```

### 2) 拉代码并配置
```bash
git clone <your-repo-url>
cd Shanghe
cp .env.example .env
# 修改 ADMIN_EMAIL/ADMIN_PASSWORD
```

### 3) 启动
```bash
docker compose up -d --build
```

### 4) Nginx 反代
`/etc/nginx/sites-available/shanghe.conf` 示例：
```nginx
server {
  listen 80;
  server_name yourdomain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
启用后：
```bash
sudo ln -s /etc/nginx/sites-available/shanghe.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 5) HTTPS（Let's Encrypt）
```bash
sudo apt update && sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 故障排查
- 端口冲突：`sudo lsof -i :3000` / `:5432`
- 数据库连不上：检查 `DATABASE_URL` 是否指向 `db:5432`（容器内）
- 迁移失败：`docker compose logs app` 查看报错，执行 `npx prisma migrate deploy`
- 后台无法登录：确认已执行 `npm run db:seed` 且 `.env` 中管理员账号一致
- 文件下载404：确认 `public/files/competition.pdf` 存在

## DevTools 响应式验证
- Chrome 打开页面 -> F12 -> Toggle Device Toolbar
- 宽度 <=768 检查：菜单、表单按钮、无横向滚动
- 宽度 >=1024 检查：卡片 2~3 列显示


## 首页后台编辑入口
- 后台入口：`/admin/home`
- 支持编辑：Hero、四大业务、重点项目轮播、协同平台、计数器、About、Footer。
- 数据库存储：`HomePageConfig`；若为空自动使用 `lib/home.ts` 默认值。

## 首页验收步骤（本次重点）
1. 打开 `http://localhost:3000/zh`，检查 Hero/业务卡片/轮播/平台与计数器/About/Footer 都有内容。
2. 点击 Hero CTA“探索合作机遇”，应跳转到 `/zh/contact`。
3. DevTools 切到宽度 375，检查：汉堡菜单、轮播可滑动、业务卡片单列、无横向滚动。
4. 登录 `http://localhost:3000/admin/login` 后进入 `/admin/home` 修改任意文案或计数器，保存后刷新首页应生效。


## GitHub 冲突（你截图那批文件）的命令行快速解决
如果 GitHub 显示该分支与目标分支冲突，可在本地执行：

```bash
# 1) 切到你的工作分支
git checkout <your-branch>

# 2) 运行自动解决脚本（参数填目标分支，如 main / master）
./scripts/resolve-github-conflicts.sh main

# 3) 检查是否还有未解决冲突
git status

# 4) 若无未解决冲突，提交并推送
git commit -m "chore: resolve GitHub merge conflicts"
git push
```

脚本会优先处理你截图中那 10 个冲突文件，保留当前分支（home-focused 版本）内容。

# lovebyte.exe guide

关卡 4 的静态站点最小版本。当前包含：首页、Guide 导航、Beginner Guide、Minigames、Characters、Demo、Download 共 7 个页面。

## 本地运行

在项目根目录执行：

```bash
python3 -m http.server 8790 -d site
```

然后访问 `http://127.0.0.1:8790/`。8787 已被另一项目占用时不要使用该端口。

## 结构

```text
site/
├── index.html
├── styles.css
├── assets/lovebyte-hero.png
├── guide/index.html
├── guide/beginner/index.html
├── guide/minigames/index.html
├── characters/index.html
├── demo/index.html
├── download/index.html
├── robots.txt
└── sitemap.xml
```

## 切换自有域名时

当前 GitHub Pages 站点使用 `https://szwtest111.github.io`。如果后续接入自有域名，必须同步替换 `robots.txt` 和 `sitemap.xml`，并检查 canonical、robots 和 sitemap。

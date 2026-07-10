# Linux 翻墙教程 2026 — Clash 桌面版科学上网安装指南

> 📄 本文对应 HTML 页面：[Linux 教程](../docs/pages/linux-guide.html)　·　🌐 在线阅读：<https://www.aixiaobai168.com/pages/linux-guide>

2026 最新 Linux 科学上网教程。本文指导您在 Linux 桌面系统上安装和配置 Clash 代理工具。

- **适用系统**: Ubuntu、Debian、CentOS、Rocky Linux、Fedora等主流Linux发行版
- **架构支持**: amd64、arm64、armv7、armv5等
- **推荐阅读**: [Clash官方文档](https://github.com/Dreamacro/clash)

---

## 一、系统要求

- Linux内核 3.10+
- 至少50MB可用磁盘空间
- root或sudo权限

### 检查系统架构

```bash
# 查看系统架构
uname -m

# 常见架构对应关系：
# x86_64 → amd64
# aarch64 → arm64
# armv7l → armv7
# armv5l → armv5
```

---

## 二、下载Clash

### 方法一：使用wget下载（推荐）

> 说明：Dreamacro/clash 已下架（原 v1.18.0 下载链接已 404），以下命令改为 MetaCubeX/mihomo v1.19.27。

根据您的系统架构选择对应的版本：

```bash
# 创建下载目录
mkdir -p ~/clash-install
cd ~/clash-install

# AMD64架构（64位x86系统）
wget https://github.com/MetaCubeX/mihomo/releases/download/v1.19.27/mihomo-linux-amd64-v1.19.27.gz -O mihomo.gz

# ARM64架构（64位ARM系统，如树莓派4）
wget https://github.com/MetaCubeX/mihomo/releases/download/v1.19.27/mihomo-linux-arm64-v1.19.27.gz -O mihomo.gz

# ARMv7架构（32位ARM系统，如树莓派3）
wget https://github.com/Dreamacro/clash/releases/download/v1.18.0/clash-linux-armv7-v1.18.0.gz

# ARMv5架构（旧版ARM系统）
wget https://github.com/Dreamacro/clash/releases/download/v1.18.0/clash-linux-armv5-v1.18.0.gz
```

### 方法二：使用curl下载

```bash
# AMD64架构
curl -L -o mihomo.gz https://github.com/MetaCubeX/mihomo/releases/download/v1.19.27/mihomo-linux-amd64-v1.19.27.gz

# ARM64架构
curl -L -o mihomo.gz https://github.com/MetaCubeX/mihomo/releases/download/v1.19.27/mihomo-linux-arm64-v1.19.27.gz
```

### 方法三：从项目目录使用已下载的文件

如果项目目录中已有对应架构的Clash文件，可以直接使用：

```bash
# 假设文件在当前目录
cp ./clash-linux-amd64-v1.18.0 ~/clash-install/
```

---

## 三、安装Clash

### 1. 解压文件

```bash
cd ~/clash-install

# 解压.gz文件
gunzip mihomo.gz

# 或者使用gzip命令
gzip -d mihomo.gz
```

### 2. 设置执行权限

```bash
# 根据您的架构选择对应的文件
chmod +x mihomo
# 或
./mihomo -v
```

### 3. 移动到系统目录

```bash
# 移动到/usr/local/bin并重命名为clash
sudo mv mihomo /usr/local/bin/clash

# 验证安装
clash -v
```

---

## 四、创建配置目录和文件

### 1. 创建配置目录

```bash
# 创建Clash配置目录
mkdir -p ~/.config/clash

# 或者使用系统级配置目录（需要root权限）
sudo mkdir -p /etc/clash
```

### 2. 创建配置文件

创建基本配置文件 `~/.config/clash/config.yaml`：

```bash
cat > ~/.config/clash/config.yaml << 'EOF'
# Clash配置文件
# 端口配置
port: 7890
socks-port: 7891
allow-lan: false
mode: rule
log-level: info
external-controller: 127.0.0.1:9090

# DNS配置
dns:
  enable: true
  listen: 0.0.0.0:53
  enhanced-mode: fake-ip
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  fallback:
    - 8.8.8.8
    - 1.1.1.1

# 代理节点（需要替换为您的实际节点）
proxies:
  - name: "example"
    type: ss
    server: example.com
    port: 8388
    cipher: aes-256-gcm
    password: "password"

# 代理组
proxy-groups:
  - name: "PROXY"
    type: select
    proxies:
      - example
      - DIRECT

  - name: "DOMESTIC"
    type: select
    proxies:
      - DIRECT
      - PROXY

  - name: "OTHERS"
    type: select
    proxies:
      - PROXY
      - DIRECT

# 规则
rules:
  - DOMAIN-SUFFIX,google.com,PROXY
  - DOMAIN-SUFFIX,youtube.com,PROXY
  - DOMAIN-SUFFIX,github.com,PROXY
  - DOMAIN-SUFFIX,cn,DOMESTIC
  - GEOIP,CN,DOMESTIC
  - MATCH,OTHERS
EOF
```

### 3. 下载规则文件（可选）

```bash
cd ~/.config/clash

# 下载Country.mmdb（IP地理位置数据库）
wget -O Country.mmdb https://github.com/Dreamacro/maxmind-geoip/releases/latest/download/Country.mmdb
```

---

## 五、配置订阅（推荐）

如果您有Clash订阅链接，可以使用以下方法自动更新配置：

### 方法一：使用订阅转换服务

```bash
# 下载订阅配置（替换YOUR_SUBSCRIPTION_URL为您的订阅链接）
curl -L "YOUR_SUBSCRIPTION_URL" -o ~/.config/clash/config.yaml

# 或者使用订阅转换服务
curl -L "https://sub.xeton.dev/sub?target=clash&url=YOUR_SUBSCRIPTION_URL" -o ~/.config/clash/config.yaml
```

### 方法二：手动编辑配置文件

编辑 `~/.config/clash/config.yaml`，将您的节点信息添加到 `proxies` 部分。

---

## 六、启动Clash

### 1. 前台运行（测试用）

```bash
# 直接运行（前台运行，按Ctrl+C停止）
clash -d ~/.config/clash
```

### 2. 后台运行

```bash
# 使用nohup后台运行
nohup clash -d ~/.config/clash > ~/.config/clash/clash.log 2>&1 &

# 查看进程
ps aux | grep clash

# 查看日志
tail -f ~/.config/clash/clash.log
```

### 3. 使用systemd服务（推荐）

创建systemd服务文件：

```bash
sudo tee /etc/systemd/system/clash.service > /dev/null << 'EOF'
[Unit]
Description=Clash daemon
After=network.target

[Service]
Type=simple
User=YOUR_USERNAME
Restart=on-failure
ExecStart=/usr/local/bin/clash -d /home/YOUR_USERNAME/.config/clash

[Install]
WantedBy=multi-user.target
EOF
```

替换 `YOUR_USERNAME` 为您的实际用户名，然后：

```bash
# 重新加载systemd配置
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start clash

# 设置开机自启
sudo systemctl enable clash

# 查看状态
sudo systemctl status clash

# 查看日志
sudo journalctl -u clash -f
```

---

## 七、配置系统代理

### 方法一：环境变量（临时）

```bash
# 设置HTTP/HTTPS代理
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7891

# 测试代理
curl -I https://www.google.com

# 取消代理
unset http_proxy https_proxy all_proxy
```

### 方法二：修改shell配置文件（永久）

```bash
# 对于bash用户
cat >> ~/.bashrc << 'EOF'
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7891
EOF

# 对于zsh用户
cat >> ~/.zshrc << 'EOF'
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7891
EOF

# 重新加载配置
source ~/.bashrc  # 或 source ~/.zshrc
```

### 方法三：使用proxychains（推荐）

```bash
# 安装proxychains
sudo apt install proxychains4  # Debian/Ubuntu
sudo yum install proxychains-ng  # CentOS/Rocky

# 配置proxychains
sudo nano /etc/proxychains.conf

# 在文件末尾添加：
# socks5 127.0.0.1 7891

# 使用proxychains运行命令
proxychains4 curl https://www.google.com
```

### 方法四：配置桌面环境代理

**GNOME桌面**:
```bash
# 使用gsettings配置
gsettings set org.gnome.system.proxy mode 'manual'
gsettings set org.gnome.system.proxy.http host '127.0.0.1'
gsettings set org.gnome.system.proxy.http port 7890
gsettings set org.gnome.system.proxy.https host '127.0.0.1'
gsettings set org.gnome.system.proxy.https port 7890
gsettings set org.gnome.system.proxy.socks host '127.0.0.1'
gsettings set org.gnome.system.proxy.socks port 7891
```

**KDE桌面**:
通过系统设置 → 网络 → 代理，手动配置HTTP/HTTPS/SOCKS代理。

---

## 八、使用Clash Dashboard（Web管理界面）

### 1. 安装Clash Dashboard

```bash
cd ~/.config/clash

# 下载yacd（Yet Another Clash Dashboard）
git clone https://github.com/haishanh/yacd.git dashboard
# 或者下载zip包
wget https://github.com/haishanh/yacd/archive/refs/heads/master.zip
unzip master.zip
mv yacd-master dashboard
```

### 2. 访问Dashboard

确保Clash配置中启用了外部控制器：

```yaml
external-controller: 127.0.0.1:9090
```

然后在浏览器中访问：
- **yacd**: http://yacd.haishan.me/ 或本地部署的dashboard
- **Clash Dashboard**: http://clash.razord.top/

在Dashboard中设置API地址为：`http://127.0.0.1:9090`

---

## 九、验证安装

### 1. 检查Clash进程

```bash
ps aux | grep clash
```

### 2. 检查端口监听

```bash
# 检查Clash端口
netstat -tlnp | grep clash
# 或使用ss命令
ss -tlnp | grep clash

# 应该看到：
# 7890 (HTTP代理)
# 7891 (SOCKS代理)
# 9090 (API端口，如果启用)
```

### 3. 测试代理连接

```bash
# 测试HTTP代理
curl -x http://127.0.0.1:7890 https://www.google.com

# 测试SOCKS代理
curl --socks5 127.0.0.1:7891 https://www.google.com

# 检查IP地址
curl -x http://127.0.0.1:7890 https://api.ip.sb/ip
```

### 4. 查看Clash日志

```bash
# 如果使用systemd
sudo journalctl -u clash -f

# 如果使用nohup
tail -f ~/.config/clash/clash.log
```

---

## 十、常见问题

### 1. 权限问题

```bash
# 如果遇到权限错误，检查文件权限
ls -l /usr/local/bin/clash
ls -l ~/.config/clash/

# 确保clash可执行
sudo chmod +x /usr/local/bin/clash
```

### 2. 端口被占用

```bash
# 检查端口占用
sudo lsof -i :7890
sudo lsof -i :7891

# 修改配置文件中的端口
nano ~/.config/clash/config.yaml
```

### 3. 无法连接代理

- 检查Clash是否正常运行：`ps aux | grep clash`
- 检查配置文件语法：`clash -t -d ~/.config/clash`
- 查看日志文件排查错误
- 确认节点配置正确

### 4. DNS解析失败

```bash
# 检查DNS配置
cat ~/.config/clash/config.yaml | grep -A 10 dns:

# 测试DNS
nslookup google.com 127.0.0.1
```

### 5. 配置文件测试

```bash
# 测试配置文件语法
clash -t -d ~/.config/clash
```

---

## 十一、更新Clash

```bash
# 1. 停止当前运行的Clash
sudo systemctl stop clash  # 如果使用systemd
# 或
pkill clash

# 2. 下载新版本
cd ~/clash-install
wget https://github.com/Dreamacro/clash/releases/download/v1.18.0/clash-linux-amd64-v1.18.0.gz

# 3. 解压并替换
gunzip clash-linux-amd64-v1.18.0.gz
sudo mv clash-linux-amd64-v1.18.0 /usr/local/bin/clash
sudo chmod +x /usr/local/bin/clash

# 4. 重启服务
sudo systemctl start clash
```

---

## 十二、卸载Clash

```bash
# 1. 停止服务
sudo systemctl stop clash
sudo systemctl disable clash

# 2. 删除systemd服务文件
sudo rm /etc/systemd/system/clash.service
sudo systemctl daemon-reload

# 3. 删除二进制文件
sudo rm /usr/local/bin/clash

# 4. 删除配置文件（可选）
rm -rf ~/.config/clash

# 5. 删除下载文件
rm -rf ~/clash-install
```

---

## 参考资源

- **Clash GitHub**: https://github.com/Dreamacro/clash
- **Clash Premium**: https://github.com/Dreamacro/clash/releases
- **Clash Dashboard (yacd)**: https://github.com/haishanh/yacd
- **订阅转换服务**: https://sub.xeton.dev/
- **规则集**: https://github.com/Loyalsoldier/clash-rules

---

## 附录：快速安装脚本

创建一个快速安装脚本 `install-clash.sh`：

```bash
#!/bin/bash

# Clash快速安装脚本
ARCH=$(uname -m)
CLASH_VERSION="v1.18.0"
INSTALL_DIR="/usr/local/bin"
CONFIG_DIR="$HOME/.config/clash"

# 检测架构
case $ARCH in
    x86_64)
        CLASH_ARCH="amd64"
        ;;
    aarch64)
        CLASH_ARCH="arm64"
        ;;
    armv7l)
        CLASH_ARCH="armv7"
        ;;
    armv5l)
        CLASH_ARCH="armv5"
        ;;
    *)
        echo "不支持的架构: $ARCH"
        exit 1
        ;;
esac

echo "检测到系统架构: $ARCH ($CLASH_ARCH)"

# 下载Clash
echo "正在下载Clash..."
wget -q https://github.com/Dreamacro/clash/releases/download/${CLASH_VERSION}/clash-linux-${CLASH_ARCH}-${CLASH_VERSION}.gz -O /tmp/clash.gz

# 解压
echo "正在解压..."
gunzip /tmp/clash.gz

# 安装
echo "正在安装到 $INSTALL_DIR..."
sudo mv /tmp/clash ${INSTALL_DIR}/clash
sudo chmod +x ${INSTALL_DIR}/clash

# 创建配置目录
mkdir -p ${CONFIG_DIR}

# 验证安装
if command -v clash &> /dev/null; then
    echo "Clash安装成功！"
    clash -v
else
    echo "安装失败！"
    exit 1
fi

echo "配置文件目录: $CONFIG_DIR"
echo "请将配置文件放置到: $CONFIG_DIR/config.yaml"
```

使用方法：

```bash
chmod +x install-clash.sh
./install-clash.sh
```

---

完成！现在您已经成功在Linux系统上安装并配置了Clash。如有问题，请参考常见问题部分或查看Clash官方文档。


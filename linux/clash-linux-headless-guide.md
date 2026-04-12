# Linux 翻墙教程 2026 — 无 GUI 服务器版 Clash 完整安装教程

> 📄 本文对应 HTML 页面：[Linux 教程](../docs/pages/linux-guide.html)　·　🌐 在线阅读：<https://www.aixiaobai168.com/pages/linux-guide>

2026 最新 Linux 服务器科学上网教程。本文专为**无图形界面（Headless）的 Linux 服务器**设计，提供完整的命令行安装和配置指南。

- **适用系统**: Ubuntu Server、Debian、CentOS、Rocky Linux、Fedora等无GUI Linux发行版
- **架构支持**: amd64、arm64、armv7、armv5等
- **安装方式**: 纯命令行操作，无需图形界面

---

## 📋 目录

- [一、系统准备](#一系统准备)
- [二、下载和安装Clash](#二下载和安装clash)
- [三、配置文件设置](#三配置文件设置)
- [四、启动和管理Clash](#四启动和管理clash)
- [五、配置系统代理](#五配置系统代理)
- [六、验证和测试](#六验证和测试)
- [七、使用REST API管理](#七使用rest-api管理)
- [八、常见问题排查](#八常见问题排查)
- [九、一键安装脚本](#九一键安装脚本)

---

## 一、系统准备

### 1. 检查系统信息

```bash
# 查看系统架构
uname -m

# 查看系统版本
cat /etc/os-release

# 查看内核版本
uname -r
```

**架构对应关系**：
- `x86_64` → `amd64` (64位x86系统)
- `aarch64` → `arm64` (64位ARM系统，如树莓派4、云服务器)
- `armv7l` → `armv7` (32位ARM系统，如树莓派3)
- `armv5l` → `armv5` (旧版ARM系统)

### 2. 安装必要工具

```bash
# Debian/Ubuntu系统
sudo apt update
sudo apt install -y wget curl gunzip

# CentOS/Rocky Linux系统
sudo yum install -y wget curl gunzip
# 或使用dnf
sudo dnf install -y wget curl gunzip
```

### 3. 创建安装目录

```bash
# 创建临时安装目录
mkdir -p ~/clash-install
cd ~/clash-install
```

---

## 二、下载和安装Clash

### 方法一：手动安装（推荐学习）

#### 1. 下载Clash

根据您的系统架构选择对应的版本：

```bash
# 检测架构并下载（自动选择）
ARCH=$(uname -m)
CLASH_VERSION="v1.18.0"

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

echo "检测到架构: $ARCH，将下载: clash-linux-${CLASH_ARCH}-${CLASH_VERSION}.gz"

# 下载Clash
wget https://github.com/Dreamacro/clash/releases/download/${CLASH_VERSION}/clash-linux-${CLASH_ARCH}-${CLASH_VERSION}.gz
```

**或者手动下载**（如果自动检测失败）：

```bash
# AMD64架构
wget https://github.com/Dreamacro/clash/releases/download/v1.18.0/clash-linux-amd64-v1.18.0.gz

# ARM64架构
wget https://github.com/Dreamacro/clash/releases/download/v1.18.0/clash-linux-arm64-v1.18.0.gz

# ARMv7架构
wget https://github.com/Dreamacro/clash/releases/download/v1.18.0/clash-linux-armv7-v1.18.0.gz
```

#### 2. 解压和安装

```bash
# 解压文件
gunzip clash-linux-*-v1.18.0.gz

# 设置执行权限
chmod +x clash-linux-*-v1.18.0

# 移动到系统目录
sudo mv clash-linux-*-v1.18.0 /usr/local/bin/clash

# 验证安装
clash -v
```

如果看到版本信息，说明安装成功。

### 方法二：使用一键安装脚本

```bash
# 下载安装脚本
wget https://raw.githubusercontent.com/your-repo/clash-install.sh
chmod +x clash-install.sh
sudo ./clash-install.sh
```

---

## 三、配置文件设置

### 1. 创建配置目录

```bash
# 创建用户级配置目录（推荐）
mkdir -p ~/.config/clash

# 或创建系统级配置目录（需要root权限）
sudo mkdir -p /etc/clash
```

### 2. 下载IP地理位置数据库

```bash
cd ~/.config/clash

# 下载Country.mmdb（必需文件）
wget -O Country.mmdb https://github.com/Dreamacro/maxmind-geoip/releases/latest/download/Country.mmdb

# 验证文件
ls -lh Country.mmdb
```

### 3. 创建配置文件

#### 方法一：使用订阅链接（推荐）

如果您有Clash订阅链接：

```bash
# 直接下载订阅配置
curl -L "YOUR_SUBSCRIPTION_URL" -o ~/.config/clash/config.yaml

# 或使用订阅转换服务（如果订阅不是Clash格式）
curl -L "https://sub.xeton.dev/sub?target=clash&url=YOUR_SUBSCRIPTION_URL" -o ~/.config/clash/config.yaml
```

#### 方法二：手动创建配置文件

创建基本配置文件：

```bash
cat > ~/.config/clash/config.yaml << 'EOF'
# Clash配置文件 - 无GUI Linux系统专用
# 端口配置
port: 7890                    # HTTP代理端口
socks-port: 7891              # SOCKS5代理端口
allow-lan: false              # 不允许局域网连接（安全考虑）
mode: rule                    # 规则模式
log-level: info               # 日志级别
external-controller: 127.0.0.1:9090  # RESTful API端口

# DNS配置
dns:
  enable: true
  listen: 0.0.0.0:53
  enhanced-mode: fake-ip      # 使用fake-ip模式
  nameserver:
    - 223.5.5.5               # 阿里DNS
    - 119.29.29.29            # 腾讯DNS
    - 114.114.114.114         # 114DNS
  fallback:
    - 8.8.8.8                 # Google DNS
    - 1.1.1.1                 # Cloudflare DNS
    - tls://dns.rubyfish.cn:853
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4

# 代理节点（需要替换为您的实际节点）
proxies:
  - name: "example-ss"
    type: ss
    server: example.com
    port: 8388
    cipher: aes-256-gcm
    password: "your-password"
    udp: true

  - name: "example-vmess"
    type: vmess
    server: example.com
    port: 443
    uuid: your-uuid-here
    alterId: 0
    cipher: auto
    tls: true

# 代理组
proxy-groups:
  - name: "PROXY"
    type: select
    proxies:
      - example-ss
      - example-vmess
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

# 分流规则
rules:
  # 广告屏蔽
  - DOMAIN-SUFFIX,googlesyndication.com,REJECT
  - DOMAIN-SUFFIX,googletagmanager.com,REJECT
  
  # 国外网站走代理
  - DOMAIN-SUFFIX,google.com,PROXY
  - DOMAIN-SUFFIX,youtube.com,PROXY
  - DOMAIN-SUFFIX,github.com,PROXY
  - DOMAIN-SUFFIX,twitter.com,PROXY
  - DOMAIN-SUFFIX,facebook.com,PROXY
  
  # 国内网站直连
  - DOMAIN-SUFFIX,cn,DOMESTIC
  - DOMAIN-SUFFIX,baidu.com,DOMESTIC
  - DOMAIN-SUFFIX,qq.com,DOMESTIC
  - DOMAIN-SUFFIX,taobao.com,DOMESTIC
  
  # 地理位置规则
  - GEOIP,CN,DOMESTIC
  - GEOIP,LAN,DIRECT
  
  # 默认规则
  - MATCH,OTHERS
EOF
```

**重要提示**：请将配置文件中的示例节点替换为您的实际代理节点信息。

### 4. 验证配置文件

```bash
# 测试配置文件语法
clash -t -d ~/.config/clash

# 如果显示 "configuration file /home/username/.config/clash/config.yaml is OK"
# 说明配置文件格式正确
```

---

## 四、启动和管理Clash

### 方法一：使用systemd服务（推荐生产环境）

#### 1. 创建systemd服务文件

```bash
# 获取当前用户名
USERNAME=$(whoami)
HOME_DIR=$(eval echo ~$USERNAME)

# 创建服务文件
sudo tee /etc/systemd/system/clash.service > /dev/null << EOF
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network-online.target

[Service]
Type=simple
Restart=on-failure
RestartSec=5
User=${USERNAME}
Group=${USERNAME}
ExecStart=/usr/local/bin/clash -d ${HOME_DIR}/.config/clash

[Install]
WantedBy=multi-user.target
EOF
```

#### 2. 启动和管理服务

```bash
# 重新加载systemd配置
sudo systemctl daemon-reload

# 启动Clash服务
sudo systemctl start clash

# 设置开机自启
sudo systemctl enable clash

# 查看服务状态
sudo systemctl status clash

# 查看实时日志
sudo journalctl -u clash -f

# 停止服务
sudo systemctl stop clash

# 重启服务
sudo systemctl restart clash

# 禁用开机自启
sudo systemctl disable clash
```

### 方法二：使用nohup后台运行

```bash
# 后台运行并输出日志
nohup clash -d ~/.config/clash > ~/.config/clash/clash.log 2>&1 &

# 查看进程
ps aux | grep clash

# 查看日志
tail -f ~/.config/clash/clash.log

# 停止进程
pkill clash
```

### 方法三：使用screen（适合临时测试）

```bash
# 安装screen（如果没有）
sudo apt install screen  # Debian/Ubuntu
sudo yum install screen  # CentOS/Rocky

# 创建screen会话
screen -S clash

# 在screen中运行
clash -d ~/.config/clash

# 按 Ctrl+A 然后按 D 退出screen（进程继续运行）

# 重新连接screen
screen -r clash

# 查看所有screen会话
screen -ls
```

---

## 五、配置系统代理

### 1. 环境变量方式（推荐）

#### 临时设置（当前会话有效）

```bash
# 设置代理环境变量
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7891
export no_proxy=localhost,127.0.0.1,::1

# 验证设置
echo $http_proxy
echo $https_proxy
```

#### 永久设置（所有新会话有效）

```bash
# 检测当前使用的shell
SHELL_NAME=$(basename $SHELL)

if [ "$SHELL_NAME" = "bash" ]; then
    RC_FILE=~/.bashrc
elif [ "$SHELL_NAME" = "zsh" ]; then
    RC_FILE=~/.zshrc
else
    RC_FILE=~/.profile
fi

# 添加代理配置到shell配置文件
cat >> $RC_FILE << 'EOF'

# Clash代理配置
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7891
export no_proxy=localhost,127.0.0.1,::1
EOF

# 重新加载配置
source $RC_FILE
```

#### 创建代理开关脚本

```bash
# 创建代理启用脚本
cat > ~/clash-proxy-on.sh << 'EOF'
#!/bin/bash
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7891
export no_proxy=localhost,127.0.0.1,::1
echo "代理已启用"
EOF

# 创建代理禁用脚本
cat > ~/clash-proxy-off.sh << 'EOF'
#!/bin/bash
unset http_proxy
unset https_proxy
unset all_proxy
unset no_proxy
echo "代理已禁用"
EOF

# 设置执行权限
chmod +x ~/clash-proxy-on.sh
chmod +x ~/clash-proxy-off.sh

# 使用方法
source ~/clash-proxy-on.sh   # 启用代理
source ~/clash-proxy-off.sh  # 禁用代理
```

### 2. 使用proxychains（按需代理）

```bash
# 安装proxychains
sudo apt install proxychains4  # Debian/Ubuntu
sudo yum install proxychains-ng  # CentOS/Rocky

# 配置proxychains
sudo nano /etc/proxychains.conf

# 在文件末尾的 [ProxyList] 部分添加：
# socks5 127.0.0.1 7891

# 使用proxychains运行命令
proxychains4 curl https://www.google.com
proxychains4 wget https://www.google.com
```

### 3. 配置apt/yum使用代理（可选）

```bash
# 为apt配置代理（Debian/Ubuntu）
sudo tee /etc/apt/apt.conf.d/95proxies << 'EOF'
Acquire::http::Proxy "http://127.0.0.1:7890";
Acquire::https::Proxy "http://127.0.0.1:7890";
EOF

# 为yum配置代理（CentOS/Rocky）
sudo tee -a /etc/yum.conf << 'EOF'
proxy=http://127.0.0.1:7890
EOF
```

---

## 六、验证和测试

### 1. 检查Clash运行状态

```bash
# 检查进程
ps aux | grep clash | grep -v grep

# 检查端口监听
sudo netstat -tlnp | grep clash
# 或使用ss命令
sudo ss -tlnp | grep clash

# 应该看到以下端口：
# 7890 (HTTP代理)
# 7891 (SOCKS5代理)
# 9090 (RESTful API)
```

### 2. 测试代理连接

```bash
# 测试HTTP代理
curl -x http://127.0.0.1:7890 -I https://www.google.com

# 测试SOCKS5代理
curl --socks5 127.0.0.1:7891 -I https://www.google.com

# 检查当前IP地址（应该显示代理服务器IP）
curl -x http://127.0.0.1:7890 https://api.ip.sb/ip
curl -x http://127.0.0.1:7890 https://ipinfo.io/ip

# 检查IP地理位置
curl -x http://127.0.0.1:7890 https://ipinfo.io/json
```

### 3. 测试DNS解析

```bash
# 测试DNS（如果Clash配置了DNS监听53端口）
nslookup google.com 127.0.0.1

# 或使用dig
dig @127.0.0.1 google.com
```

### 4. 查看Clash日志

```bash
# 如果使用systemd
sudo journalctl -u clash -n 50 --no-pager
sudo journalctl -u clash -f

# 如果使用nohup
tail -f ~/.config/clash/clash.log

# 查看错误日志
sudo journalctl -u clash -p err
```

---

## 七、使用REST API管理

Clash提供了RESTful API，可以通过HTTP请求管理Clash。

### 1. 查看API文档

```bash
# Clash API默认地址
# http://127.0.0.1:9090

# 获取版本信息
curl http://127.0.0.1:9090/version

# 获取配置
curl http://127.0.0.1:9090/configs

# 获取代理列表
curl http://127.0.0.1:9090/proxies

# 获取代理组
curl http://127.0.0.1:9090/proxies/PROXY
```

### 2. 切换代理节点

```bash
# 切换到指定节点（需要知道节点名称）
curl -X PUT http://127.0.0.1:9090/proxies/PROXY \
  -H "Content-Type: application/json" \
  -d '{"name":"example-ss"}'

# 查看当前选择的节点
curl http://127.0.0.1:9090/proxies/PROXY
```

### 3. 测试节点延迟

```bash
# 测试所有节点延迟
curl http://127.0.0.1:9090/proxies/PROXY/delay?timeout=5000&url=http://www.gstatic.com/generate_204

# 测试指定节点
curl "http://127.0.0.1:9090/proxies/example-ss/delay?timeout=5000&url=http://www.gstatic.com/generate_204"
```

### 4. 重新加载配置

```bash
# 重新加载配置文件（修改config.yaml后）
curl -X PUT http://127.0.0.1:9090/configs \
  -H "Content-Type: application/json" \
  -d '{"path":"/home/username/.config/clash/config.yaml"}'
```

### 5. 创建管理脚本

```bash
# 创建Clash管理脚本
cat > ~/clash-manager.sh << 'EOF'
#!/bin/bash

API_URL="http://127.0.0.1:9090"

case "$1" in
    status)
        echo "=== Clash状态 ==="
        curl -s ${API_URL}/version | python3 -m json.tool
        ;;
    proxies)
        echo "=== 代理列表 ==="
        curl -s ${API_URL}/proxies | python3 -m json.tool
        ;;
    switch)
        if [ -z "$2" ]; then
            echo "用法: $0 switch <节点名称>"
            exit 1
        fi
        curl -X PUT ${API_URL}/proxies/PROXY \
          -H "Content-Type: application/json" \
          -d "{\"name\":\"$2\"}"
        echo "已切换到: $2"
        ;;
    test)
        echo "=== 测试节点延迟 ==="
        curl -s "${API_URL}/proxies/PROXY/delay?timeout=5000&url=http://www.gstatic.com/generate_204" | python3 -m json.tool
        ;;
    reload)
        curl -X PUT ${API_URL}/configs \
          -H "Content-Type: application/json" \
          -d '{"path":"'${HOME}'/.config/clash/config.yaml"}'
        echo "配置已重新加载"
        ;;
    *)
        echo "用法: $0 {status|proxies|switch|test|reload}"
        echo "  status  - 查看Clash状态"
        echo "  proxies - 查看代理列表"
        echo "  switch <节点> - 切换代理节点"
        echo "  test    - 测试节点延迟"
        echo "  reload  - 重新加载配置"
        exit 1
        ;;
esac
EOF

chmod +x ~/clash-manager.sh

# 使用方法
~/clash-manager.sh status
~/clash-manager.sh proxies
~/clash-manager.sh switch example-ss
~/clash-manager.sh test
```

---

## 八、常见问题排查

### 1. Clash无法启动

```bash
# 检查配置文件语法
clash -t -d ~/.config/clash

# 检查端口是否被占用
sudo lsof -i :7890
sudo lsof -i :7891
sudo lsof -i :9090

# 检查文件权限
ls -l /usr/local/bin/clash
ls -l ~/.config/clash/

# 查看详细错误日志
sudo journalctl -u clash -n 100
```

### 2. 代理无法连接

```bash
# 检查Clash是否运行
ps aux | grep clash

# 检查端口监听
sudo ss -tlnp | grep -E '7890|7891'

# 测试本地连接
curl -v -x http://127.0.0.1:7890 https://www.google.com

# 检查防火墙
sudo iptables -L -n
sudo firewall-cmd --list-all  # 如果使用firewalld
```

### 3. DNS解析失败

```bash
# 检查DNS配置
cat ~/.config/clash/config.yaml | grep -A 15 "dns:"

# 测试DNS
nslookup google.com 127.0.0.1

# 检查Country.mmdb文件
ls -lh ~/.config/clash/Country.mmdb
file ~/.config/clash/Country.mmdb
```

### 4. 节点连接超时

```bash
# 测试节点延迟
curl "http://127.0.0.1:9090/proxies/节点名称/delay?timeout=10000&url=http://www.gstatic.com/generate_204"

# 检查节点配置是否正确
cat ~/.config/clash/config.yaml | grep -A 10 "proxies:"

# 查看Clash日志中的错误信息
sudo journalctl -u clash | grep -i error
```

### 5. 配置文件格式错误

```bash
# 使用Clash内置工具验证
clash -t -d ~/.config/clash

# 检查YAML语法（需要安装yq工具）
# sudo apt install yq  # Debian/Ubuntu
# yq eval ~/.config/clash/config.yaml
```

### 6. 权限问题

```bash
# 确保Clash有执行权限
sudo chmod +x /usr/local/bin/clash

# 确保配置文件目录权限正确
chmod 755 ~/.config/clash
chmod 644 ~/.config/clash/config.yaml
chmod 644 ~/.config/clash/Country.mmdb

# 如果使用systemd，确保User和Group设置正确
sudo systemctl cat clash | grep -E "User|Group"
```

---

## 九、一键安装脚本

创建一个完整的自动化安装脚本：

```bash
cat > ~/install-clash-headless.sh << 'EOF'
#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量
CLASH_VERSION="v1.18.0"
INSTALL_DIR="/usr/local/bin"
CONFIG_DIR="$HOME/.config/clash"
SERVICE_FILE="/etc/systemd/system/clash.service"

echo -e "${GREEN}=== Clash 无GUI Linux安装脚本 ===${NC}"

# 1. 检测系统架构
echo -e "${YELLOW}[1/7] 检测系统架构...${NC}"
ARCH=$(uname -m)
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
        echo -e "${RED}不支持的架构: $ARCH${NC}"
        exit 1
        ;;
esac
echo -e "${GREEN}检测到架构: $ARCH ($CLASH_ARCH)${NC}"

# 2. 检查必要工具
echo -e "${YELLOW}[2/7] 检查必要工具...${NC}"
for cmd in wget curl gunzip; do
    if ! command -v $cmd &> /dev/null; then
        echo -e "${YELLOW}安装 $cmd...${NC}"
        if command -v apt &> /dev/null; then
            sudo apt update && sudo apt install -y $cmd
        elif command -v yum &> /dev/null; then
            sudo yum install -y $cmd
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y $cmd
        fi
    fi
done

# 3. 下载Clash
echo -e "${YELLOW}[3/7] 下载Clash...${NC}"
TMP_DIR=$(mktemp -d)
cd $TMP_DIR
wget -q https://github.com/Dreamacro/clash/releases/download/${CLASH_VERSION}/clash-linux-${CLASH_ARCH}-${CLASH_VERSION}.gz -O clash.gz

# 4. 安装Clash
echo -e "${YELLOW}[4/7] 安装Clash...${NC}"
gunzip clash.gz
chmod +x clash
sudo mv clash ${INSTALL_DIR}/clash

# 验证安装
if ! clash -v &> /dev/null; then
    echo -e "${RED}安装失败！${NC}"
    exit 1
fi
echo -e "${GREEN}Clash安装成功: $(clash -v)${NC}"

# 5. 创建配置目录和文件
echo -e "${YELLOW}[5/7] 创建配置文件...${NC}"
mkdir -p ${CONFIG_DIR}

# 下载Country.mmdb
if [ ! -f ${CONFIG_DIR}/Country.mmdb ]; then
    echo "下载Country.mmdb..."
    wget -q -O ${CONFIG_DIR}/Country.mmdb https://github.com/Dreamacro/maxmind-geoip/releases/latest/download/Country.mmdb
fi

# 创建示例配置文件（如果不存在）
if [ ! -f ${CONFIG_DIR}/config.yaml ]; then
    echo "创建示例配置文件..."
    cat > ${CONFIG_DIR}/config.yaml << 'CONFIG_EOF'
port: 7890
socks-port: 7891
allow-lan: false
mode: rule
log-level: info
external-controller: 127.0.0.1:9090

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

proxies: []
proxy-groups:
  - name: "PROXY"
    type: select
    proxies: []
rules:
  - MATCH,DIRECT
CONFIG_EOF
    echo -e "${YELLOW}请编辑 ${CONFIG_DIR}/config.yaml 添加您的代理节点${NC}"
fi

# 6. 创建systemd服务
echo -e "${YELLOW}[6/7] 创建systemd服务...${NC}"
USERNAME=$(whoami)
HOME_DIR=$(eval echo ~$USERNAME)

sudo tee ${SERVICE_FILE} > /dev/null << SERVICE_EOF
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network-online.target

[Service]
Type=simple
Restart=on-failure
RestartSec=5
User=${USERNAME}
Group=${USERNAME}
ExecStart=${INSTALL_DIR}/clash -d ${CONFIG_DIR}

[Install]
WantedBy=multi-user.target
SERVICE_EOF

sudo systemctl daemon-reload

# 7. 完成
echo -e "${YELLOW}[7/7] 完成安装${NC}"
echo -e "${GREEN}=== 安装完成 ===${NC}"
echo ""
echo "配置文件位置: ${CONFIG_DIR}/config.yaml"
echo "Country.mmdb: ${CONFIG_DIR}/Country.mmdb"
echo ""
echo "常用命令:"
echo "  启动服务: sudo systemctl start clash"
echo "  停止服务: sudo systemctl stop clash"
echo "  查看状态: sudo systemctl status clash"
echo "  查看日志: sudo journalctl -u clash -f"
echo "  开机自启: sudo systemctl enable clash"
echo ""
echo -e "${YELLOW}请编辑配置文件添加您的代理节点后启动服务${NC}"

# 清理临时文件
rm -rf $TMP_DIR
EOF

chmod +x ~/install-clash-headless.sh
```

**使用安装脚本**：

```bash
# 运行安装脚本
~/install-clash-headless.sh

# 或直接下载运行
curl -L https://your-domain.com/install-clash-headless.sh | bash
```

---

## 十、快速参考命令

### 服务管理

```bash
# 启动
sudo systemctl start clash

# 停止
sudo systemctl stop clash

# 重启
sudo systemctl restart clash

# 状态
sudo systemctl status clash

# 开机自启
sudo systemctl enable clash

# 禁用自启
sudo systemctl disable clash

# 查看日志
sudo journalctl -u clash -f
```

### 代理管理

```bash
# 启用代理（当前会话）
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

# 禁用代理
unset http_proxy https_proxy

# 测试代理
curl -x http://127.0.0.1:7890 https://www.google.com
```

### 配置管理

```bash
# 编辑配置
nano ~/.config/clash/config.yaml

# 验证配置
clash -t -d ~/.config/clash

# 重新加载配置（通过API）
curl -X PUT http://127.0.0.1:9090/configs \
  -H "Content-Type: application/json" \
  -d '{"path":"'${HOME}'/.config/clash/config.yaml"}'
```

---

## 参考资源

- **Clash GitHub**: https://github.com/Dreamacro/clash
- **Clash Releases**: https://github.com/Dreamacro/clash/releases
- **Clash Wiki**: https://github.com/Dreamacro/clash/wiki
- **订阅转换服务**: https://sub.xeton.dev/
- **规则集**: https://github.com/Loyalsoldier/clash-rules

---

**完成！** 现在您已经掌握了在无GUI Linux系统上安装和配置Clash的完整方法。如有问题，请参考常见问题排查部分。


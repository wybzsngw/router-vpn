#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量（Dreamacro/clash 已下架，改用 MetaCubeX/mihomo 内核）
MIHOMO_VERSION="v1.19.27"
MIHOMO_REPO="MetaCubeX/mihomo"
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

# 3. 下载 Mihomo（Clash Meta 内核）
echo -e "${YELLOW}[3/7] 下载 Mihomo 内核...${NC}"
TMP_DIR=$(mktemp -d)
cd $TMP_DIR
MIHOMO_ASSET="mihomo-linux-${CLASH_ARCH}-${MIHOMO_VERSION}.gz"
wget -q "https://github.com/${MIHOMO_REPO}/releases/download/${MIHOMO_VERSION}/${MIHOMO_ASSET}" -O mihomo.gz

# 4. 安装为 clash 命令（保持与现有 systemd 单元和文档一致）
echo -e "${YELLOW}[4/7] 安装 Clash/Mihomo...${NC}"
gunzip mihomo.gz
MIHOMO_BIN="mihomo-linux-${CLASH_ARCH}-${MIHOMO_VERSION}"
chmod +x "${MIHOMO_BIN}"
sudo mv "${MIHOMO_BIN}" ${INSTALL_DIR}/clash

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
  listen: 127.0.0.1:1053
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


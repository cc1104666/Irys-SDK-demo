### Irys-sdk教学
以下示例将帮助你在最短时间内上手 Irys，通过bot和cli让你体验在 Irys 上存储数据的感受

#### 3 行代码在 Irys 上存储数据（核心思路）

```javascript
const irys = new NodeIrys({ url: 'https://node1.irys.xyz', token: 'ethereum', key: privateKey });
await irys.ready();
const receipt = await irys.upload("Hello Irys!");
```
说明：上面仅展示核心 3 行。完整可运行示例见下方BOT 与 CLI 章节。
```
irys_demo/
├── README.md                 # 本文件
├── node-cli/                 # Node.js CLI 应用
├── bot/                      # 自动化机器人
├── server-upload/            # 服务器上传方案
└── query-tool.html          # 数据查询工具
```
## 🛠️ 快速开始指南
首先准备node环境：https://nodejs.org/zh-cn/download/（直接下载最新版本即可）

### 1. 服务器上传方案

这是最稳定的方案，避免浏览器模块加载问题：

```bash
git clone https://github.com/cc1104666/Irys-SDK-demo.git
cd server-upload
cp ENV.EXAMPLE .env
# 编辑 .env 文件，添加你的私钥
npm install
npm start
# 打开 http://localhost:3001
```
<img width="1919" height="958" alt="image" src="https://github.com/user-attachments/assets/343f1aa8-4c2b-4747-bf6d-6718acd20338" />


### 2. CLI 

```bash
cd node-cli
cp ENV.EXAMPLE .env
# 编辑 .env 文件，添加你的私钥
npm install
node index.mjs
```
<img width="1231" height="384" alt="image" src="https://github.com/user-attachments/assets/a33dc185-5f28-4024-96cc-29e0affd6bbd" />

### 3. Bot

```bash
cd irys_demo/bot
cp ENV.EXAMPLE .env
# 编辑 .env 文件，添加你的私钥和配置
npm install
node bot.mjs
```
<img width="947" height="212" alt="image" src="https://github.com/user-attachments/assets/e59197c3-6e2e-4f1e-9fbb-be7bac632577" />

## 🔧 配置说明

### 环境变量

所有项目都需要以下环境变量：

```bash
# 私钥（EVM 格式：0x... 或 Solana 格式：base58）
PRIVATE_KEY=your_private_key_here

# Irys 配置
IRYS_TOKEN=ethereum          # 支持的代币：ethereum, matic, arbitrum, base, bsc, avalanche, solana
IRYS_BUNDLER_URL=https://node1.irys.xyz
IRYS_PROVIDER_URL=https://testnet-rpc.irys.xyz/v1/execution-rpc  # 可选，用于自定义 RPC
```

### 私钥格式

- **EVM 代币** (ethereum, matic, arbitrum, base, bsc, avalanche): 使用 `0x` 开头的私钥
- **Solana**: 使用 base58 格式的私钥

## 🌐 查询上传的数据

### 方法 1: 使用 Arweave Gateway

上传成功后，你会得到一个交易 ID，可以通过以下方式查看：

```
https://gateway.irys.xyz/{transaction_id}
```

例如：
```
https://gateway.irys.xyz/ku2UIw6_l_hgJ2aQij6PntUOxHz8iU8iPeZTblzryeA
```

### 方法 2: 使用代码查询

```javascript
// 获取数据
const response = await fetch(`https://gateway.irys.xyz/${transactionId}`);
const data = await response.text();
console.log('上传的数据:', data);

// 获取元数据
const metadataResponse = await fetch(`https://gateway.irys.xyz/${transactionId}/metadata`);
const metadata = await metadataResponse.json();
console.log('交易元数据:', metadata);
```

### 方法 3: 使用 Irys SDK

```javascript
const irys = new NodeIrys({ url: 'https://node1.irys.xyz', token: 'ethereum', key: privateKey });
await irys.ready();

// 获取交易信息
const tx = await irys.getTransaction(transactionId);
console.log('交易信息:', tx);

// 获取数据
const data = await irys.getData(transactionId);
console.log('数据内容:', data);
```

### 方法 4: 使用查询工具

打开 `irys_demo/query-tool.html` 在浏览器中直接查询数据。

## 💰 支持的代币

Irys 支持以下代币进行支付：

### EVM 兼容链
- **ethereum** - Ethereum 
- **matic** - Polygon
- **arbitrum** - Arbitrum One
- **base** - Base
- **bsc** - BNB Smart Chain
- **avalanche** - Avalanche C-Chain
- **optimism** - Optimism
- **polygon-zkevm** - Polygon zkEVM
- **mantle** - Mantle
- **linea** - Linea
- **scroll** - Scroll
- **zksync** - zkSync Era
- **opbnb** - opBNB
- **manta** - Manta Pacific
- **kroma** - Kroma
- **fraxtal** - Fraxtal
- **mode** - Mode
- **blast** - Blast
- **degen** - Degen Chain
- **xai** - Xai
- **redstone** - Redstone
- **lisk** - Lisk
- **astar** - Astar
- **polygon-amoy** - Polygon Amoy
- **polygon-bombay** - Polygon Bombay
- **polygon-cardona** - Polygon Cardona
- **polygon-mumbai** - Polygon Mumbai
- **polygon-sepolia** - Polygon Sepolia
- **arbitrum-sepolia** - Arbitrum Sepolia
- **base-sepolia** - Base Sepolia
- **bsc-testnet** - BSC Testnet
- **avalanche-fuji** - Avalanche Fuji
- **optimism-sepolia** - Optimism Sepolia
- **mantle-sepolia** - Mantle Sepolia
- **linea-sepolia** - Linea Sepolia
- **scroll-sepolia** - Scroll Sepolia
- **zksync-sepolia** - zkSync Sepolia
- **opbnb-testnet** - opBNB Testnet
- **manta-sepolia** - Manta Sepolia
- **kroma-sepolia** - Kroma Sepolia
- **fraxtal-sepolia** - Fraxtal Sepolia
- **mode-sepolia** - Mode Sepolia
- **blast-sepolia** - Blast Sepolia
- **degen-testnet** - Degen Testnet
- **xai-testnet** - Xai Testnet
- **redstone-sepolia** - Redstone Sepolia
- **lisk-sepolia** - Lisk Sepolia
- **astar-shiden** - Astar Shiden

### 非 EVM 链
- **solana** - Solana
- **aptos** - Aptos

## 🔍 故障排除

### 常见错误

1. **"Unknown/Unsupported token"**
   - 确保 `IRYS_TOKEN` 使用支持的代币名称
   - 检查拼写是否正确

2. **"Non-base58 character"**
   - 对于 Solana，使用 base58 格式的私钥
   - 对于 EVM 代币，使用 `0x` 开头的私钥

3. **"Cannot read properties of undefined"**
   - 确保 MetaMask 已安装并启用
   - 检查网络连接

4. **CORS 错误**
   - 使用本地开发服务器而不是直接打开 HTML 文件
   - 或使用 `working-irys.html` 文件

5. **CDN 加载失败**
   - 推荐使用 `server-upload` 方案
   - 或使用 Vite 本地构建方案

### 推荐解决方案

**如果遇到浏览器端问题，推荐使用服务器上传方案：**

```bash
cd irys_demo/server-upload
cp ENV.EXAMPLE .env
# 编辑 .env 文件，添加你的私钥
npm install
npm start
# 打开 http://localhost:3001
```

这个方案避免了所有浏览器端的模块加载问题，是最稳定的选择。

### 获取测试代币

- **Irys Testnet**: 使用水龙头获取测试 IRYS 代币
- **其他测试网**: 使用相应的测试网水龙头

## 📚 更多资源

- [Irys 官方文档](https://docs.irys.xyz/)
- [Irys SDK 文档](https://docs.irys.xyz/build/programmability/js/quickstart)


## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License


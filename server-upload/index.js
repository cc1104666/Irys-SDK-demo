const express = require('express');
const cors = require('cors');
const { NodeIrys } = require('@irys/sdk');
require('dotenv').config();

const app = express();
const port = 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 初始化 Irys
let irys = null;

async function initIrys() {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const token = process.env.IRYS_TOKEN || 'ethereum';
    const url = process.env.IRYS_BUNDLER_URL || 'https://node1.irys.xyz';
    
    if (!privateKey) {
      throw new Error('PRIVATE_KEY 环境变量未设置');
    }
    
    // 验证私钥格式
    if (token === 'solana' && !privateKey.match(/^[1-9A-HJ-NP-Za-km-z]+$/)) {
      throw new Error('Solana 私钥必须是 base58 格式');
    } else if (token !== 'solana' && !privateKey.startsWith('0x')) {
      throw new Error('EVM 私钥必须以 0x 开头');
    }
    
    irys = new NodeIrys({ url, token, key: privateKey });
    await irys.ready();
    
         console.log('Irys 初始化成功');
     console.log('地址:', irys.address);
     try {
       const balance = await irys.getLoadedBalance();
       console.log('余额:', balance.toString());
     } catch (e) {
       console.log('获取余额失败:', e.message);
       console.log('继续运行服务器...');
     }
    
  } catch (error) {
    console.error('Irys 初始化失败:', error.message);
    process.exit(1);
  }
}

// API 路由
app.get('/api/status', async (req, res) => {
  try {
    if (!irys) {
      return res.json({ status: 'error', message: 'Irys 未初始化' });
    }
    
    const address = irys.address;
    let balance = '0';
    
    try {
      const balanceResult = await irys.getLoadedBalance();
      balance = balanceResult.toString();
    } catch (e) {
      console.log('获取余额失败:', e.message);
    }
    
    res.json({
      status: 'success',
      address,
      balance,
      token: process.env.IRYS_TOKEN || 'ethereum'
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ status: 'error', message: '缺少 content 参数' });
    }
    
    if (!irys) {
      return res.status(500).json({ status: 'error', message: 'Irys 未初始化' });
    }
    
    console.log('正在上传:', content);
    
    const receipt = await irys.upload(content);
    
    console.log('上传成功:', receipt.id);
    
    res.json({
      status: 'success',
      id: receipt.id,
      url: `https://gateway.irys.xyz/${receipt.id}`,
      message: '上传成功'
    });
    
  } catch (error) {
    console.error('上传失败:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/balance', async (req, res) => {
  try {
    if (!irys) {
      return res.status(500).json({ status: 'error', message: 'Irys 未初始化' });
    }
    
    try {
      const balance = await irys.getLoadedBalance();
      res.json({
        status: 'success',
        balance: balance.toString(),
        formatted: (parseInt(balance) / Math.pow(10, 18)).toFixed(6)
      });
    } catch (e) {
      res.json({
        status: 'error',
        message: '获取余额失败: ' + e.message,
        balance: '0',
        formatted: '0.000000'
      });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 启动服务器
async function startServer() {
  await initIrys();
  
  app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
    console.log('API 端点:');
    console.log('  GET  /api/status   - 获取状态');
    console.log('  POST /api/upload   - 上传数据');
    console.log('  GET  /api/balance  - 获取余额');
  });
}

startServer().catch(console.error);

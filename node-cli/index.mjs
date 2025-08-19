import 'dotenv/config';
import { NodeIrys } from '@irys/sdk';

// Irys bundler 节点 URL（非 EVM RPC）。若不设置，默认使用公共节点。
const url = process.env.IRYS_BUNDLER_URL || 'https://node1.irys.xyz';
// 受支持的代币（例如：'ethereum', 'matic', 'arbitrum', 'base', 'bsc', 'avalanche' 等）。
const token = process.env.IRYS_TOKEN || 'ethereum';
// 可选：底层 EVM RPC（例如测试网 RPC），某些代币/网络需要。
const providerUrl = process.env.IRYS_PROVIDER_URL;
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
  throw new Error('未设置 PRIVATE_KEY');
}
if (token === 'solana') {
  if (privateKey.startsWith('0x')) {
    throw new Error('检测到 EVM 私钥，但当前 IRYS_TOKEN=solana。请提供 Solana base58 私钥（通常是长串，不以 0x 开头）。');
  }
} else {
  if (!privateKey.startsWith('0x')) {
    throw new Error('请在 .env 中设置有效的 EVM 私钥：PRIVATE_KEY=0x...（或将 IRYS_TOKEN=solana 并改用 Solana base58 私钥）');
  }
}

const irys = new NodeIrys({ url, token, key: privateKey, providerUrl });
await irys.ready();

const dataToUpload = process.argv[2] ?? 'Hello, Irys!';
const receipt = await irys.upload(dataToUpload);
console.log('已上传到 Irys，交易ID：', receipt?.id);


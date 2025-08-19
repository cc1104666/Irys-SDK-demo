### Irys-sdk教学
以下示例将帮助你在最短时间内上手 Irys，通过bot和cli让你体验在 Irys 上存储数据的感受

#### 3 行代码在 Irys 上存储数据（核心思路）

```javascript
const irys = new NodeIrys({ url: 'https://node1.irys.xyz', token: 'ethereum', key: privateKey });
await irys.ready();
const receipt = await irys.upload("Hello Irys!");
```
说明：上面仅展示核心 3 行。完整可运行示例见下方BOT 与 CLI 章节。
---

### 目录
- Node CLI：`irys_demo/node-cli`
- Web dApp：`irys_demo/web-dapp`
- 小工具（Widget，可内嵌页面/iframe）：`irys_demo/widget`
- 机器人（Bot）：`irys_demo/bot`

---

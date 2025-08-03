const fs = require('fs');
const path = require('path');

// 读取wallet.txt地址
const txtPath = path.join(__dirname, 'wallet.txt');
const addresses = fs.readFileSync(txtPath, 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line);

// 读取并更新wallet.json
const jsonPath = path.join(__dirname, 'wallet.json');
const walletData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 生成带序号的钱包配置
walletData.wallets = addresses.map((addr, index) => ({
  name: `wallet${index + 1}`,
  privatekey: addr
}));

// 写入更新后的JSON
fs.writeFileSync(jsonPath, JSON.stringify(walletData, null, 2), 'utf8');
console.log(`成功导入${addresses.length}个钱包地址`);
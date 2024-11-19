# 🎨 NFT Lending Platform

<div align="center">

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.19-brightgreen)](https://docs.soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.17.0-yellow)](https://hardhat.org/)

*Transform your NFTs into working capital*
</div>

## 🚀 Quick Start

```bash
# Get the project
git clone <repository-url>

# Install dependencies
npm install

# Start development
npm run dev
```

## 💡 What is This Project?

This platform allows NFT holders to use their digital assets as collateral for loans. Think of it as a pawnshop for your digital collectibles, but everything is automated and secure through smart contracts.

### 🎯 For NFT Holders
- 💰 Get loans using your NFTs as collateral
- 🎛️ Choose your loan terms
- 🔄 Repay at any time

### 💎 For Lenders
- 📈 Earn interest by providing loans
- 🛡️ Secured by NFT collateral
- 🎚️ Set your lending parameters

## 🛠️ Technical Setup

### Prerequisites
- Node.js (v16.0.0+)
- npm (v8.0.0+)
- MetaMask wallet

### Development Commands

```bash
# Compile smart contracts
npm run compile

# Run tests
npm test

# Deploy contracts
npm run deploy
```

## 📁 Project Structure

We keep things organized and modular:

```
📦 nft-lending-platform
 ┣ 📂 contracts        # Smart contract logic
 ┣ 📂 scripts         # Deployment scripts
 ┣ 📂 test           # Test suites
 ┗ 📂 artifacts      # Compiled contracts
```

## 🔧 Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Fill in your environment variables:
```env
PRIVATE_KEY=your_private_key_here
INFURA_API_KEY=your_infura_key_here
```

## 🧪 Testing

We take testing seriously. Run the full suite:

```bash
npm test
```

View test coverage:
```bash
npm run coverage
```

## 📚 Documentation

For detailed documentation on each feature:

- [Smart Contract Architecture](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📜 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by free4fun**

[Website](https://www.mauricio.com.es) · [Twitter](https://twitter.com/fr334fun) · [Discord](https://discordapp.com/users/free4fun)

</div>

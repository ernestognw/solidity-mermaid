<h1 align="center">Welcome to solidity-mermaid 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ernestognw/solidity-mermaid#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ernestognw/solidity-mermaid/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ernestognw/solidity-mermaid/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/ernestognw/solidity-mermaid" />
  </a>
</p>

> A Solidity AST parser that allows to convert smart contracts into Github's Mermaid.js language for diagramming.

[Solidity](https://docs.soliditylang.org/en/latest/index.html) is an object-oriented, high-level language for implementing smart contracts on top of the Ethereum Virtual Machine, while [Mermaid](https://mermaid.js.org/) is a Javascript library for diagramming that includes support for [Class Diagrams](https://mermaid.js.org/syntax/classDiagram.html).

This package aims to be a tool to produce Mermaid definitions from Solidity code, which can be useful for high-level representations, usefulf for audits and security assesment or just putting them on your generated docs. See [solidity-docgen](https://github.com/OpenZeppelin/solidity-docgen).

Take for example the following Solidity code:

```solidity
// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("GameItem", "ITM") {}

    function awardItem(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }
}
```

It will output the following representation:

```mermaid
classDiagram
  %% 216:471:12
  class GameItem {
    <<Contract>>
    +constructor()
    +awardItem(address player, string memory tokenURI): (uint256)
  }

  GameItem --|> ERC721URIStorage

  %% 248:1623:3
  class ERC721URIStorage {
    <<Contract>>
    +tokenURI(uint256 tokenId): (string memory)
    ~_setTokenURI(uint256 tokenId, string memory _tokenURI)
    ~_burn(uint256 tokenId)
  }

  ERC721URIStorage --|> ERC721

  %% 628:16327:0
  class ERC721 {
    <<Contract>>
    +constructor(string memory name_, string memory symbol_)
    +supportsInterface(bytes4 interfaceId): (bool)
    +balanceOf(address owner): (uint256)
    +ownerOf(uint256 tokenId): (address)
    +name(): (string memory)
    +symbol(): (string memory)
    +tokenURI(uint256 tokenId): (string memory)
    ~_baseURI(): (string memory)
    +approve(address to, uint256 tokenId)
    +getApproved(uint256 tokenId): (address)
    +setApprovalForAll(address operator, bool approved)
    +isApprovedForAll(address owner, address operator): (bool)
    +transferFrom(address from, address to, uint256 tokenId)
    +safeTransferFrom(address from, address to, uint256 tokenId)
    +safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
    ~_safeTransfer(address from, address to, uint256 tokenId, bytes memory data)
    ~_ownerOf(uint256 tokenId): (address)
    ~_exists(uint256 tokenId): (bool)
    ~_isApprovedOrOwner(address spender, uint256 tokenId): (bool)
    ~_safeMint(address to, uint256 tokenId)
    ~_safeMint(address to, uint256 tokenId, bytes memory data)
    ~_mint(address to, uint256 tokenId)
    ~_burn(uint256 tokenId)
    ~_transfer(address from, address to, uint256 tokenId)
    ~_approve(address to, uint256 tokenId)
    ~_setApprovalForAll(address owner, address operator, bool approved)
    ~_requireMinted(uint256 tokenId)
    -_checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory data): (bool)
    ~_beforeTokenTransfer(address from, address to, uint256, uint256 batchSize)
    ~_afterTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize)
  }

  ERC721 --|> Context

  %% 608:235:6
  class Context {
    <<Contract>>
    ~_msgSender(): (address)
    ~_msgData(): (bytes calldata)
  }

  ERC721 --|> ERC165

  %% 726:260:9
  class ERC165 {
    <<Contract>>
    +supportsInterface(bytes4 interfaceId): (bool)
  }

  ERC165 --|> IERC165

  %% 405:447:10
  class IERC165 {
    <<Interface>>
    #supportsInterface(bytes4 interfaceId): (bool)$
  }

  ERC721 --|> IERC721

  %% 250:4725:1
  class IERC721 {
    <<Interface>>
    #balanceOf(address owner): (uint256 balance)$
    #ownerOf(uint256 tokenId): (address owner)$
    #safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data)$
    #safeTransferFrom(address from, address to, uint256 tokenId)$
    #transferFrom(address from, address to, uint256 tokenId)$
    #approve(address to, uint256 tokenId)$
    #setApprovalForAll(address operator, bool _approved)$
    #getApproved(uint256 tokenId): (address operator)$
    #isApprovedForAll(address owner, address operator): (bool)$
  }

  IERC721 --|> IERC165

  %% 405:447:10
  class IERC165 {
    <<Interface>>
    #supportsInterface(bytes4 interfaceId): (bool)$
  }

  ERC721 --|> IERC721Metadata

  %% 297:463:4
  class IERC721Metadata {
    <<Interface>>
    #name(): (string memory)$
    #symbol(): (string memory)$
    #tokenURI(uint256 tokenId): (string memory)$
  }

  IERC721Metadata --|> IERC721

  %% 250:4725:1
  class IERC721 {
    <<Interface>>
    #balanceOf(address owner): (uint256 balance)$
    #ownerOf(uint256 tokenId): (address owner)$
    #safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data)$
    #safeTransferFrom(address from, address to, uint256 tokenId)$
    #transferFrom(address from, address to, uint256 tokenId)$
    #approve(address to, uint256 tokenId)$
    #setApprovalForAll(address operator, bool _approved)$
    #getApproved(uint256 tokenId): (address operator)$
    #isApprovedForAll(address owner, address operator): (bool)$
  }

  IERC721 --|> IERC165

  %% 405:447:10
  class IERC165 {
    <<Interface>>
    #supportsInterface(bytes4 interfaceId): (bool)$
  }
```

### 🏠 [Homepage](https://github.com/ernestognw/solidity-mermaid#readme)

## Getting started

> **Note**
> This repository is still in development, so there's no currently an installable, but keep an eye on [this issue](https://github.com/ernestognw/solidity-mermaid/issues/20)

Now to begin, clone the repo and then follow the next steps:

```sh
npm install
```

## Usage

The project currently includes only the example in the ERC20Output.json only.
This can be replaced in `src/index.js`, which then can get executed with:

```sh
npx ts-node src/index.js
```

## Run tests

Just run:

```sh
npm run test
```

## Author

👤 **Ernesto García <ernestognw@gmail.com>**

- Github: [@ernestognw](https://github.com/ernestognw)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ernestognw/solidity-mermaid/issues). You can also take a look at the [contributing guide](https://github.com/ernestognw/solidity-mermaid/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Ernesto García <ernestognw@gmail.com>](https://github.com/ernestognw).<br />
This project is [MIT](https://github.com/ernestognw/solidity-mermaid/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

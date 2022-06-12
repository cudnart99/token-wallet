// SPDX-License-Identifier: MIT;

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ZombieFactory is Ownable {
    uint256 dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    // khoảng thời gian được ăn giữa 2 lần
    uint cooldownTimeEat = 1 days;

    // khoảng thời gian giữa 2 lần tấn công
    uint cooldownTimeAttack = 5 minutes;

    // thời gian chết nếu ko được ăn
    uint256 dieTime = 30 days;

    uint randNonce = 0;

    // tỉ lệ chiến thắng
    uint attackVictoryProbability = 51;
    
    struct Zombie {
        string name;
        uint dna;
        uint32 level;

        // lưu thời gian ăn gần nhất
        uint32 readyTimeEat;

        // lưu thời gian tấn công gần nhất
        uint32 readyTimeAttack;

        // số lần thắng
        uint16 winCount;

        // số lần thua
        uint16 lossCount;

        // false nếu đang phòng thủ --- true nếu đang tấn công
        bool statusAttack;
    }

    Zombie[] public zombies;

    // từ id zom => địa chỉ sở hữu
    mapping (uint => address) public zombieToOwner;

    // từ địa chỉ => số zom đang sở hữu
    mapping (address => uint) ownerZombieCount;

    event NewZombie(uint zombieId, string name, uint dna);

    // hàm tạo zom (private)
    function _createZombie(string memory _name, uint _dna) internal {
        zombies.push(Zombie(_name, _dna, 1, uint32(block.timestamp), uint32(block.timestamp), 0, 0, false));
        uint256 id = zombies.length - 1;

        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;

        emit NewZombie(id, _name, _dna);
    }

    // hàm random adn cho zom
    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    // hàm privete thay đổi dna
    function _changeDNA(uint _zombieId, uint _dna) internal {
        zombies[_zombieId].dna = _dna;
    }

    // hàm tạo cho user call
    function createRandomZombie(string memory _name) internal {
        // require(ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
        
    }

}


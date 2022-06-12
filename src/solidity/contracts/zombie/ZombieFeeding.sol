// SPDX-License-Identifier: MIT;

pragma solidity ^0.8.0;

import "./ZombieFactory.sol";
import "./KittyInterface.sol";

// contract cho zom ăn để tiến hoá dna
contract ZombieFeeding is ZombieFactory {

    modifier ownerOf(uint _zombieId) {
        require(msg.sender == zombieToOwner[_zombieId]);
        _;
    }

    // hợp đồng kitty
    // address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
    KittyInterface kittyContract;

    // set địa chỉ "mèo"
    function setKittyContractAddress(address _address) external onlyOwner {
        kittyContract = KittyInterface(_address);
    }

    // lưu thời gian được ăn
    function _triggerCooldownEat(Zombie storage _zombie) internal {
       _zombie.readyTimeEat = uint32(block.timestamp + cooldownTimeEat);
    }

    // kiểm tra thời gian lần ăn tiếp theo
    function _isReadyEat(Zombie storage _zombie) internal view returns (bool) {
        return (_zombie.readyTimeEat <= block.timestamp);
    }

    // hàm cho zom ăn, (đầu vào: id zom, dna của vật bị ăn, chuỗi đánh dấu đặc biệt)
    function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) internal ownerOf(_zombieId) {
        // xác nhận quyền sở hữu
        require(msg.sender == zombieToOwner[_zombieId]);

        Zombie storage myZombie = zombies[_zombieId];
    
        // kiểm tra xem đã đến thời gian được ăn chưa
        require(_isReadyEat(myZombie));

        // tạo dna mới từ dna của vật bị ăn
        _targetDna = _targetDna % dnaModulus;
        uint newDna = (myZombie.dna + _targetDna) / 2;

        // xử lý chuỗi đặc biệt => nếu có chuỗi "kitty" thì thay 2 số cuối dna thành 99
        if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
            newDna = newDna - newDna % 100 + 99;
        }

        // _createZombie("NoName", newDna);
        _changeDNA(_zombieId, newDna);

        _triggerCooldownEat(myZombie);
    }

    // hàm cho ăn "kitty"
    function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint kittyDna;
        (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
        feedAndMultiply(_zombieId, kittyDna, "kitty");
  }

}
// SPDX-License-Identifier: MIT;

pragma solidity ^0.8.0;

import "./ZombieFeeding.sol";

contract ZombieHelper is ZombieFeeding {

    // uint levelUpFee = 0.001 ether;

    // kiểm tra level đang khoảng nào
    modifier aboveLevel(uint _level, uint _zombieId) {
        require(zombies[_zombieId].level >= _level);
        _;
    }

    modifier isDie(uint _zombieId) {
        require(zombies[_zombieId].readyTimeEat + dieTime >= block.timestamp);
        _;
    }


    // function withdraw() external onlyOwner {
    //     address payable _owner = payable(owner());
    //     _owner.transfer(address(this).balance);

    // }

    // function setLevelUpFee(uint _fee) external onlyOwner {
    //     levelUpFee = _fee;
    // }

    // function levelUp(uint _zombieId) external payable {
    //     require(msg.value == levelUpFee);
    //     zombies[_zombieId].level++;
    // }

    // nếu trên level 2, có thể gọi hàm này để thay đổi tên zom
    function changeName(uint _zombieId, string calldata _newName) external aboveLevel(2, _zombieId) ownerOf(_zombieId) isDie(_zombieId) {
        require(msg.sender == zombieToOwner[_zombieId]);
        zombies[_zombieId].name = _newName;
    }

    // nếu trên level 20, có thể gọi hàm này để thay đổi dna zom
    function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) ownerOf(_zombieId) isDie(_zombieId) {
        require(msg.sender == zombieToOwner[_zombieId]);
        zombies[_zombieId].dna = _newDna;
    }

    // lấy ra mảng Zombie các zom mà address đang sở hữu
    function getZombiesByOwner(address _owner) external view returns(Zombie[] memory) {
        Zombie[] memory result = new Zombie[](ownerZombieCount[_owner]);

        uint counter = 0;
        for (uint i = 0; i < zombies.length; i++) {
            if (zombieToOwner[i] == _owner) {
                result[counter] = zombies[i];
                counter++;
            }
        }
        return result;
    }

    // lấy ra mảng Zombie các zom đang tồn tại
    function getZombiesInitialized() public view returns(Zombie[] memory) {
        return zombies;
    }

}
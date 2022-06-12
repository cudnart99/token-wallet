// SPDX-License-Identifier: MIT;

pragma solidity ^0.8.0;

import "./ZombieHelper.sol";

contract ZombieAttack is ZombieHelper {
    
    // lưu thời gian tấn công
    function _triggerCooldownAttack(Zombie storage _zombie) internal {
       _zombie.readyTimeAttack = uint32(block.timestamp + cooldownTimeAttack);
    }

    // kiểm tra thời gian được tấn công
    function _isReadyAttack(Zombie storage _zombie) internal view returns (bool) {
        return (_zombie.readyTimeAttack <= block.timestamp);
    }

    function randMod(uint _modulus) internal returns(uint) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
    }

    // hàm nội bộ: hàm tấn công zom
    function attack(uint _zombieId, uint _targetId) internal ownerOf(_zombieId) isDie(_zombieId) isDie(_targetId) returns(bool) {
        // kiểm tra xem đã đang ở trạng thái tấn công ko
        require(zombies[_zombieId].statusAttack == true, "zombie is not in attack state yet");
        require(zombies[_targetId].statusAttack == true, "zombie is not in attack state yet");

        // kiểm tra xem đã đến thời gian tấn công chưa
        require(_isReadyAttack(zombies[_zombieId]));
        require(_isReadyAttack(zombies[_targetId]));
        
        Zombie storage myZombie = zombies[_zombieId];
        Zombie storage enemyZombie = zombies[_targetId];
        uint rand = randMod(100);

        if (rand <= attackVictoryProbability) {
            myZombie.winCount++;
            enemyZombie.lossCount++;
            feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
            _triggerCooldownAttack(zombies[_zombieId]);
            _triggerCooldownAttack(zombies[_targetId]);
            return true;
        } else {
            myZombie.lossCount++;
            enemyZombie.winCount++;
            _triggerCooldownAttack(zombies[_zombieId]);
            _triggerCooldownAttack(zombies[_targetId]);
            return false;
        }
    }
}
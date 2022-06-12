// SPDX-License-Identifier: MIT;

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ZombieAttack.sol";

contract PlayGame is ZombieAttack {
    
    IERC20 private _token;
    uint256 private _price;
    uint256 private _levelUpFeeBasic;
    uint256 private _winBonus;


    constructor(IERC20 token) {
        _token = token;
    }

    // set giá tạo mới 1 zombie --------- nên để 100
    function setPurchaseZombie(uint256 price) onlyOwner public {
        require(price > 0, "price must higher than zero");
        _price = price;
    }

    // set thưởng khi tấn công chiến thắng --------- nên để 5
    function setWinBonus(uint256 bonus) onlyOwner public {
        require(bonus > 0, "bonus must higher than zero");
        _winBonus = bonus;
    }

    // set phí để dùng ivi nâng cấp zom cơ bản ------- nên để 300 
    function setLevelUpFeeBasic(uint256 fee) onlyOwner public {
        require(fee > 0, "fee-basic must higher than zero");
        _levelUpFeeBasic = fee;
    }

    // tính số ivi cần để nâng lên level tiếp theo
    function getFeeUpgradeNextLevel(uint _zombieId) public view returns(uint256) {
        require(_levelUpFeeBasic > 0, "fee-basic  must higher than zero");
        return zombies[_zombieId].level * _levelUpFeeBasic;
    }

    // chuyển trạng thái "tấn công" -> "nghỉ" or ngược lại
    function setStatusAttack(uint _zombieId) public ownerOf(_zombieId) isDie(_zombieId) returns(bool) {
        zombies[_zombieId].statusAttack = !zombies[_zombieId].statusAttack;
        return zombies[_zombieId].statusAttack;
    } 

    // hàm nâng level
    function levelUp(uint _zombieId) public ownerOf(_zombieId) isDie(_zombieId) {
        
        address ownerOfZom = zombieToOwner[_zombieId];
        uint256 feeUpgradeNextLevel = getFeeUpgradeNextLevel(_zombieId);
        
        require(_token.allowance(ownerOfZom, address(this)) >= feeUpgradeNextLevel, "allowance for contract more than feeUpgradeNextLevel coin");
        _token.transferFrom(ownerOfZom, address(this), feeUpgradeNextLevel);
        zombies[_zombieId].level++;
    }

    // trước khi gọi hàm này, người tạo phải approve _price coin cho contract trước
    function createNewZombie(address creater, string memory _name) public {
        require(_price > 0, "_price must higher than zero");
        require(_token.allowance(creater, address(this)) >= _price, "allowance for contract more than _price coin");
        _token.transferFrom(creater, address(this), _price);
        createRandomZombie(_name);
    }

    // hàm tấn công, người thắng sẽ nhận được token thưởng
    function attackZombie(uint _zombieId, uint _targetId) public returns(bool) {
        bool result = attack(_zombieId, _targetId);
        if(result == true) {
            _token.transfer(zombieToOwner[_zombieId], _winBonus);
        } else {
            _token.transfer(zombieToOwner[_targetId], _winBonus);
        }

        return result;
    }

    

}
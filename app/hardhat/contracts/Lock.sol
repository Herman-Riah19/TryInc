// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

struct Product {
    mapping(address => uint) emmetter;
    uint price;
}

contract ProductBuy {
    mapping(uint => Product) product;
    mapping(address => uint) public balance; 

    event Sent(address owner, address receiver, uint amount);

    function sell(address receiver, uint keyProduct) public {
        Product storage prod = product[keyProduct];
        uint amount = prod.price;
        balance[msg.sender] -= amount;
        balance[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
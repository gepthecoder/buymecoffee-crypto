//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    // Event to emmit when memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received from friends
    Memo[] memos;

    // address of the contract deployer
    address payable owner;

    // runs only when deployed
    constructor() {
        owner = payable(msg.sender);
    }

    // buy a coffee for contract owner
    // _name -> coffee buyer
    // _message -> msg from coffee buyer
    // memory tells us we dont want the variable to keep around
    // anyone can call this function - public
    // make transactions - payable
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Cannot buy coffee with 0 ETH");

        // add the memo to storage
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        // emit new log event when a memo is created
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    // send the entire balance stored in this contract to the owner 
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    // retrieve all the memos received and stored on the blockchain
    // view -> saves gas -> does not change state on the blockchain
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }
}

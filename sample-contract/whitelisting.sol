pragma solidity ^0.8.7;

error OnlyAdminCanEdit();
error OnlyWhiteListedUsers();
error UserAlreadyClaimed();



contract Whitelisting{
    address public admin;
    mapping(address=>bool) whitelist;
    struct Reward{
        uint _reward;
        uint _stake;
        uint _stakedTime;
    }
    mapping  (address=>Reward) rewards;

    constructor (){
        admin= msg.sender;
    }

    event addToWhitelistEvent(address indexed users);
    event balanceUpdated(address indexed users,uint updatedBalance);

    function addToWhitelist(address _user) public onlyAdmin{
        whitelist[_user]= true;
        emit addToWhitelistEvent(_user);
    }

    function viewIsWhitelisted(address _user) public  view  returns(bool){
        return  whitelist[_user];
    }

    function claimReward() public onlyWhitelisted {
        if(rewards[msg.sender]._reward!=0) revert UserAlreadyClaimed();
        rewards[msg.sender]._reward = 100;
        emit balanceUpdated(msg.sender,rewards[msg.sender]._reward);
    }

    function stakeTokens(uint _amount) public  onlyWhitelisted{
        rewards[msg.sender]._stake+= _amount;
        rewards[msg.sender]._stakedTime= block.timestamp;
        rewards[msg.sender]._reward-=_amount;
        emit balanceUpdated(msg.sender,rewards[msg.sender]._reward);
       
    }

    function claimToken() public  onlyWhitelisted  {
        uint timeDiffrence=block.timestamp-rewards[msg.sender]._stakedTime;
        uint numberOfminiutes= timeDiffrence/60;
        rewards[msg.sender]._reward+= numberOfminiutes;
        emit balanceUpdated(msg.sender,rewards[msg.sender]._reward);

    }

    function viewMyRewards() public  view  returns (uint){
        return  rewards[msg.sender]._reward;
    }



    modifier onlyAdmin{
        if(msg.sender!= admin) revert OnlyAdminCanEdit();
        _;
    }

    modifier  onlyWhitelisted{
        if(whitelist[msg.sender] != true) revert OnlyWhiteListedUsers();
        _;
    }
}
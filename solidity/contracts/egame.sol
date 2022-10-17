pragma solidity ^0.8.17;

contract EGame {
    string public constant name = "EGame";
    string public constant symbol = "WEI";
    uint8 public constant decimals=0;
    

    event Approval(address indexed tokenOwner, address indexed spender, uint256 tokens);
    event Transfer(address indexed from, address indexed to, uint256 tokens);
    event scoreInserted(uint256 timestamp,uint256 score);
    event claimDone(uint256 timestamp,uint256 num_tokens,address receiver);

    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;

    mapping(address=> bool) isClaimed;  //to indicate if user has claimed his tokens for first game play
    uint256 totalSupply_;
    address payable  holdingWalletAddr;//the main master wallet
      
    mapping(address=>scoreInfo[]) scores;  //array for each user to add in the scores
    record[] public Records ;
    struct scoreInfo{
        
        
        uint256 timestamp; //timestamp is in unix timestamp
        uint256 score;
        
        
     }
     struct record{

        uint256 timestamp;
        uint256 amount_claimed;
        address player;
     }

     
    

    using SafeMath for uint256;

   constructor() {
        totalSupply_ = 100000000 * 10**decimals;
        holdingWalletAddr=payable (msg.sender);
        balances[holdingWalletAddr] = totalSupply_;   //the one who executes the contract is the owner and has all the tokens
   }

    

    
   function insertScore( uint256 score) public {
    
     scores[msg.sender].push(scoreInfo(block.timestamp,score));  //unix timestamp in seconds
     emit scoreInserted(block.timestamp, score);

   }

   function getScore() public view returns(scoreInfo[] memory){

    return scores[msg.sender];


   }

   
    
    

    function getClaimStatus(address receiver) public view returns(bool) {

        return isClaimed[receiver];
    }
  
    function claim() public {

        require(isClaimed[msg.sender]==false,"You have already claimed your tokens.");
        require(scores[msg.sender].length!=0,"You have not played any games to earn your scores"); //must have atleast 1 score in array
        scoreInfo memory p=scores[msg.sender][0];  //take the score from the first gameplay.(p.score) is how much token he shld get
        require((p.score* (10 ** decimals)) <= balances[holdingWalletAddr],"Sender has not enough funds" );
        
        balances[holdingWalletAddr] = balances[holdingWalletAddr].sub(p.score* (10 ** decimals));
        balances[msg.sender] = balances[msg.sender].add(p.score* (10 ** decimals));
        isClaimed[msg.sender]=true;

        Records.push(record(block.timestamp,p.score* (10 ** decimals),msg.sender));
        emit claimDone(block.timestamp, p.score* (10 ** decimals), msg.sender);

    }

   
    
    

    function balanceOf(address tokenOwner) public view returns (uint256) {
        return (balances[tokenOwner])/(10 ** decimals);
    }

    function transfer(address receiver, uint256 numTokens) public returns (bool) {
        
        
        
        require((numTokens* (10 ** decimals)) <= balances[msg.sender], "Sender there's no enough funds.");

        balances[msg.sender] = balances[msg.sender].sub(numTokens* (10 ** decimals));
        balances[receiver] = balances[receiver].add(numTokens* (10 ** decimals));
        emit Transfer(msg.sender, receiver, numTokens*(10 ** decimals));
        return true;
        
        
    }

    function approve(address delegate, uint256 numTokens) public returns (bool) {
        allowed[msg.sender][delegate] = numTokens* (10 ** decimals);
        emit Approval(msg.sender, delegate, numTokens* (10 ** decimals));
        return true;
    }

    function allowance(address owner, address delegate) public view returns (uint256) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public returns (bool) {
        require((numTokens* (10 ** decimals)) <= balances[owner], "Owner there's no enough funds.");
        require((numTokens* (10 ** decimals)) <= allowed[owner][msg.sender], "Sender there's no enough funds.");

        balances[owner] = balances[owner].sub(numTokens* (10 ** decimals));
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens* (10 ** decimals));
        balances[buyer] = balances[buyer].add(numTokens* (10 ** decimals));
        emit Transfer(owner, buyer, numTokens* (10 ** decimals));
        return true;
    }
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}
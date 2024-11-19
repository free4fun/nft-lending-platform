// SPDX-License-Identifier: GPLv4
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PoemBookNFT is ERC721, Ownable {
    constructor() ERC721("PoemBookNFT", "POEM") Ownable(msg.sender) {}
}

/*contract PoemBookNFT is ERC721URIStorage, ReentrancyGuard, Ownable {
    

    // Simple counter for token ids using uint256
    uint256 private _currentTokenId;

    // Structure for loans
    struct Loan {
        address borrower;
        uint256 startTime;
        uint256 duration;
        bool active;
        uint256 price;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Mappings
    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public userLoans;

    // Pay variables
    uint256 public platformFee = 5; // 5% fee
    address public platformWallet;
    uint256 public constant MINIMUM_LOAN_DURATION = 1 days;
    uint256 public constant MAXIMUM_LOAN_DURATION = 30 days;
    uint256 public baseLoanPrice = 0.01 ether;

    // Events
    event BookMinted(uint256 indexed tokenId, address indexed owner);
    event LoanStarted(uint256 indexed tokenId, address indexed borrower, uint256 duration);
    event LoanEnded(uint256 indexed tokenId, address indexed borrower);

    // Constructor
    constructor() ERC721("PoemBookNFT", "POEMASENLANOCHENFT") Ownable(msg.sender) {
        _currentTokenId = 0; // Initialize the counter
        platformWallet = msg.sender; // Set the platform wallet to the contract owner
        baseLoanPrice = 0.01 ether; // Set the base loan price to 0.01 ether
        platformFee = 5; // Set the platform fee to 5%
    }

    function tokenURI(uint256 tokenId) public view override (ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function mintBook(string memory uri) public onlyOwner returns (uint256) {
        _currentTokenId += 1;
        uint256 newTokenId = _currentTokenId;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        emit BookMinted(newTokenId, msg.sender);
        return newTokenId;
    }

    modifier validLoanDuration(uint256 duration) {
        require(duration >= MINIMUM_LOAN_DURATION, "Loan duration too short");
        require(duration <= MAXIMUM_LOAN_DURATION, "Loan duration too long");
        _;
    }

    modifier notCurrentlyLoaned(uint256 tokenId) {
        require(!loans[tokenId].active, "Book is currently loaned");
        _;
    }

    function startLoan(uint256 tokenId, uint256 duration) public payable validLoanDuration(duration) notCurrentlyLoaned(tokenId) {
        require(ownerOf(tokenId) != msg.sender, "Owner cannot borrow their own book");
        require(msg.value >= calculateLoanPrice(duration), "Insufficient funds to start loan");
        loans[tokenId] = Loan({borrower: msg.sender, startTime: block.timestamp, duration: duration, active: true, price: msg.value});
        userLoans[msg.sender].push(tokenId);
        emit LoanStarted(tokenId, msg.sender, duration);
    }

    function calculateLoanPrice(uint256 duration) public view returns (uint256) {
        return baseLoanPrice * duration /1 days;
    }

    function calculateFees(uint256 amount) internal view returns (uint256 ownerAmount, uint256 platformAmount) {
        platformAmount = amount * platformFee / 100;
        ownerAmount = amount - platformAmount;
    }

    function endLoan(uint256 tokenId) public nonReentrant {
        Loan storage loan = loans[tokenId];
        require (loan.active, "Loan is not active");
        require (msg.sender == loan.borrower, "Only borrower can end loan");
        require (block.timestamp >= loan.startTime + loan.duration, "Loan duration not yet reached");
        loan.active = false;
        (uint256 ownerAmount, uint256 platformAmount) = calculateFees(loan.price);

        // Transfer fees
        payable(ownerOf(tokenId)).transfer(ownerAmount);
        if(platformWallet != address(0)) {
            payable(platformWallet).transfer(platformAmount);
        }
        emit LoanEnded(tokenId, loan.borrower);
    }

    function setPlatformWallet(address _wallet) public onlyOwner {
        platformWallet = _wallet;
    }

    // View functions
    function getCurrentTokenId() public view returns (uint256) {
        return _currentTokenId;
    }

    function getLoanDetails(uint256 tokenId) public view returns (Loan memory) {
        return loans[tokenId];
    }

    function getUserLoans(address user) public view returns (uint256[] memory) {
        return userLoans[user];
    }
}*/
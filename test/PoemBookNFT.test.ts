import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { PoemBookNFT } from "../typechain-types";
import { ethers } from "hardhat";

describe("PoemBookNFT", function () {
  let poemBookNFT: PoemBookNFT;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;
  let MAXIMUM_LOAN_DURATION: bigint;
  let MINIMUM_LOAN_DURATION: bigint;
  let BASE_LOAN_PRICE: bigint;
  const URI = "ipfs://QmTest123";
  const ONE_DAY = 24n * 60n * 60n;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const PoemBookNFTFactory = await ethers.getContractFactory("PoemBookNFT");
    poemBookNFT = (await PoemBookNFTFactory.deploy()) as unknown as PoemBookNFT;
    await poemBookNFT.waitForDeployment();


    MAXIMUM_LOAN_DURATION = await poemBookNFT.MAXIMUM_LOAN_DURATION();
    MINIMUM_LOAN_DURATION = await poemBookNFT.MINIMUM_LOAN_DURATION();
    BASE_LOAN_PRICE = await poemBookNFT.baseLoanPrice();
  });

  it("Should deploy successfully", async function () {
    expect(await poemBookNFT.getAddress()).to.be.properAddress;
  });
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await poemBookNFT.owner()).to.equal(await owner.getAddress());
    });

    it("Should have correct name and symbol", async function () {
      expect(await poemBookNFT.name()).to.equal("PoemBookNFT");
      expect(await poemBookNFT.symbol()).to.equal("POEMASENLANOCHENFT");
    });

    it("Should set correct initial values", async function () {
      expect(await poemBookNFT.platformFee()).to.equal(5);
      expect(await poemBookNFT.baseLoanPrice()).to.equal(BASE_LOAN_PRICE);
      expect(await poemBookNFT.platformWallet()).to.equal(await owner.getAddress());
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint a new book", async function () {
      await expect(poemBookNFT.connect(owner).mintBook(URI))
        .to.emit(poemBookNFT, "BookMinted")
        .withArgs(1, await owner.getAddress());

      expect(await poemBookNFT.ownerOf(1n)).to.equal(await owner.getAddress());
      expect(await poemBookNFT.tokenURI(1n)).to.equal(URI);
    });

    it("Should not allow non-owner to mint", async function () {
      await expect(
        poemBookNFT.connect(addr1).mintBook(URI)
      ).to.be.revertedWithCustomError(poemBookNFT, "OwnableUnauthorizedAccount");
    });
  });

  describe("Loan System", function () {
    beforeEach(async function () {
      await poemBookNFT.connect(owner).mintBook(URI);
    });

    it("Should calculate correct loan price", async function () {
      const duration = BigInt(ONE_DAY * 2n); // 2 días
      const expectedPrice = BASE_LOAN_PRICE * 2n;
      expect(await poemBookNFT.calculateLoanPrice(duration)).to.equal(expectedPrice);
    });

    it("Should start a loan successfully", async function () {
      const duration = BigInt(ONE_DAY * 2n);
      const price = await poemBookNFT.calculateLoanPrice(duration);

      await expect(
        poemBookNFT.connect(addr1).startLoan(1n, duration, { value: price })
      )
        .to.emit(poemBookNFT, "LoanStarted")
        .withArgs(1n, await addr1.getAddress(), duration);

      const loan = await poemBookNFT.getLoanDetails(1n);
      expect(loan.borrower).to.equal(await addr1.getAddress());
      expect(loan.active).to.be.true;
      expect(loan.price).to.equal(price);
    });

    it("Should not allow loan with insufficient funds", async function () {
      const duration = BigInt(ONE_DAY * 2n);
      const price = ethers.parseEther("0.001"); // precio insuficiente

      await expect(
        poemBookNFT.connect(addr1).startLoan(1n, duration, { value: price })
      ).to.be.revertedWith("Insufficient funds to start loan");
    });

    describe("Loan End", function () {
      beforeEach(async function () {
        const duration = BigInt(ONE_DAY * 2n);
        const price = await poemBookNFT.calculateLoanPrice(duration);
        await poemBookNFT.connect(addr1).startLoan(1n, duration, { value: price });
      });

      it("Should end loan successfully after duration", async function () {
        await time.increase(ONE_DAY * 2n);

        const initialOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
        
        await expect(poemBookNFT.connect(addr1).endLoan(1n))
          .to.emit(poemBookNFT, "LoanEnded")
          .withArgs(1n, await addr1.getAddress());

        const loan = await poemBookNFT.getLoanDetails(1n);
        expect(loan.active).to.be.false;

        const finalOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
        expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
      });
    });
  });
});

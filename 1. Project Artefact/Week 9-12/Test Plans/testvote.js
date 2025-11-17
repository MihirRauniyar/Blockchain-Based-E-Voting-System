var eVote = artifacts.require("./eVote.sol");

contract("eVote", function(accounts) {
  var evoteInstance;
  
  it("starts with 0 candidates", function() {
    return eVote.deployed().then(function(instance) {
		evoteInstance = instance;
      return evoteInstance.totalCandidates();
    }).then(function(candidates) {
		assert.equal(candidates, 0);
	});
  });
  
  it("admin adds first candidate successfully", function() {
    return eVote.deployed().then(function(instance) {
		evoteInstance = instance;
      return evoteInstance.addCandidate(web3.utils.fromAscii("Angela"), { from: accounts[0] })
    }).then(function(receipt) {
		return evoteInstance.totalCandidates();
    }).then(function(candidates) {
		assert.equal(candidates, 1);
	});
  });
  
  it("successful registration for voter", function() {
    return eVote.deployed().then(function(instance) {
		evoteInstance = instance;
      return evoteInstance.registerVoter("blabla@gmail.com","somepass","1232142", {from: accounts[0]})
    }).then(function(receipt) {
		return evoteInstance.totalVoters();
    }).then(function(voters) {
		assert.equal(voters, 1);
	});
  });
  
  it("successful login for the registered voter", function() {
    return eVote.deployed().then(function(instance) {
		evoteInstance = instance;
      return evoteInstance.loginVoter("blabla@gmail.com","somepass", {from: accounts[0]})
    }).then(function(receipt) {
		return evoteInstance.voters(accounts[0]);
    }).then(function(voter) {
		assert.equal(true, voter[3]);
	});
  });
  
});
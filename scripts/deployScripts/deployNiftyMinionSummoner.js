const hre = require('hardhat');
const ethernal = require('hardhat-ethernal');

const networkName = {
	1: 'mainnet',
	42: 'kovan',
	4: 'rinkeby',
	100: 'xDai',
	137: 'polygon',
	1666700000: "harmonyTest",
	1666600000: "harmony",
	
};

const networkCurrency = {
	1: 'ETH',
	42: 'ETH',
	4: 'ETH',
	100: 'xDai',
	137: 'MATIC',
	1666700000: "ONE",
	1666600000: "ONE",
};


async function deployMinion(deployer) {
	console.log("Deploying the Minion");
	const template = await ethers.getContractFactory("contracts/NiftyMinionFactory.sol:Minion");
	const minon = await template.deploy();

	await minon.deployed();
	const txHash = minon.deployTransaction.hash;
	const receipt = await deployer.provider.getTransactionReceipt(txHash);
	console.log('Transaction Hash:', txHash);
	console.log('Contract Address:', minon.address);
	console.log('Block Number:', receipt.blockNumber);

	return minon;
}

async function deployMinionSummoner(moloch, deployer) {
	console.log("Deploying the Minion Summoner using Minion Template", moloch.address);
	const factory = await ethers.getContractFactory("contracts/NiftyMinionFactory.sol:MinionFactory");
	const summoner = await factory.deploy(moloch.address);

	await summoner.deployed();
	const txHash = summoner.deployTransaction.hash;
	const receipt = await deployer.provider.getTransactionReceipt(txHash);
	console.log('Transaction Hash:', txHash);
	console.log('Contract Address:', summoner.address);
	console.log('Block Number:', receipt.blockNumber);

	return summoner;
}

async function main() {
	const [deployer] = await hre.ethers.getSigners();
	const address = await deployer.getAddress();
	const { chainId } = await deployer.provider.getNetwork();
	console.log('Deploying Nifty Minion Summoner on network:', networkName[chainId]);
	console.log('Account address:', address);
	console.log(
		'Account balance:',
		ethers.utils.formatEther(await deployer.provider.getBalance(address)),
		networkCurrency[chainId]
	);

	const minion = await deployMinion(deployer);
	const summoner = await deployMinionSummoner(minion, deployer);

	if (chainId == 1337) {
		await hre.ethernal.push({
			name: 'Molochv2.1',
			address: summoner.address,
		});
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

const hre = require("hardhat");

const { eventABI } = require("./abi/event.json");

const main = async () => {
    const provider = ethers.provider;

    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    console.log("SIGNER:", signerAddress);

    const MyContract = await ethers.getContractFactory("CrowdFund");
    const contract = MyContract.attach(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );

    const filter = contract.filters.CampaignCreated();

    const logs = await provider.getLogs({
        filter,
        fromBlock: 0,
        toBlock: 'latest'
    });

    console.log(logs.length);

    const abi = [
        "event CampaignCreated(address indexed by, uint256 indexed campaign_id, string cid)"
    ];

    const iface = new ethers.Interface(abi);

    const cm = [];

    logs.map((log) => {
        const event = iface.parseLog(log);

        cm.push(event)

        console.log(event)
    })

    console.log(cm)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


/*
IN NORMAL ETHERS
*/

// const event_abi = [
    //     "event FundWithdrawed(address indexed by, uint256 amount, address to)"
    // ];

    // const filter = {
    //     address: CONTRACT_ADDRESS,
    //     topics: [
    //         ethers.id("FundWithdrawed(address,uint256,address)")
    //     ]
    // };

    // const logs = await providerPublic.getLogs({
    //     filter,
    //     fromBlock: CONTRACT_BLOCK,
    //     toBlock: 'latest'
    // });

    // const iface = new ethers.Interface(event_abi);

    // let withdraws = [];

    // logs.map((log) => {
    //     const e = iface.parseLog(log);
    //     if (e) withdraws.push({
    //         owner: e.args.by,
    //         amount: ethers.formatEther(e.args.amount),
    //         to: e.args.to
    //     })
    // });
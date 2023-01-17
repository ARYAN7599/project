import React, { useState, useEffect } from "react"
import axios from "axios";
import "../styles/wholedata.css"


const WholeData = () => {
    const [myDataOnChain, setMyDataOnChain] = useState([]);
    const [myDataZero, setMyDataZero] = useState([]);
    const [myDataOne, setMyDataOne] = useState([]);
    const [myDataTwo, setMyDataTwo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState("");



    var removeItems = [
        '0x9d96836546e73039618fc0f291ac41109cfe5c18',
        '0x3bc2dd1864a0e51f98155c1b55ab899fa8e002bf',
        '0x60e8de3f3eb70f55e5fec9b7b81f8f52ee760e18',
        '0x6abef340d07cd3156cf0a8f45d10861cfa5addfe',
        '0x781e28d38f2678c75411dc67ec6e1bf93da4c772',
        '0x2930af4fa9513cb7b8805643f1a90d38c2aeeb52',
        '0x0000000000000000000000000000000000000000',
        '0x76d9f286993859e84b61c27af44da06a063b9a53',
        '0x47b836c618052c875650d81487022b43d56fb524',
        '0xa7eb478f08de6155a6a66e11c927e60b6aeb1cf5',
        '0xa8fee2df27549324659017c50c68edfd07cf17c4',
        '0xfd21fca48cd94fb3c83595a9725cf4cf9225eafa',
        '0xb70b515f1731218588df152beafe6893a3eb17ee',
        '0x19ED2DD6922D43494Ed787f65Fe750f18a8bBFd6',
        '0x58c26929d39CfC50C3EF92Ee236b5645a26DcF04',
        '0x0671e55c40e28Fa855b73D8c757e4ac2691f6AFF',
        '0x907e3ccac6613785153E1BbDDEb3161267231982'
    ]



    // using Async Await
    const getMyPostData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://api.fufi.info/getOfflineBalance");
            setLoading(false);


            var finaldata = res.data.finaldata;
            var totalwidthdraw = [];
            var totalsidreward = [];
            var totalsidtenpercent = [];
            var totalreferalreward;

            finaldata.forEach((element, index) => {
                if (index == 0) {
                    totalwidthdraw = element.totalwidthdraw;
                }
                if (index == 1) {
                    totalsidreward = element.totalsidreward;
                }
                if (index == 2) {
                    totalsidtenpercent = element.totalsidtenpercent;
                }

                if (index == 3) {
                    totalreferalreward = element.totalreferalreward;
                }

            });
            var totalwidth = totalwidthdraw[0].amount + totalwidthdraw[1].amount + totalwidthdraw[2].amount;
            var totalreward = totalsidreward[0].amount + totalsidtenpercent[0].amount + totalreferalreward;
            setMyDataZero(totalreward);
            setMyDataOne(totalwidth);

            var offlinesupply = totalreward - totalwidth;
            //console.log("Offlinesupply: ", offlinesupply);
            setMyDataTwo(offlinesupply)

        } catch (error) {
            setIsError(error.message);
        }

    };
    const countBreeds = async () => {
        const breeds = await getBreeds()
        var oldArray = breeds.data.result;
        console.log(oldArray.length)
        const newArray = oldArray.filter((value) => {
            return !removeItems.includes(value.address.toString().toLowerCase())
        });
        console.log(newArray.length)
        var totalcirculation = 0.0;
        newArray.forEach(element => {
            var balance = element.balance;
            var nowbalance = balance / 1000000000000000000;
            totalcirculation = nowbalance + totalcirculation;
        });
        console.log(totalcirculation)
        setMyDataOnChain(totalcirculation)



    }
    const getBreeds = async () => {
        try {
            return await axios.get('https://fufiscan.com/api?module=account&action=listaccounts&page=1&offset=10000')
        } catch (error) {
            console.error(error)
        }
    }
    // NOTE:  calling the function
    useEffect(() => {
        getMyPostData();
        countBreeds();
    }, []);


    return (
        <div>
            {isError !== "" && <h2 className="text-center">{isError}</h2>}
            {!loading ?

                <div class="container-fluid">
                    <div class="row">
                        <div id="no-table">
                            <table class="col-sm-12 table-borderedless table-condensed cf shadow-lg p-3 mb-5 bg-body rounded text-center">
                                <thead class="cf">
                                    <tr>
                                        <th>Total Offchain Reward</th>
                                        <th>Total Offchain Widthdraw</th>
                                        <th>Total Supply Offchain</th>
                                        <th>Total Supply Onchain</th>
                                        <th>Total Supply</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-title="Total Offchain Reward">{myDataZero}</td>
                                        <td data-title="Total Offchain Widthdraw">{myDataOne}</td>
                                        <td data-title="Total Supply Offchain">{myDataTwo}</td>
                                        <td data-title="Total Supply Onchain">{myDataOnChain}</td>
                                        <td data-title="Total Supply">{myDataOnChain + myDataTwo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                :
                <div className="text-center">
                    <button className="btn" style={{ backgroundColor: "#9c031f", color: "#ffffff" }} type="button" disabled>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </div>
            }
        </div>
    )
};

export default WholeData;


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer"
import axios from "axios";
import "../styles/data.css"


const Card = () => {

  const navigate = useNavigate();
  const handleClick = () => navigate('/');

  const location = useLocation();
  const { address } = location.state;
  const [myDataZero, setMyDataZero] = useState([]);
  const [myDataOne, setMyDataOne] = useState([]);
  const [myDataTwo, setMyDataTwo] = useState([]);
  const [isError, setIsError] = useState("");

  
  const baseURLZero = "https://api.fufi.info/getRewards";
  const baseURLOne = "https://api.fufi.info/getdirectreward";
  const baseURLTwo = "http://64.227.177.190:3033/api/getRefralInformation";

  {/*
``` axios.get('firstrequest). then( firstResponse => { axios.get('secondResponse', firstResponse.data.id) } ) ```
*/}
  // using Async Await
  function createPost() {
    axios
      .post(baseURLZero, {
        'address': address
      })
      .then((response) => {
        setMyDataZero(response.data);
        //console.log("zero", response.data);

        axios
          .post(baseURLTwo, {
            "userId": response.data.id
          })
          .then((response) => {
            setMyDataTwo(response.data.data);
            //console.log("Two", response.data.data);
          });
      });

    axios
      .post(baseURLOne, {
        'address': address,
        "type": "affiliate"
      })
      .then((response) => {
        setMyDataOne(response.data);
        //console.log("One", response.data);
      });

  }





  // NOTE:  calling the function
  useEffect(() => {
    createPost();
    setIsError(isError);

  }, []);

  if (myDataZero.status) {
    return (
      <>

        {isError !== "" && <h2>{isError}</h2>}


        <div className="style-design">

          <div className="container-fluid" style={{ marginTop: "35px *" }}>

            <div className="text-center ">

              <table className="table w-100 mx-auto" id="table-borderless" style={{ marginTop: "20px" }} >

                <tr className="winner__table *">

                  <th className="text-center" rowspan='2' colspan="1"> Address</th>

                </tr>

                <tbody className="text-center">

                  <td >{address}</td>

                </tbody>

              </table>

            </div>

            <div className="table-responsive " >

              <table className="table w-100 mx-auto" id="table-borderless" style={{ marginTop: "20px" }} >

                <thead className="table__head  w-100 mx-auto">

                  <tr className="winner__table">
                    <th className="text-center" rowspan='2' colspan="1"> Weightage</th>
                    <th className="text-center" rowspan='2' colspan="1"> Burn</th>
                    <th className="text-center" rowspan='1' colspan="2"> Sid Reward</th>
                    <th className="text-center" rowspan='1' colspan="2"> Affiliate</th>
                    <th className="text-center" rowspan='1' colspan="2"> Amount</th>
                  </tr>

                  <tr className="table w-100 mx-auto">
                    <th className="text-center" rowspan='1' colspan="1">Earn</th>
                    <th className="text-center" rowspan='1' colspan="1">Withdraw</th>
                    <th className="text-center" rowspan='1' colspan="1">Earn</th>
                    <th className="text-center" rowspan='1' colspan="1">Withdraw</th>
                    <th className="text-center" rowspan='1' colspan="1">SidOffChain</th>
                    <th className="text-center" rowspan='1' colspan="1">AffilateOffChain</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="winner__table" id="table-borderless tbody">
                    <td className="text-center">{myDataZero.weight}</td>
                    <td className="text-center">{myDataZero.totalburn}</td>
                    <td className="text-center">{myDataZero.sidearning}</td>
                    <td className="text-center">{myDataZero.withdrawn}</td>
                    <td className="text-center">{myDataTwo.totalrefralamount + myDataOne.directreward}</td>
                    <td className="text-center">{myDataOne.widthdraw}</td>
                    <td className="text-center">{myDataZero.totalrewards}</td>
                    <td className="text-center">{(myDataTwo.totalrefralamount + myDataOne.directreward) - myDataOne.widthdraw}</td>
                  </tr>
                </tbody>

              </table>

            </div>

          </div>

        </div>

        <div className="text-center mt-10">

          <button type="button" onClick={handleClick}>

            Keep Exploring...

          </button>
        </div>

        <Footer />

      </>
    );
  }
  else {
    return (

      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">

        <div className="custom-page ">

          <h1 className="text-center mt-5">Hey...</h1>

          <h2 className="text-center mt-3">This is not a Sid Member !</h2>

          <div className="text-center mt-3">

            <button type="button" onClick={handleClick}>Go Back</button>

          </div>

        </div>

      </div>

    )
  }

};

export default Card;




import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "../styles/data.css"
import { Link, useNavigate } from 'react-router-dom';
import WholeData from "./WholeData"


const Data = () => {

  const navigate = useNavigate();
  const [APIData, setAPIData] = useState([])
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0)
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);



  const getData = async (offset) => {
    setLoading(true);
    const res = await axios.get(`https://fufiscan.com/api?module=account&action=listaccounts&page=${offset}&offset=10000`)
    const APIData = res.data.result;
    setLoading(false);
    //console.log("offset", offset);
    //console.log("APIData", APIData);  

    const postData = APIData.map(item => {
      return {
        address: item.address,
        balance: item.balance
      }
    }
    )
    setAPIData(postData);

    //console.log("postData", postData);


    setPageCount(Math.ceil(APIData.length))
  }


  useEffect(() => {
    getData(offset)
    
  }, [offset])
  

  const handlePageClick = () => {
    setOffset(offset + 1)
    getData(pageCount)
  };

  const handleClick = (e, item) => {
    navigate('/card', { state: { address: item, id: item } });
  };


  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)

    }
    else {
      setFilteredResults(APIData)

    }
  }

  return (
    <>
      <div className="container">

        <div className="main">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="search" className="form-control" placeholder="Search Here..."
              onChange={(e) => searchItems(e.target.value)} />
          </div>
        </div>


        <WholeData />

        <div className="table-responsive">

          <table className="table table-borderless shadow-lg p-3 mb-5 bg-body rounded" >
            <thead className="table__head">
              <tr className="winner__table">
                <th className="col-sm-1">S.No.</th>
                <th className="col-sm-4" >Address</th>
                <th className="col-sm-4">Balance</th>
                <th className="col-sm-3">Token</th>
              </tr>
            </thead>

            {searchInput.length > 1
              ? filteredResults.map((item) => {

                return (
                  <tbody>
                    <tr className="winner__table">
                      <td>{ }</td>
                      <Link className="link-color" to="/card" ><td>{item.address}</td></Link>
                      <td>{item.balance / 1000000000000000000}</td>
                      <td>{"FUFI"}</td>
                    </tr>
                  </tbody>
                );
              })
              : APIData.map((i) => {
                <item key={i.id} />
                return (
                  <tbody>
                    <tr className="winner__table" >
                      <td>{ }</td>
                      {/* <Link className="link-color" to="/card"><text onClick={(e)=>handleClick(e,i.address)}><td>{i.address}</td></text></Link> */}
                      <td style={{ "cursor": "pointer" }} onClick={(e) => handleClick(e, i.address)} className="link-color">{i.address}</td>
                      <td>{i.balance / 1000000000000000000}</td>
                      <td>{"FUFI"}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>


          {!loading ?
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
            : <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Data;




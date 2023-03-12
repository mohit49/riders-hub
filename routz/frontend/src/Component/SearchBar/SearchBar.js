import React, { useEffect, useState, useRef } from "react";
import "./SearchBar.scss";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Select } from "antd";
import { Checkbox } from "antd";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
const DEBOUNCE_THRESHOLD = 500;
const createEventAPI =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_SEARCH_BAR;
function SearchBar() {
  const timeoutHandler = useRef(null);
  const handleChange = (event) => {
    if (timeoutHandler.current) {
      clearTimeout(timeoutHandler.current);
    }
    timeoutHandler.current = setTimeout(() => {
      setSearchInput(event.target.value);
    }, DEBOUNCE_THRESHOLD);
  };

  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const [checkedList, setCheckedList] = useState('biker');
  const [searchInput, setSearchInput] = useState();
  const [searchData, setSearchData] = useState();
  const CheckboxGroup = Checkbox.Group;
 
  const plainOptions = ["biker", "show rooms", "event", "posts"];
  useEffect(() => {
    var searcType = checkedList;
    var limit = 5;
    var index = 0;
    var writeQueryUrl;
    if (searchInput?.length) {
      writeQueryUrl = `query=${searchInput}`;
    }
    if (searcType?.length > 0) {
      writeQueryUrl =
        writeQueryUrl?.length > 0
          ? writeQueryUrl + `&searchtype=${searcType}`
          : `searchtype=${searcType}`;
    }
    if (limit) {
      writeQueryUrl = writeQueryUrl
        ? writeQueryUrl + `&limit=${limit}&index=${index}`
        : `limit=${limit}&index=${index}`;
    }
    if (writeQueryUrl && searchInput?.length > 0) {
      console.log(writeQueryUrl);
      axios
        .get(createEventAPI + "/?" + writeQueryUrl, { cancelToken })
        .then(function (response) {
          if (response.data.sucessStatus) {
            setSearchData(response.data.data);
          } else {
            console.log("error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setTimeout(() => {
        source.cancel("Operation canceled by the user.");
      }, "1000");
    }
  }, [checkedList, searchInput]);
  const onChange = (list) => {
    setCheckedList(list);
  };
  return (
    <>
      <div className='main-search-container'>
        <div className='type-area-search'>
          <input placeholder='Search Here....' onChange={handleChange}></input>
        </div>
        <div className='searchtypeSelector'>
          <CheckboxGroup  defaultValue={['biker']}  options={plainOptions} onChange={onChange} />
        </div>
        <div className='search-submit-button'>
          <LinkContainer to='/login'>
            <Button variant='primary'>Search Now</Button>
          </LinkContainer>
        </div>
        {searchInput?.length > 0 && (
          <div className='search-suggestions'>
            {!(
              searchData?.resultBikers.length > 0 ||
              searchData?.resultEvents.length > 0
            ) && <Spinner variant='primary' animation='border' />}
            {searchData?.resultBikers.length > 0 && (
              <div className="biker-search">
                <p><b>Bikers</b></p>
                <ul className='suggestion'>
                {searchData?.resultBikers.map((ele,index)=>{
                  return (<li key={index}><p className="name">{ele.name}</p> <p className="username">{ele.username}</p> </li>)
                })
                 }
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;

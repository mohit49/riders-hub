import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { Country, State, City } from "country-state-city";
function CountryStateCity({ type, query, query2, setValues }) {
  const [list, setList] = useState();
  const Option = Select.Option;
  useEffect(() => {
    if (type == "state") {
      setList(State.getStatesOfCountry(query));
    }
    if (type == "city") {
      if (query2) {
        setList(City.getCitiesOfState(query, query2));
      }
    }
  }, [query,query2]);

  const onSelect = (value) => {
   if(list[0].isoCode) {
    setValues(list.filter((ele) => ele.isoCode == value)[0]);
   } else {
    setValues(list.filter((ele) => ele.name == value)[0]);
   }
  };
  City.getCitiesOfState("IN", "HR");

  return (
    <>
      {list && (
        <Select  showSearch
          defaultValue={list[0].isoCode}
   
          onChange={onSelect}>

          {type == 'state' && list.map((item, index) => (
            <Option key={index} value={item.isoCode}>{item.name}</Option>
          ))}
            {type == 'city' && list.map((item, index) => (
            <Option key={index} value={item.name}>{item.name}</Option>
          ))}
        </Select>
      )}
    </>
  );
}

export default CountryStateCity;

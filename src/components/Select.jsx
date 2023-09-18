import React from "react";



function Select(props){
    return (
<Select
  className="country-list-select"
  options={props.options}
  value={props.country}
  onChange={props.handleCountryChange}
  placeholder="Select a country"
/>
    );
}


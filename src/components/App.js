import React, { useState, useEffect } from "react";
import validator from 'validator';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios"; // Add Axios for making API requests
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [val, setVal] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [number, setNumber] = useState("");
  const [country, setCountry] = useState(""); // State for selected country
  const [address, setAddress] = useState("");
  const [optionalAddress, setOptionalAddress] = useState("");

  const [options, setOptions] = useState([]);
  const [states, setStates] = useState([]); // State for selected states
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch the list of countries and populate the options
    const countryData = countryList().getData();
    const countryOptions = countryData.map((country) => ({
      value: country.value,
      label: country.label,
    }));
    setOptions(countryOptions);
  }, []);
  
  useEffect(() => {
    // Fetch states when the selected country changes
    if (country) {
      axios
        .get(`https://restcountries.com/v3.1/alpha/${country.value}`)
        .then((response) => {
          const countryData = response.data;
          if (countryData.regions) {
            const stateOptions = Object.keys(countryData.regions).map((region) => ({
              value: region,
              label: countryData.regions[region],
            }));
            setStates(stateOptions);
          } else {
            setStates([]); // Reset states if no regions available
          }
        });
    } else {
      setStates([]); // Reset states when no country is selected
    }
  }, [country]);

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
  };

  const handleStateChange = (selectedOptions) => {
    setStates(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (firstName.length < 5 || lastName.length < 5) {
      setError(true);
      hasError = true;
    }

    if (!validator.isEmail(val)) {
      setEmailError(true);
      hasError = true;
    }

    if (number.length === 0 || number.length < 10) {
      setError(true);
      hasError = true;
    }

    if (address.length === 0) {
      setError(true);
      hasError = true;
    }
    if(optionalAddress.length >= 0 ){
        hasError = false;
    }


    if (!hasError) {
      // Handle form submission without errors
      // You can submit the data to your server or perform other actions here
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* ... (other input fields) */}
        <div>
           <input
           placeholder="First Name"
           onChange={(e) => setFirstName(e.target.value)}
         />
       </div>
       {error && firstName.length < 5 ?<label>First Name should be at least 5 characters</label>:""}

       <div>
         <input
           placeholder="Last Name"
           onChange={(e) => setLastName(e.target.value)}
         />
       </div>
       {error && lastName.length < 5 ?<label>Last Name should be at least 5 characters</label>:""}

        <div>
       <input
           placeholder="Email"
           onChange={(e) => setVal(e.target.value)}
         />
      
       </div>
       {emailError?<label>Enter a Valid Email</label>:""}

       <div className="app">
         <PhoneInput
           country={country}
           placeholder="Enter Your Phone Number"
           value={number}
           onChange={(value) => setNumber(value)}
           countryCodeEditable={false}
         />
         {error && number.length < 10 ?
           <label>Enter a Correct Phone Number (at least 10 digits)</label>:""}
       </div>

       <div>
       <input
           placeholder="Address1"
           onChange={(e) => setAddress(e.target.value)}
         />
      
       </div>
       {error && address.length === 0 ?<label>Address field is Empty</label>:""}



       <div>
       <input
           placeholder="Address2 (optional)"
           onChange={(e) => setOptionalAddress(e.target.value)}
         />
      
       </div>

    

        <div className="country-list-container">
          <label className="country-list-label">Country</label>
          <Select
            className="country-list-select"
            options={options}
            value={country}
            onChange={handleCountryChange}
            placeholder="Select a country"
          />
        </div>

        <div className="country-list-container">
          <label className="country-list-label">States/Regions</label>
          <Select
            className="country-list-select"
            options={states}
            value={states}
            onChange={handleStateChange}
            isMulti
            placeholder="Select state(s)"
          />
        </div>

        {/* ... (other input fields) */}

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default App;










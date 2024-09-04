import React, { useState } from "react";
import "./auth.css";
import "./mauth.css";
import appLogo from "../../assets/icons/appLogo.png";
import { useNavigate } from "react-router-dom";

const countryList = [
  { name: "Afghanistan", code: "AF", flag: "🇦🇫" },
  { name: "Albania", code: "AL", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", flag: "🇩🇿" },
  { name: "Andorra", code: "AD", flag: "🇦🇩" },
  { name: "Angola", code: "AO", flag: "🇦🇴" },
  { name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬" },
  { name: "Argentina", code: "AR", flag: "🇦🇷" },
  { name: "Armenia", code: "AM", flag: "🇦🇲" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Austria", code: "AT", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿" },
  { name: "Bahamas", code: "BS", flag: "🇧🇸" },
  { name: "Bahrain", code: "BH", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩" },
  { name: "Barbados", code: "BB", flag: "🇧🇧" },
  { name: "Belarus", code: "BY", flag: "🇧🇾" },
  { name: "Belgium", code: "BE", flag: "🇧🇪" },
  { name: "Belize", code: "BZ", flag: "🇧🇿" },
  { name: "Benin", code: "BJ", flag: "🇧🇯" },
  { name: "Bhutan", code: "BT", flag: "🇧🇹" },
  { name: "Bolivia", code: "BO", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦" },
  { name: "Botswana", code: "BW", flag: "🇧🇼" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Brunei", code: "BN", flag: "🇧🇳" },
  { name: "Bulgaria", code: "BG", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "BF", flag: "🇧🇫" },
  { name: "Burundi", code: "BI", flag: "🇧🇮" },
  { name: "Cambodia", code: "KH", flag: "🇰🇭" },
  { name: "Cameroon", code: "CM", flag: "🇨🇲" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Cape Verde", code: "CV", flag: "🇨🇻" },
  { name: "Central African Republic", code: "CF", flag: "🇨🇫" },
  { name: "Chad", code: "TD", flag: "🇹🇩" },
  { name: "Chile", code: "CL", flag: "🇨🇱" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", flag: "🇨🇴" },
  { name: "Comoros", code: "KM", flag: "🇰🇲" },
  { name: "Congo (Brazzaville)", code: "CG", flag: "🇨🇬" },
  { name: "Congo (Kinshasa)", code: "CD", flag: "🇨🇩" },
  { name: "Costa Rica", code: "CR", flag: "🇨🇷" },
  { name: "Croatia", code: "HR", flag: "🇭🇷" },
  { name: "Cuba", code: "CU", flag: "🇨🇺" },
  { name: "Cyprus", code: "CY", flag: "🇨🇾" },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", flag: "🇩🇰" },
  { name: "Djibouti", code: "DJ", flag: "🇩🇯" },
  { name: "Dominica", code: "DM", flag: "🇩🇲" },
  { name: "Dominican Republic", code: "DO", flag: "🇩🇴" },
  { name: "Ecuador", code: "EC", flag: "🇪🇨" },
  { name: "Egypt", code: "EG", flag: "🇪🇬" },
  { name: "El Salvador", code: "SV", flag: "🇸🇻" },
  { name: "Equatorial Guinea", code: "GQ", flag: "🇬🇶" },
  { name: "Eritrea", code: "ER", flag: "🇪🇷" },
  { name: "Estonia", code: "EE", flag: "🇪🇪" },
  { name: "Eswatini", code: "SZ", flag: "🇸🇿" },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹" },
  { name: "Fiji", code: "FJ", flag: "🇫🇯" },
  { name: "Finland", code: "FI", flag: "🇫🇮" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Gabon", code: "GA", flag: "🇬🇦" },
  { name: "Gambia", code: "GM", flag: "🇬🇲" },
  { name: "Georgia", code: "GE", flag: "🇬🇪" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", flag: "🇬🇭" },
  { name: "Greece", code: "GR", flag: "🇬🇷" },
  { name: "Grenada", code: "GD", flag: "🇬🇩" },
  { name: "Guatemala", code: "GT", flag: "🇬🇹" },
  { name: "Guinea", code: "GN", flag: "🇬🇳" },
  { name: "Guinea-Bissau", code: "GW", flag: "🇬🇼" },
  { name: "Guyana", code: "GY", flag: "🇬🇾" },
  { name: "Haiti", code: "HT", flag: "🇭🇹" },
  { name: "Honduras", code: "HN", flag: "🇭🇳" },
  { name: "Hungary", code: "HU", flag: "🇭🇺" },
  { name: "Iceland", code: "IS", flag: "🇮🇸" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩" },
  { name: "Iran", code: "IR", flag: "🇮🇷" },
  { name: "Iraq", code: "IQ", flag: "🇮🇶" },
  { name: "Ireland", code: "IE", flag: "🇮🇪" },
  { name: "Israel", code: "IL", flag: "🇮🇱" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },
  { name: "Jamaica", code: "JM", flag: "🇯🇲" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "Jordan", code: "JO", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "KZ", flag: "🇰🇿" },
  { name: "Kenya", code: "KE", flag: "🇰🇪" },
  { name: "Kiribati", code: "KI", flag: "🇰🇮" },
  { name: "Kuwait", code: "KW", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "KG", flag: "🇰🇬" },
  { name: "Laos", code: "LA", flag: "🇱🇦" },
  { name: "Latvia", code: "LV", flag: "🇱🇻" },
  { name: "Lebanon", code: "LB", flag: "🇱🇧" },
  { name: "Lesotho", code: "LS", flag: "🇱🇸" },
  { name: "Liberia", code: "LR", flag: "🇱🇷" },
  { name: "Libya", code: "LY", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "LI", flag: "🇱🇮" },
  { name: "Lithuania", code: "LT", flag: "🇱🇹" },
  { name: "Luxembourg", code: "LU", flag: "🇱🇺" },
  { name: "Madagascar", code: "MG", flag: "🇲🇬" },
  { name: "Malawi", code: "MW", flag: "🇲🇼" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾" },
  { name: "Maldives", code: "MV", flag: "🇲🇻" },
  { name: "Mali", code: "ML", flag: "🇲🇱" },
  { name: "Malta", code: "MT", flag: "🇲🇹" },
  { name: "Marshall Islands", code: "MH", flag: "🇲🇭" },
  { name: "Mauritania", code: "MR", flag: "🇲🇷" },
  { name: "Mauritius", code: "MU", flag: "🇲🇺" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "Micronesia", code: "FM", flag: "🇫🇲" },
  { name: "Moldova", code: "MD", flag: "🇲🇩" },
  { name: "Monaco", code: "MC", flag: "🇲🇨" },
  { name: "Mongolia", code: "MN", flag: "🇲🇳" },
  { name: "Montenegro", code: "ME", flag: "🇲🇪" },
  { name: "Morocco", code: "MA", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", flag: "🇲🇿" },
  { name: "Myanmar", code: "MM", flag: "🇲🇲" },
  { name: "Namibia", code: "NA", flag: "🇳🇦" },
  { name: "Nauru", code: "NR", flag: "🇳🇷" },
  { name: "Nepal", code: "NP", flag: "🇳🇵" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { name: "Nicaragua", code: "NI", flag: "🇳🇮" },
  { name: "Niger", code: "NE", flag: "🇳🇪" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬" },
  { name: "North Korea", code: "KP", flag: "🇰🇵" },
  { name: "North Macedonia", code: "MK", flag: "🇲🇰" },
  { name: "Norway", code: "NO", flag: "🇳🇴" },
  { name: "Oman", code: "OM", flag: "🇴🇲" },
  { name: "Pakistan", code: "PK", flag: "🇵🇰" },
  { name: "Palau", code: "PW", flag: "🇵🇼" },
  { name: "Palestine", code: "PS", flag: "🇵🇸" },
  { name: "Panama", code: "PA", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "PG", flag: "🇵🇬" },
  { name: "Paraguay", code: "PY", flag: "🇵🇾" },
  { name: "Peru", code: "PE", flag: "🇵🇪" },
  { name: "Philippines", code: "PH", flag: "🇵🇭" },
  { name: "Poland", code: "PL", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", flag: "🇵🇹" },
  { name: "Qatar", code: "QA", flag: "🇶🇦" },
  { name: "Romania", code: "RO", flag: "🇷🇴" },
  { name: "Russia", code: "RU", flag: "🇷🇺" },
  { name: "Rwanda", code: "RW", flag: "🇷🇼" },
  { name: "Saint Kitts and Nevis", code: "KN", flag: "🇰🇳" },
  { name: "Saint Lucia", code: "LC", flag: "🇱🇨" },
  { name: "Saint Vincent and the Grenadines", code: "VC", flag: "🇻🇨" },
  { name: "Samoa", code: "WS", flag: "🇼🇸" },
  { name: "San Marino", code: "SM", flag: "🇸🇲" },
  { name: "Sao Tome and Principe", code: "ST", flag: "🇸🇹" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
  { name: "Senegal", code: "SN", flag: "🇸🇳" },
  { name: "Serbia", code: "RS", flag: "🇷🇸" },
  { name: "Seychelles", code: "SC", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "SL", flag: "🇸🇱" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "Slovakia", code: "SK", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", flag: "🇸🇮" },
  { name: "Solomon Islands", code: "SB", flag: "🇸🇧" },
  { name: "Somalia", code: "SO", flag: "🇸🇴" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "South Sudan", code: "SS", flag: "🇸🇸" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰" },
  { name: "Sudan", code: "SD", flag: "🇸🇩" },
  { name: "Suriname", code: "SR", flag: "🇸🇷" },
  { name: "Sweden", code: "SE", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Syria", code: "SY", flag: "🇸🇾" },
  { name: "Taiwan", code: "TW", flag: "🇹🇼" },
  { name: "Tajikistan", code: "TJ", flag: "🇹🇯" },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿" },
  { name: "Thailand", code: "TH", flag: "🇹🇭" },
  { name: "Timor-Leste", code: "TL", flag: "🇹🇱" },
  { name: "Togo", code: "TG", flag: "🇹🇬" },
  { name: "Tonga", code: "TO", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹" },
  { name: "Tunisia", code: "TN", flag: "🇹🇳" },
  { name: "Turkey", code: "TR", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "TM", flag: "🇹🇲" },
  { name: "Tuvalu", code: "TV", flag: "🇹🇻" },
  { name: "Uganda", code: "UG", flag: "🇺🇬" },
  { name: "Ukraine", code: "UA", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Uruguay", code: "UY", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "UZ", flag: "🇺🇿" },
  { name: "Vanuatu", code: "VU", flag: "🇻🇺" },
  { name: "Vatican City", code: "VA", flag: "🇻🇦" },
  { name: "Venezuela", code: "VE", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳" },
  { name: "Yemen", code: "YE", flag: "🇾🇪" },
  { name: "Zambia", code: "ZM", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", flag: "🇿🇼" },
];

const Register = () => {
  const [stepCount, setStepCount] = useState(1);

  const [filteredCountries, setFilteredCountries] = useState([]);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [quali, setQuali] = useState("");
  const [proff, setProff] = useState("");
  const [gender, setGender] = useState(0);
  const [countryInput, setCountryInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validateEmail = (emailBhai) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailBhai);
  };

  const validatePassword = (passwordbhai) => {
    return passwordbhai.length > 5;
  };

  const validateOther = (otherbhai) => {
    return otherbhai != "";
  };

  const handleCountryChange = (event) => {
    const inputValue = event.target.value;
    setCountryInput(inputValue);

    if (inputValue) {
      const suggestions = countryList.filter((country) =>
        country.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredCountries(suggestions);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleCountrySelect = (country) => {
    setCountryInput(country.name);
    setFilteredCountries([]);
  };

  const nextSlide = () => {
    if (stepCount === 1) {
      setStepCount(2);
    } else {

      if(!validateEmail(email)){
        alert("Invalid Email");
        return
      }
      
      if(!validatePassword(password)){
        alert("Password should be more than 5 characters");
        return
      }

      if(!validateOther(username)){
        alert("Username cannot be empty");
        return
      }

      if(!validateOther(name)){
        alert("Name cannot be empty");
        return
      }

      const userData = {
        username: username,
        name: name,
        profilePic: profilePic,
        qualification: quali,
        profession: proff,
        gender: gender,
        country: countryInput,
        email,
        password,
        categories: [proff, quali] 
      };

      registerUser(userData);
    }
  };

  const prevSlide = () => {
    if (stepCount === 2) {
      setStepCount(1);
    }
  };

  const registerUser = async (userData) => {
    console.log("Register User");
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ User Registered Successfully");
        console.log(data);
        navigate("/login");
      } else {
        alert("⚠️ Registration Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainRegBox">
      <div className="topBoxReg">
        <h3>Register On</h3>
        <div className="flexAppTitle">
          <h1>Exta</h1>
          <img src={appLogo} alt="App Logo" />
          <h1>ks</h1>
        </div>
      </div>

      <div className="bottomBoxReg">
        <div className="stepMap">
          <div
            className={`step1C ${stepCount === 1 ? "active" : ""}`}
            onClick={() => setStepCount(1)}
          >
            1
          </div>
          <hr />
          <div
            className={`step2C ${stepCount === 2 ? "active" : ""}`}
            onClick={() => setStepCount(2)}
          >
            2
          </div>
        </div>

        {stepCount === 1 && (
          <>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Create your Username"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
            <input
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              type="text"
              placeholder="Profile Picture Link"
            />
            <input
              value={quali}
              onChange={(e) => setQuali(e.target.value)}
              type="text"
              placeholder="Qualification"
            />
            <input
              value={proff}
              onChange={(e) => setProff(e.target.value)}
              type="text"
              placeholder="Profession"
            />
          </>
        )}
        {stepCount === 2 && (
          <>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              id="gender-select"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
            <div className="country-input-container">
              <input
                type="text"
                placeholder="Enter Country"
                value={countryInput}
                onChange={handleCountryChange}
              />
              {filteredCountries.length > 0 && (
                <div className="suggestions-list">
                  {filteredCountries.map((country, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleCountrySelect(country)}
                    >
                      {country.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create your Password"
            />
          </>
        )}

        <div className="stateButtons">
          <button
            id="prevBtn"
            onClick={prevSlide}
            style={{ opacity: stepCount === 1 ? 0.5 : 1 }}
          >
            Prev
          </button>
          <button id="nextBtn" onClick={nextSlide}>
            {stepCount === 1 ? "Next" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

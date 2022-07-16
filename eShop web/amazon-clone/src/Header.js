import "./Header.css";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StorefrontIcon from "@mui/icons-material/Storefront";
// http://localhost:5000/api/search?name=
export default function Header(props) {
  const [searchText, setSearchText] = React.useState("");
  const nav = useNavigate();
  function logOut() {
    if (props.name) {
      if (window.confirm("Do you want to log out?")) {
        console.log("clearing");
        props.clearAccount();
        nav('/login')
      }
    }
    else nav('/login');
  }
  function handleChange(event) {
    setSearchText(event.target.value);
  }
  function searchItem() {
    fetch("https://cryptic-savannah-64840.herokuapp.com/api/search?name=" + searchText)
      .then((data) => data.json())
      .then((info) => {
        if (info.status === 200) props.changeProData(info.data);
        else console.error("fetch error");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="header_box">
      <div className="name_box">
        <Link to="/">
          <StorefrontIcon className="logo" fontSize="large" />
        </Link>
        <div className="name_logo">eSHOP</div>
      </div>
      <div className="search_bar">
        <input
          type="text"
          name="search"
          id="search"
          className="search_input"
          value={searchText}
          onChange={handleChange}
        />
        <SearchIcon className="search_icon" onClick={searchItem} />
      </div>
    <button className="sign_in" onClick={logOut}>
        <div>Hello {!props.name ? "Guess" : ""}</div>
        <b> {!props.name ? "Sign in" : props.name}</b>
    </button>
      <Link to="/input-product">
        <button className="your_shop">
          <div>Add</div>
          <b>Product</b>
        </button>
      </Link>
      <Link to="/check-out">
        <button className="basket">
          <ShoppingBasketIcon className="basket_icon" />
          <div className="number">{props.basketLength}</div>
        </button>
      </Link>
    </div>
  );
}

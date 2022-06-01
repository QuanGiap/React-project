import './Header.css';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StorefrontIcon from '@mui/icons-material/Storefront';
// http://localhost:5000/api/search?name=
export default function Header(props){
    const [searchText,setSearchText] = React.useState('');
    function logOut(){
        if(props.name){
            if (window.confirm("Do you want to log out?")){
                props.clearAccount();
                props.funct(2);
            }
        }
        else{
            props.funct(2);
        }
    }
    function handleChange(event){
        setSearchText(event.target.value);
    }
    function searchItem(){
        fetch('http://localhost:5000/api/search?name='+searchText)
        .then(data=>data.json())
        .then(info=>{
            if(info.status===200)
                props.changeProData(info.data);
            else console.error('fetch error');           
        }).catch((err)=>{console.log(err)});
    }
    return(
        <div className="header_box">
            <div className="name_box">
                <StorefrontIcon className="logo" fontSize='large' onClick={()=>props.funct((props.name)?0:2)}/>
                <div className="name_logo">eSHOP</div>
            </div>
            <div className="search_bar">
                <input type="text" name="search" id="search" className='search_input' value={searchText} onChange={handleChange}/>
                <SearchIcon className='search_icon' onClick={searchItem} />
            </div>
            <button className="sign_in" onClick={logOut}>
                <div>Hello {(!props.name) ? "Guess":""}</div>
                <b> {(!props.name) ? "Sign in": props.name}</b>
            </button>
            <button className="your_shop"  onClick={()=>props.funct((props.name)?1:2)}>
                <div>Add</div>
                <b>Product</b>
            </button>
            <button className="basket" onClick={()=>props.funct((props.name)?3:2)}>
            <ShoppingBasketIcon className='basket_icon'/>
            <div className='number'>{props.basketLength}</div>
            </button>
        </div>
    )
}
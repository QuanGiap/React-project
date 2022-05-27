import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function Header(props){
    return(
        <div className="header_box">
            <div className="name_box">
                <StorefrontIcon className="logo" fontSize='large' onClick={()=>props.funct(true)}/>
                <div className="name_logo">eSHOP</div>
            </div>
            <div className="search_bar">
                <input type="text" name="search" id="search" className='search_input'/>
                <SearchIcon className='search_icon' />
            </div>
            <button className="sign_in">
                <div>Hello Guess</div>
                <b>Sign in</b>
            </button>
            <button className="your_shop"  onClick={()=>props.funct(false)}>
                <div>Add</div>
                <b>Product</b>
            </button>
            <button className="basket">
            <ShoppingBasketIcon className='basket_icon'/>
            <div className='number'>0</div>
            </button>
        </div>
    )
}
import React from "react";
import './Home.css';
import Product from "./Product";
import {nanoid} from 'nanoid'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.generateProduct = this.generateProduct.bind(this);
    }
    componentDidMount(){
        if(!this.props.proData){
        fetch("https://cryptic-savannah-64840.herokuapp.com/api/")
        .then(data=>data.json())
        .then(info=>{
            if(info.status===200)
                this.props.changeProData(info.data);
            else console.error('fetch error');
        }).catch((err)=>{console.log(err)});
        }
    }
    generateProduct() {
        if(this.props.proData){
            return this.props.proData.map(obj=>{
            return <Product description={obj.description}
                key={nanoid()}
                imgURL={obj.imgURL}
                stars={obj.stars}
                price={obj.price}
                addBasket={()=>this.props.addBasket(obj)}
                />;
            })
        }
    }

    render(){
        return(
            <div>
                <div className="home">
                    <div className="home_container">
                        <img src="https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=" alt="shop" className="back_image"/>
                        <div className="product_container">-
                            {!this.props.proData && 
                            <div className="Loading_Screen">
                                <div>Loading...</div> 
                                <HourglassTopIcon fontSize="large"/>
                            </div>}
                            {this.props.proData && this.generateProduct()}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default React.memo(Home);
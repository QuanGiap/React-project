import React from 'react';
import './InputPro.css';
import Button from '@mui/material/Button';
import Product from './Product';
import {nanoid} from 'nanoid';

class InputPro extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isPrev:false,
            description:"",
            price:"",
            stars:0,
            imgURL:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.setPrev = this.setPrev.bind(this);
    }
    submitForm(event){
        event.preventDefault();
        var regex  = /^\d+(?:\.\d{0,2})$/;
        if(!regex.test(this.state.price)) alert("price need to be correct form 0.00 including cent");
        else if (isNaN(this.state.stars) || this.state.stars<0 || this.state.stars==='')  alert("Please input valid stars");
        else {
            let inform={
                description:this.state.description,
                price:this.state.price,
                stars:this.state.stars,
                imgURL:this.state.imgURL
            }
            fetch("http://localhost:5000/api/",{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(inform)
            }).then(res=>{
                alert("Submit success");
            }).catch(err=>console.log(err))
        }
    }
    setPrev(event){
        event.preventDefault();
        this.setState((state)=>({isPrev: !state.isPrev}))
    }
    handleChange(event){
        const {name,value} = event.target;
        let other;
        if(name==="stars"&&(value<0||value>5)) other = (value<0)? 0:5;
        this.setState({[name]:(other)? other:value})
    }
    render(){
        return(
            <div>
                <form className='form_input' method="post">
                    <div className="description_box">
                        <label htmlFor="description">Description for your product: </label>
                        <textarea required autoFocus name="description" id="description" 
                        cols="100" rows="4" value={this.state.description}
                        onChange={this.handleChange}></textarea>      
                    </div>
                    <div className="price">
                        <label htmlFor="price">Input the price for product__: </label>
                        <input placeholder='00.00' type="number" name="price" id="price" required onChange={this.handleChange} value={this.state.price}/>    
                    </div>   
                    <div className="star">
                        <label htmlFor="star">Input the star________________: </label>
                        <input type="number" max={5} min={0} name="stars" id="star" required onChange={this.handleChange} value={this.state.stars}/> 
                    </div> 
                    <div className="imgURL">
                        <label htmlFor="imgURL">Input the Image URL________: </label>
                        <input type="text" name="imgURL" id="imgURL" value={this.state.imgURL} onChange={this.handleChange}/>
                    </div>
                    <Button variant="contained" onClick={this.setPrev}
                     sx={{
                            marginRight:"10px",
                            marginTop:"10px"
                        }}>{(this.state.isPrev)? "Hide":"Preview"} product</Button>   
                    <Button variant="contained" onClick={this.submitForm}
                     sx={{
                            marginRight:"10px",
                            marginTop:"10px"
                        }}>Submit</Button>   
                </form>
                {this.state.isPrev && 
                    <div className="prev_pro"><Product description={this.state.description}
                        key={nanoid()}
                        imgURL={this.state.imgURL}
                        stars={this.state.stars}
                        price={this.state.price}
                        />
                    </div>}
            </div>
        )
    }
}

export default InputPro;
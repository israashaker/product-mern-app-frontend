import React, { Component } from 'react';
import { AddForm, Spinner,ProductItem, MonthSelector} from '../components';
import {fetchProduct,ResetMonth} from '../actions/product_actions';
import {connect} from 'react-redux';
import { ListGroup } from 'reactstrap';
class HomeComponent extends Component {
  
  componentDidMount(){
    var {selected} = this.props;
    this.getProduct(selected);
  }
  componentDidUpdate(){
    
  }
  onSelectMonth(month){
    //console.log(`user select ${month}`)
    var {selected,ResetMonth} = this.props;
    selected=month;
    ResetMonth(selected);
    this.getProduct(selected);
  }
  getProduct(month){
    const {fetchProduct} = this.props;
    fetchProduct(month);
  }
  render() {
    const {selected} =  this.props;
    const {fetching,product}= this.props;
    if(fetching){
      return <Spinner size={50}/>
    }
    return (
      <div style={{marginTop:30}}>
        <MonthSelector selected={selected} onSelectMonth={this.onSelectMonth.bind(this)}/>
        <h3>Product List</h3>
        <hr/>
        <ListGroup>
        {product.map((item)=>(<ProductItem key={item._id} item={item}/>))}
        </ListGroup>
        <AddForm/>

      </div>
    );
  }
}
const mapStateToProps =({productv1})=>{
  return {
    fetching:productv1.fetching,
    product:productv1.product,
    selected:productv1.month
  }
}
const Home = connect(mapStateToProps,{fetchProduct,ResetMonth})(HomeComponent);
export {Home};

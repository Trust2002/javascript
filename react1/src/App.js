import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class FilterableProductTable extends React.Component {  
  constructor(props) {    
    super(props);

    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }
  
  handleFilterTextInput (filterText){      
    this.setState({filterText: filterText});
  }
  handleInStockInput(value){
    this.setState({inStockOnly: value});
  }

  render() {
    return <table>
      <tr>
        <td colSpan="2">
          <SearchBar onFilterTextInput={this.handleFilterTextInput} onInStockInput={this.handleInStockInput} />
          {!this.props.products}
        </td>        
      </tr>
      <tr>
        <td>
          <ProductTable 
          products={this.props.products}           
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}/>
        </td>        
      </tr>
    </table>;
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  handleFilterTextInputChange(e){
    this.props.onFilterTextInput(e.target.value);
  }

  handleInStockInputChange(e){
    this.props.onInStockInput(e.target.checked);
  }
  render() {
    return <form>
        <input type="text" placeholder ="Search products" onChange={this.handleFilterTextInputChange}/>    
        <p/>
        <label><input type="checkbox" onChange={this.handleInStockInputChange} /> Only show products in stock</label>
      </form>;
  }
}

class ProductTable extends React.Component {
  /*
  props: 
          products
          filterText
          inStockOnly
  */
  render() {
    let rows = [];
    let prevCat ="";

    this.props.products.forEach((product)=> {
      if(!product.name.includes(this.props.filterText))
        return;
      if(!product.stocked && this.props.inStockOnly)
        return;

      if(product.category != prevCat)
      {
        rows.push(<ProductCategoryRow category={product.category} />);
        rows.push(<ProductRow product={product} />);
      }
      else
        rows.push(<ProductRow product={product} />);

      prevCat = product.category;
      }
    );
    
    return <table> 
      <tr><th>Name</th><th>Price</th></tr>      
      {rows}  
    </table>;
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends React.Component {
  render() {    
      if(this.props.product.stocked)
        return <tr><td>{this.props.product.name}</td><td>{this.props.product.price}</td></tr>;
      else
        return <tr><td><span style={{color: 'red'}}>{this.props.product.name}</span></td><td>{this.props.product.price}</td></tr>;
  }
} 
export default FilterableProductTable;
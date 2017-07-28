//CommentList.js
import React, {Component} from 'react';
import { Grid }  from 'semantic-ui-react'
import CommentBox from './containers/CommentBox';
import SideBar from './components/sidebar';
import SearchBar from './containers/SearchBar';
import Footer from './components/Footer';

class CommentList extends Component {
  render() {
  	const imageUrl = 'http://i.imgur.com/1LhGj.jpg'
  	const divStyle ={
  		color: 'white',
  		backgroundImage: 'url(' + imageUrl + ')',
  		WebkitTransition: 'all',
  		msTransition: 'all'
  	} 
    return (
    <div style={divStyle}>	
    <Grid>	
      <SideBar />
      <SearchBar />	
      <Footer />
    </Grid>  
    </div>
    )
  }
}
export default CommentList;

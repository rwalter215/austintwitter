//CommentList.js
import React, {Component} from 'react';
import { Grid }  from 'semantic-ui-react'
import CommentBox from './containers/CommentBox';
import SideBar from './components/sidebar';
import SearchBar from './containers/SearchBar';
import Footer from './components/Footer';

class CommentList extends Component {
  render() {
    return (
    <div>	
      <SideBar />
      <SearchBar />	
      <Footer />
    </div>  
    )
  }
}
export default CommentList;

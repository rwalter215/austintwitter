//CommentList.js
import React, {Component} from 'react';
import WordMap from './components/WordMap/WordMap'
import { Grid }  from 'semantic-ui-react'
import CommentBox from './containers/CommentBox';
import SideBar from './components/Sidebar';
import SearchBar from './containers/SearchBar';
import Footer from './components/Footer';

class App extends Component {
  render() {
  	const divStyle ={
  		color: 'white',
  		backgroundColor: '#261132',
  		WebkitTransition: 'all',
  		msTransition: 'all',
  		height: 820
  	}
    return (
  	 <div style= {divStyle}>
  	   <Grid>
  	    <SideBar />
  	    <SearchBar />
        <WordMap />
  	    <Footer />
  	   </Grid>
  	 </div>
      )
  }
}
export default App;

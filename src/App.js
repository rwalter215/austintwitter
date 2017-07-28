//CommentList.js
import React, {Component} from 'react';
import WordMap from './components/WordMap/WordMap'
import { Grid }  from 'semantic-ui-react'
import CommentBox from './containers/CommentBox';
import SideBar from './components/sidebar';
import SearchBar from './containers/SearchBar';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
    <div>
      <SideBar />
      	<Grid style={{display: 'flex', justifyContent: 'center'}}>
      		<SearchBar />
      	</Grid>
        <WordMap />
        <Grid style={{position: 'absolute', bottom: 0}}>
      	 <Footer />
        </Grid>
    </div>
    )
  }
}
export default App;

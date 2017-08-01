//CommentBox.js
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import WordCloud from 'wordcloud';
import { Grid }  from 'semantic-ui-react';
//import getTrendingWords from '../../models/tweetModel.js'
import axios from 'axios';

import styles from './WordMap.css';

class WordMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      wordCount: 65
    };

    this.getTweet = this.getTweet.bind(this);
  }

  getTweet() {
    return axios.get('http://localhost:3001/wordcloud/austin')
  }

  componentDidMount() {
    let words = [['ATX', 12]];
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    this.getTweet().then((resp) => {
      const data = resp.data.words;
      for(let i = 0; i < this.state.wordCount; i++) {
        words.push([data[i], Math.floor(Math.random() * 5) + 1])
      }
      this.setState({data: words})
      const options = {
        list: this.state.data,
        shape: "circle",
        color:(word, color) => {
          return (word === 'ATX') ? '#ba5c12' : '#ffb86f';
        },
        fontFamily: "Times, serif",
        weightFactor: 12,
        rotateRatio: 0.5,
        rotationSteps: 2,
        wait: 0,
        click: (word, dimension, event) => {
          const query = encodeURI(word);
          window.location = 'http://www.google.com/search?q=' + query + '&btnI'
        },
        backgroundColor:"#261132"
      }
      WordCloud(canvas, options);
    })


  }

  render() {
    return (
      <Grid>
        <Grid.Row centered className='map' style={styles}>
          <canvas ref="canvas" width="600" height="600"></canvas>
        </Grid.Row>
      </Grid>
    )
  }
}
export default WordMap;

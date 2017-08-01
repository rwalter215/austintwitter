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
    this.state = { data: [] };

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
      for(let i = 0; i < 50; i++) {
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

    // const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    // let test = [['ATX', 12]]
    // states.map((word) => {
    //   test.push([word, Math.floor(Math.random() * 5) + 1  ])
    // })



  }

  // componentDidMount() {
    // const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    // // const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    // // let test = [['ATX', 12]]
    // // states.map((word) => {
    // //   test.push([word, Math.floor(Math.random() * 5) + 1  ])
    // // })
    //
    // const words = this.state.data;
    // const options = {
    //   list: words,
    //   shape: "circle",
    //   color:(word, color) => {
    //     return (word === 'ATX') ? '#ba5c12' : '#ffb86f';
    //   },
    //   fontFamily: "Times, serif",
    //   weightFactor: 12,
    //   rotateRatio: 0.5,
    //   rotationSteps: 2,
    //   wait: 0,
    //   click: (word, dimension, event) => {
    //     const query = encodeURI(word);
    //     window.location = 'http://www.google.com/search?q=' + query + '&btnI'
    //   },
    //   backgroundColor:"#261132"
    // }
    //
    // WordCloud(canvas, options);
  // }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  handleRedirect(){
     this.props.history.push(`/wordCloud`)

  }

  render() {
    return (
      <Grid.Row centered className='map' style={styles}>
        <canvas ref="canvas" width="800" height="800"></canvas>
      </Grid.Row>
    )
  }
}
export default WordMap;

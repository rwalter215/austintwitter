//CommentBox.js
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import WordCloud from 'wordcloud';
import { Grid }  from 'semantic-ui-react';
//import getTrendingWords from '../../models/tweetModel.js'
import styles from './WordMap.css';

class WordMap extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    const wordList = [];
    //console.log('model: ', getTrendingWords.getTrendingWords)

    this.setState({words: wordList});
  }

  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    let test = [['ATX', 12]]
    states.map((word) => {
      test.push([word, Math.floor(Math.random() * 5) + 1  ])
    })

    const words = this.state.words;
    const options = {
      list: test,
      shape: "circle",
      color:(word, color) => {
        return (word === 'ATX') ? '#ba5c12' : '#ffb86f';
      },
      fontFamily: "Times, serif",
      weightFactor: 10,
      rotateRatio: 0.5,
      rotationSteps: 2,
      wait: 0,
      backgroundColor:"#261132"
    }

    WordCloud(canvas, options);
  }

  render() {
    return (
      <Grid.Row centered>
        <form onSubmit={this.handleRedirect}> 
        <input type='submit' value='WordMap' />
      </form> 
          <canvas ref="canvas" width="600" height="600"></canvas>
        </Grid.Row>
      
    )
  }
}
export default WordMap;

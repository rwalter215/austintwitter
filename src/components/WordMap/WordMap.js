//CommentBox.js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import WordCloud from 'wordcloud';
import { Grid }  from 'semantic-ui-react'
import styles from './WordMap.css'

class WordMap extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    const wordList = [];

    this.setState({words: wordList});
  }

  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    let test = []
    states.map((word) => {
      test.push([word, Math.floor(Math.random() * 5) + 1  ])
    })

    const words = this.state.words;
    const options = {
      list: test,
      shape: "circle",
      color:"green",
      fontFamily: "Finger Paint, cursive, sans-serif",
      weightFactor: 5,
      wait: 0,
      backgroundColor:"black"
    }

    WordCloud(canvas, options);
  }

  render() {
    return (
      <Grid centered>
        <canvas ref="canvas" width="600" height="600"></canvas>
      </Grid>

    )
  }
}
export default WordMap;

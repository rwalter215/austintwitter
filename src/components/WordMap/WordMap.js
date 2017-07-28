//CommentBox.js
import React, {Component} from 'react';
import WordCloud from 'wordcloud'
import {Button} from 'semantic-ui-react';

class WordMap extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    var wordList = [["foo", 12], ["bar", 6], ["bat", 10], ["base", 8], ["barbell", 8], ["bastion", 6], ["beesaws", 4], ["filipino", 2]]
    });
    this.setState({words: wordList});
  }

  componentDidMount() {
    var canvas = ReactDOM.findDOMNode(this.refs.canvas)
    var test = [["foo", 12], ["bar", 6]];
    var words = this.state.words;
    console.log(words);
    console.log(test)

    WordCloud(canvas, { list: test, color: "random-dark", shape: "circle", color:"green", wait: 0, backgroundColor:"black"});
  }

  render() {
    return (
      <div className={styles.cloudCanvasContainer}>
        <canvas ref="canvas"></canvas>
      </div>

    )
  }
}
export default WordMap;

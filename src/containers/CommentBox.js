//CommentBox.js
import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getTweet = this.getTweet.bind(this);
  }
getTweet() {
    axios.get('http://localhost:3001/api').then(res => {
      this.setState({ data: res.data.users[0].screen_name })
    })
  }
  componentDidMount() {
    this.getTweet();
  }
  render() {
    return (
        <Button primary>{this.state.data}</Button>
    )
  }
}
export default CommentBox;

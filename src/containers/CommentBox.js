//CommentBox.js
import React, {Component} from 'react';
import DATA from '../data';
import {Button} from 'semantic-ui-react';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    return (
        <Button primary>Howdy</Button>
    )
  }
}
export default CommentBox;

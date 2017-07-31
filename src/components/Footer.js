import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid } from 'semantic-ui-react'

class Footer extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    const divStyle = {
      width: 1000,
      height: 500 
    }
    return (
      <Grid.Row verticalAlign='bottom'>
      <div style={divStyle}>
          <Sidebar as={Menu} animation='overlay' direction='top' visible={!visible} inverted>
            <Menu.Item name='bat'>
              <Icon src = "../../bat.png" />
              TweetyBat
            </Menu.Item>
          </Sidebar>
      </div>
      </Grid.Row>
    )
  }
}

export default Footer;
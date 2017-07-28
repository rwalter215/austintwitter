import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid } from 'semantic-ui-react'

class Footer extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <Grid style={{position: 'absolute', bottom: 0}}>
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' direction='top' visible={!visible} inverted>
            <Menu.Item name='bat'>
              <Icon src = "../../bat.png" />
              TweetyBat
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
      </Grid>
    )
  }
}

export default Footer;
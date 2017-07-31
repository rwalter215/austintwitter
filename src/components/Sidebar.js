import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid } from 'semantic-ui-react'

class SideBar extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    const divStyle = {
      color:'#FF5A36',
      width: 100,
      height: 50,
      fontFamily:'Bookman Old Style' 
    }

    return (
      <Grid.Row style={divStyle}>
          <Sidebar as={Menu}  direction='top' visible={!visible} inverted>
            <Menu.Item name='bat'>
              <Icon src= "../../bat.png" />
              Tweety Bat
            </Menu.Item>
          </Sidebar>
      </Grid.Row>
    )
  }
}

export default SideBar;

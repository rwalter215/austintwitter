import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class SideBar extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    const divStyle = {
      width: 1000,
      height: 50,
      fontFamily:'Bookman Old Style'
    }

    return (
      <div style={divStyle}>
          <Sidebar as={Menu}  direction='top' visible={!visible} inverted>
            <Menu.Item name='bat'>
              <Icon src = "../../bat.png" />
              Tweety Bat
            </Menu.Item>
          </Sidebar>
      </div>
    )
  }
}

export default SideBar;

import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid } from 'semantic-ui-react'

class Footer extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    const divStyle = {
      width: 1000,
      bottom: "0px",
      color: '#FF5A36' 

    }
    return (
      <Grid.Row verticalAlign='bottom' style={divStyle}>
      
          <Sidebar as={Menu} animation='overlay' direction='bottom' visible={!visible} inverted>
            <Menu.Item name='bat'>
              <Icon src = "../../bat.png" />
              Tweety Bat
            </Menu.Item>
          </Sidebar>
      
      </Grid.Row>
    )
  }
}

export default Footer;
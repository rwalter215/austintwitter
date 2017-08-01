import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, List, Button } from 'semantic-ui-react'
import { Link, browserHistory } from 'react-router'

const source = [{'city': 'Austin'}, {'city': 'San Fransico'}, {'city': 'London'}, {'city': 'Paris'}, {'city': 'Portland'}, {'city': 'Milan'}, {'city': 'Rome'}, {'city': 'Washington, DC'}, {'city': 'Burlington'} ]

const onClick = (event)=> {
      event.preventDefault();
      browserHistory.push('/wordCloud');
      console.log('redirecting...');
  }
const resultRenderer = ({ city }) => <List onItemClick={this.redirect('/wordCloud')} content={city}/>

export default class SearchExampleStandard extends Component {

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result})

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.city)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      })
    }, 500)

  }


  render() {
    const { isLoading, value, results } = this.state
    const mainStyle = {
      color: "#FF5A36",
      fontSize: "48px",
      fontFamily: "Bookman Old Style",
      marginTop: "50px",
    }
    const searchStyle = {
      display: "block"
    }

    const messageStyle = {
      color: "white",
      fontSize: "20px",
      fontFamily: "Bookman Old Style"
    }

    return (
      <Grid.Row style={searchStyle} centered>
        <h2 style={mainStyle}>Tweety Bat</h2>
          <h6 style={messageStyle}>A simple UI for visualizing your city's tweets</h6>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              onClick={onClick}
              results={results}
              value={value}
              resultRenderer={resultRenderer}
              {...this.props}
            />
      </Grid.Row>
    )
  }
}

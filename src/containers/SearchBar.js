import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

const source = ['Austin', 'New York City', 'San Fransico', 'Portland', 'Houston', 'Dallas', 'Chicago', 'Boston', 'Paris']

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
      const isMatch = (result) => re.test(result)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state
    const mainStyle = {
      color: "#FF5A36",
      fontSize: "48px", 
      fontFamily: "Bookman Old Style",
      marginTop: "100px",
      marginBottom: "30px"
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
        <h2 style={mainStyle}>Trending</h2>
          <h6 style={messageStyle}>A simple UI for visualizing your city's tweets</h6>
            <Search 
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={value}
              {...this.props}
            /> 
      </Grid.Row>       
    )
  }
}
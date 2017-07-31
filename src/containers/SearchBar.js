import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

export default class SearchExampleStandard extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state
    const style = {
      color: "white",
      fontSize: "48px", 
      marginTop: "100px",
      marginBottom: "30px",
      textAlign: "center",
      top: "50px"
    }
    const searchStyle = {
      position: "relative",
      top: "170px",
      right: "425px"
    } 

    return (
      <div style={searchStyle}>
        <Grid style={{display: 'flex', justifyContent: 'center', }}>
        <div>
          <Grid.Column fluid='false' >
            <div style={style}>Tweety Bat</div>
              <Search 
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                {...this.props}
              /> 
          </Grid.Column>  
          </div>
        </Grid>
      </div>      
    )
  }
}
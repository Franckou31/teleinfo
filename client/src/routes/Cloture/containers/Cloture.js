import React from 'react'

export default class Cloture extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selectedOption: 'option1' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ selectedOption: event.target.value })
  }

  handleSubmit (event) {
    alert('Your favorite flavor is: ' + this.state.selectedOption)
    event.preventDefault()
  }

  render () {
    console.log('render')

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
        </label>
        <div className='radio'>
          <label>
            <input type='radio' name='optionsRadios' id='optionsRadios1' value='option1'
              checked={this.state.selectedOption === 'option1'}
              onChange={this.handleChange} />
            Novembre 2016
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' name='optionsRadios' id='optionsRadios2' value='option2'
              checked={this.state.selectedOption === 'option2'}
              onChange={this.handleChange} />
            Décembre 2016
          </label>
        </div>
        <div className='radio disabled'>
          <label>
            <input type='radio' name='optionsRadios' id='optionsRadios3' value='option3'
              checked={this.state.selectedOption === 'option3'}
              onChange={this.handleChange} />
            Janvier 2017
          </label>
        </div>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

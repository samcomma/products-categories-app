import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios'

const root = document.getElementById('root')

import Categories from './Categories'
import Category from './Category'


class App extends Component {

  constructor() {
    super()
    this.state = {
      categories: [],
      category: {}
    }
    this.selectCategory = this.selectCategory.bind(this)
  }

  async componentDidMount() {
    const response = await axios.get('/api/categories')
    this.setState({ categories: response.data})
  }

  async selectCategory(id) {
    if (id === -1) {
      this.setState({ category: {} })
      return
    }
    const response = await axios.get(`/api/categories/${id}`)
    this.setState({ category: response.data })
  }

  render() {
    const { selectCategory } = this
    const { categories, category } = this.state
    return (
    category.id ? (<Category category={ category } selectCategory={ selectCategory }/>) :
      (<Categories categories={ categories } selectCategory={ selectCategory }/>)
    )
  }
}





render(<App />, root)


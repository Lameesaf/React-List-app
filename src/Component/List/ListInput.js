import React, { Component } from 'react'
import Lists from './Lists'
// import { Button } from 'react-bootstrap';
import { Button } from 'antd';

export default class ListInput extends Component {

  constructor(props) {
    super()
    this.state = {
      lists: [],
      textArea: '',
      markedItems: []
    }
  }

  handleDelete = (item)=>{
    console.log(item)
    const updatedList = this.state.lists
    const index = updatedList.indexOf(item)
    updatedList.splice(index,1)
    console.log(updatedList)
    this.setState({
      lists: updatedList
    })
    console.log(this.state.lists)

  }

  handleFinishItem=(markedItem)=>{
    const markedItems = [...this.state.markedItems]
    const index = markedItems.indexOf(markedItem)
    console.log('const ',markedItems)
    if(index!==-1){
      markedItems.splice(index,1)
      this.setState({markedItems})
    console.log('state ',this.state.markedItems)

    }else{
      this.setState({
        markedItems: [...this.state.markedItems,markedItem]
      })
    }
  }

  handleChange = (e) => {
    // console.log(e.target.value)
    this.setState({
      textArea: e.target.value
    })
  }

  handleClick = (e) => {
    // console.log(e.target.value)
    e.preventDefault()
    if (this.state.textArea.trim() !== '') {
      this.setState({
        lists: [...this.state.lists, this.state.textArea],
        textArea: ''
      })
    }
  }
  clearList = (e) => {
    this.setState({
      lists: []
    })
  }

  clearMarkedItem=(e)=>{
    const unmarkedItem = this.state.lists.filter(item=>{
      if(!this.state.markedItems.includes(item)){
        return item
      }
    })
    this.setState({
      lists: unmarkedItem
    })
  }
  render() {
    return (
      <div className='list'>
        <Lists lists={this.state.lists} 
        deleteItem = {this.handleDelete} 
        markedItem={this.handleFinishItem}
        markedItems={this.state.markedItems}
        />
        <form className='form'>
          <input type='text' value={this.state.textArea} onChange={(e) => this.handleChange(e)} />
          <Button className='button'  type='primary' onClick={(e) => this.handleClick(e)}>one more</Button>
        </form>
        <Button className='button'  type="primary"  onClick={(e) => this.clearMarkedItem(e)}>clear marked</Button>
        <Button className='button' type="dashed"  onClick={(e) => this.clearList(e)}>Finished the list!</Button>
      </div>
    )
  }
}
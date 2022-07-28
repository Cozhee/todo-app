import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import {SettingsContext} from "../../Context/Settings";
import DisplayFilter from "../filter/filter";
import Header from "../header/Header";
import './todo.css'

import { v4 as uuid } from 'uuid';

const ToDo = () => {

  const settings = useContext(SettingsContext)

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(settings.itemsPerScreen)
  const [showCompleted, setShowCompleted] = useState(settings.completed)
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.order = list.length
    item.complete = settings.completed;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    let items;

    items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    })

    setList(items)
  }

  function listFilter (value) {
    const filteredList = [...list]
    if (value === 'Difficulty') {
      const difficulty = filteredList.sort((a, b) => a.difficulty - b.difficulty)
      setList(difficulty)
    } else if (value === 'Newest') {
      const newest = filteredList.sort((a, b) => b.order - a.order)
      setList(newest)
    } else if (value === 'Oldest') {
      const oldest = filteredList.sort((a, b) => a.order - b.order)
      setList(oldest)
    }
  }

  function itemsPerPage (value) {
    setEnd(value)
  }


  function handleNextPageChange () {
    setStart((start) => start + settings.itemsPerScreen)
    setEnd((end) => end + settings.itemsPerScreen)
  }

  function handlePreviousPageChange () {
    setStart((start) => start - settings.itemsPerScreen)
    setEnd((end) => end - settings.itemsPerScreen)
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <Header incomplete={incomplete}/>

      <h2 className="todo-title">Add To Do Item</h2>

      <form onSubmit={handleSubmit} className="todo-form">

        <label className="todo-input">
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label className="todo-input">
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label className="todo-input">
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label className="todo-input">
          <button className="bp4-button bp4-icon-add" type="submit">Add Item</button>
        </label>
      </form>

      <DisplayFilter listFilter={listFilter} itemsPerPage={itemsPerPage}/>

      <div className="todo-list">
        {list.slice(start, end).map(item => (
            <div key={item.id} className="bp4-card bp4-elevation-2">
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
              <button className="bp4-button delete-button" onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
        ))}
      </div>

      {end < list.length && <button className="bp4-button" onClick={handleNextPageChange}>Next Page</button>}
      {start > 0 && <button className="bp4-button" onClick={handlePreviousPageChange}>Previous Page</button>}
    </>
  );
};

export default ToDo;

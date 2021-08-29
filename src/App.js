import React, { useState } from 'react';
import Alert from './Alert';
import List from './List';

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)//전송버튼 텍스트 state
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      showAlert(true, 'danger', 'please enter value')
    } else if(name && isEditing){ // 수정하기 
      setList(list.map(item => {
        if(item.id === editId){
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter(item => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        { alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/> }
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className="grocery"
          placeholder="e.g.eggs" value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            { isEditing ? 'edit' : 'submit' }
          </button>
        </div>
      </form>
      {/* 입력되는 값이 저장되는 경우에만 리스트와 클리어 버튼 나타내기 */}
      { list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
      
    </section>
  );
}

export default App;

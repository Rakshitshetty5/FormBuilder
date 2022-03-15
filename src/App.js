import "./App.css";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import FormElements from "./components/FormElements";
import Form from "./components/Form";
import { Container, Navbar } from "./styles";
import { INPUT_TYPES } from "./utils/inputTypes";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [formElements, setFormElements] = useState([]);

  const handleOnDragEnd = (el) => {
    console.log(el)
    if (!el.destination) return;
    if(el.destination.droppableId !== 'formDrop-2') return;

    const newElement = INPUT_TYPES.find(item => item.id.toString() === el.draggableId)
    let object = { ...newElement, id: uuidv4(),  placeholder: '',
    value: '',
    type: '', }
    setFormElements((elements) => [...elements, object]);
  };

  const handleChangeInput = (el, id) => {
    setFormElements((elements) => {
      return elements.map(item => {
        if(item.id === id){
          return {
            ...item,
            value: el.target.value
          }
        }
        return item
      })
    })
  }

  console.log(formElements);

  return (
    <div className="App">
      <Navbar>
        FORM BUILDER
      </Navbar>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Container>
          <FormElements />
          <Form formElements={formElements} handleChangeInput={handleChangeInput}/>
        </Container>
      </DragDropContext>
    </div>
  );
}

export default App;

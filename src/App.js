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
    if (!el.destination) return;
    if(el.source.droppableId === 'formDrop-2' && el.destination.droppableId === 'formDrop-1') return;
    if(el.source.droppableId === 'formDrop-2'){
      const itemToBeMoved = formElements.find(item => item.id === el.draggableId)
      const newFormElements = formElements.filter(item => item.id !== el.draggableId)
      newFormElements.splice(el.destination.index, 0, itemToBeMoved);
      setFormElements(newFormElements)
      return;
    }
    const newElement = INPUT_TYPES.find(item => item.id.toString() === el.draggableId)
    let object;
    if (newElement.element === "input") {
      object = {
        ...newElement,
        id: uuidv4(),
        placeholder: "",
        value: "",
        type: "",
      };
    } else if (newElement.element === "button") {
      object = {
        ...newElement,
        id: uuidv4(),
      };
    }
    setFormElements((elements) => {
      if(elements.length === 0) return [...elements, object];
      elements.splice(el.destination.index, 0, object);
      return elements
    });
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

import "./App.css";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import FormElements from "./components/FormElements";
import PropertyCustomizer from "./components/PropertyCustomizer";
import Form from "./components/Form";
import { Container, Navbar, SaveForm, SavedForms, GlobalStyle, ToggleButton } from "./styles";
import { INPUT_TYPES } from "./utils/inputTypes";
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from "styled-components";

function App() {
  const [formElements, setFormElements] = useState([]);
  const [formId, setFormId] = useState(null)
  const [savedFormIds, setSavedFormIds] = useState([])
  const [showSaveButton, toggleShowSaveButton] = useState(true)
  const [theme, setTheme] = useState(getInitialTheme);
  
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
  }

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem('savedForms'));
    if(!savedForms) return;
    const formIds = savedForms.map(form =>  { return { id : form.id, name : form.name }});
    setSavedFormIds(formIds)
  },[])

  useEffect(() => {
    getFromLocalStorage(formId)
    toggleShowSaveButton(true)
  }, [formId])

  const [propertyBar, setPropertyBar] = useState({
    isVissible : false,
    id: ''
  });

  const getFromLocalStorage = (id) => {
    let savedForms = JSON.parse(localStorage.getItem('savedForms'))
    if(!savedForms) return;
    const savedForm = savedForms.find(form => form.id === id)
    if(!savedForm) return;
    setFormElements(savedForm.formElements)
  }

  const saveToLocalStorage = () => {
    toggleShowSaveButton(false)
    let savedForms = JSON.parse(localStorage.getItem('savedForms'))
    let formObject = {
      id: uuidv4(),
      formElements
    };
    if(!savedForms){
      const name = prompt('Enter Form Name')
      savedForms = [{...formObject, name}]
      localStorage.setItem('savedForms', JSON.stringify(savedForms))
      return window.location.reload();
    }
    if(formId){
      const formExists = savedForms.findIndex(form => form.id === formId)
      if(formExists >= 0){
        savedForms[formExists].formElements = formElements
        localStorage.setItem('savedForms', JSON.stringify(savedForms))
        return window.location.reload();
      }
    }
    const name = prompt('Enter Form Name')
    savedForms.push({...formObject, name})
    localStorage.setItem('savedForms', JSON.stringify(savedForms))
    window.location.reload()
  }

  const handleOnDragEnd = (el) => {
    if (!el.destination) return;
    if(el.source.droppableId === 'formDrop-2' && el.destination.droppableId === 'formDrop-1') return;
    if(el.source.droppableId === 'formDrop-2'){
      //if elements are dragged and dropped in form

      const itemToBeMoved = formElements.find(item => item.id === el.draggableId)
      const newFormElements = formElements.filter(item => item.id !== el.draggableId)
      newFormElements.splice(el.destination.index, 0, itemToBeMoved);
      setFormElements(newFormElements)
      return;
    }
    
    //if elements are dragged from Menu and dropped in form

    const newElement = INPUT_TYPES.find(item => item.id.toString() === el.draggableId)
    let object = { isPropertySet : false };
    if (newElement.element === "input") {
      object = {
        ...newElement,
        ...object,
        id: uuidv4(),
        placeholder: "",
        value: "",
        type: "",
      };
    } else if (newElement.element === "button") {
      object = {
        ...object,
        ...newElement,
        id: uuidv4(),
      };
    } else if(newElement.element === "label"){
      object = {
        ...object,
        ...newElement,
        id: uuidv4(),
        labelName: 'Label'
      }
    } else if(newElement.element === "dropdown"){
      object = {
        ...object,
        ...newElement,
        id: uuidv4(),
        options: [],
        defaultValue: ''
      }
    }else if(newElement.element === "checkbox"){
      object = {
        ...object,
        ...newElement,
        id: uuidv4(),
        values: []
      }
    }else if(newElement.element === "textarea"){
      object = {
        ...object,
        ...newElement,
        id: uuidv4(),
      }
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

  const togglePropertyBar = (isVissible, id) => {
      setPropertyBar({
        isVissible,
        id
      })
  }

  const handlePropertyUpdate = (id, property) => {
    console.log(id, property)
    setFormElements((elements) => {
      return elements.map(item => {
        if(item.id === id){
          return {
            ...item,
            ...property,
            isPropertySet: true 
          }
        }
        return item
      })
    })
    setPropertyBar({
      isVissible: false,
      id: ''
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar>
        FORM BUILDER
        <ToggleButton
          onClick={() =>
            setTheme(
              theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
            )
          }
        >
          {
            theme.mode === "dark" ? <i class="fa fa-moon-o" aria-hidden="true"></i>
            : <i class="fa fa-sun-o" aria-hidden="true"></i>
          }
        </ToggleButton>
      </Navbar>
      <SavedForms onChange={e => setFormId(e.target.value)} defaultValue={"default"}>
          <option disabled value="default">Select Form to load</option>
          {
            savedFormIds.map(({id, name}) => <option key={id} value={id}>{name}</option>)
          }
      </SavedForms>
      <DragDropContext onDragEnd={handleOnDragEnd}>   
        <Container>
          <FormElements />
          <Form
            formElements={formElements}
            handleChangeInput={handleChangeInput}
            togglePropertyBar={togglePropertyBar}
          />
        </Container>
      </DragDropContext>
      { showSaveButton && formElements.length > 0 && <SaveForm onClick={saveToLocalStorage}>Save Form</SaveForm>}
      {propertyBar.isVissible && (
        <PropertyCustomizer
          propertyBar={propertyBar}
          formElements={formElements}
          handlePropertyUpdate={handlePropertyUpdate}
        />
      )}
    </ThemeProvider>
  );
}

export default App;

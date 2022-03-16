import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { SetPropertyContainer, InputContainer, PropertyInput, AddOptionButton, SaveButton } from '../styles'

const PropertyInputs = ({ propertyBar, formElements, handlePropertyUpdate }) => {
    const formInput = formElements.find(item => item.id === propertyBar.id) 
    const [labelState, setLabelState] = useState(formInput.labelName)
    const [inputState, setInputState] = useState({
        placeholder:formInput.placeholder,
        type:formInput.type
    })
    const [dropdownState, setDropdownState] = useState({
        options: [],
        defaultValue: ''
    })
    const [ checkboxState, setCheckboxState ] = useState([])
    const [optionValue, setOptionValue] = useState('')
    

    const handleInputStateChange = (e) => {
        setInputState(state => {
            return {...state,
                [e.target.name]: e.target.value
            }
        })
    }

    const addToOptions = () => {
        if(optionValue === '')return;
        setDropdownState(state => {
            return{
                ...state,
                options: [...state.options, optionValue]
            }
        })
        setOptionValue('')
    }

    const addToCheckbox = () => {
        setCheckboxState(state => [...state, optionValue])
        setOptionValue('')
    }

    if(formInput.element === 'label'){
        const property = { labelName: labelState }
        return(
            <>
                <PropertyInput placeholder='Enter Label Name' value={labelState} onChange={(e) => setLabelState(e.target.value)}/>
                <SaveButton onClick={() => handlePropertyUpdate(formInput.id, property)}>Save</SaveButton>
            </>
        )
    }else if(formInput.element === 'input'){
        const property = {...inputState}
        return(
            <>
                <PropertyInput placeholder='Enter Input Type' name="type" onChange={handleInputStateChange} value={inputState.type}/>
                <PropertyInput placeholder='Enter Input Placeholder' name="placeholder" onChange={handleInputStateChange} value={inputState.placeholder}/>
                <SaveButton onClick={() => handlePropertyUpdate(formInput.id, property)}>Save</SaveButton>
            </>
        )
    }else if(formInput.element === 'dropdown'){
        const property = { ...dropdownState }
        return(
            <>
                <ul>
                    {
                        dropdownState.options.map((item, index) => <li key={index}>{ item }</li>)
                    }
                </ul>
                <InputContainer>
                    <PropertyInput placeholder='Enter Input Type' name="type" value={optionValue} onChange={(e) => setOptionValue(e.target.value)}/>
                    <AddOptionButton onClick={addToOptions}>Add</AddOptionButton>
                </InputContainer>
                <SaveButton onClick={() => handlePropertyUpdate(formInput.id, property)}>Save</SaveButton>
            </>
        )
    }else if(formInput.element === 'checkbox'){
        const property = { values: checkboxState }
        return(
            <>
                <ul>
                    {
                        checkboxState.map((item, index) => <li key={index}>{ item }</li>)
                    }
                </ul>
                <InputContainer>
                    <PropertyInput placeholder='Enter Input Type' name="type" value={optionValue} onChange={(e) => setOptionValue(e.target.value)}/>
                    <AddOptionButton onClick={addToCheckbox}>Add</AddOptionButton>
                </InputContainer>
                <SaveButton onClick={() => handlePropertyUpdate(formInput.id, property)}>Save</SaveButton>
            </>
        )
    }

}

const PropertyCustomizer = ({ propertyBar, formElements, handlePropertyUpdate }) => {
  return (
    <SetPropertyContainer>
      <PropertyInputs
        propertyBar={propertyBar}
        formElements={formElements}
        handlePropertyUpdate={handlePropertyUpdate}
      />
    </SetPropertyContainer>
  );
}

export default PropertyCustomizer
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FormContainer, InputContainer, Input, SettingButton } from '../styles';

const Element = ({ item, formInputState, handleChangeInput }) => {
    const index = formInputState.findIndex(inp => inp.id === item.id)
    if(item.element === "input"){
        return(
            <>
                <Input placeholder='' value={formInputState[index].value} type="" onChange={(e) => handleChangeInput(e, item.id)}/>
                <SettingButton><i className="fa fa-cog" aria-hidden="true" /></SettingButton>
            </>
        )
    }
    else if(item.element === "button"){
        return <button>Submit</button>
    }
}

const Form = ({ formElements, handleChangeInput }) => {
    return (
        <Droppable droppableId="formDrop-2">
            {(provided, snapshot) => {
                return (
                    <FormContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {formElements.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <InputContainer
                                        id={item.id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Element item={item} formInputState={formElements} handleChangeInput={handleChangeInput}/>
                                    </InputContainer>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </FormContainer>
                );
            }}
        </Droppable>
    )
}

export default Form
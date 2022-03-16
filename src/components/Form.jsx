import React from 'react'
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FormContainer, InputContainer } from '../styles';
import Element from './Element';

const Form = ({ formElements, handleChangeInput, togglePropertyBar }) => {
    return (
        <Droppable droppableId="formDrop-2">
            {(provided, snapshot) => {
                return (
                  <FormContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {formElements.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <InputContainer
                            id={item.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Element
                              item={item}
                              formInputState={formElements}
                              handleChangeInput={handleChangeInput}
                              togglePropertyBar={togglePropertyBar}
                            />
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
import React from 'react'
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FormElementsContainer, FormElement } from '../styles';
import { INPUT_TYPES } from '../utils/inputTypes'

const FormElements = () => {
    return (
        <Droppable droppableId="formDrop-1" isDropDisabled={true}>
            {(provided) => (
                <FormElementsContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}        
                >
                    {
                        INPUT_TYPES.map((el, index) => 
                            <Draggable key={el.id} draggableId={el.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <>
                                        <FormElement
                                            id={el.id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {el.title}
                                        </FormElement>
                                        {snapshot.isDragging && <FormElement
                                            isUnmoveable={true}
                                        >
                                            {el.title}
                                        </FormElement>}
                                    </>
                                )}
                            </Draggable>   
                        )
                    }
                    {provided.placeholder}
                </FormElementsContainer>
            )}
        </Droppable>
    )
}

export default FormElements
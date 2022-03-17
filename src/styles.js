import styled from 'styled-components';

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  background-color: ${props => (props.theme.mode === "dark" ? "#111" : "#EEE")};
  color: ${props => (props.theme.mode === "dark" ? "#EEE" : "#111")};
  text-align: center
}
i{
    color: ${props => (props.theme.mode === "dark" ? "white" : "dark")}
}
.fa-moon-o{
    color : black;
}
.fa-sun-o{
    color: yellow;
}
`;

export const FormContainer = styled.div`
    width: 50%;
    border: ${props => (props.theme.mode === "dark" ? "1px solid white" : "1px solid black")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 28rem;
    border-radius: 5px;
    overflow-y: scroll;
`;


export const FormElement = styled.div`
    padding: 1rem;
    border: 1px solid #888888;
    box-shadow: 1px 2px #888888;
    width: 8rem;
    margin-top: 1rem;

    ${props => props.isUnmoveable && `
        transform: none !important;
    `}
`;

export const FormElementsContainer = styled.div`
    width: 20%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: ${props => (props.theme.mode === "dark" ? "1px solid white" : "1px solid black")};
    border-radius: 5px;
    padding-bottom: 1rem;
    height: 28rem;
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const Navbar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
    justify-content: center;
    height: 5rem;
    margin-bottom: 3rem;
    color: ${props => (props.theme.mode === "dark" ? "black" : "white")};
    font-size: 1.8rem;
    position relative;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;    
`;

export const Input = styled.input`
    width: 20rem;
    height: 2rem;
`;

export const PropertyInput = styled.input`
    width: fit-content;
    height: 1.6rem;
    margin: 0px;
    margin-bottom: 0.5rem;
`;

export const Dropdown = styled.select`
    width: 20rem;
    height: 2rem;
`;

export const SavedForms = styled.select`
    width: 20rem;
    height: 2rem;
    margin-bottom: 2rem;
`;

export const SettingButton = styled.button`
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.5rem;
    margin-left: 2rem;
`;

export const AddOptionButton = styled.button`
    height: 1.5rem;
    margin: 0px;
    margin-left: 0.3rem;
`;

export const SaveButton = styled.button`
    height: 2rem;
    width: 80%;
    margin-left: 10%;
`;

export const SetPropertyContainer = styled.div`
    position: fixed;
    top: 20%;
    right: 2%;
    background-color: green;
    z-index: 2; 
    border: 1px solid #888888;
    display: flex;
    flex-direction: column;
    min-height: 10rem;
    padding: 1rem;
    min-width: 10rem;
`;


export const CheckboxContainer = styled.div`
    display: flex
    flex-direction: column;
`
export const SaveForm = styled.button`
    width: 10rem;
    height: 2.5rem;
    background: blue;
    margin-top: 5rem;
    color: white;
    outline: none;
    border: none;
    font-size: 1.2rem;
`

export const ToggleButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.5rem;
`
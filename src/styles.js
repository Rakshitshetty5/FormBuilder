import styled from 'styled-components';


export const FormContainer = styled.div`
    width: 50%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 20rem;
    border-radius: 5px;
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
    border: 0.5px solid black;
    border-radius: 5px;
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const Navbar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: black;
    justify-content: center;
    height: 5rem;
    margin-bottom: 3rem;
    color: white;
    font-size: 1.8rem;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;    
`;

export const Input = styled.input`
    width: 20rem;
    height: 2rem;
    margin-right: 2rem;
`;

export const SettingButton = styled.button`
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.5rem;
`;
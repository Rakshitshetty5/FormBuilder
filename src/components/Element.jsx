import React from "react";
import { Input, SettingButton, Dropdown, CheckboxContainer } from "../styles";

const Element = ({
    item,
    formInputState,
    handleChangeInput,
    togglePropertyBar,
}) => {
    const index = formInputState.findIndex((inp) => inp.id === item.id);
    const isPropertySet = formInputState[index].isPropertySet

    if (item.element === "input") {
        return (
            <>
                <Input
                    placeholder={formInputState[index].placeholder}
                    value={formInputState[index].value}
                    type={formInputState[index].type}
                    onChange={(e) => handleChangeInput(e, item.id)}
                />
                {!isPropertySet && (
                    <SettingButton
                        onClick={() => togglePropertyBar(true, formInputState[index].id)}
                    >
                        <i className="fa fa-cog" aria-hidden="true" />
                    </SettingButton>
                )}
            </>
        );
    } else if (item.element === "button") {
        return <button>Submit</button>;
    } else if (item.element === "label") {
        return (
            <>
                <label>{formInputState[index].labelName}</label>
                {!isPropertySet && (
                    <SettingButton
                        onClick={() => togglePropertyBar(true, formInputState[index].id)}
                    >
                        <i className="fa fa-cog" aria-hidden="true" />
                    </SettingButton>
                )}
            </>
        );
    } else if (item.element === "dropdown") {
        return (
            <>
                <Dropdown>
                    {
                        formInputState[index].options.map((option, index) => <option key={index} value={option}>{option}</option>)
                    }
                </Dropdown>
                {!isPropertySet && (
                    <SettingButton
                        onClick={() => togglePropertyBar(true, formInputState[index].id)}
                    >
                        <i className="fa fa-cog" aria-hidden="true" />
                    </SettingButton>
                )}
            </>
        );
    } else if (item.element === "checkbox") {
        return (
            <>
                {
                    formInputState[index].values.length !== 0 ?
                        <CheckboxContainer>
                            {
                                formInputState[index].values.map((option, index) => <div key={index}><input type="checkbox" value={option} /><label>{option}</label></div>)
                            }
                        </CheckboxContainer>
                        :
                        <>
                            <input key={index} defaultValue={"abc"} type="checkbox" />
                            <label>Checkbox</label>
                        </>
                }
                {!isPropertySet && (
                    <SettingButton
                        onClick={() => togglePropertyBar(true, formInputState[index].id)}
                    >
                        <i className="fa fa-cog" aria-hidden="true" />
                    </SettingButton>
                )}
            </>
        );
    }else if (item.element === "textarea") { 
        return <textarea></textarea>;
    }

};

export default Element;

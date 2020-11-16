import React, { useReducer, useEffect } from "react";

import { validate } from "../../../util/Validators";
import "./Input.css";

//input reducer
//?START READING FROM INPUT COMPONENT COMMENT
//* A reducer is really just a function that receives a state and an action which we can dispatch, and then
//* it will update the state based on the action we received, update the state and return it
const inputReducer = (state, action) => {
	//*we return a new state based on the action received
	//*actions have a type property which describes the action, change and touch are the actions here
	switch (action.type) {
		case "CHANGE":
			return {
				...state, //!create a copy of the old state so we dont lose it
				//!now we can overide certain selected keys / properties
				//! based on what we want to happen when this action is triggered
				value: action.val,
				//using the validate function in Validators file, isValid will be set to true or false
				//based on the criteria specified
				isValid: validate(action.val, action.validators),
			};
		case "TOUCH": {
			return {
				...state,
				isTouched: true,
			};
		}
		default:
			return state;
	}
};

const Input = (props) => {
	//!We need to manage 2 states (enteredValue and isValid) here that are kind of related
	//! we can do this by setting up 2 states, but we will use a different approach using useReducer
	//! with UseReducer you can manage more complex state with ease, you can write some logic that
	//! basically runs whenever you want to change the state to do more complex.
	//! whenever you have more complex state or you have interconnected state, use useReducer
	//* we pass inputReducer to useReducer
	//* it takes a sceond argument which is optional, and woould be an intital state we set up
	//!Remeber useReducer returns something and just like useState it returns an array with 2 elemenets
	//!the first is the current state, which we named inputState and the second is the dispatch function which we can call
	//!to disptach an action to the reducer function which will run and return a new state, update input state and rerender the component
	const [inputState, dispatch] = useReducer(inputReducer, {
		//initial states
		value: props.initialValue || "",
		isTouched: false,
		isValid: props.initialValid || false,
	});

	//decstruct the states / properties we want useEffect to track for changes
	const { id, onInput } = props;
	const { value, isValid } = inputState;

	//this useeffect will be triggered by the onInput attribute in NewPlace.js
	//this Hook is used to check when the input value and validity changes
	//we call it on the onInput prop
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	//changeHandler dispatches to the reducer
	//a type / action, the value (val) and validators
	const changeHandler = (event) => {
		//call dispatch passing an action object and required key/property pairs as specified in the reducer function
		dispatch({
			type: "CHANGE",
			val: event.target.value,
			validators: props.validators,
		});
	};

	//handle touch event, so we can set the isTouched state in inputState
	const touchHandler = () => [
		dispatch({
			type: "TOUCH",
		}),
	];

	const element =
		props.element === "input" ? (
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				onChange={changeHandler}
				//is triggered when the user loses focus on something
				onBlur={touchHandler}
				//bind value to the state value in inputState
				value={inputState.value}
			/>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		);

	return (
		//return each individual form field component
		<div
			//style input to show invalid based on the imported validate function and isTouch
			className={`form-control ${
				!inputState.isValid && inputState.isTouched && "form-control--invalid"
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
			{/* used to display an error text below the input if it is invalid, and would be triggered
			based on porperties set */}
			{!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
		</div>
	);
};

export default Input;

import React, { useReducer, useEffect } from "react";

import { validate } from "../../../util/Validators";
import "./Input.css";

//input reducer
const inputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE":
			return {
				...state,
				value: action.val,
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
	//useReducer for more complex state, or state that is dependent on 2 things
	//we will use dispatch function to dispatch actions to the reducer
	//this will cause inputState state to rerender on change
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
	//
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	//changeHandler dispatches to the reducer
	//a type / action, the value (val) and validators
	const changeHandler = (event) => {
		dispatch({
			type: "CHANGE",
			val: event.target.value,
			validators: props.validators,
		});
	};

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
		<div
			className={`form-control ${
				!inputState.isValid && inputState.isTouched && "form-control--invalid"
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
			{!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
		</div>
	);
};

export default Input;

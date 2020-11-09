import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card/Card";
import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload/ImageUpload";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/Validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {
	//extract the auth object in auth-context.js for use here
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = () => {
		// SIGNUP MODE
		if (!isLoginMode) {
			setFormData(
				{ ...formState.inputs, name: undefined, image: undefined },
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			//LOGIN MODE
			setFormData(
				{
					...formState.inputs,
					name: { value: "", isValid: false },
					image: { value: null, isValid: false },
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		if (isLoginMode) {
			//!LOGIN
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
					"POST",
					{
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					},
					{ "content-Type": "application/json" }
				);

				auth.login(response.data.userId, response.data.token);
			} catch (err) {}
		} else {
			//*SIGNUP
			try {
				//formData is need when sending an image to the backend
				//because we cant send image as json
				const formData = new FormData();
				formData.append("name", formState.inputs.name.value);
				formData.append("email", formState.inputs.email.value);
				formData.append("password", formState.inputs.password.value);
				formData.append("image", formState.inputs.image.value);

				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
					"POST",
					formData
				);

				auth.login(response.data.user, response.data.token);
			} catch (err) {}
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<Card className="authentication">
				{isLoading && <LoadingSpinner asOverlay={true} />}
				{!isLoginMode ? <h2>SIGN UP</h2> : <h2>LOGIN</h2>}
				<hr />
				<form onSubmit={authSubmitHandler}>
					{/* signup mode */}
					{!isLoginMode && (
						<Input
							id="name"
							element="input"
							type="text"
							validators={[VALIDATOR_REQUIRE()]}
							label="Name"
							onInput={inputHandler}
							errorText="Please enter a name."
						/>
					)}
					{!isLoginMode && (
						<ImageUpload
							center
							id="image"
							onInput={inputHandler}
							errorText="Please provide an image"
						/>
					)}
					{/* LOGIN MODE */}
					<Input
						id="email"
						element="input"
						type="email"
						validators={[VALIDATOR_EMAIL()]}
						label="Email"
						onInput={inputHandler}
						errorText="Please enter a valid email."
					/>
					<Input
						id="password"
						element="input"
						label="Password"
						type="password"
						validators={[VALIDATOR_MINLENGTH(5)]}
						onInput={inputHandler}
						errorText="Please enter a valid password (min. 5 characters)."
					/>
					<Button type="submit" disabled={!formState.isValid}>
						{isLoginMode ? "LOGIN" : " SIGNUP"}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
				</Button>
			</Card>
		</React.Fragment>
	);
};

export default Auth;

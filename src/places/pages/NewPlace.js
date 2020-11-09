import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload/ImageUpload";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceForm.css";

const NewPlace = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			address: {
				value: "",
				isValid: false,
			},
			image: {
				value: null,
				isValid: false,
			},
		},
		false
	);

	const history = useHistory();

	const placeSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append("title", formState.inputs.title.value);
			formData.append("description", formState.inputs.description.value);
			formData.append("address", formState.inputs.address.value);
			formData.append("image", formState.inputs.image.value);
			formData.append("creator", auth.userId);

			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/api/places/`,
				"POST",
				formData,
				{
					// https://www.loginradius.com/engineering/blog/everything-you-want-to-know-about-authorization-headers/#:~:text=What%20is%20an%20Authorization%20Request,client%20requests%20access%20data%20securely.
					Authorization: "Bearer " + auth.token,
				}
			);
			//allows user to go back to homepage
			history.push("/");
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<form className="place-form" onSubmit={placeSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id="title"
					label="Title"
					element="input"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title"
					onInput={inputHandler}
				/>
				<Input
					id="description"
					label="Description"
					element="textarea"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid description (at least 5 characters)"
					onInput={inputHandler}
				/>
				<Input
					id="address"
					type="input"
					label="Address"
					element="input"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid address"
					onInput={inputHandler}
				/>
				<ImageUpload
					id="image"
					onInput={inputHandler}
					errorText="Please provide an image"
				/>
				<Button type="submit" disabled={!formState.isValid}>
					ADD PLACE
				</Button>
			</form>
		</React.Fragment>
	);
};

export default NewPlace;

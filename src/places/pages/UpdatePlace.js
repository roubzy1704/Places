import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";
import Card from "../../shared/components/UIElements/Card/Card";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import "./PlaceForm.css";

const UpdatePlace = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedPlace, setLoadedPlace] = useState();
	//useParams to get the id specidied in /places/:placeId route in app.js
	const placeId = useParams().placeId;
	const auth = useContext(AuthContext);
	const history = useHistory();

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	useEffect(() => {
		async function fetchPlace() {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`
				);
				setLoadedPlace(response.data.place);
				setFormData(
					{
						title: {
							value: response.data.place.title,
							isValid: true,
						},
						description: {
							value: response.data.place.description,
							isValid: true,
						},
					},
					true
				);
			} catch (err) {}
		}
		fetchPlace();
	}, [sendRequest, placeId, setFormData]);

	const placeUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`,
				"PATCH",
				{
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				},
				{
					"content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				}
			);
			history.push("/" + auth.userId + "/places");
		} catch (err) {}
	};

	if (isLoading) {
		return (
			<div className="center">
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedPlace && !error) {
		return (
			<div className="center">
				<Card>
					<h2>Could not find place!</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedPlace && (
				<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
					<Input
						id="title"
						element="input"
						type="text"
						label="Title"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a valid title."
						onInput={inputHandler}
						initialValue={loadedPlace.title}
						initialValid={true}
					/>
					<Input
						id="description"
						element="textarea"
						label="Description"
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText="Please enter a valid description (min. 5 characters)."
						onInput={inputHandler}
						initialValue={loadedPlace.description}
						initialValid={true}
					/>
					<Button type="submit" disabled={!formState.isValid} on>
						UPDATE PLACE
					</Button>
				</form>
			)}
		</React.Fragment>
	);
};

export default UpdatePlace;

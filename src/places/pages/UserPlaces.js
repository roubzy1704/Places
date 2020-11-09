import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import PlaceList from "../components/PlaceList/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedPlaces, setLoadedPlaces] = useState();
	//useParams gives us access to the dynamic segments we set up in our route config
	//giving us access to the id encoded in the url
	const userId = useParams().userId;

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/api/places/user/${userId}`
				);
				setLoadedPlaces(response.data.places);
			} catch (err) {}
		};
		fetchPlaces();
	}, [sendRequest, userId]);

	const placeDeletedHandler = (deletedPlaceId) => {
		console.log(deletedPlaceId);
		console.log(loadedPlaces);
		setLoadedPlaces((prevPlaces) =>
			prevPlaces.filter((place) => place._id !== deletedPlaceId)
		);
		console.log(loadedPlaces);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedPlaces && (
				<PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
			)}
		</React.Fragment>
	);
};

export default UserPlaces;

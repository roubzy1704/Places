import React, { useState, useContext } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import Map from "../../../shared/components/UIElements/Map/Map";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./PlaceItem.css";

const PlaceItem = (props) => {
	const auth = useContext(AuthContext);

	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const deletePlaceHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/api/places/${props.id}`,
				"DELETE",
				null,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			props.onDelete(props.id);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showMap}
				onCancel={() => setShowMap(false)}
				header={props.address}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={() => setShowMap(false)}>CLOSE</Button>}
			>
				<div className="map-container">
					<Map center={props.coordinates} zoom={15} />
				</div>
			</Modal>

			{/* Modal for deletion confirmation */}
			<Modal
				show={showConfirmModal}
				onCancel={() => setShowConfirmModal(false)}
				header="Delete place"
				footerClass="place-item__modal-actions"
				footer={
					<React.Fragment>
						<Button inverse onClick={() => setShowConfirmModal(false)}>
							CANCEL
						</Button>
						<Button danger onClick={deletePlaceHandler}>
							DELETE
						</Button>
					</React.Fragment>
				}
			>
				<p>Do you want to delete this place?</p>
			</Modal>

			<li className="place-item">
				<Card className="place-item__content">
					{isLoading && <LoadingSpinner asOverlay />}
					<div className="place-item__image">
						<img
							src={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
							alt={props.title}
						/>
					</div>
					<div className="place-item__info">
						<h2>{props.title}</h2>
						<h4>{props.description}</h4>
						<h4>{props.address}</h4>
					</div>
					<div className="place-item__actions">
						<Button inverse onClick={() => setShowMap(true)}>
							VIEW ON MAP
						</Button>
						{auth.userId === props.creatorId && (
							<React.Fragment>
								<Button to={`/places/${props.id}`}>EDIT</Button>
								<Button danger onClick={() => setShowConfirmModal(true)}>
									DELETE
								</Button>
							</React.Fragment>
						)}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PlaceItem;

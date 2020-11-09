import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/Modal/Modal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import UsersList from "../components/userList/UserList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedUsers, setLoadedUsers] = useState();

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/api/users/`
				);
				setLoadedUsers(response.data.users);
			} catch (err) {}
		}
		fetchUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
		</React.Fragment>
	);
};

export default Users;

import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			setIsLoading(true);
			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);

			try {
				const response = await axios({
					url,
					method,
					data: body,
					headers,
					signal: httpAbortCtrl.signal,
				});
				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl
				);

				console.log(response.statusText);
				if (!response.statusText) {
					throw new Error(response.data.message);
				}

				setIsLoading(false);
				return response;
			} catch (err) {
				setError(err.response.data.message);
				console.log(err.response.data.message);
				setIsLoading(false);
				throw new Error(err.response.data.message);
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};

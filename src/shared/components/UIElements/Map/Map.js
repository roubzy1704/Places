import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
	//useRef is used to create a pointer /reference to a DOM node or
	//we can use it to create variables which survive rerender ccles of our component that dont lose their value
	//the former is what is set up here, we could have done this with a DOM selectore like getClassName
	const mapRef = useRef();

	const { center, zoom } = props;

	//use useEffect to register a function that changes based on center and zoom as dependencies
	useEffect(() => {
		//* mapRef.current holds the pointer we need
		//and we tell google maps where it shld render the map
		const map = new window.google.maps.Map(mapRef.current, {
			center: center,
			zoom: zoom,
		});

		//render a marker at the center of map, find more in google maps api documentation
		new window.google.maps.Marker({ position: center, map: map });
	}, [center, zoom]);

	return (
		<div
			// we set up a connection btw this div and the mapRef const,
			//map ref is a pointer to the div
			ref={mapRef}
			className={`map ${props.className}`}
			style={props.style}
		></div>
	);
};

export default Map;

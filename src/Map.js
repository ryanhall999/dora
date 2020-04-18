import React, { useState, useEffect, useRef } from "react";
import { getCurrentPosition } from "./services";

export default function Map({ options, onMount, className, onMountProps }) {
	const ref = useRef();
	const [map, setMap] = useState();
	const [loc, setLoc] = useState({ lat: 30.33, lng: -81.65 });

	async function getLocation() {
		let location = await getCurrentPosition();
		let locationCurrent = {
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		};
		console.log(locationCurrent);
		setLoc(locationCurrent);
	}

	Map.defaultProps = {
		options: {},
	};

	function initMap() {
		var map = new google.maps.Map(document.getElementById("map"), {
			center: { lat: loc.lat, lng: loc.lng },
			mapTypeId: "terrain",
			// draggable: false,
			// zoomControl: false,
			// scrollwheel: false,
			disableDoubleClickZoom: true,
			zoom: 18,
		});
	}

	useEffect(() => {
		getLocation();
		initMap();
	}, [options]);

	if (map && typeof onMount === `function`) onMount(map, onMountProps);

	return <div></div>;
}

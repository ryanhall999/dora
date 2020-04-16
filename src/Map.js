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
		options: {
			// draggable: false,
			// zoomControl: false,
			// scrollwheel: false,
			disableDoubleClickZoom: true,
			center: { lat: loc.lat, lng: loc.lng },
			zoom: 18,
		},
	};

	function initMap() {
		var map = new google.maps.Map(document.getElementById("map"), {
			zoom: 3,
			center: { lat: 0, lng: -180 },
			mapTypeId: "terrain",
		});

		var flightPlanCoordinates = [
			{ lat: 37.772, lng: -122.214 },
			{ lat: 21.291, lng: -157.821 },
			{ lat: -18.142, lng: 178.431 },
			{ lat: -27.467, lng: 153.027 },
		];

		var flightPath = new google.maps.Polyline({
			path: flightPlanCoordinates,
			geodesic: true,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2,
		});

		flightPath.setMap(map);
	}

	useEffect(() => {
		getLocation();
		initMap();
	}, [options]);

	if (map && typeof onMount === `function`) onMount(map, onMountProps);

	return (
		<div>
			<div
				style={{ height: `90%`, margin: `1rem`, borderRadius: `0.5em` }}
				{...{ ref, className }}
			/>
		</div>
	);
}

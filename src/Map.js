import React, { useState, useEffect, useRef } from "react";
import { getCurrentPosition } from "./services";
import Axios from "axios";

export default function Map({ options, onMount, className, onMountProps }) {
	const ref = useRef();
	const [map, setMap] = useState();
	const [loc, setLoc] = useState({ lat: 30.33, lng: -81.65 });
	const [markers, setMarkers] = useState([]);

	var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var labelIndex = 0;

	async function getLocation() {
		let location = await getCurrentPosition();
		let locationCurrent = {
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		};
		setLoc(locationCurrent);
	}

	async function getMarkers() {
		const response = await Axios.get("/api/markers");
		const data = response.data;
		setMarkers(data);
		return data;
	}

	async function initMap() {
		var map = new google.maps.Map(document.getElementById("map"), {
			center: { lat: loc.lat, lng: loc.lng },
			mapTypeId: "roadmap",
			// draggable: false,
			// zoomControl: false,
			// scrollwheel: false,
			disableDoubleClickZoom: true,
			zoom: 10,
		});
		return map;
	}

	useEffect(() => {
		getLocation();
		initMap().then(async (map) => {
			// get the amrkers from the db
			await getMarkers().then((returnedMarkers) => {
				console.log(returnedMarkers);
				returnedMarkers.forEach((marker) => {
					new google.maps.Marker({
						position: {
							lat: marker.lat,
							lng: marker.lng,
						},
						map: map,
						label: marker.name,
					});
				});
			});
		});
	}, [options]);

	if (map && typeof onMount === `function`) onMount(map, onMountProps);

	return <div></div>;
}

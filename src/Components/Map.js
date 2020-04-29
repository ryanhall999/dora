import React, { useState, useEffect, useRef } from "react";
import { getCurrentPosition } from "./services";
import Axios from "axios";

export default function Map({ options, onMount, className, onMountProps }) {
	const ref = useRef();
	const [map, setMap] = useState();
	const [loc, setLoc] = useState({ lat: 30.33, lng: -81.65 });
	const [markers, setMarkers] = useState([]);

	let styles = [
		{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
		{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
		{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
		{
			featureType: "administrative.locality",
			elementType: "labels.text.fill",
			stylers: [{ color: "#d59563" }],
		},
		{
			featureType: "poi",
			elementType: "labels.text.fill",
			stylers: [{ color: "#d59563" }],
		},
		{
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [{ color: "#263c3f" }],
		},
		{
			featureType: "poi.park",
			elementType: "labels.text.fill",
			stylers: [{ color: "#6b9a76" }],
		},
		{
			featureType: "road",
			elementType: "geometry",
			stylers: [{ color: "#38414e" }],
		},
		{
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [{ color: "#212a37" }],
		},
		{
			featureType: "road",
			elementType: "labels.text.fill",
			stylers: [{ color: "#9ca5b3" }],
		},
		{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [{ color: "#746855" }],
		},
		{
			featureType: "road.highway",
			elementType: "geometry.stroke",
			stylers: [{ color: "#1f2835" }],
		},
		{
			featureType: "road.highway",
			elementType: "labels.text.fill",
			stylers: [{ color: "#f3d19c" }],
		},
		{
			featureType: "transit",
			elementType: "geometry",
			stylers: [{ color: "#2f3948" }],
		},
		{
			featureType: "transit.station",
			elementType: "labels.text.fill",
			stylers: [{ color: "#d59563" }],
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [{ color: "#17263c" }],
		},
		{
			featureType: "water",
			elementType: "labels.text.fill",
			stylers: [{ color: "#515c6d" }],
		},
		{
			featureType: "water",
			elementType: "labels.text.stroke",
			stylers: [{ color: "#17263c" }],
		},
	];

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
			zoom: 12,
			styles: styles,
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
					var infowindow = new google.maps.InfoWindow({
						content: `<h1>${marker.name}</h1>
						<h3>$${marker.price}   ${(marker.discount * 100).toFixed(2)}% Off</h3>
						<img src=${marker.image} />
						<p>${marker.description}</p>
						<a href=mailto:?subject=${marker.name} Discount!&body=Check out this deal! ${
							marker.name
						} at % ${marker.discount * 100} off!>Share this Deal!</a>
						<a href="${marker.url}">View This Deal!</a>`,
						maxWidth: 500,
					});
					var marker = new google.maps.Marker({
						position: {
							lat: marker.lat,
							lng: marker.lng,
						},
						icon: "http://maps.google.com/mapfiles/kml/pal3/icon18.png",
						map: map,
					});
					marker.addListener("click", function () {
						infowindow.open(map, marker);
					});
				});
			});
		});
	}, [options]);

	if (map && typeof onMount === `function`) onMount(map, onMountProps);

	return <div></div>;
}

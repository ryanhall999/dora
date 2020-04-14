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
			draggable: false,
			zoomControl: false,
			scrollwheel: false,
			disableDoubleClickZoom: true,
			center: { lat: loc.lat, lng: loc.lng },
			zoom: 15,
		},
	};

	useEffect(() => {
		getLocation();
		const onLoad = () =>
			setMap(new window.google.maps.Map(ref.current, options));
		if (!window.google) {
			const script = document.createElement(`script`);
			script.src =
				`https://maps.googleapis.com/maps/api/js?key=` +
				"AIzaSyD57Szt8xDBZBRP6RTpusrGmrFE0XvzSuU";
			document.head.append(script);
			script.addEventListener(`load`, onLoad);
			return () => script.removeEventListener(`load`, onLoad);
		} else onLoad();
	}, [options]);

	if (map && typeof onMount === `function`) onMount(map, onMountProps);

	return (
		<div
			style={{ height: `90%`, margin: `1rem`, borderRadius: `0.5em` }}
			{...{ ref, className }}
		/>
	);
}

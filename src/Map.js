import React, { useState, useEffect, useRef } from "react";
import { getCurrentPosition } from "./services";

async function getLocation() {
	let loc = await getCurrentPosition();
	let lat = loc.coords.latitude;
	let lon = loc.coords.longitude;
	let newArr = [lat, lon];
	return newArr;
}

export default function Map({ options, onMount, className, onMountProps }) {
	const ref = useRef();
	const [map, setMap] = useState();
	const [loc, getLoc] = useState(getLocation());

	console.log(loc);

	useEffect(() => {
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

Map.defaultProps = {
	options: {
		center: { lat: 30.33, lng: -81.65 },
		zoom: 17,
	},
};

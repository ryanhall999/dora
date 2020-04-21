import React from "react";

export function getCurrentPosition() {
	return new Promise((res, rej) => {
		navigator.geolocation.getCurrentPosition((position) => {
			if (position) {
				res(position);
			} else {
				console.error(position);
				rej("error getting current position");
			}
		});
	});
}

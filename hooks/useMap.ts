"use client";

import { useEffect, useState } from "react";

interface GeoJsonFeatureCollection {
	type: "FeatureCollection";
	features: any[];
}
export function useMap(url = '/assets/geojson/kota.geojson') {
	const [data, setData] = useState<GeoJsonFeatureCollection | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {

		const controller = new AbortController();
		const fetchGeoJson = async () => {
			try {
				setLoading(true);
				const res = await fetch(url, { signal: controller.signal });
				if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
				const json = await res.json();
				setData(json);
			} catch (err: any) {
				if (err.name !== "AbortError") setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchGeoJson();
		return () => controller.abort();
	}, []);

	return { data, loading, error };
}

// API Key for OpenRouteService
const OPENROUTE_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImMwYjI4ZTQzNzgzODQ5Y2M5YmJkNzczNDNmZWVmOTdmIiwiaCI6Im11cm11cjY0In0=";

interface RouteResponse {
  coordinates: [number, number][];
  distance: number; // in meters
  duration: number; // in seconds
}

export type TransportMode = "driving-car" | "foot-walking" | "cycling-regular";

export async function calculateRoute(
  start: [number, number], // [lng, lat]
  end: [number, number], // [lng, lat]
  mode: TransportMode
): Promise<RouteResponse> {
  const url = `https://api.openrouteservice.org/v2/directions/${mode}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: OPENROUTE_API_KEY,
    },
    body: JSON.stringify({
      coordinates: [start, end],
      radiuses: [-1, -1], // -1 = unlimited radius to find nearest routable point
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro ao calcular rota: ${error}`);
  }

  const data = await response.json();
  const route = data.routes[0];

  return {
    coordinates: route.geometry.coordinates,
    distance: route.summary.distance,
    duration: route.summary.duration,
  };
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}min`;
}

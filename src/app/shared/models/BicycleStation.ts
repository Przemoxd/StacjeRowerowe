import { BicycleStationDetails } from "./BicycleStationDetails";

export interface BicycleStation {
    id: string;
    type: string;
    geometry: { coordinates: L.LatLngTuple };
    properties: BicycleStationDetails
}
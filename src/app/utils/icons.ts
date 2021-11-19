import * as L from 'leaflet';

export class Icons {

    static getStationIcon() {
        return new L.DivIcon({
            className: "bicycle-station__icon",
            iconSize: [20, 20]
        })
    }

    static getCurrentLocationIcon() {
        return new L.DivIcon({
            className: "current-position__icon",
            iconSize: [13, 13]
        })
    }
}
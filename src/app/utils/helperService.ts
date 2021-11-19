import { ComponentFactoryResolver, Injectable, Injector } from "@angular/core";

@Injectable()
export class HelperService {

    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector) {
    }

    getComponent(nameComponent: any) {
        let component: any;
        let div = document.createElement('div');
        component = this.resolver.resolveComponentFactory(nameComponent).create(this.injector);
        div.append(component.location.nativeElement);
        component.changeDetectorRef.detectChanges();
        return div;
    }

    getCoordinates(coordinates: L.LatLngTuple): L.LatLngTuple {
        return [...coordinates].reverse() as L.LatLngTuple;
    }

    getDistanceBetweenTwoPoints(from: L.LatLng, to: L.LatLng): string {
        let distance = from.distanceTo(to);
        return distance > 1000 ? (distance / 1000).toFixed(1) + "km" : distance + "m";
    }

    // Dodany reverseGeocoding poniewaz API nie zwraca adresu 
    reverseGeocodingUrl(lat: number, lng: number): string {
        return `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&format=jsonv2`;
    }


}
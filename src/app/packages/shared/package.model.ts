import { Include } from './include.model';
import { Itinerary } from './itinerary.model';
import { Departure } from './departure.model';

export class Package {
    id: string;
    name: string;
    description: string;
    discount: number;
    isActive: boolean;
    isVisible: boolean;
    days: number;
    nights: number;
    idCategory: string;
    notes: string;
    urlImage: string;
    urlImageShowCase: string;
    destiny: string;
    saleDate: string;

    amenities: string[];
    isIncludeHtml: boolean;
    includeHtml: string;
    includes: Include[];

    isItineraryHtml: boolean;
    itineraryHtml: string;
    itinerary: Itinerary[];

    departures: Departure[];

    regulations: string;
    conditions: string;
}

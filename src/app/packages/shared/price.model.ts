import { FlightItinerary } from './flight-itinerary.model';

export class Price {
    id: number;
    isHotelHtml: boolean;
    hotelHtml: string;
    idHotel: number;
    isFlightHtml: boolean;
    flightHtml: string;
    flightItinerary: FlightItinerary[];
    single: number;
    double: number;
    triple: number;
    child: number;
    infant: number;
    stock: number;
    isActive: boolean;
    beginDate: string;
    endDate: string;
}

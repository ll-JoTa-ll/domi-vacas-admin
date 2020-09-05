import { FlightItinerary } from './flight-itinerary.model';

export class Price {
    id: string;
    isHotelHtml: boolean;
    hotelHtml: string;
    idHotel: string;
    isFlightHtml: boolean;
    applyDiscount: boolean;
    discountPercentage: number;
    flightHtml: string;
    flightItinerary: FlightItinerary[];
    single: number;
    double: number;
    triple: number;
    child: number;
    infant: number;
    stock: number;
    stockChild: number;
    stockInfant: number;
    isActive: boolean;
    beginDate: string;
    endDate: string;
    idDeparture: string;
    new: boolean;
}

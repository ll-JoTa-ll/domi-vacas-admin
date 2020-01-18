import { ItineraryDetail } from './itinerary-detail.model';

export class Itinerary{
    id: string;
    title: string;
    // description: string;
    litinerayPackageDetail: ItineraryDetail[];
    isActive: boolean;
    new: boolean;
    details: number;
}

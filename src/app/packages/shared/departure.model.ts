import { Price } from './price.model';

export class Departure {
    id: string;
    beginDate: string;
    endDate: string;
    prices: Price[];
    new: boolean;
    isActive: boolean;
}

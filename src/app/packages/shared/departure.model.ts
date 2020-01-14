import { Price } from './price.model';

export class Departure {
    id: number;
    beginDate: string;
    endDate: string;
    prices: Price[];
}

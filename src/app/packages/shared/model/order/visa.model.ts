import { VisaError } from './error.model';

export class Visa {
    description: string;
    status: string;
    payementDate: string;
    order: string;
    oError: VisaError;
}

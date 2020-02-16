import { Contact } from './contact.model';
import { Cip } from './cip.model';
import { Visa } from './visa.model';

export class Order {
    id: string;
    transactionDate: string;
    namePackage: string;
    totalAmount: string;
    currency: string;
    payementType: string;
    sector: string;
    ocontact: Contact;
    ocip: Cip;
    ovisa: Visa;
}

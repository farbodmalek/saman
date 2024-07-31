export interface CustomerAddress {
    id: number;
    customerId: number;
    customerNumber: number;
    customerAddressTypeId: number;
    customerAddressTypeDesc: string;
    postalCode: string;
    address: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    phone: string;
    fax: string;
    mobile: string;
}

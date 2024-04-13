interface IVenue{
    name:string;
    state:string;
    city:string;
    street:string;
    zipcode:string;
    venueStatus:string;
    details:IVenueDetails;
    venueType:string;
    images:string[];
    Reservations:any[];
    activities:any[];
}

interface IVenueDetails{
    description:string;
    price:string;
    venueNotes:string;
    eventOrganizer:string;
}
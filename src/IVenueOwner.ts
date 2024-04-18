interface IVenueOwner{
    id?:string;
    email:string;
    username:string;
}
interface IVenueOwnerProfile{
    venue_owner?:IVenueOwner;
    first_name?:string;
    last_name?:string;
    contact_number?:string;
    bio?:string;
    address?:string;
}
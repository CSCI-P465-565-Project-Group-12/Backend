import { useEffect, useState } from "react";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import VenuesTable from "../../components/UI/Table/VenuesTable";
import "./AllVenuesPage.css";
import useApi from "../../hooks/apiHook";

interface INewVenueInterface extends IVenue {
  venueId: string;
}

// const dummyVenues: IVenue[] = [
//   {
//     name: "Simon Skjodt Assembly Hall",
//     state: "Indiana",
//     city: "Bloomington",
//     street: "1001 E 17th St",
//     zipcode: "47408",
//     venueStatus: "Active",
//     details: {
//       description:
//         "Simon Skjodt Assembly Hall is a 17,222-seat arena on the campus of Indiana University in Bloomington, Indiana. It is the home of the Indiana Hoosiers Basketball teams. It is located in the Indiana University Bloomington campus.",
//       price: "500",
//       venueNotes: "No outside food allowed",
//       eventOrganizer: "Indiana University",
//     },
//     venueType: "Stadium",
//     images: [
//       "https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fiuhoosiers.com%2Fimages%2F2018%2F12%2F18%2FAssembly_Hall_Progress_ED_06.JPG&height=300",
//     ],
//     Reservations: [],
//     activities: [],
//   },
//   {
//     name: "Memorial Stadium",
//     state: "Indiana",
//     city: "Bloomington",
//     street: "1001 E 17th St",
//     zipcode: "47408",
//     venueStatus: "Active",
//     details: {
//       description:
//         "Memorial Stadium is a football stadium in Bloomington, Indiana. It is the home of the Indiana Hoosiers football team. It was dedicated on October 14, 1960, coming into existence in a game against the University of Michigan.",
//       price: "500",
//       venueNotes: "No outside food allowed",
//       eventOrganizer: "Indiana University",
//     },
//     venueType: "Stadium",
//     images: [
//       "https://www.indiana.edu/images/uploads/venues/memorial-stadium.jpg",
//     ],
//     Reservations: [],
//     activities: [],
//   },
//   {
//     name: "Bill Armstrong Stadium",
//     state: "Indiana",
//     city: "Bloomington",
//     street: "1600 N Fee Ln",
//     zipcode: "47408",
//     venueStatus: "Active",
//     details: {
//       description:
//         "Bill Armstrong Stadium is a soccer stadium in Bloomington, Indiana. It is the home of the Indiana Hoosiers. The stadium is named after Bill Armstrong, a former Indiana University trustee and Bloomington businessman.",
//       price: "500",
//       venueNotes: "No outside food allowed",
//       eventOrganizer: "Indiana University",
//     },
//     venueType: "Stadium",
//     images: [
//       "https://www.indiana.edu/images/uploads/venues/armstrong-stadium.jpg",
//     ],
//     Reservations: [],
//     activities: [],
//   },
//   {
//     name: "SRSC Pool",
//     state: "Indiana",
//     city: "Bloomington",
//     street: "1601 Law Ln",
//     zipcode: "47408",
//     venueStatus: "Active",
//     details: {
//       description:
//         "The SRSC Pool is a swimming pool in Bloomington, Indiana. It is located in the Student Recreational Sports Center (SRSC) on the Indiana University Bloomington campus.",
//       price: "500",
//       venueNotes: "No outside food allowed",
//       eventOrganizer: "Indiana University",
//     },
//     venueType: "Pool",
//     images: ["https://www.indiana.edu/images/uploads/venues/srsc-pool.jpg"],
//     Reservations: [],
//     activities: [],
//   },
// ];

// const newDummyVenues = dummyVenues.map((venue) => {
//   return {
//     name: venue.name,
//     street: venue.street,
//     status: venue.venueStatus,
//   };
// });
// console.log(newDummyVenues);

const AllVenuesPage = () => {
  const [venues, setVenues] = useState<INewVenueInterface[]>([]);
  const { getAllVenues } = useApi();
  useEffect(() => {
    getAllVenues().then((res) => {
      console.log(res);
      setVenues(res);
    });
  }, []);
  const requiredColsVenues = venues.map((venue) => {
    return {
      name: venue.name,
      street: venue.street,
      status: venue.venueStatus,
    };
  });
  return (
    <div className="all-venues-page-container">
      <HomePageLayoutCards width="90%" height="100%">
        <div className="all-venues-header">
          <h1>All Venues</h1>
        </div>
        <VenuesTable
          columns={["Venue Name", "Status", "Location"]}
          displayData={requiredColsVenues}
          data={venues}
        />
      </HomePageLayoutCards>
    </div>
  );
};
export default AllVenuesPage;

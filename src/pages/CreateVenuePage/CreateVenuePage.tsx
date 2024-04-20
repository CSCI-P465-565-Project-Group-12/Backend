import { useState } from "react";
import { useNavigate } from "react-router";
import "./CreateVenuePage.css";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "../../components/UI/Modal/LoadingModal";
import Footer from "../../components/UI/Footer/Footer";
import useApi from "../../hooks/apiHook";
import { loadingActions } from "../../store/loading-store";
const CreateVenuePage = () => {
  const { createVenue } = useApi();
  const venueOwner = useSelector((state: any) => state.venueOwner);
  console.log(venueOwner);
  const venueStatusOptions = ["open", "close"];
  const [venue, setVenue] = useState<IVenue>({
    name: "",
    state: "",
    city: "",
    street: "",
    zipcode: "",
    venueStatus: venueStatusOptions[0],
    details: {
      description: "",
      price: "",
      venueNotes: "",
      eventOrganizer: venueOwner.first_name + " " + venueOwner.last_name,
    },
    venueType: "",
    images: [],
    Reservations: [],
    activities: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    // console.log(venue);

    if (
      venue.images.length === 0 ||
      venue.name === "" ||
      venue.state === "" ||
      venue.city === "" ||
      venue.street === "" ||
      venue.zipcode === "" ||
      venue.venueStatus === "" ||
      venue.venueType === "" ||
      venue.details.description === "" ||
      venue.details.price === "" ||
      venue.details.venueNotes === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(loadingActions.setLoading({ isLoading: true, message: "" }));
    createVenue({
      name: venue.name,
      state: venue.state,
      city: venue.city,
      street: venue.street,
      zipcode: venue.zipcode,
      details: JSON.stringify(venue.details),
      venueType: venue.venueType,
      images: venue.images,
      venueStatus: venue.venueStatus,
    });
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Add a Venue
      </h1>
      <div className="create-venue-page-container">
        <div
          className="back-btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          <i className="bi bi-arrow-left-circle-fill" />
        </div>
        <HomePageLayoutCards width="40%" height="100%">
          <div className="create-venue-form">
            <form>
              <div className="form-control">
                <label htmlFor="venue-name">Venue Name</label>
                <input
                  type="text"
                  id="venue-name"
                  onChange={(e) => {
                    setVenue({ ...venue, name: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-state">State</label>
                <input
                  type="text"
                  id="venue-state"
                  onChange={(e) => {
                    setVenue({ ...venue, state: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-city">City</label>
                <input
                  type="text"
                  id="venue-city"
                  onChange={(e) => {
                    setVenue({ ...venue, city: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-street">Street</label>
                <input
                  type="text"
                  id="venue-street"
                  onChange={(e) => {
                    setVenue({ ...venue, street: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-zipcode">Zipcode</label>
                <input
                  type="text"
                  id="venue-zipcode"
                  onChange={(e) => {
                    setVenue({ ...venue, zipcode: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-status">Venue Status</label>
                <select
                  id="venue-status"
                  onChange={(e) => {
                    setVenue({ ...venue, venueStatus: e.target.value });
                  }}
                >
                  {venueStatusOptions.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="venue-type">Venue Type</label>
                <input
                  type="text"
                  id="venue-type"
                  onChange={(e) => {
                    setVenue({ ...venue, venueType: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-description">Venue Description</label>
                <textarea
                  id="venue-description"
                  onChange={(e) => {
                    setVenue({
                      ...venue,
                      details: {
                        ...venue.details,
                        description: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-price">Venue Price</label>
                <input
                  type="text"
                  id="venue-price"
                  onChange={(e) => {
                    setVenue({
                      ...venue,
                      details: { ...venue.details, price: e.target.value },
                    });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-notes">Venue Notes</label>
                <textarea
                  id="venue-notes"
                  onChange={(e) => {
                    setVenue({
                      ...venue,
                      details: { ...venue.details, venueNotes: e.target.value },
                    });
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-organizer">Event Organizer</label>
                <input
                  type="text"
                  id="venue-organizer"
                  value={venueOwner.first_name + " " + venueOwner.last_name}
                  disabled
                />
              </div>
              <div className="form-control">
                <label htmlFor="venue-images">Venue Images</label>
                <input
                  type="file"
                  id="venue-images"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        // create a hash of the image using bcrypt

                        setVenue({
                          ...venue,
                          images: [...venue.images, reader.result as string],
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                onClick={submitHandler}
                style={{
                  width: "100%",
                  margin: "1rem",
                }}
              >
                Create Venue
              </button>
            </form>
          </div>
        </HomePageLayoutCards>
        <HomePageLayoutCards width="40%" height="100%">
          <div className="venue-preview">
            <div className="venue-preview-content">
              <h2>Venue Preview</h2>
              <div className="venue-preview-images">
                {venue.images.map((image, index) => (
                  <>
                    <div className="venue-preview-image">
                      <img key={index} src={image} alt="venue" />
                    </div>
                  </>
                ))}
              </div>
              <div className="venue-preview-details">
                <h3>{venue.name}</h3>
                <p>{venue.state}</p>
                <p>{venue.city}</p>
                <p>{venue.street}</p>
                <p>{venue.zipcode}</p>
                <p>{venue.venueStatus}</p>
                <p>{venue.venueType}</p>
                <p>{venue.details.description}</p>
                <p>{venue.details.price}</p>
                <p>{venue.details.venueNotes}</p>
                <p>{venue.details.eventOrganizer}</p>
              </div>
            </div>
          </div>
        </HomePageLayoutCards>
      </div>
      <LoadingModal message="Creating Venue.." />
      <Footer />
    </>
  );
};

export default CreateVenuePage;

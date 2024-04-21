import { useDispatch, useSelector } from "react-redux";
import HomePageLayoutCards from "../../components/UI/HomePageLayoutCards/HomePageLayoutCards";
import "./UpdateEventPage.css";
import { IEvent } from "../../IEvent";
import { useEffect, useState } from "react";
import { updateEventActions } from "../../store/update-event-store";
import { useNavigate } from "react-router";
import useApi from "../../hooks/apiHook";
import { FileObj, uploadFilesToStorage } from "../../helpers/file-service";
import { v4 as uuidv4 } from "uuid";

interface IVenueWithId extends IVenue {
  id: string;
}
const UpdateEventPage = () => {
  const retrievedEvent: IEvent = useSelector(
    (state: any) => state.updateEvents
  );

  const [venues, setVenues] = useState<IVenueWithId[]>([]);
  const { getAllVenues } = useApi();
  useEffect(() => {
    getAllVenues().then((res) => {
      setVenues(res);
    });
  }, []);
  const venuesOptions = venues.map((venue: any) => (
    <option value={venue.venueId}>{venue.name}</option>
  ));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newEventData, setNewEventData] = useState<IEvent>({
    name: retrievedEvent.name,
    startTime: retrievedEvent.startTime,
    endTime: retrievedEvent.endTime,
    coverImg: retrievedEvent.coverImg,
    description: retrievedEvent.description,
    images: retrievedEvent.images,
    activityStatus: retrievedEvent.activityStatus,
    ageRange: retrievedEvent.ageRange,
    capacity: retrievedEvent.capacity,
    cost: retrievedEvent.cost,
  });
  const [images, setImages] = useState<FileObj[]>([]);
  const [coverImg, setCoverImg] = useState<FileObj[]>([]);
  console.log(retrievedEvent);

  const handleImageUpload = (e: any) => {
    const files = [...e.target.files].map(file => {
      return {
          file,
      }
  })
  setImages(
      [...images, ...files]
  )
  };

  const handleCoverImageUpload = (e: any) => {
    const files = [...e.target.files].map(file => {
      return {
          file,
      }
    })
    setCoverImg(
      [...coverImg, ...files]
    )
  }

  const submitHandler = async(e: any) => {
    e.preventDefault();
    const id = uuidv4();
    const imageUrls = await uploadFilesToStorage(id, images);
    const coverImgUrl = await uploadFilesToStorage(id, coverImg);
    dispatch(updateEventActions.updateEventDetails({
      ...newEventData,
      images: [...(imageUrls || []), ...newEventData.images],
      coverImg: (coverImgUrl && coverImgUrl.length>0 ? coverImgUrl[0] : newEventData.coverImg)
    }));
    alert("newEventData updated successfully");
    navigate("/");
  };
  return (
    <div className="update-event-page-container">
      <div className="back-btn">
        <i className="bi bi-arrow-left-circle-fill" />
      </div>
      {retrievedEvent.name === "" ? (
        <h1>Something went wrong</h1>
      ) : (
        <>
          <HomePageLayoutCards width="40%" height="100%">
            <div className="create-event-form">
              <form>
                <div className="form-group">
                  <label htmlFor="coverImage">Cover Image</label>
                  <input
                    type="file"
                    id="coverImage"
                    onChange={handleCoverImageUpload}
                    // {(e) => {
                    //   const file = e.target.files?.[0];
                    //   if (file) {
                    //     const reader = new FileReader();
                    //     reader.onload = () => {
                    //       // create a hash of the image using bcrypt
                    //       setNewEventData({
                    //         ...newEventData,
                    //         coverImg: reader.result as string,
                    //       });
                    //     };
                    //     reader.readAsDataURL(file);
                    //   }
                    // }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Event Name</label>
                  <input
                    type="text"
                    id="name"
                    value={newEventData.name}
                    onChange={(e) =>
                      setNewEventData({ ...newEventData, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="newEventData-description">
                    Venue Description
                  </label>
                  <textarea
                    id="newEventData-description"
                    onChange={(e) => {
                      setNewEventData({
                        ...newEventData,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="venueId">Venue</label>
                  <select
                    name="venueId"
                    id="venueId"
                    onChange={(e) => {
                      let venueId = venues.find((venue) => {
                        return venue.name === e.target.value;
                      })?.id;

                      setNewEventData({ ...newEventData, venueId: venueId });
                    }}
                  >
                    <option value="">Select Venue</option>
                    {venuesOptions}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="ageRange">Age Range</label>
                  <input
                    type="text"
                    id="ageRange"
                    value={newEventData.ageRange}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        ageRange: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cost">Cost</label>
                  <input
                    type="text"
                    id="cost"
                    value={newEventData.cost}
                    onChange={(e) => {
                      setNewEventData({
                        ...newEventData,
                        cost: parseFloat(e.target.value).toFixed(2),
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="number"
                    id="capacity"
                    value={newEventData.capacity}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        capacity: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="activityStatus">Activity Status</label>
                  <input
                    type="text"
                    id="activityStatus"
                    value={newEventData.activityStatus}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        activityStatus: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startTime">Start Time</label>
                  <input
                    type="datetime-local"
                    id="startTime"
                    value={newEventData.startTime}
                    onChange={(e) => {
                      console.log(e.target.value);

                      setNewEventData({
                        ...newEventData,
                        startTime: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endTime">End Time</label>
                  <input
                    type="datetime-local"
                    id="endTime"
                    value={newEventData.endTime}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        endTime: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="venue-images">Venue Images</label>
                  <input
                    type="file"
                    id="venue-images"
                    onChange={handleImageUpload}
                    // {(e) => {
                    //   const file = e.target.files?.[0];
                    //   if (file) {
                    //     const reader = new FileReader();
                    //     reader.onload = () => {
                    //       // create a hash of the image using bcrypt
                    //       setNewEventData({
                    //         ...newEventData,
                    //         images: [
                    //           ...newEventData.images,
                    //           reader.result as string,
                    //         ],
                    //       });
                    //     };
                    //     reader.readAsDataURL(file);
                    //   }
                    // }}
                  />
                </div>
                <button type="submit" onClick={submitHandler}>
                  Create newEventData
                </button>
              </form>
            </div>
          </HomePageLayoutCards>
          <HomePageLayoutCards width="40%" height="100%">
            <div className="event-preview">
              <h2>Event Preview</h2>

              <div className="event-preview-content">
                <div className="event-preview-cover">
                  <img src={newEventData.coverImg} alt="event" />
                </div>
                <div className="event-preview-images">
                  {newEventData.images.map((image, index) => (
                    <>
                      <div className="event-preview-image">
                        <img key={index} src={image} alt="event" />
                      </div>
                    </>
                  ))}
                </div>
                <div className="event-preview-details">
                  <h3>{newEventData.name}</h3>
                  <p>Age Range: {newEventData.ageRange}</p>
                  <p>Cost: {newEventData.cost}</p>
                  <p>Capacity: {newEventData.capacity}</p>
                  <p>Activity Status: {newEventData.activityStatus}</p>
                  <p>Start Time: {newEventData.startTime}</p>
                  <p>End Time: {newEventData.endTime}</p>
                </div>
              </div>
            </div>
          </HomePageLayoutCards>
        </>
      )}
    </div>
  );
};
export default UpdateEventPage;

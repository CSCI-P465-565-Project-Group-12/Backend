import { useDispatch, useSelector } from "react-redux";
import "./VenueOwnerProfilePage.css";
import Footer from "../../components/UI/Footer/Footer";
import { useEffect, useState } from "react";
import useApi from "../../hooks/apiHook";
import { venueOwnerActions } from "../../store/venue-owner-store";
const VenueOwnerProfilePage: React.FC = () => {
  const { fetchProfile, updateProfile, createProfile } = useApi();
  const venueOwner: IVenueOwnerProfile = useSelector(
    (state: any) => state.venueOwner
  );
  const [venueOwnerProfile, setVenueOwnerProfile] =
    useState<IVenueOwnerProfile>({
      first_name: "",
      last_name: "",
      bio: "",
      address: "",
      contact_number: "",
      venue_owner: {
        username: "",
        email: "",
      },
    });
  const [isUserEditing, setIsUserEditing] = useState({
    first_name: false,
    last_name: false,
    email: false,
    username: false,
    bio: false,
    address: false,
    contact_number: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const checkForProfile = async () => {
      const profile: any = await fetchProfile(
        venueOwner.venue_owner?.username!
      ).then((res) => {
        return res;
      });
      console.log(profile);

      if (profile === null) {
        const data = {
          first_name: "",
          last_name: "",
          contact_number: "",
          bio: "",
          address: "",
        };
        return createProfile(data);
      }
      if (profile) {
        setVenueOwnerProfile({
          venue_owner: {
            username: venueOwner.venue_owner!.username,
            email: venueOwner.venue_owner!.email,
          },
          first_name: profile.first_name,
          last_name: profile.last_name,
          contact_number: profile.contact_number,
          bio: profile.bio,
          address: profile.address,
        });
        dispatch(venueOwnerActions.setVenueOwnerProfile(profile));
      }
    };
    checkForProfile();
  }, []);

  const updateProfileHandler = async () => {
    const updatedProfile = await updateProfile({
      first_name: venueOwnerProfile.first_name,
      last_name: venueOwnerProfile.last_name,
      address: venueOwnerProfile.address,
      bio: venueOwnerProfile.address,
      contact_number: venueOwnerProfile.contact_number,
    }).then((res) => {
      return res;
    });
    console.log(updatedProfile);

    if (updatedProfile) {
      alert("Profile updated successfully!");
      setVenueOwnerProfile({
        venue_owner: {
          username: venueOwner.venue_owner!.username,
          email: venueOwner.venue_owner!.email,
        },
        first_name: updatedProfile.first_name,
        last_name: updatedProfile.last_name,
        contact_number: updatedProfile.contact_number,
        bio: updatedProfile.bio,
        address: updatedProfile.address,
      });
      dispatch(venueOwnerActions.setVenueOwnerProfile(updatedProfile));
    } else {
      alert("Somethhing went wrong while updating your profile");
    }
    setIsUserEditing({
      first_name: false,
      last_name: false,
      email: false,
      username: false,
      bio: false,
      address: false,
      contact_number: false,
    });
  };
  const previewProfilePic = (event: any) => {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
      const img = input.nextElementSibling.querySelector("img");
      img.src = reader.result;
    };

    reader.readAsDataURL(input.files[0]);
  };
  return (
    <>
      <div className="venue-owner-profile-page">
        <div className="profile-pic">
          <input
            type="file"
            id="profile-pic-upload"
            accept="image/*"
            onChange={(event) => previewProfilePic(event)}
          />
          <label htmlFor="profile-pic-upload">
            <img
              src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
              alt="Profile Picture"
            />
            <span className="tooltip">Upload</span>
          </label>{" "}
        </div>
        <div className="profile-details">
          <h2>
            {venueOwner.first_name ? venueOwner.first_name : "Enter Your Name"}{" "}
            {venueOwner.last_name ? venueOwner.last_name : ""}
          </h2>
          <h3>@{venueOwner.venue_owner!.username}</h3>
          <p>{venueOwner.venue_owner!.email}</p>
          <div className="profile-details-form">
            <h3>Edit Your Details</h3>
            <div className="form-element">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Your Username"
                value={venueOwner.venue_owner!.username}
                disabled
              />
            </div>
            <div className="form-element">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter Your Email"
                value={venueOwner.venue_owner!.email}
                disabled
              />
            </div>
            <div className="form-element">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Enter Your First Name"
                value={venueOwnerProfile.first_name}
                onChange={(event) => {
                  console.log(event.target.value);
                  setVenueOwnerProfile({
                    ...venueOwnerProfile,
                    first_name: event.target.value,
                  });
                }}
                onFocus={() => {
                  setIsUserEditing({
                    ...isUserEditing,
                    first_name: true,
                  });
                }}
              />
            </div>
            <div className="form-element">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Enter Your Last Name"
                value={venueOwnerProfile.last_name}
                onChange={(event) => {
                  setVenueOwnerProfile({
                    ...venueOwnerProfile,
                    last_name: event.target.value,
                  });
                }}
                onFocus={() => {
                  setIsUserEditing({
                    ...isUserEditing,
                    last_name: true,
                  });
                }}
              />
            </div>
            <div className="form-element">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                placeholder="Enter Your Bio"
                value={venueOwnerProfile.bio}
                onChange={(event) => {
                  setVenueOwnerProfile({
                    ...venueOwnerProfile,
                    bio: event.target.value,
                  });
                }}
                onFocus={() => {
                  setIsUserEditing({
                    ...isUserEditing,
                    bio: true,
                  });
                }}
              />
            </div>
            <div className="form-element">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter Your Address"
                value={venueOwnerProfile.address}
                onChange={(event) => {
                  setVenueOwnerProfile({
                    ...venueOwnerProfile,
                    address: event.target.value,
                  });
                }}
                onFocus={() => {
                  setIsUserEditing({
                    ...isUserEditing,
                    address: true,
                  });
                }}
              />
            </div>
            <div className="form-element">
              <label htmlFor="contact-number">Contact Number</label>
              <input
                type="text"
                id="contact-number"
                placeholder="Enter Your Contact Number"
                value={venueOwnerProfile.contact_number}
                onChange={(event) => {
                  setVenueOwnerProfile({
                    ...venueOwnerProfile,
                    contact_number: event.target.value,
                  });
                }}
                onFocus={() => {
                  setIsUserEditing({
                    ...isUserEditing,
                    contact_number: true,
                  });
                }}
              />
            </div>
            {(isUserEditing.address ||
              isUserEditing.bio ||
              isUserEditing.contact_number ||
              isUserEditing.first_name ||
              isUserEditing.last_name ||
              isUserEditing.username ||
              isUserEditing.email) && (
              <div
                style={{
                  display: "flex",
                }}
              >
                <div className="form-element">
                  <button onClick={updateProfileHandler}>Update Profile</button>
                </div>
                <div className="form-element">
                  <button
                    style={{
                      backgroundColor: "red",
                    }}
                    onClick={() => {
                      setIsUserEditing({
                        first_name: false,
                        last_name: false,
                        email: false,
                        username: false,
                        bio: false,
                        address: false,
                        contact_number: false,
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default VenueOwnerProfilePage;

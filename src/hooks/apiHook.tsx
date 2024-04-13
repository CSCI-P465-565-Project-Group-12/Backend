import axios from "axios";
import { useDispatch } from "react-redux";
import { loadingActions } from "../store/loading-store";
import { loginActions } from "../store/login-store";
import { useNavigate } from "react-router";
import { venueOwnerActions } from "../store/venue-owner-store";

const useApi = () => {
  const baseApi = import.meta.env.VITE_BASE_API as string;
  const vabApi = import.meta.env.VITE_BASE_VAB_API as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateVenueOwnerToken = async (token: string) => {
    await axios
      .get(baseApi + "currentuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        const username = res.data.jwtUserObj.username;
        const email = res.data.jwtUserObj.email;
        dispatch(loginActions.setLogin());
        dispatch(loadingActions.setLoading({ isLoading: false, message: "" }));
        dispatch(
          venueOwnerActions.setIntialVenueOwner({
            venue_owner: { username, email },
          })
        );
        navigate("/");
      })
      .catch((err) => {
        return err.response.data;
      });
  };
  const fetchProfile = async (username: string) => {
    const response = await axios.get(baseApi + "profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        username: username,
      },
    });
    console.log(response.data);
    return response.data;
  };
  const createProfile = async (data: any) => {
    console.log(data);

    await axios
      .post(baseApi + "createprofile", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("Profile created successfully.");
        return res.data;
      })
      .catch((err) => {
        alert("An error occurred while creating the profile.");
        console.log(err.response);
        return err.response.data;
      });
  };
  const updateProfile = async (data: any) => {
    console.log(data);

    const response = await axios.post(
      baseApi + "updateprofile",
      { updateParams: data },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  };

  const createVenue = async (data: any) => {
    // console.log(data);

    const response = await axios.post(vabApi + "venue", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 500) {
      alert("An error occurred while creating the venue.");
      dispatch(loadingActions.setLoading({ isLoading: false, message: "" }));
    }
    alert("Venue Created Successfully");
    dispatch(loadingActions.setLoading({ isLoading: false, message: "" }));
    navigate("/all-venues");
    return response.data;
  };

  const getAllVenues = async () => {
    const response = await axios.get(vabApi + "venues", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };
  const createEvent = async (data: any) => {
    const response = await axios.post(baseApi + "activity", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };
  return {
    validateVenueOwnerToken,
    updateProfile,
    createProfile,
    fetchProfile,
    createVenue,
    getAllVenues,
    createEvent,
  };
};

export default useApi;

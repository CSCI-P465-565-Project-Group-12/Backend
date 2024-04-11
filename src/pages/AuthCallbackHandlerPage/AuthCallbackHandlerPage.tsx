import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading-store";
import useApi from "../../hooks/apiHook";
import LoadingModal from "../../components/UI/Modal/LoadingModal";

const AuthCallbackHandlerPage = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(
    loadingActions.setLoading({ isLoading: true, message: "Authenticating..." })
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  //   const dispatch = useDispatch();
  const { validateVenueOwnerToken } = useApi();
  if (token) {
    localStorage.setItem("token", token);
    validateVenueOwnerToken(token);
  }

  return <LoadingModal message="Authenticating..." />;
};
export default AuthCallbackHandlerPage;

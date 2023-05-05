import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
  const [error, setError] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const tokenId = searchParams.get("id_token");
        const url = "http://localhost:8080/api/auth/google";
        const { data } = await axios.post(url, { tokenId });
        localStorage.setItem("token", data);
        history("/");
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchToken();
  }, [history]);

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
};

export default GoogleCallback;
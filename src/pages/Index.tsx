
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

const Index = () => {
  const navigate = useNavigate();

  // Simply redirect to the HomePage
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  // Render the HomePage directly
  return <HomePage />;
};

export default Index;

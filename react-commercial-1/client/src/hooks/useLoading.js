import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const useLoading = (delay = 800) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [location.pathname, delay]);

  
  return loading;
};

export default useLoading;

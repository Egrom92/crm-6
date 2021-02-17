import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();
  const [query, setQuery] = useState({});

  useEffect(() => {
    setQuery(
      Object.fromEntries(
        location.search
          .slice(1)
          .split("&")
          .map((pair) => pair.split("="))
      )
    );
  }, [location.search]);

  return query;
};

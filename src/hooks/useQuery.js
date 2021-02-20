import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();

  const query = useMemo(
      () =>
          Object.fromEntries(
              location.search
                  .slice(1)
                  .split("&")
                  .map((pair) => pair.split("="))
          ),
      [location.search]
  );

  return query;
};

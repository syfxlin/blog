import { useEffect, useState } from "react";

export function useIsClient() {
  const [client, setClient] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect -- Reveal client-only content after hydration.
    setClient(true);
  }, []);
  return client;
}

import { useAsync } from "react-use";

export const useFetchJson = (url: string) =>
  useAsync(() =>
    fetch(url).then((res) => {
      if (res.status >= 400) {
        return Promise.reject(true);
      }
      return res.json();
    })
  );

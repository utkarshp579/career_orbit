// hooks are basically function , but super power of react.
// What is useFetch?
// useFetch is a custom hook you wrote to handle async operations (like API calls).
// Instead of writing the same loading/error/data logic everywhere, you wrap it into one reusable hook

import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  // cb is the callback function you passed (example: updateUser).
  // Ex - update user is passed from client side
  const [data, setData] = useState(undefined); // stores API response.
  const [loading, setLoading] = useState(null); // tells if the API is running.
  const [error, setError] = useState(null); // stores any error that happens.

  // fn is the function you use to actually trigger the API.
  const fn = async (...args) => {
    // if your API needs id, name, you can call fn(id, name) and those values will be passed to cb(id, name).
    setLoading(true);
    setError(null);

    try {
      // Automatically handles: start loading, save data if success, show error if fail, stop loading at the end.
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData }; // fn → function to call the API. setData → manually set/change data. , we are passing so we can manage them from outside.
};

export default useFetch;

// ⚡ Steps to Create a Custom Hook
// Think of a custom hook as:
// 🔹 “A function that uses React hooks(useState, useEffect, etc.) to make reusable logic.”



// ✅ Structure to Build a Hook

// 1. Name it with use prefix
// (example: useFetch, useAuth, useTheme).

// 2. Import React hooks

import { useState, useEffect } from "react";


// 3. Define your hook function

const useSomething = () => {
  // states
  const [value, setValue] = useState(null);

  // logic
  useEffect(() => {
    // do side effect
  }, []);

  // return things
  return { value, setValue };
}


// 4. Return only what’s needed
// (states, functions, etc.) → so consuming component has a clean API.

// 5.  Use it inside a component
const { value, setValue } = useSomething();




// ⚡ Example: Simple useCounter Hook
import { useState } from "react";

const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
};

// 5. export default useCounter;



Usage:
const { count, increment, decrement, reset } = useCounter(10);

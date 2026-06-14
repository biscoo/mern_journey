import { useState } from "react";

function Counter({ startValue }) {
  const [count, setCount] = useState(startValue);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;

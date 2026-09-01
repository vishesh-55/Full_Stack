import { useEffect, useState } from "react";

function Stopwatch() {
  const [sec, setSec] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!run) return;
    const timer = setInterval(() => setSec(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [run]);

  return (
    <>
      <h2>{sec} seconds</h2>
      <button onClick={() => setRun(true)}>Start</button>
      <button onClick={() => setRun(false)}>Pause</button>
      <button onClick={() => {setRun(false); setSec(0)}}>Reset</button>
    </>
  );
}
export default Stopwatch;
import { useState } from "react";

function Login() {
  const [login, setLogin] = useState(false);

  return login ? (
    <>
      <h2>Welcome!</h2>
      <button onClick={() => setLogin(false)}>Logout</button>
    </>
  ) : (
    <button onClick={() => setLogin(true)}>Login</button>
  );
}
export default Login;
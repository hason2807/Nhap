import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./common/routes";
function App() {
  return (
      <RouterProvider router={router} />
  );
}
export default App;
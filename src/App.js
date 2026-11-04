import { Provider } from "react-redux";
import Body from "./Components/Body";
import store from "./Utils/userStore";
function App() {
  return (
    <Provider store = {store}>
    <div className="App">
      <Body />
    </div>
    </Provider>
  );
}

export default App;

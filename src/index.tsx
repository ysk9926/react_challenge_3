import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </div>
);

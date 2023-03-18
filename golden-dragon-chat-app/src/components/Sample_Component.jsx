import Sammy from "../img/sammy.jpeg"
import "../css/main.css"

export default function SampleComponent() {
  return (
  <>
    <div className="wrapper">
      <h1>Welcome to the Golden Dragon Chat App</h1>
      <p>This is an example of a React.js component.</p>
      <img src={Sammy} alt="Sammy Image" width={200} height={200} />
    </div>
  </>
  );
  }

import React from "react";
import Gallery from "./Gallery";
import { toggleTheme } from "./utils";

function App() {
  return (
    <div className="app">
      {/* <h1>Hello Foodlers</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ratione id
        voluptates eos voluptas, facere, esse eius laborum cumque hic rerum
        earum tempore at doloribus qui? Dolores enim totam laboriosam?
      </p>
      <button onClick={toggleTheme}>Theme</button> */}
      <Gallery />
    </div>
  );
}

export default App;

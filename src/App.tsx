import { useState } from "react";
import furtherLogo from "./assets/logo.webp";

function App() {
  return (
    <>
      <div className="flex flex-col gap-10 p-4 border rounded">
        <img className="w-80 mx-auto" src={furtherLogo} alt="Vite logo" />

        <div className="p-2 border">
          <h2>Table</h2>
        </div>
      </div>
    </>
  );
}

export default App;

// src/App.jsx
import React from "react";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <div>
      <ContactForm /> {/* Only this line should render the form */}
    </div>
  );
}

export default App;

import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const host = document.getElementById("root");
if (host === null) throw new Error("no #root");

// Deliberately not StrictMode at the top level: one panel mounts its own
// StrictMode root so the double-render case is isolated and visible rather
// than applied to everything at once.
createRoot(host).render(<App />);

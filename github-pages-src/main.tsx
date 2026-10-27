import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SitePage, type PageId } from "../app/page";
import "../app/globals.css";
import "./github.css";

const root = document.getElementById("root")!;
const page = (root.dataset.page || "home") as PageId;
createRoot(root).render(
  <StrictMode>
    <SitePage page={page} />
  </StrictMode>,
);

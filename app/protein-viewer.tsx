"use client";

import { useEffect, useRef, useState } from "react";

type Viewer = {
  addModel(data: string, format: string): void;
  setStyle(selection: object, style: object): void;
  setBackgroundColor(color: string): void;
  zoomTo(): void;
  render(): void;
  spin(axis: string | boolean, speed?: number, onlyWhenVisible?: boolean): void;
  resize(): void;
};

type MolLibrary = { createViewer(element: HTMLElement, config: object): Viewer };
declare global { interface Window { $3Dmol?: MolLibrary } }

let libraryPromise: Promise<MolLibrary> | undefined;

function loadLibrary(src: string): Promise<MolLibrary> {
  if (window.$3Dmol) return Promise.resolve(window.$3Dmol);
  if (!libraryPromise) {
    libraryPromise = new Promise<MolLibrary>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => window.$3Dmol ? resolve(window.$3Dmol) : reject(new Error("Molecular viewer unavailable"));
      script.onerror = () => reject(new Error("Molecular viewer could not load"));
      document.head.appendChild(script);
    }).catch((error) => { libraryPromise = undefined; throw error; });
  }
  return libraryPromise!;
}

export default function ProteinViewer({ lang }: { lang: "en" | "vi" }) {
  const element = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    let viewer: Viewer | undefined;
    const base = window.location.pathname.startsWith("/labduoclieu/") ? "/labduoclieu/" : "/";
    const controller = new AbortController();

    Promise.all([
      loadLibrary(`${base}3Dmol-min.js`),
      fetch(`${base}4EY4.pdb`, { signal: controller.signal }).then((response) => {
        if (!response.ok) throw new Error(`PDB download failed: ${response.status}`);
        return response.text();
      }),
    ]).then(([mol, pdb]) => {
      if (cancelled || !element.current) return;
      viewer = mol.createViewer(element.current, { antialias: true });
      viewer.setBackgroundColor("#10231f");
      viewer.addModel(pdb, "pdb");
      // A ribbon is a standard rendering of the deposited atomic coordinates.
      viewer.setStyle({ chain: "A", hetflag: false }, { cartoon: { color: "#d8ff5f" } });
      viewer.setStyle({ chain: "B", hetflag: false }, { cartoon: { color: "#70cbd1" } });
      viewer.zoomTo();
      viewer.render();
      viewer.spin("y", 0.55, true);
      setState("ready");
    }).catch(() => { if (!cancelled) setState("error"); });

    const resize = () => viewer?.resize();
    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      controller.abort();
      window.removeEventListener("resize", resize);
      viewer?.spin(false);
      element.current?.replaceChildren();
    };
  }, []);

  return <div className="protein-panel">
    <div className="protein-head"><span>{lang === "vi" ? "Cấu trúc protein thực nghiệm" : "Experimental protein structure"}</span><span>RCSB PDB · 4EY4</span></div>
    <div className="protein-stage" ref={element} role="img" aria-label={lang === "vi" ? "Mô hình 3D xoay của acetylcholinesterase người từ tệp PDB 4EY4" : "Rotating 3D model of human acetylcholinesterase from PDB entry 4EY4"}>
      {state !== "ready" && <p className="protein-status">{state === "error" ? (lang === "vi" ? "Không tải được mô hình 3D. Xem cấu trúc trên RCSB PDB." : "3D model unavailable. View the structure at RCSB PDB.") : (lang === "vi" ? "Đang tải tọa độ nguyên tử…" : "Loading atomic coordinates…")}</p>}
    </div>
    <div className="protein-caption">
      <div><strong>Acetylcholinesterase · Homo sapiens</strong><small>{lang === "vi" ? "Cấu trúc tinh thể trạng thái không gắn chất ức chế · 2,16 Å · xoay liên tục" : "Apo crystal structure · 2.16 Å · continuous rotation"}</small></div>
      <a href="https://www.rcsb.org/structure/4EY4" target="_blank" rel="noreferrer">{lang === "vi" ? "Xem PDB gốc" : "View source PDB"} ↗</a>
    </div>
  </div>;
}

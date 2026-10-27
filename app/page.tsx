"use client";

import { useEffect, useState } from "react";
import ProteinViewer from "./protein-viewer";

type Lang = "en" | "vi";
export type PageId = "home" | "profile" | "research" | "publications" | "journey" | "contact";

const research = [
  {
    no: "01",
    code: "BIO",
    title: { en: "Bioinformatics & systems biology", vi: "Tin sinh học & sinh học hệ thống" },
    desc: {
      en: "Integrating biological networks and multi-source evidence to prioritize targets, pathways, and testable mechanisms.",
      vi: "Tích hợp mạng sinh học và bằng chứng từ nhiều nguồn để ưu tiên đích tác dụng, con đường sinh học và giả thuyết cơ chế có thể kiểm chứng.",
    },
    tags: { en: ["Network pharmacology", "Target identification", "Multi-omics"], vi: ["Dược lý học mạng lưới", "Xác định đích tác dụng", "Dữ liệu đa omics"] },
  },
  {
    no: "02",
    code: "CHEM",
    title: { en: "Cheminformatics for drug discovery", vi: "Hóa tin học trong khám phá thuốc" },
    desc: {
      en: "Turning molecular structure and bioactivity data into reliable QSAR, virtual screening, and molecular modeling workflows.",
      vi: "Sử dụng dữ liệu cấu trúc hóa học và hoạt tính sinh học để xây dựng mô hình QSAR, sàng lọc ảo và mô hình hóa phân tử có thể đánh giá được.",
    },
    tags: { en: ["QSAR", "Virtual screening", "Molecular dynamics"], vi: ["QSAR", "Sàng lọc ảo", "Động lực học phân tử"] },
  },
  {
    no: "03",
    code: "AI",
    title: { en: "AI for medicinal material identification and quality", vi: "AI trong nhận dạng và đánh giá chất lượng dược liệu" },
    desc: {
      en: "Applying machine learning and computer vision to identification, quality assessment, and data-driven standardization of medicinal materials.",
      vi: "Ứng dụng học máy và thị giác máy tính để nhận dạng, đánh giá chất lượng và hỗ trợ chuẩn hóa dữ liệu dược liệu.",
    },
    tags: { en: ["Computer vision", "Deep learning", "Quality assessment"], vi: ["Thị giác máy tính", "Học sâu", "Đánh giá chất lượng"] },
  },
];

const publications = [
  {
    no: "01",
    year: "2026",
    type: { en: "Research article", vi: "Bài báo nghiên cứu" },
    title: "Integrating molecular representations for machine learning-based virtual screening of Glutaminyl Cyclase inhibitors",
    authors: "Hoang Manh Ha, Hoang Trung Tung, Nguyen Viet Anh, Nguyen Thanh Cong, Nguyen Thu Hang, Nguyen Van Phuong",
    venue: "Journal of Molecular Graphics and Modelling · 146 · 109441",
    doi: "10.1016/j.jmgm.2026.109441",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S1093326326001671",
    summary: {
      en: "A hybrid molecular-representation workflow for predicting sQC inhibition, followed by natural-product screening, ADME assessment, docking, and molecular dynamics.",
      vi: "Kết hợp các cách biểu diễn phân tử để dự đoán hoạt tính ức chế glutaminyl cyclase, sau đó sàng lọc hợp chất tự nhiên và đánh giá ADME, docking phân tử, động lực học phân tử.",
    },
    tags: { en: ["QSAR", "Alzheimer’s disease", "Virtual screening"], vi: ["QSAR", "Bệnh Alzheimer", "Sàng lọc ảo"] },
  },
  {
    no: "02",
    year: "2026",
    type: { en: "Book chapter", vi: "Chương sách" },
    title: "Deep learning and generative models for drug discovery: techniques and current achievements",
    authors: "Hoang Manh Ha, Pham Thi Ha Anh, Nguyen Van Phuong",
    venue: "Revolutionizing Drug Development · Chapter 6",
    doi: "10.1016/B978-0-443-34059-8.00007-5",
    href: "https://www.sciencedirect.com/science/chapter/edited-volume/abs/pii/B9780443340598000075",
    summary: {
      en: "A practical overview of deep learning and generative modeling across molecular representation, property prediction, de novo design, and translation.",
      vi: "Tổng quan thực tiễn về học sâu và mô hình sinh trong biểu diễn phân tử, dự đoán đặc tính, thiết kế de novo và chuyển dịch ứng dụng.",
    },
    tags: { en: ["Deep learning", "Generative AI", "Drug design"], vi: ["Học sâu", "AI tạo sinh", "Thiết kế thuốc"] },
  },
  {
    no: "03",
    year: "2024",
    type: { en: "Preprint", vi: "Tiền ấn phẩm" },
    title: "Adapting Language Models for Retrosynthesis Prediction",
    authors: "Phuong Nguyen-Van, Long Nguyen Thanh, Ha Hoang Manh, Ha Anh Pham Thi, Thanh Le Nguyen, Viet Anh Nguyen",
    venue: "ChemRxiv · 09 July 2024",
    doi: "10.26434/chemrxiv-2024-3d5f7",
    href: "https://chemrxiv.org/doi/full/10.26434/chemrxiv-2024-3d5f7",
    summary: {
      en: "Adapting language models to recognize reaction patterns and predict reactant sets in template-free retrosynthesis.",
      vi: "Điều chỉnh mô hình ngôn ngữ để nhận diện quy luật phản ứng và dự đoán tập chất phản ứng trong hồi tổng hợp không dùng khuôn mẫu.",
    },
    tags: { en: ["Language models", "Retrosynthesis", "Chemical AI"], vi: ["Mô hình ngôn ngữ", "Hồi tổng hợp", "AI trong hóa học"] },
  },
];

const text = {
  en: {
    nav: ["Profile", "Research", "Publications", "Journey", "Contact"],
    heroTag: "Computational drug discovery · Hanoi, Vietnam",
    heroA: "Molecular intelligence",
    heroB: "for better drug discovery.",
    heroP: "I work where pharmaceutical science, molecular data, and artificial intelligence meet — turning complex evidence into testable drug-discovery decisions.",
    explore: "Explore the research",
    talk: "Start a conversation",
    atlas: "Research atlas",
    atlasHint: "Select a node",
    open: "Open to research collaboration",
    outputs: "Scholarly outputs",
    degrees: "Pharmacy degrees",
    hup: "Research at HUP",
    profileK: "Profile / 01",
    profileH: "A pharmaceutical researcher shaped by both medicinal plants and molecular machines.",
    profileP1: "My work focuses on computational methods that make early drug discovery more rigorous: chemical data curation, predictive modeling, virtual screening, and mechanistic interpretation.",
    profileP2: "I am especially interested in natural-product chemical space, neurodegenerative disease targets, and AI systems for identifying and evaluating medicinal materials.",
    researchK: "Research / 02",
    researchH: "Three connected directions, one translational objective.",
    researchP: "The strongest questions rarely stay inside one discipline. Biological context, chemical evidence, and deployable AI inform one another.",
    logicK: "Working logic",
    logicH: "From data to a decision worth testing.",
    steps: ["Curate", "Model", "Explain", "Validate"],
    stepP: [
      "Build chemically and biologically defensible datasets.",
      "Match molecular representations and methods to the scientific question.",
      "Interrogate predictions through XAI, chemical space, and mechanism.",
      "Prioritize hypotheses for molecular simulation and experiment.",
    ],
    pubK: "Publications / 03",
    pubH: "Selected scientific work.",
    pubHint: "Select a publication to read its focus",
    openPub: "Open publication",
    journeyK: "Journey / 04",
    journeyH: "Pharmacy training, computational questions.",
    lecturer: "Lecturer",
    lecturerPlace: "Hanoi University of Pharmacy",
    lecturerDate: "August 2026 — Present",
    work: "Research Assistant",
    workPlace: "Department of Pharmacognosy, Hanoi University of Pharmacy",
    workDate: "June 2024 — July 2026",
    workP: "QSAR and deep-learning models; network pharmacology, docking, and molecular dynamics for medicinal-plant research.",
    master: "M.Sc. in Pharmacognosy & Traditional Medicine",
    masterPlace: "Hanoi University of Pharmacy",
    masterDate: "2024 — 2026",
    bachelor: "B.Pharm in Pharmaceutical Manufacturing",
    bachelorPlace: "Hanoi University of Pharmacy",
    bachelorDate: "2019 — 2024",
    toolkit: "Selected toolkit",
    contactK: "Contact / 05",
    contactA: "Let’s connect the",
    contactB: "next scientific question.",
    contactP: "I welcome conversations around computational drug discovery, natural products, molecular AI, and collaborative research.",
    email: "Email",
    phone: "Phone",
    profiles: "Profiles",
    top: "Back to top",
  },
  vi: {
    nav: ["Hồ sơ", "Nghiên cứu", "Công bố", "Hành trình", "Liên hệ"],
    heroTag: "Khám phá thuốc bằng phương pháp tính toán · Hà Nội",
    heroA: "Trí tuệ phân tử",
    heroB: "cho quyết định tốt hơn.",
    heroP: "Tôi nghiên cứu tại giao điểm của khoa học dược, dữ liệu phân tử và trí tuệ nhân tạo — chuyển bằng chứng phức tạp thành các giả thuyết có thể kiểm chứng trong khám phá thuốc.",
    explore: "Khám phá nghiên cứu",
    talk: "Trao đổi hợp tác",
    atlas: "Bản đồ nghiên cứu",
    atlasHint: "Chọn một nút",
    open: "Sẵn sàng hợp tác nghiên cứu",
    outputs: "Công bố khoa học",
    degrees: "Bằng cấp ngành Dược",
    hup: "Nghiên cứu tại HUP",
    profileK: "Hồ sơ / 01",
    profileH: "Nghiên cứu dược liệu và các phương pháp tính toán ở cấp độ phân tử.",
    profileP1: "Công việc của tôi tập trung vào phương pháp tính toán trong giai đoạn đầu khám phá thuốc: xử lý và chuẩn hóa dữ liệu hóa học, xây dựng mô hình dự đoán, sàng lọc ảo và diễn giải cơ chế tác dụng.",
    profileP2: "Tôi đặc biệt quan tâm đến hợp chất tự nhiên, đích tác dụng liên quan đến bệnh thoái hóa thần kinh và hệ thống AI hỗ trợ nhận dạng, đánh giá chất lượng dược liệu.",
    researchK: "Nghiên cứu / 02",
    researchH: "Ba hướng nghiên cứu kết nối từ dữ liệu đến giả thuyết thực nghiệm.",
    researchP: "Bối cảnh sinh học, dữ liệu hóa học và phương pháp AI bổ trợ nhau khi xác định đích tác dụng và ưu tiên giả thuyết nghiên cứu.",
    logicK: "Quy trình nghiên cứu",
    logicH: "Từ dữ liệu đến giả thuyết có thể kiểm chứng.",
    steps: ["Chuẩn hóa", "Mô hình", "Giải thích", "Kiểm chứng"],
    stepP: [
      "Xây dựng bộ dữ liệu hợp lý về hóa học và sinh học.",
      "Ghép biểu diễn phân tử và phương pháp với đúng câu hỏi khoa học.",
      "Diễn giải dự đoán bằng AI có thể giải thích, phân tích không gian hóa học và cơ chế tác dụng.",
      "Ưu tiên giả thuyết cho mô phỏng phân tử và thực nghiệm.",
    ],
    pubK: "Công bố / 03",
    pubH: "Các nghiên cứu tiêu biểu.",
    pubHint: "Chọn một công bố để xem trọng tâm",
    openPub: "Mở công bố",
    journeyK: "Hành trình / 04",
    journeyH: "Nền tảng dược học, câu hỏi tính toán.",
    lecturer: "Giảng viên",
    lecturerPlace: "Trường Đại học Dược Hà Nội",
    lecturerDate: "08/2026 — Hiện tại",
    work: "Trợ lý nghiên cứu",
    workPlace: "Bộ môn Dược liệu, Trường Đại học Dược Hà Nội",
    workDate: "06/2024 — 07/2026",
    workP: "Phát triển mô hình QSAR và học sâu; ứng dụng dược lý học mạng lưới, docking phân tử và mô phỏng động lực học phân tử trong nghiên cứu dược liệu.",
    master: "Thạc sĩ Dược liệu — Dược cổ truyền",
    masterPlace: "Trường Đại học Dược Hà Nội",
    masterDate: "2024 — 2026",
    bachelor: "Dược sĩ — Công nghiệp Dược",
    bachelorPlace: "Trường Đại học Dược Hà Nội",
    bachelorDate: "2019 — 2024",
    toolkit: "Công cụ tiêu biểu",
    contactK: "Liên hệ / 05",
    contactA: "Cùng kết nối",
    contactB: "câu hỏi khoa học tiếp theo.",
    contactP: "Tôi sẵn sàng trao đổi về khám phá thuốc bằng phương pháp tính toán, hợp chất tự nhiên, AI ứng dụng cho dữ liệu phân tử và hợp tác nghiên cứu.",
    email: "Email",
    phone: "Điện thoại",
    profiles: "Hồ sơ",
    top: "Lên đầu trang",
  },
};

const ids = ["profile", "research", "publications", "journey", "contact"] as const;
const hrefFor = (current: PageId, destination: PageId) =>
  current === "home" ? (destination === "home" ? "./" : `${destination}/`) :
    destination === "home" ? "../" : `../${destination}/`;

export function SitePage({ page }: { page: PageId }) {
  const [lang, setLang] = useState<Lang>("en");
  const [focus, setFocus] = useState(1);
  const [pub, setPub] = useState(0);
  const [step, setStep] = useState(0);
  const [menu, setMenu] = useState(false);
  const t = text[lang];
  useEffect(() => {
    const saved = window.localStorage.getItem("hahm-lang");
    if (saved === "vi" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const changeLang = (next: Lang) => { setLang(next); window.localStorage.setItem("hahm-lang", next); };
  const journeyItems = [
    { date: t.lecturerDate, title: t.lecturer, place: t.lecturerPlace },
    { date: t.workDate, title: t.work, place: t.workPlace, detail: t.workP },
    { date: t.masterDate, title: t.master, place: t.masterPlace },
    { date: t.bachelorDate, title: t.bachelor, place: t.bachelorPlace },
  ];

  const nav = ids.map((id, i) => ({ id, label: t.nav[i] }));

  useEffect(() => {
    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--progress", `${max ? (window.scrollY / max) * 100 : 0}%`);
    };
    const glow = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };
    progress();
    addEventListener("scroll", progress, { passive: true });
    addEventListener("pointermove", glow, { passive: true });
    return () => {
      removeEventListener("scroll", progress);
      removeEventListener("pointermove", glow);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    }), { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [lang, page]);

  return (
    <main id="top">
      <div className="progress" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />

      <header>
        <a className="brand" href={hrefFor(page, "home")} aria-label="HAHM Lab home">
          <b>H</b><span>HAHM <small>LAB</small></span>
        </a>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          {nav.map((item) => <a key={item.id} href={hrefFor(page, item.id)} className={page === item.id ? "active" : ""} aria-current={page === item.id ? "page" : undefined} onClick={() => setMenu(false)}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <div className="langs"><button className={lang === "en" ? "active" : ""} onClick={() => changeLang("en")}>EN</button><i>/</i><button className={lang === "vi" ? "active" : ""} onClick={() => changeLang("vi")}>VI</button></div>
          <button className="hamburger" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}><i /><i /></button>
        </div>
      </header>

      {page === "home" && <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><i className="live" />{t.heroTag}</p>
            <h1><span>{t.heroA}</span><em>{t.heroB}</em></h1>
            <p className="lead">{t.heroP}</p>
            <div className="hero-actions"><a className="primary" href={hrefFor(page, "research")}>{t.explore}<span>→</span></a><a href={hrefFor(page, "contact")}>{t.talk} ↗</a></div>
          </div>
          <ProteinViewer lang={lang} />
        </div>
        <div className="shell metrics"><div><b>03</b><span>{t.outputs}</span></div><div><b>02</b><span>{t.degrees}</span></div><div><b>2024—</b><span>{t.hup}</span></div><p><i className="live" />{t.open}</p></div>
      </section>}

      {page === "profile" && <section id="profile" className="section profile page-section">
        <div className="shell profile-grid"><p className="kicker reveal">{t.profileK}</p><div><h2 className="serif reveal">{t.profileH}</h2><div className="profile-text reveal"><p>{t.profileP1}</p><p>{t.profileP2}</p></div><div className="signature reveal"><b>HMH</b><div><strong>Hoang Manh Ha</strong><span>{t.lecturer} · {t.lecturerPlace}</span></div></div></div></div>
      </section>}

      {page === "research" && <section id="research" className="section research page-section">
        <div className="shell">
          <div className="section-head reveal"><p className="kicker">{t.researchK}</p><h2>{t.researchH}</h2><p>{t.researchP}</p></div>
          <div className="research-grid">{research.map((r, i) => <button key={r.no} className={`research-card reveal ${focus === i ? "active" : ""}`} onClick={() => setFocus(i)}><div><small>{r.no}</small><i>↗</i></div><h3>{r.title[lang]}</h3><p>{r.desc[lang]}</p><footer>{r.tags[lang].map((tag) => <span key={tag}>{tag}</span>)}</footer></button>)}</div>
          <div className="logic reveal"><div><p className="kicker">{t.logicK}</p><h3>{t.logicH}</h3></div><div className="logic-ui"><div className="step-buttons">{t.steps.map((name, i) => <button key={name} className={step === i ? "active" : ""} onClick={() => setStep(i)}><b>0{i + 1}</b><span>{name}</span></button>)}</div><div className="step-detail" key={`${step}-${lang}`}><b>0{step + 1}</b><p>{t.stepP[step]}</p></div></div></div>
        </div>
      </section>}

      {page === "publications" && <section id="publications" className="section publications page-section">
        <div className="shell"><div className="section-head reveal"><p className="kicker">{t.pubK}</p><h2>{t.pubH}</h2><p>{t.pubHint}</p></div><div className="pub-grid reveal"><div className="pub-list">{publications.map((p, i) => <button key={p.doi} className={pub === i ? "active" : ""} onClick={() => setPub(i)} onMouseEnter={() => setPub(i)}><small>{p.no}</small><span><i>{p.type[lang]} · {p.year}</i><b>{p.title}</b></span><em>↗</em></button>)}</div><article key={`${pub}-${lang}`}><div className="pub-meta"><span>{publications[pub].type[lang]}</span><span>{publications[pub].year}</span></div><small>{publications[pub].venue}</small><h3>{publications[pub].title}</h3><p className="authors">{publications[pub].authors}</p><p>{publications[pub].summary[lang]}</p><div className="tags">{publications[pub].tags[lang].map((tag) => <span key={tag}>{tag}</span>)}</div><footer><span>DOI {publications[pub].doi}</span><a href={publications[pub].href} target="_blank" rel="noreferrer">{t.openPub} ↗</a></footer></article></div></div>
      </section>}

      {page === "journey" && <section id="journey" className="section journey page-section">
        <div className="shell"><div className="section-head reveal"><p className="kicker">{t.journeyK}</p><h2>{t.journeyH}</h2></div><div className="journey-grid"><div className="timeline reveal">{journeyItems.map((item, i) => <article key={item.title}><div className={`marker ${i === 0 ? "current" : ""}`}><i /></div><div><time>{item.date}</time><h3>{item.title}</h3><b>{item.place}</b>{item.detail && <p>{item.detail}</p>}</div></article>)}</div><aside className="toolkit reveal"><p className="kicker">{t.toolkit}</p>{[["01","Python · R","RDKit · scikit-learn · PyTorch"],["02","Molecular modeling","AutoDock Vina · NAMD · VMD"],["03","Data & interpretation","QSAR · XAI · Network pharmacology"]].map((x) => <div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b><span>{x[2]}</span></div>)}</aside></div></div>
      </section>}

      {page === "contact" && <section id="contact" className="contact page-section">
        <i className="contact-orbit a" /><i className="contact-orbit b" />
        <div className="shell contact-grid"><div className="reveal"><p className="kicker">{t.contactK}</p><h2><span>{t.contactA}</span><em>{t.contactB}</em></h2><p>{t.contactP}</p></div><div className="contact-links reveal"><div><small>{t.email}</small><a href="mailto:hmha0601@gmail.com">hmha0601@gmail.com <span>↗</span></a><a href="mailto:hmha@hup.edu.vn">hmha@hup.edu.vn <span>↗</span></a></div><div><small>{t.phone}</small><a href="tel:+84396290200">+84 396 290 200 <span>↗</span></a></div><div><small>{t.profiles}</small><a href="https://www.linkedin.com/in/ha-hoang-317aa2230/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/hmha1" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></div></div>
      </section>}
      <footer className="shell site-footer"><p>© {new Date().getFullYear()} Hoang Manh Ha · HAHM Lab</p><a href="#top">{t.top} ↑</a></footer>
    </main>
  );
}

export default function Home() { return <SitePage page="home" />; }

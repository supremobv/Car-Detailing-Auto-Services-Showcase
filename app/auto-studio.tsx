"use client";
import { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Menu,
  Plus,
  Minus,
  MoveHorizontal,
  Droplets,
  Sparkles,
  ShieldCheck,
  Layers,
  CarFront,
  CheckCircle2,
  ScanLine,
  ClipboardCheck,
} from "lucide-react";
import {
  packages,
  vehicleSizes,
  extras,
  Selection,
  defaultSelection,
  estimate,
  money,
  transformations,
  Transformation,
  comparisons,
  todayISO,
  addDays,
} from "./detailing-data";
type Modal = "package" | "gallery" | "pricing" | "inquiry" | null;
export default function AutoStudio() {
  const [menu, setMenu] = useState(false),
    [selection, setSelection] = useState<Selection>(defaultSelection),
    [modal, setModal] = useState<Modal>(null),
    [filter, setFilter] = useState("All work"),
    [all, setAll] = useState(false),
    [gallery, setGallery] = useState<Transformation>(transformations[0]),
    [photo, setPhoto] = useState(0),
    [compare, setCompare] = useState(0),
    [split, setSplit] = useState(50),
    [faq, setFaq] = useState<number | null>(0),
    [message, setMessage] = useState(""),
    [sending, setSending] = useState(false),
    [reference, setReference] = useState("");
  const dialog = useRef<HTMLDialogElement>(null),
    selectedPackage = packages.find((p) => p.id === selection.packageId)!,
    price = estimate(selection),
    comparison = comparisons[compare];
  useEffect(() => {
    if (modal) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  const close = () => {
    setModal(null);
    setMessage("");
    setReference("");
  };
  function inquire(packageId = selection.packageId) {
    setSelection({ ...selection, packageId });
    setMessage("");
    setReference("");
    setModal("inquiry");
  }
  function packageDetail(id: string) {
    setSelection({ ...selection, packageId: id });
    setModal("package");
  }
  function openGallery(item: Transformation) {
    setGallery(item);
    setPhoto(0);
    setModal("gallery");
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setMessage("");
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, ...selection }),
      });
      const result = (await r.json()) as { reference?: string; error?: string };
      if (!r.ok) throw Error(result.error || "Unable to save your inquiry.");
      setReference(result.reference!);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setSending(false);
    }
  }
  const work = transformations
    .filter((t) => filter === "All work" || t.category === filter)
    .slice(0, all ? undefined : 3);
  return (
    <>
      <div className="announcement">
        <span>AUTOMOTIVE CARE, CONSIDERED.</span>
        <span>STUDIO CONCEPT / BY APPOINTMENT</span>
      </div>
      <header className="header">
        <a className="brand" href="#" aria-label="REFINE home">
          REFINE<span>.</span>
          <small>AUTO STUDIO</small>
        </a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
          {[
            ["The services", "services"],
            ["The work", "work"],
            ["The difference", "difference"],
            ["The approach", "approach"],
          ].map(([name, id]) => (
            <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
              {name}
            </a>
          ))}
        </nav>
        <button className="button acid header-cta" onClick={() => inquire()}>
          LET’S TALK DETAIL <ArrowUpRight size={16} />
        </button>
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <section className="hero">
          <img
            className="hero-image"
            src="/images/hero.jpg"
            alt="Black sports car with sculpted bodywork and a reflective finish"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" /> PRECISION IN THE PROCESS. PRIDE IN
              THE DETAILS.
            </div>
            <h1>
              DETAILS MAKE
              <br />
              THE <em>DIFFERENCE.</em>
            </h1>
            <p>
              For the daily drive. The weekend escape.
              <br />
              And the car you can’t help looking back at.
            </p>
            <div className="hero-actions">
              <a className="button acid" href="#services">
                FIND YOUR DETAIL <ArrowUpRight size={17} />
              </a>
              <a className="text-link" href="#work">
                TAKE A CLOSER LOOK <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              01 / A HIGHER STANDARD
              <br />
              <strong>EVERY SURFACE. EVERY STEP.</strong>
            </span>
            <a href="#difference">
              <MoveHorizontal size={18} />
              <span>EXPLORE THE COMPARISON</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
          <span className="hero-side">
            EXTERIOR / INTERIOR / PAINT / PROTECTION
          </span>
        </section>
        <div className="service-strip">
          {[
            "EXTERIOR DETAILING",
            "INTERIOR CARE",
            "PAINT REFINEMENT",
            "CERAMIC COATING",
          ].map((t) => (
            <span key={t}>
              <i /> {t}
            </span>
          ))}
        </div>
        <section id="services" className="services section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">01 / CHOOSE YOUR LEVEL OF CARE</div>
              <h2>
                YOUR CAR.
                <br />
                <span>OUR ATTENTION.</span>
              </h2>
            </div>
            <p>
              From a considered reset to a complete care plan.
              <br />
              Find a starting point that fits your vehicle.
            </p>
          </div>
          <div className="service-toolbar">
            <div
              className="vehicle-picker"
              role="group"
              aria-label="Choose vehicle size"
            >
              {vehicleSizes.map((v) => (
                <button
                  className={selection.vehicleSize === v.id ? "active" : ""}
                  aria-pressed={selection.vehicleSize === v.id}
                  key={v.id}
                  onClick={() =>
                    setSelection({ ...selection, vehicleSize: v.id })
                  }
                >
                  {v.name}
                </button>
              ))}
            </div>
            <button className="text-link" onClick={() => setModal("pricing")}>
              VIEW FULL PRICE GUIDE <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="package-grid">
            {packages.map((p, i) => {
              const Icon = [Droplets, Sparkles, Layers, ShieldCheck][i];
              return (
                <article
                  className={
                    "package-card " + (p.id === "deep" ? "featured" : "")
                  }
                  key={p.id}
                >
                  <div className="package-top">
                    <span>0{i + 1}</span>
                    <Icon size={24} strokeWidth={1.1} />
                  </div>
                  {p.id === "deep" && (
                    <span className="package-badge">THE ALL-ROUND REFRESH</span>
                  )}
                  <div className="eyebrow">{p.label}</div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="package-price">
                    <span>SAMPLE STARTING PRICE</span>
                    <strong>{money(p.prices[selection.vehicleSize])}</strong>
                    <small>
                      {
                        vehicleSizes.find(
                          (v) => v.id === selection.vehicleSize,
                        )!.name
                      }{" "}
                      · Approx. {p.duration}
                    </small>
                  </div>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check size={11} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={
                      "button full " + (p.id === "deep" ? "black" : "outline")
                    }
                    onClick={() => packageDetail(p.id)}
                  >
                    EXPLORE PACKAGE <ArrowUpRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
          <div className="section-footnote">
            <span>
              Sample PHP pricing. Vehicle condition, scope, products, and final
              turnaround are confirmed after inspection.
            </span>
            <button className="text-link" onClick={() => inquire()}>
              NOT SURE? LET’S FIGURE IT OUT <ArrowUpRight size={14} />
            </button>
          </div>
        </section>
        <section id="difference" className="comparison-section section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">02 / THE DETAILS, UP CLOSE</div>
              <h2>
                LOOK CLOSER.
                <br />
                <span>SEE THE POSSIBILITIES.</span>
              </h2>
            </div>
            <p>
              Move the slider to explore a process-to-finish concept.
              <br />A preview of how matched project photos can be shown.
            </p>
          </div>
          <div className="comparison-toolbar">
            <div
              className="comparison-tabs"
              role="group"
              aria-label="Comparison category"
            >
              {comparisons.map((c, i) => (
                <button
                  className={compare === i ? "active" : ""}
                  key={c.name}
                  aria-pressed={compare === i}
                  onClick={() => {
                    setCompare(i);
                    setSplit(50);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <span>ILLUSTRATIVE STOCK COMPARISON / DIFFERENT VEHICLES</span>
          </div>
          <div
            className="comparison"
            style={{ "--split": split + "%" } as React.CSSProperties}
          >
            <img
              src={comparison.after}
              alt={
                comparison.name +
                " finish example — stock photo of a different vehicle"
              }
              loading="lazy"
            />
            <div className="comparison-before">
              <img
                src={comparison.before}
                alt={
                  comparison.name +
                  " preparation example — illustrative stock photo"
                }
                loading="lazy"
              />
            </div>
            <span className="compare-label before">
              BEFORE / PROCESS EXAMPLE
            </span>
            <span className="compare-label after">AFTER / FINISH EXAMPLE</span>
            <div className="compare-divider">
              <span>
                <MoveHorizontal size={24} />
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={split}
              aria-label="Before and after comparison"
              onChange={(e) => setSplit(Number(e.target.value))}
            />
          </div>
          <div className="comparison-caption">
            <h3>{comparison.title}</h3>
            <p>{comparison.caption}</p>
          </div>
        </section>
        <section id="work" className="work section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">03 / THE FINISH STORIES</div>
              <h2>
                GOOD LINES.
                <br />
                <span>GREAT ATTENTION.</span>
              </h2>
            </div>
            <p>
              A gallery of care concepts, process details,
              <br />
              and finishes worth a second look.
            </p>
          </div>
          <div className="gallery-toolbar">
            <div
              className="gallery-filters"
              role="group"
              aria-label="Filter vehicle gallery"
            >
              {["All work", "Exterior", "Interior", "Paint & protection"].map(
                (f) => (
                  <button
                    className={filter === f ? "active" : ""}
                    aria-pressed={filter === f}
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setAll(false);
                    }}
                  >
                    {f}
                  </button>
                ),
              )}
            </div>
            <span>STOCK IMAGERY · ILLUSTRATIVE SERVICE CONCEPTS</span>
          </div>
          <div className="work-grid">
            {work.map((t, i) => (
              <button
                className="work-card"
                key={t.id}
                onClick={() => openGallery(t)}
              >
                <div className="work-image">
                  <img
                    src={t.image}
                    alt={t.name + " " + t.subtitle}
                    loading="lazy"
                  />
                  <span>{t.category}</span>
                  <b>
                    <ArrowUpRight size={22} />
                  </b>
                </div>
                <div className="work-caption">
                  <span>0{transformations.indexOf(t) + 1}</span>
                  <div>
                    <h3>{t.name}</h3>
                    <p>{t.subtitle}</p>
                  </div>
                  <ArrowUpRight size={17} />
                </div>
              </button>
            ))}
          </div>
          <div className="work-footer">
            <span>Different vehicles. One considered approach.</span>
            <button
              className="text-link"
              onClick={() => {
                setAll(!all);
                if (filter !== "All work") setFilter("All work");
              }}
            >
              {all ? "SHOW SELECTED CONCEPTS" : "EXPLORE THE GALLERY"}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
        <section id="approach" className="approach section">
          <div className="approach-image">
            <img
              src="/images/workshop.jpg"
              alt="Technician working with a polishing tool in an automotive workshop"
              loading="lazy"
            />
            <div>
              <span>THE PROCESS MATTERS.</span>
              <strong>SO DOES YOUR CAR.</strong>
            </div>
          </div>
          <div className="approach-copy">
            <div className="eyebrow">04 / MORE THAN A QUICK CLEAN</div>
            <h2>
              CONSIDERED CARE.
              <br />
              <span>FROM START TO FINISH.</span>
            </h2>
            <p>
              Every vehicle arrives with its own story. Different surfaces.
              Different routines. Different expectations.
            </p>
            <p>
              REFINE is an auto studio concept built around a simple approach:
              inspect first, agree on the scope, and give every step the
              attention it deserves.
            </p>
            <div className="approach-points">
              <span>
                <ScanLine size={17} /> CONDITION BEFORE ASSUMPTIONS
              </span>
              <span>
                <ClipboardCheck size={17} /> A CLEAR SCOPE BEFORE WE START
              </span>
              <span>
                <ShieldCheck size={17} /> AFTERCARE AS PART OF THE CONVERSATION
              </span>
            </div>
            <button className="text-link" onClick={() => inquire()}>
              START WITH AN ASSESSMENT <ArrowUpRight size={16} />
            </button>
          </div>
        </section>
        <section className="process section">
          <div className="eyebrow">THE REFINE WAY / A CLEAR PROCESS</div>
          <div className="process-grid">
            {[
              [
                "01",
                "INSPECT.",
                "We start with the vehicle, its condition, and what you want to achieve.",
              ],
              [
                "02",
                "AGREE.",
                "A clear scope, a considered plan, and a quote you can review.",
              ],
              [
                "03",
                "REFINE.",
                "Careful preparation and an agreed process for each surface.",
              ],
              [
                "04",
                "HAND OVER.",
                "A final walkthrough, care guidance, and a plan for what comes next.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="faq section">
          <div>
            <div className="eyebrow">BEFORE YOU PULL IN</div>
            <h2>
              A FEW
              <br />
              <span>GOOD QUESTIONS.</span>
            </h2>
          </div>
          <div>
            {[
              [
                "Which package is right for my car?",
                "Start with your vehicle size and the kind of care you need. The package guide is a sample starting point. A technician should inspect your vehicle and discuss your expectations before confirming a service.",
              ],
              [
                "Are the prices and turnaround times fixed?",
                "No. All displayed prices and time ranges are illustrative estimates. Vehicle condition, materials, selected products, preparation needs, and agreed extras determine the final quote and schedule.",
              ],
              [
                "What can I expect from paint or coating services?",
                "The technician must assess your paint and discuss the appropriate preparation, product options, realistic outcomes, and aftercare. This showcase makes no scratch-removal, protection-period, or warranty guarantees.",
              ],
              [
                "Does an inquiry book a service appointment?",
                "No. Your inquiry and preferred visit time are saved for the studio to review. An appointment is only confirmed after the studio contacts you. No payment is taken on this site.",
              ],
              [
                "Are these actual before-and-after results?",
                "The gallery and slider use illustrative stock photos. Comparison images show different vehicles or interiors and do not claim a REFINE result. Replace them with matched photographs of the same vehicle for a live shop portfolio.",
              ],
            ].map(([q, a], i) => (
              <div className="faq-item" key={q}>
                <button
                  aria-expanded={faq === i}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  {q}
                  {faq === i ? <Minus size={17} /> : <Plus size={17} />}
                </button>
                {faq === i && <p>{a}</p>}
              </div>
            ))}
          </div>
        </section>
        <section className="closing section">
          <div>
            <div className="eyebrow">YOUR NEXT DETAIL STARTS HERE.</div>
            <h2>
              GIVE YOUR CAR
              <br />A LITTLE <em>MORE.</em>
            </h2>
          </div>
          <div>
            <p>
              A daily driver or a weekend favourite.
              <br />
              Let’s talk about the care it deserves.
            </p>
            <button className="button black" onClick={() => inquire()}>
              MAKE A SERVICE INQUIRY <ArrowUpRight size={17} />
            </button>
            <span>
              No payment. No confirmed booking. Just a good place to start.
            </span>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <a className="brand" href="#">
            REFINE<span>.</span>
            <small>AUTO STUDIO</small>
          </a>
          <p>
            Every surface.
            <br />
            Every detail.
          </p>
          <div>
            <a href="#services">SERVICES</a>
            <a href="#work">THE WORK</a>
            <a href="#approach">OUR APPROACH</a>
          </div>
          <button className="text-link" onClick={() => inquire()}>
            LET’S TALK <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} REFINE. Automotive showcase concept.
          </span>
          <span>
            Sample services & pricing ·{" "}
            <a href="/credits">Photography credits</a>
          </span>
          <a href="/studio">
            SERVICE INBOX <ArrowUpRight size={11} />
          </a>
        </div>
      </footer>
      <dialog
        className={"modal " + (modal === "pricing" ? "pricing-modal" : "")}
        ref={dialog}
        aria-label={
          modal === "package"
            ? "Service package"
            : modal === "gallery"
              ? "Vehicle gallery"
              : modal === "pricing"
                ? "Price guide"
                : "Service inquiry"
        }
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <button
          className="modal-close"
          aria-label="Close dialog"
          onClick={close}
        >
          <X size={21} />
        </button>
        {modal === "package" && (
          <div className="modal-content package-detail">
            <div className="eyebrow">
              {selectedPackage.label} / SERVICE CONCEPT
            </div>
            <h2>{selectedPackage.name}</h2>
            <p>{selectedPackage.detail}</p>
            <label>
              YOUR VEHICLE SIZE
              <select
                value={selection.vehicleSize}
                onChange={(e) =>
                  setSelection({
                    ...selection,
                    vehicleSize: e.target.value as Selection["vehicleSize"],
                  })
                }
              >
                {vehicleSizes.map((v) => (
                  <option value={v.id} key={v.id}>
                    {v.name} — {v.example}
                  </option>
                ))}
              </select>
            </label>
            <ul className="detail-features">
              {selectedPackage.features.map((f) => (
                <li key={f}>
                  <Check size={13} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="detail-price">
              <div>
                <span>SAMPLE STARTING PRICE</span>
                <strong>
                  {money(selectedPackage.prices[selection.vehicleSize])}
                </strong>
                <small>
                  Approx. {selectedPackage.duration} · Subject to assessment
                </small>
              </div>
              <button className="button acid" onClick={() => inquire()}>
                INQUIRE ABOUT THIS SERVICE <ArrowUpRight size={16} />
              </button>
            </div>
            <p className="small muted">
              Sample pricing, inclusions, and duration. No result, product
              warranty, or appointment is guaranteed.
            </p>
          </div>
        )}
        {modal === "gallery" && (
          <article>
            <div className="gallery-detail-image">
              <img
                src={gallery.images[photo]}
                alt={gallery.name + " concept photo " + (photo + 1)}
              />
              <button
                aria-label="Previous gallery photo"
                onClick={() =>
                  setPhoto(
                    (photo - 1 + gallery.images.length) % gallery.images.length,
                  )
                }
              >
                <ChevronLeft />
              </button>
              <button
                aria-label="Next gallery photo"
                onClick={() => setPhoto((photo + 1) % gallery.images.length)}
              >
                <ChevronRight />
              </button>
              <span>
                {photo + 1} / {gallery.images.length} · STOCK PHOTOGRAPHY
              </span>
            </div>
            <div className="modal-content">
              <div className="eyebrow">
                {gallery.category} / ILLUSTRATIVE CONCEPT
              </div>
              <h2>{gallery.name}</h2>
              <p>{gallery.description}</p>
              <ul className="detail-features">
                {gallery.details.map((d) => (
                  <li key={d}>
                    <Check size={13} />
                    {d}
                  </li>
                ))}
              </ul>
              <button
                className="button acid"
                onClick={() => inquire(gallery.service)}
              >
                EXPLORE THIS KIND OF CARE <ArrowUpRight size={16} />
              </button>
              <p className="small muted">
                Stock images may show different vehicles. These are service
                concepts, not a claim of completed work.
              </p>
            </div>
          </article>
        )}
        {modal === "pricing" && (
          <div className="modal-content price-guide">
            <div className="eyebrow">
              A CLEAR STARTING POINT / SAMPLE PHP PRICING
            </div>
            <h2>THE PRICE GUIDE.</h2>
            <p>
              Choose a vehicle size to compare service concepts. Final scope and
              quotation follow an inspection.
            </p>
            <div className="price-table-wrap">
              <table>
                <caption>
                  Sample service prices by vehicle size, in Philippine pesos
                </caption>
                <thead>
                  <tr>
                    <th>THE SERVICE</th>
                    {vehicleSizes.map((v) => (
                      <th key={v.id}>{v.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packages.map((p) => (
                    <tr key={p.id}>
                      <th>
                        {p.name}
                        <small>Approx. {p.duration}</small>
                      </th>
                      {vehicleSizes.map((v) => (
                        <td key={v.id}>{money(p.prices[v.id])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>OPTIONAL EXTRAS</h3>
            <div className="guide-extras">
              {extras.map((e) => (
                <span key={e.id}>
                  {e.name}
                  <strong>{money(e.price)}</strong>
                </span>
              ))}
            </div>
            <p className="small muted">
              Illustrative prices only. Condition, product choice, preparation,
              taxes, and final inclusions are agreed before any work begins.
            </p>
            <button className="button acid" onClick={() => inquire()}>
              LET’S FIND YOUR SERVICE <ArrowUpRight size={16} />
            </button>
          </div>
        )}
        {modal === "inquiry" && (
          <div className="modal-content inquiry-form">
            {reference ? (
              <div className="success">
                <span className="success-icon">
                  <CheckCircle2 size={35} strokeWidth={1} />
                </span>
                <div className="eyebrow">A GOOD FIRST STEP.</div>
                <h2>
                  LET’S GET
                  <br />
                  <em>INTO THE DETAILS.</em>
                </h2>
                <p>
                  Your inquiry has been saved for the studio to review. Your
                  preferred visit is not confirmed, and no payment has been
                  taken.
                </p>
                <div className="reference">
                  <span>YOUR SERVICE INQUIRY</span>
                  <strong>{reference}</strong>
                </div>
                <button className="button acid" onClick={close}>
                  KEEP EXPLORING <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="eyebrow">TELL US ABOUT YOUR VEHICLE.</div>
                <h2>
                  GOOD CARE
                  <br />
                  STARTS <em>HERE.</em>
                </h2>
                <p>
                  A few details now. A considered recommendation after
                  inspection.
                </p>
                <form onSubmit={submit}>
                  <div className="form-grid">
                    <label>
                      YOUR SERVICE
                      <select
                        value={selection.packageId}
                        onChange={(e) =>
                          setSelection({
                            ...selection,
                            packageId: e.target.value,
                          })
                        }
                      >
                        {packages.map((p) => (
                          <option value={p.id} key={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      VEHICLE SIZE
                      <select
                        value={selection.vehicleSize}
                        onChange={(e) =>
                          setSelection({
                            ...selection,
                            vehicleSize: e.target
                              .value as Selection["vehicleSize"],
                          })
                        }
                      >
                        {vehicleSizes.map((v) => (
                          <option value={v.id} key={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="inquiry-extras">
                    <span className="field-caption">
                      A LITTLE EXTRA CARE (OPTIONAL)
                    </span>
                    <div>
                      {extras.map((extra) => (
                        <label key={extra.id}>
                          <input
                            type="checkbox"
                            checked={selection.extras.includes(extra.id)}
                            onChange={(e) =>
                              setSelection({
                                ...selection,
                                extras: e.target.checked
                                  ? [...selection.extras, extra.id]
                                  : selection.extras.filter(
                                      (id) => id !== extra.id,
                                    ),
                              })
                            }
                          />
                          <span>
                            {extra.name}
                            <small>+ {money(extra.price)}</small>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="estimate">
                    <span>
                      YOUR SAMPLE ESTIMATE
                      <small>
                        Package {money(price.base)} + extras{" "}
                        {money(price.additional)}
                      </small>
                    </span>
                    <strong aria-live="polite">{money(price.total)}</strong>
                  </div>
                  <div className="form-grid">
                    <label>
                      YOUR NAME
                      <input
                        name="name"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Full name"
                      />
                    </label>
                    <label>
                      EMAIL ADDRESS
                      <input
                        name="email"
                        required
                        type="email"
                        maxLength={254}
                        autoComplete="email"
                        placeholder="you@example.com"
                      />
                    </label>
                    <label>
                      PHONE NUMBER
                      <input
                        name="phone"
                        type="tel"
                        maxLength={40}
                        autoComplete="tel"
                        placeholder="Optional"
                      />
                    </label>
                    <label>
                      MAKE, MODEL & YEAR
                      <input
                        name="vehicle"
                        required
                        maxLength={160}
                        placeholder="e.g. Toyota Corolla, 2022"
                      />
                    </label>
                    <label>
                      PREFERRED VISIT DATE
                      <input
                        name="date"
                        type="date"
                        required
                        min={todayISO()}
                        max={addDays(todayISO(), 180)}
                      />
                    </label>
                    <label>
                      PREFERRED ARRIVAL
                      <select name="time" required defaultValue="">
                        <option value="" disabled>
                          Select a time (Philippine time)
                        </option>
                        {["09:00", "11:00", "13:00", "15:00"].map((t) => (
                          <option value={t} key={t}>
                            {t} PHT
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label>
                    WHAT WOULD YOU LIKE US TO KNOW?
                    <textarea
                      name="message"
                      rows={3}
                      maxLength={4000}
                      placeholder="Vehicle condition, areas of concern, or anything else…"
                    />
                  </label>
                  <label className="consent">
                    <input type="checkbox" name="consent" required />I agree to
                    my details being saved so the studio can review and respond
                    to this inquiry.
                  </label>
                  {message && (
                    <p className="error" role="alert">
                      {message}
                    </p>
                  )}
                  <button
                    className="button acid full"
                    type="submit"
                    disabled={sending}
                  >
                    {sending
                      ? "SAVING YOUR INQUIRY…"
                      : "SEND MY SERVICE INQUIRY"}
                    <ArrowUpRight size={17} />
                  </button>
                  <p className="small muted form-note">
                    Inquiry only. Sample estimate; final scope, appointment, and
                    price require studio confirmation.
                  </p>
                </form>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

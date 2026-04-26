import { useState, useEffect, useRef } from "react";

const COMPANY = {
  name: "Gimme Golf",
  legal: "Deters Birrell Golf LLC",
  phone: "(801) 513-3538",
  email: "info@gimmegolfsimulators.com",
  address: "140 N Main St, Kaysville UT, 84037",
  website: "gimmegolfsimulators.com",
  venmo: "@GimmeGolf",
  zelle: "info@gimmegolfsimulators.com",
  checkPayableTo: "Deters Birrell Golf LLC",
  checkMailTo: "140 N Main St, Kaysville UT, 84037",
};

const CC_SURCHARGE = 0.03;

const CATEGORY_META = {
  tech: { label: "Technology & Electronics", icon: "\u{1F5A5}\uFE0F" },
  build: { label: "Build & Installation", icon: "\u{1F3D7}\uFE0F" },
  service: { label: "Design & Support", icon: "\u{1F4D0}" },
};

const PRESET_ITEMS = [
  { description: "ProTee VX Launch Monitor", detail: "Installation and calibration included", price: 7599, category: "tech" },
  { description: "Software Implementation", detail: "Software purchased separately", price: 55, category: "tech" },
  { description: "4K Projector", detail: "Installation & calibration included", price: 1875, category: "tech" },
  { description: "Gaming PC + Peripherals", detail: "Keyboard & mouse with setup and install", price: 1825, category: "tech" },
  { description: "Dual Monitor Setup", detail: "2 monitors with installation", price: 523, category: "tech" },
  { description: "PC Cabinet / Enclosure", detail: "Setup and installation included", price: 299, category: "tech" },
  { description: "Impact Screen", detail: "Setup & installation included", price: 1985, category: "build" },
  { description: "Simulator Enclosure", detail: "Protection materials, assembly, & installation", price: 3895, category: "build" },
  { description: "Artificial Turf + Padding", detail: "Full space coverage with padding underneath", price: 2146, category: "build" },
  { description: "Screen Backdrop Treatment", detail: "Black paint or wrap for better picture quality", price: 199, category: "build" },
  { description: "Miscellaneous Materials", detail: "Building materials and hardware", price: 675, category: "build" },
  { description: "Design, Planning & Support", detail: "Full design process, planning, and ongoing help", price: 0, category: "service" },
];

const AGREEMENT_SECTIONS = [
  { title: "Services", content: "The Contractor agrees to provide the agreed upon services to the Client as outlined in the agreed-upon proposal or quote." },
  { title: "Warranty", content: "Contractor provides a one-year warranty on the installation services performed, effective from the date of Project completion. This warranty covers defects in workmanship directly related to the installation of the golf simulator system, including turf, enclosures, screens, mounts, and related components.\n\nThis warranty does not cover the performance, durability, or longevity of materials provided by the manufacturer, or damage resulting from normal wear and tear, misuse, accidents, human error, neglect, natural disasters, or any other conditions beyond the control of Contractor.\n\nAny warranty claims for hardware, electronics, or software must be handled directly with the manufacturer. Contractor will assist with reasonable documentation but is not responsible for manufacturer delays or decisions.\n\nClient is responsible for maintaining proper temperature, humidity, and environment suitable for electronics. Damage from improper environment is not covered under warranty.\n\nOnce Contractor has completed the Project and left the job site, Contractor shall not be liable for any damage or issues arising from factors not directly caused by the installation services performed by Deters Birrell Golf LLC." },
  { title: "Client Responsibilities", content: "Client agrees to ensure that the job site is fully prepared, accessible, and suitable for installation of the golf simulator system. Client is responsible for the following:\n\n1. Clear Work Area \u2014 The installation area must be cleared of furniture, personal items, equipment, and any obstructions prior to Contractor's arrival. Contractor is not responsible for moving or storing personal property.\n\n2. Accurate Measurements \u2014 Client is responsible for confirming that the installation space meets the minimum height, width, depth, and clearance requirements necessary for the selected golf simulator system. Contractor is not liable for performance issues or restrictions caused by insufficient space.\n\n3. Power Requirements \u2014 Client must ensure that appropriate and safe electrical outlets are available within the installation area. Contractor will not modify electrical systems or provide power infrastructure.\n\n4. Internet & Network Access \u2014 If the system requires Wi-Fi or network connectivity, Client must ensure access is available for setup and calibration. Contractor is not responsible for network performance or connectivity issues outside the installation.\n\n5. Environmental Conditions \u2014 Client must provide a clean, dry, and safe environment free of ongoing construction work, hazards, or debris that would obstruct installation or pose safety concerns.\n\n6. Structural Readiness \u2014 Client is responsible for confirming that walls, ceilings, and floors are structurally capable of supporting mounts, enclosures, projectors, screens, turf, or other required components. Contractor is not responsible for reinforcing or modifying structural elements unless explicitly included in the Project scope.\n\n7. Access to the Premises \u2014 Client must ensure Contractor has timely and unobstructed access to the premises, including any necessary keys, entry codes, parking, or gate permissions.\n\n8. Use, Care & Safety \u2014 Client agrees to operate the golf simulator system safely and only for its intended purpose. Contractor is not responsible for damage caused by misuse, improper operation, or lack of maintenance.\n\nFailure to meet any of the above responsibilities may result in delays, additional charges, rescheduling fees, or limitations in system performance." },
  { title: "Client Notice", content: "Client acknowledges that installation of the golf simulator system\u2014including, but not limited to, turf, flooring, wall padding, ceiling or wall enclosures, impact screens, mounting hardware, electrical components, and related materials\u2014may cause unavoidable alterations or damage to the surfaces behind or beneath these items. This may include marks, holes, indentations, adhesive residue, impressions, or other cosmetic or structural impacts to existing walls, ceilings, and flooring.\n\nContractor is not responsible for any such damage, whether occurring during installation, normal use of the simulator, or upon removal of installed materials. Client accepts full responsibility for any necessary repairs or restoration.\n\nClient is entitled to 3 complimentary support visits within the first 365 days following installation. These visits may include assistance with calibration, software setup, system adjustments, or general operational support. Any additional service visits requested after 365 days will be billed at a rate of $200 per visit, unless otherwise agreed in writing." },
  { title: "Cancellation Policy", content: "If Client chooses to cancel the Project after the deposit has been paid, a non-refundable cancellation fee of $250 will be charged to cover administrative, scheduling, and resource allocation costs. This fee will be deducted from the deposit, and any remaining balance of the deposit, if applicable, will be refunded to Client.\n\nOnce the deposit is used to purchase materials, that portion of the deposit becomes non-refundable.\n\nAll cancellation requests must be submitted in writing." },
  { title: "Payment", content: "Client agrees to pay Contractor the total agreed-upon amount for the services rendered. Payment terms shall be governed by the proposal or estimate provided by Contractor. Any additional costs resulting from unforeseen conditions or Client-requested changes must be approved in writing prior to the commencement of such additional work.\n\nResidential Clients are required to pay a 50% deposit before any work or materials procurement begins. The remaining balance is due within fourteen (14) days of Project completion. Payment is required for the full scope of work outlined in the agreement, regardless of any conditions, preferences, or stipulations later introduced by Client.\n\nIf payment is not received within fourteen (14) days of Project completion, Contractor may pursue legal action to recover the outstanding balance. A 1% late fee will be added on the 14th day after completion, with an additional 1% per week applied thereafter on any unpaid balance.\n\nFinal payment must be made by card, ACH, or cash. Checks must clear prior to Project completion." },
  { title: "Rescheduling Policy", content: "If Client requests to reschedule the scheduled work within forty-eight (48) hours of the agreed start date and time, a $250 rescheduling fee will apply. This fee covers administrative time, scheduling disruptions, and the reallocation of installation resources.\n\nRescheduled work will be booked on the next available date based on Contractor's scheduling availability.\n\nAll rescheduling requests must be submitted in writing via email or text message and will only be considered confirmed once Contractor has acknowledged and accepted the request in writing." },
  { title: "Job Site Readiness Fee", content: "If the job site is not prepared, accessible, or workable at the scheduled time of service due to conditions outside of Contractor's control\u2014including, but not limited to: no one present to grant access, locked or inaccessible premises, missing keys or entry codes, vehicles or equipment blocking the installation area, other contractors occupying the workspace, or ongoing construction creating obstructions\u2014a $250 rescheduling fee will be charged.\n\nThis fee covers lost time, labor disruption, and the need to reschedule the installation." },
  { title: "Project Timeline & Delays", content: "All Project timelines are estimates and may be affected by factors including, but not limited to, supplier delays, backordered products, shipping issues, weather conditions, or unforeseen job-site conditions. Contractor shall not be held liable for delays caused by third-party vendors, manufacturers, shipping carriers, or conditions outside Contractor's control. Any delay does not constitute a breach of this Agreement, nor does it entitle the Client to damages, refunds, or withholding of payment." },
  { title: "Changes & Termination", content: "Contractor may amend or modify this quotation at any time if unforeseen circumstances arise, including, without limitation, issues affecting the integrity or safety of any structure, or the Client's failure to complete responsibilities necessary for the Project. Client acknowledges and agrees that any work performed in addition to the original scope of the Project will result in additional charges, and that all change orders or requests for extra work will incur added costs to be included in the Project price. Any such additional costs will be disclosed to the Client at the time the change order or request for additional work is made.\n\nEither party may terminate this Agreement in the event of a material breach of any term or condition by the other party, or if Client fails to pay Contractor any amounts due under this Agreement.\n\nClient may terminate this Agreement at any time and receive a refund of the Deposit, except when termination occurs within forty-eight (48) hours of the scheduled installation date, in which case the Deposit shall be non-refundable. If Client terminates this Agreement after Contractor has arrived on-site for the Project, Contractor shall be entitled to payment for all expenditures, commitments, liabilities, overhead, and other costs incurred in connection with preparing for or performing the Project, as determined in accordance with standard accounting practices. These amounts are payable in addition to any other damages Contractor may be entitled to recover." },
  { title: "Photo/Video Rights", content: "Client grants Contractor the right to photograph or video the installation and finished simulator for marketing, portfolio, and advertising use unless client requests otherwise in writing." },
  { title: "Indemnification", content: "Client shall indemnify, defend, and hold harmless Contractor, its officers, employees, agents, and representatives from and against any and all claims, demands, actions, liabilities, losses, damages, judgments, attorney's fees, costs, and expenses of any kind (including, without limitation, claims related to personal injury, death, property damage, equipment misuse, or breach of this Agreement) asserted by any person or entity arising out of, relating to, or resulting from the installation, use, or operation of the golf simulator system, components, or related products installed for the Project. This indemnification includes, but is not limited to, damages or injuries caused by golf swings, balls, equipment, improper use of the simulator, or the Client's failure to maintain or operate the installed system safely and as intended." },
  { title: "Contractor Damages", content: "In the event of Client's breach of this Agreement or any resulting contract, Contractor's damages shall include, but are not limited to: all expenditures incurred in preparation for or performance of the Project; the pro rata share of Contractor's overhead attributable to the Project; Contractor's lost profits; and any other incidental, consequential, or out-of-pocket damages sustained as a result of the breach. Contractor is further entitled to recover all actual and reasonable attorney's fees and costs incurred in enforcing its rights under this Agreement." },
  { title: "Relationship of the Parties", content: "Contractor and Client are independent contracting parties. Nothing in this Agreement shall be construed to create a partnership, joint venture, employer-employee relationship, agency, or legal representation of any kind. Neither party has the authority to create obligations on behalf of the other or bind the other in any manner." },
  { title: "Governing Law", content: "This Agreement shall be governed by and construed in accordance with the laws of the State of Utah, without regard to its conflict of law principles." },
  { title: "Entire Agreement", content: "This Agreement, together with all attachments, exhibits, supplements, or documents referenced herein, constitutes the entire agreement between the parties and is the complete and exclusive statement of the terms governing the Project. It supersedes all prior and contemporaneous oral or written negotiations, representations, or agreements." },
];

const fmt = (n) => Number(n).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtExact = (n) => Number(n).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const uid = () => Math.random().toString(36).slice(2, 9);
const makeQuote = () => ({ id: uid(), quoteNumber: "", date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), validDays: 14, depositPercent: 50, customer: { name: "", address: "", phone: "", email: "" }, items: [], notes: "", status: "draft", createdAt: new Date().toISOString() });

const STORAGE_KEY = "gimme_golf_quotes";
const loadQuotes = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } };
const persistQuotes = (q) => localStorage.setItem(STORAGE_KEY, JSON.stringify(q));

function encodeQuoteToURL(quote) {
  const slim = { n: quote.quoteNumber, d: quote.date, v: quote.validDays, dp: quote.depositPercent, c: quote.customer, i: quote.items.map(({ description, detail, price, category }) => ({ d: description, t: detail, p: price, c: category })), no: quote.notes };
  return window.location.origin + window.location.pathname + "#q=" + btoa(unescape(encodeURIComponent(JSON.stringify(slim))));
}
function decodeQuoteFromURL(hash) {
  try { const s = JSON.parse(decodeURIComponent(escape(atob(hash.replace("#q=", ""))))); return { id: "shared", quoteNumber: s.n, date: s.d, validDays: s.v, depositPercent: s.dp, customer: s.c, items: s.i.map((it) => ({ id: uid(), description: it.d, detail: it.t, price: it.p, category: it.c })), notes: s.no, status: "sent" }; } catch { return null; }
}

const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", background: "#fff" };
const labelStyle = { fontSize: 11, fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, display: "block" };

function AnimNum({ value, dur = 500 }) {
  const [d, setD] = useState(value); const prev = useRef(value);
  useEffect(() => { const from = prev.current, to = value, t0 = performance.now(); let raf; const step = (now) => { const p = Math.min((now - t0) / dur, 1); setD(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); }; raf = requestAnimationFrame(step); prev.current = value; return () => cancelAnimationFrame(raf); }, [value]);
  return <>{fmt(d)}</>;
}

function AgreementPanel({ quote }) {
  const [open, setOpen] = useState(false); const [expanded, setExpanded] = useState(new Set());
  const toggle = (i) => setExpanded((p) => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const expandAll = () => setExpanded((p) => p.size === AGREEMENT_SECTIONS.length ? new Set() : new Set(AGREEMENT_SECTIONS.map((_, i) => i)));
  return (
    <div style={{ maxWidth: 720, margin: "32px auto 0", padding: "0 16px" }}>
      <div onClick={() => setOpen(!open)} style={{ background: "white", borderRadius: open ? "14px 14px 0 0" : 14, padding: "20px 24px", border: "1px solid rgba(0,0,0,0.07)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
        <div><div style={{ fontSize: 15, fontWeight: 700, color: "#1b4332" }}>Service & Payment Agreement</div><div style={{ fontSize: 12, color: "#999", marginTop: 3 }}>{COMPANY.legal} — {AGREEMENT_SECTIONS.length} sections · Tap to review</div></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ background: "#e8f5ed", color: "#2d6a4f", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.06em" }}>Legal</div><div style={{ transform: open ? "rotate(180deg)" : "", transition: "transform 0.3s", fontSize: 16, color: "#999" }}>{"\u25BC"}</div></div>
      </div>
      {open && (<div style={{ background: "white", borderRadius: "0 0 14px 14px", border: "1px solid rgba(0,0,0,0.07)", borderTop: "none", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f0f0ec", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>This agreement is entered into by and between <strong style={{ color: "#333" }}>{COMPANY.legal}</strong>, hereinafter referred to as the "Contractor", and <strong style={{ color: "#333" }}>{quote.customer.name || "[Client Name]"}</strong>, hereinafter referred to as the "Client", effective as of the date of signing.</div>
          <button onClick={(e) => { e.stopPropagation(); expandAll(); }} style={{ background: "#f3f2ef", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "#666", whiteSpace: "nowrap", fontFamily: "'DM Sans'" }}>{expanded.size === AGREEMENT_SECTIONS.length ? "Collapse All" : "Expand All"}</button>
        </div>
        <div style={{ padding: "0 12px 16px" }}>{AGREEMENT_SECTIONS.map((sec, i) => { const isOpen = expanded.has(i); return (<div key={i} style={{ borderBottom: i < AGREEMENT_SECTIONS.length - 1 ? "1px solid #f5f5f2" : "none" }}><div onClick={(e) => { e.stopPropagation(); toggle(i); }} style={{ padding: "14px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 24, height: 24, borderRadius: 6, background: isOpen ? "#1b4332" : "#f3f2ef", color: isOpen ? "white" : "#999", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, transition: "all 0.2s" }}>{i + 1}</span><span style={{ fontSize: 14, fontWeight: 600, color: isOpen ? "#1b4332" : "#555" }}>{sec.title}</span></div><span style={{ fontSize: 12, color: "#ccc", transform: isOpen ? "rotate(90deg)" : "", transition: "transform 0.2s" }}>{"\u25B6"}</span></div>{isOpen && <div style={{ padding: "0 12px 16px 46px", fontSize: 13, lineHeight: 1.75, color: "#555", whiteSpace: "pre-line" }}>{sec.content}</div>}</div>); })}</div>
        <div style={{ margin: "0 24px 24px", padding: 24, background: "#fafaf8", borderRadius: 12, border: "1px solid #eee" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1b4332", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Acknowledgment & Signature</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>{[{ label: "Client", name: quote.customer.name }, { label: "Contractor", name: COMPANY.legal }].map((s) => (<div key={s.label}><div style={{ fontSize: 11, color: "#999", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div><div style={{ fontSize: 14, fontWeight: 600, color: "#333", marginBottom: 4 }}>{s.name || "________________"}</div><div style={{ borderBottom: "1px solid #ccc", height: 40, marginBottom: 4 }} /><div style={{ fontSize: 10, color: "#aaa" }}>Signature & Date</div></div>))}</div>
        </div>
      </div>)}
    </div>
  );
}

function PaymentFlow({ quote, onClose }) {
  const [method, setMethod] = useState(null);
  const total = quote.items.reduce((s, i) => s + Number(i.price || 0), 0);
  const deposit = Math.ceil(total * (quote.depositPercent / 100));
  const ccDeposit = Math.ceil(deposit * (1 + CC_SURCHARGE));
  const ccFee = ccDeposit - deposit;
  const methods = [
    { id: "check", icon: "\u{1F4DD}", label: "Check", desc: "No additional fees", amt: deposit },
    { id: "ach", icon: "\u{1F3E6}", label: "ACH / Bank Transfer", desc: "No additional fees", amt: deposit },
    { id: "venmo", icon: "\u{1F4F1}", label: "Venmo / Zelle", desc: "No additional fees", amt: deposit },
    { id: "card", icon: "\u{1F4B3}", label: "Credit / Debit Card", desc: "3% processing fee (+" + fmtExact(ccFee) + ")", amt: ccDeposit },
  ];
  const sel = methods.find((m) => m.id === method);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", background: "white", borderRadius: 20, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ padding: "28px 28px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div><div style={{ fontSize: 20, fontWeight: 700, color: "#1b4332", fontFamily: "'Playfair Display', serif" }}>{method ? "Payment Details" : "Choose Payment Method"}</div><div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{quote.depositPercent}% deposit for {quote.customer.name || "your"} project</div></div>
            <button onClick={method ? () => setMethod(null) : onClose} style={{ background: "#f3f2ef", border: "none", borderRadius: 8, width: 36, height: 36, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>{method ? "\u2190" : "\u00D7"}</button>
          </div>
        </div>
        {!method && (<div style={{ padding: "0 28px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
          {methods.map((m) => (<div key={m.id} onClick={() => setMethod(m.id)} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: "#fafaf8", borderRadius: 14, border: "1px solid #eee", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2d6a4f"; e.currentTarget.style.background = "#f0faf4"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.background = "#fafaf8"; }}>
            <div style={{ fontSize: 28, width: 44, textAlign: "center" }}>{m.icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 700 }}>{m.label}</div><div style={{ fontSize: 12, color: m.id === "card" ? "#c0392b" : "#40916c", marginTop: 2, fontWeight: 500 }}>{m.desc}</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 16, fontWeight: 800, color: "#1b4332" }}>{fmt(m.amt)}</div><div style={{ fontSize: 10, color: "#999" }}>deposit</div></div>
          </div>))}
          <div style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 8 }}>All payment methods accepted</div>
        </div>)}
        {method === "check" && (<div style={{ padding: "0 28px 28px" }}><div style={{ background: "#f8f7f4", borderRadius: 14, padding: 24, fontSize: 13, color: "#555", lineHeight: 1.8 }}>
          <div style={{ fontWeight: 700, color: "#1b4332", marginBottom: 12, fontSize: 14 }}>Check Payment Instructions</div>
          <div style={{ marginBottom: 12 }}><span style={{ color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>Make payable to</span><br /><strong>{COMPANY.checkPayableTo}</strong></div>
          <div style={{ marginBottom: 12 }}><span style={{ color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>Mail to</span><br /><strong>{COMPANY.checkMailTo}</strong></div>
          <div style={{ marginBottom: 12 }}><span style={{ color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>Amount</span><br /><strong style={{ fontSize: 20, color: "#1b4332" }}>{fmtExact(deposit)}</strong></div>
          <div><span style={{ color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>Reference</span><br /><strong>{quote.quoteNumber || "Quote"} — {quote.customer.name}</strong></div>
        </div><div style={{ fontSize: 12, color: "#999", marginTop: 14, textAlign: "center" }}>Check must clear before project start date can be scheduled.</div></div>)}
        {method === "ach" && (<div style={{ padding: "0 28px 28px" }}><div style={{ background: "#f8f7f4", borderRadius: 14, padding: 24 }}>
          <div style={{ fontWeight: 700, color: "#1b4332", marginBottom: 12, fontSize: 14 }}>ACH / Bank Transfer</div>
          <div style={{ marginBottom: 12 }}><span style={{ color: "#999", fontSize: 11, textTransform: "uppercase" }}>Deposit Amount</span><br /><strong style={{ fontSize: 20, color: "#1b4332" }}>{fmtExact(deposit)}</strong></div>
          <div style={{ background: "#e8f5ed", borderRadius: 10, padding: "14px 16px", color: "#2d6a4f", fontSize: 13 }}>Please contact us at <strong>{COMPANY.phone}</strong> or <strong>{COMPANY.email}</strong> for bank transfer details and routing information.</div>
        </div></div>)}
        {method === "venmo" && (<div style={{ padding: "0 28px 28px" }}><div style={{ background: "#f8f7f4", borderRadius: 14, padding: 24 }}>
          <div style={{ fontWeight: 700, color: "#1b4332", marginBottom: 12, fontSize: 14 }}>Venmo / Zelle</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #eee", textAlign: "center" }}><div style={{ fontSize: 28, marginBottom: 6 }}>{"\u{1F4F1}"}</div><div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>Venmo</div><div style={{ fontSize: 15, fontWeight: 700, color: "#1b4332" }}>{COMPANY.venmo}</div></div>
            <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #eee", textAlign: "center" }}><div style={{ fontSize: 28, marginBottom: 6 }}>{"\u{1F4B8}"}</div><div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>Zelle</div><div style={{ fontSize: 15, fontWeight: 700, color: "#1b4332" }}>{COMPANY.zelle}</div></div>
          </div>
          <div style={{ marginBottom: 8 }}><span style={{ color: "#999", fontSize: 11, textTransform: "uppercase" }}>Amount</span><br /><strong style={{ fontSize: 20, color: "#1b4332" }}>{fmtExact(deposit)}</strong></div>
          <div><span style={{ color: "#999", fontSize: 11, textTransform: "uppercase" }}>Note / Memo</span><br /><strong>{quote.quoteNumber || "Quote"} — {quote.customer.name}</strong></div>
        </div></div>)}
        {method === "card" && (<div style={{ padding: "0 28px 28px" }}><div style={{ background: "#f8f7f4", borderRadius: 14, padding: 24 }}>
          <div style={{ fontWeight: 700, color: "#1b4332", marginBottom: 12, fontSize: 14 }}>Credit / Debit Card</div>
          <div style={{ background: "#fef8f0", border: "1px solid #f0dcc0", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 12 }}><strong style={{ color: "#b8860b" }}>Note:</strong> A 3% processing fee ({fmtExact(ccFee)}) applies to credit/debit card payments.</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13, color: "#888" }}><span>Base deposit ({quote.depositPercent}%)</span><span style={{ fontWeight: 600, color: "#333" }}>{fmtExact(deposit)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "#888" }}><span>Processing fee (3%)</span><span style={{ fontWeight: 600, color: "#333" }}>{fmtExact(ccFee)}</span></div>
          <div style={{ borderTop: "2px solid #1b4332", paddingTop: 8, display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700, color: "#1b4332" }}>Total charge</span><span style={{ fontWeight: 800, color: "#1b4332", fontSize: 20 }}>{fmtExact(ccDeposit)}</span></div>
          <div style={{ background: "#e8f5ed", borderRadius: 10, padding: "14px 16px", color: "#2d6a4f", fontSize: 13, marginTop: 16 }}>Please contact us at <strong>{COMPANY.phone}</strong> or <strong>{COMPANY.email}</strong> to process your card payment securely.</div>
        </div></div>)}
        {method && (<div style={{ padding: "0 28px 28px" }}>
          <a href={"mailto:" + COMPANY.email + "?subject=Payment for " + (quote.quoteNumber || "Quote") + " — " + quote.customer.name + "&body=Hi, I'd like to proceed with " + (sel ? sel.label : "") + " payment for my golf simulator project."} style={{ display: "block", textAlign: "center", padding: "14px 24px", background: "#1b4332", color: "white", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", fontFamily: "'DM Sans'" }}>Contact {COMPANY.name} to Proceed</a>
          <div style={{ textAlign: "center", marginTop: 10 }}><a href={"tel:" + COMPANY.phone.replace(/[^0-9]/g, "")} style={{ fontSize: 13, color: "#2d6a4f", fontWeight: 600 }}>Or call {COMPANY.phone}</a></div>
        </div>)}
      </div>
    </div>
  );
}

function QuotePreview({ quote, onBack, isShared }) {
  const [entered, setEntered] = useState(false); const [showPayment, setShowPayment] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); setTimeout(() => setEntered(true), 80); }, []);
  const total = quote.items.reduce((s, i) => s + Number(i.price || 0), 0);
  const deposit = Math.ceil(total * (quote.depositPercent / 100));
  const grouped = Object.entries(CATEGORY_META).map(([key, cat]) => ({ ...cat, key, items: quote.items.filter((i) => i.category === key) })).filter((g) => g.items.length > 0);
  const anim = (delay) => ({ opacity: entered ? 1 : 0, transform: entered ? "translateY(0)" : "translateY(18px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) " + delay + "s" });
  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", color: "#1a1a1a" }}>
      {showPayment && <PaymentFlow quote={quote} onClose={() => setShowPayment(false)} />}
      {onBack && !isShared && (<div style={{ background: "#111", color: "#aaa", padding: "10px 20px", fontSize: 12, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 50 }}><button onClick={onBack} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans'" }}>{"\u2190"} Back to Editor</button><span>Client preview</span></div>)}
      <div style={{ background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 40%, #40916c 100%)", padding: "48px 24px 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1, ...anim(0) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{"\u26F3"}</div>
            <div><div style={{ color: "#b7e4c7", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{COMPANY.name}</div><div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{COMPANY.legal}</div></div>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 8 }}>Your Simulator<br />Build Quote</div>
          <div style={{ color: "#b7e4c7", fontSize: 15, marginBottom: 28 }}>A personalized proposal for your home golf simulator</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[{ label: "Quote", value: quote.quoteNumber || "\u2014" }, { label: "Date", value: quote.date }, { label: "Valid", value: quote.validDays + " days" }].map((t) => (<div key={t.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 16px", border: "1px solid rgba(255,255,255,0.1)" }}><div style={{ fontSize: 10, color: "#b7e4c7", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{t.label}</div><div style={{ fontSize: 14, color: "white", fontWeight: 600 }}>{t.value}</div></div>))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 720, margin: "-28px auto 0", padding: "0 16px", position: "relative", zIndex: 2 }}>
        <div style={{ background: "white", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, ...anim(0.12) }}>
          <div><div style={{ fontSize: 10, color: "#40916c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Prepared For</div><div style={{ fontSize: 18, fontWeight: 700 }}>{quote.customer.name || "Client Name"}</div><div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{quote.customer.address}</div>{quote.customer.phone && <div style={{ fontSize: 13, color: "#888", marginTop: 1 }}>{quote.customer.phone}</div>}</div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 10, color: "#40916c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Project Total</div><div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: "#1b4332" }}><AnimNum value={total} /></div></div>
        </div>
      </div>
      <div style={{ maxWidth: 720, margin: "32px auto 0", padding: "0 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Project Breakdown</div>
        {grouped.map((group, gi) => (<div key={group.key} style={{ marginBottom: 24, ...anim(0.2 + gi * 0.08) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 0" }}><span style={{ fontSize: 18 }}>{group.icon}</span><span style={{ fontSize: 14, fontWeight: 700, color: "#1b4332" }}>{group.label}</span><div style={{ flex: 1, height: 1, background: "#e0e0d8", marginLeft: 8 }} /><span style={{ fontSize: 14, fontWeight: 600, color: "#2d6a4f" }}>{fmt(group.items.reduce((s, i) => s + Number(i.price || 0), 0))}</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{group.items.map((item, ii) => (<div key={ii} style={{ display: "flex", alignItems: "center", gap: 14, background: "white", borderRadius: 10, padding: "14px 18px", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{item.description}</div>{item.detail && <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{item.detail}</div>}</div><div style={{ fontSize: 15, fontWeight: 700, color: "#1b4332", whiteSpace: "nowrap" }}>{Number(item.price) === 0 ? "Included" : fmt(item.price)}</div></div>))}</div>
        </div>))}
      </div>
      <div style={{ maxWidth: 720, margin: "16px auto 0", padding: "0 16px", ...anim(0.5) }}>
        <div style={{ background: "linear-gradient(135deg, #1b4332, #2d6a4f)", borderRadius: 16, padding: "28px 28px 24px", color: "white", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div><div style={{ fontSize: 11, color: "#b7e4c7", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Project Total</div><div style={{ fontSize: 40, fontWeight: 800, fontFamily: "'Playfair Display', serif" }}><AnimNum value={total} /></div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#b7e4c7", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{quote.depositPercent}% Deposit</div><div style={{ fontSize: 24, fontWeight: 700 }}><AnimNum value={deposit} /></div></div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowPayment(true)} style={{ flex: 1, padding: "14px 24px", background: "white", color: "#1b4332", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "transform 0.15s", fontFamily: "'DM Sans'" }} onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")} onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}>Accept & Pay Deposit</button>
              <a href={"tel:" + COMPANY.phone.replace(/[^0-9]/g, "")} style={{ padding: "14px 20px", background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", fontFamily: "'DM Sans'" }}>Questions?</a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 720, margin: "32px auto 0", padding: "0 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Included With Your Build</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[{ icon: "\u{1F6E1}\uFE0F", title: "1-Year Warranty", desc: "On all installation work" }, { icon: "\u{1F527}", title: "3 Support Visits", desc: "Free within first year" }, { icon: "\u{1F4D0}", title: "Full Design Process", desc: "Custom planning & layout" }, { icon: "\u{1F4DE}", title: "Ongoing Support", desc: "Help when you need it" }].map((f) => (<div key={f.title} style={{ background: "white", borderRadius: 12, padding: "16px 18px", border: "1px solid rgba(0,0,0,0.06)" }}><div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div><div style={{ fontSize: 13, fontWeight: 700, color: "#1b4332", marginBottom: 2 }}>{f.title}</div><div style={{ fontSize: 12, color: "#888" }}>{f.desc}</div></div>))}
        </div>
      </div>
      <AgreementPanel quote={quote} />
      {quote.notes && (<div style={{ maxWidth: 720, margin: "24px auto 0", padding: "0 16px" }}><div style={{ background: "#fefcf3", border: "1px solid #f0e6c8", borderRadius: 12, padding: "16px 20px" }}><div style={{ fontSize: 11, fontWeight: 700, color: "#b8860b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Note from {COMPANY.name}</div><div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{quote.notes}</div></div></div>)}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px 48px", textAlign: "center", color: "#bbb", fontSize: 12 }}><div style={{ fontWeight: 600, color: "#999" }}>{COMPANY.name}</div><div style={{ marginTop: 4 }}>{COMPANY.phone} · {COMPANY.email}</div><div>{COMPANY.address}</div></div>
    </div>
  );
}

function QuoteBuilder({ quote, setQuote, onPreview, onBack, onSave, onDuplicate, onDelete }) {
  const updateCustomer = (k, v) => setQuote((q) => ({ ...q, customer: { ...q.customer, [k]: v } }));
  const updateItem = (idx, k, v) => setQuote((q) => { const items = [...q.items]; items[idx] = { ...items[idx], [k]: v }; return { ...q, items }; });
  const removeItem = (idx) => setQuote((q) => ({ ...q, items: q.items.filter((_, i) => i !== idx) }));
  const addItem = (preset) => { const item = preset ? { ...preset, id: uid() } : { id: uid(), description: "", detail: "", price: 0, category: "build" }; setQuote((q) => ({ ...q, items: [...q.items, item] })); };
  const loadPreset = () => setQuote((q) => ({ ...q, items: PRESET_ITEMS.map((p) => ({ ...p, id: uid() })) }));
  const total = quote.items.reduce((s, i) => s + Number(i.price || 0), 0);
  const [showPresets, setShowPresets] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleSave = () => { onSave(); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleShare = async () => { const url = encodeQuoteToURL(quote); try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 3000); } catch { prompt("Copy this link:", url); } };
  return (
    <div style={{ minHeight: "100vh", background: "#f3f2ef" }}>
      <div style={{ background: "#1b4332", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#b7e4c7", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans'" }}>{"\u2190"} Quotes</button>
          <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>{"\u26F3"} {COMPANY.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ color: "#b7e4c7", fontSize: 14, fontWeight: 600, marginRight: 4 }}>{fmt(total)}</div>
          <button onClick={handleSave} style={{ background: saved ? "#40916c" : "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "7px 14px", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans'", transition: "all 0.2s" }}>{saved ? "\u2713 Saved" : "Save"}</button>
          <button onClick={handleShare} style={{ background: copied ? "#40916c" : "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "7px 14px", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans'", transition: "all 0.2s" }}>{copied ? "\u2713 Link Copied!" : "\u{1F4CB} Share Link"}</button>
          <button onClick={onPreview} style={{ background: "white", color: "#1b4332", border: "none", borderRadius: 8, padding: "7px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans'" }}>Preview {"\u2192"}</button>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 20px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
          {[{ label: "Quote #", value: quote.quoteNumber, key: "quoteNumber", ph: "#0000018" }, { label: "Date", value: quote.date, key: "date" }, { label: "Valid (days)", value: quote.validDays, key: "validDays", type: "number" }, { label: "Deposit %", value: quote.depositPercent, key: "depositPercent", type: "number" }].map((f) => (<div key={f.key}><label style={labelStyle}>{f.label}</label><input style={inputStyle} type={f.type || "text"} value={f.value} onChange={(e) => setQuote((q) => ({ ...q, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value }))} placeholder={f.ph || ""} /></div>))}
        </div>
        <div style={{ marginBottom: 24 }}><label style={labelStyle}>Status</label><div style={{ display: "flex", gap: 8 }}>{["draft", "sent", "accepted", "declined"].map((s) => (<button key={s} onClick={() => setQuote((q) => ({ ...q, status: s }))} style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'", border: quote.status === s ? "2px solid #1b4332" : "1px solid #ddd", background: quote.status === s ? "#e8f5ed" : "white", color: quote.status === s ? "#1b4332" : "#888", textTransform: "capitalize" }}>{s}</button>))}</div></div>
        <div style={{ background: "white", borderRadius: 14, padding: 24, marginBottom: 24, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1b4332", marginBottom: 16 }}>Customer Details</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div><label style={labelStyle}>Full Name</label><input style={inputStyle} value={quote.customer.name} onChange={(e) => updateCustomer("name", e.target.value)} placeholder="Josh Roberts" /></div>
            <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={quote.customer.phone} onChange={(e) => updateCustomer("phone", e.target.value)} placeholder="(801) 555-0000" /></div>
            <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Address</label><input style={inputStyle} value={quote.customer.address} onChange={(e) => updateCustomer("address", e.target.value)} placeholder="123 Main St, City, UT 84000" /></div>
            <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Email</label><input style={inputStyle} value={quote.customer.email} onChange={(e) => updateCustomer("email", e.target.value)} placeholder="josh@email.com" /></div>
          </div>
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: 24, marginBottom: 24, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1b4332" }}>Line Items</div>
            <div style={{ display: "flex", gap: 8 }}>
              {quote.items.length === 0 && <button onClick={loadPreset} style={{ background: "#e8f5ed", color: "#2d6a4f", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}>Load Standard Build</button>}
              <button onClick={() => setShowPresets(!showPresets)} style={{ background: "#f3f2ef", color: "#555", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}>+ Presets</button>
              <button onClick={() => addItem()} style={{ background: "#1b4332", color: "white", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}>+ Custom</button>
            </div>
          </div>
          {showPresets && (<div style={{ background: "#f8f7f4", borderRadius: 10, padding: 14, marginBottom: 14, border: "1px solid #e0e0d8", maxHeight: 200, overflowY: "auto" }}><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{PRESET_ITEMS.map((p, i) => (<button key={i} onClick={() => { addItem(p); setShowPresets(false); }} style={{ background: "white", border: "1px solid #ddd", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans'", color: "#333" }}>{p.description} <span style={{ color: "#999" }}>{fmt(p.price)}</span></button>))}</div></div>)}
          {quote.items.length === 0 && <div style={{ textAlign: "center", color: "#bbb", padding: "40px 0", fontSize: 14 }}>No items yet</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{quote.items.map((item, idx) => (<div key={item.id || idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px 110px 32px", gap: 8, alignItems: "center", background: "#fafaf8", borderRadius: 10, padding: "10px 12px", border: "1px solid #eee" }}>
            <input style={{ ...inputStyle, fontSize: 13, padding: "8px 10px" }} value={item.description} onChange={(e) => updateItem(idx, "description", e.target.value)} placeholder="Item" />
            <input style={{ ...inputStyle, fontSize: 13, padding: "8px 10px" }} value={item.detail || ""} onChange={(e) => updateItem(idx, "detail", e.target.value)} placeholder="Detail" />
            <select style={{ ...inputStyle, fontSize: 12, padding: "8px 6px" }} value={item.category} onChange={(e) => updateItem(idx, "category", e.target.value)}><option value="tech">Tech</option><option value="build">Build</option><option value="service">Service</option></select>
            <input style={{ ...inputStyle, fontSize: 13, padding: "8px 10px", textAlign: "right", fontWeight: 600 }} type="number" value={item.price} onChange={(e) => updateItem(idx, "price", e.target.value)} />
            <button onClick={() => removeItem(idx)} style={{ background: "none", border: "none", fontSize: 18, color: "#ccc", cursor: "pointer" }} onMouseEnter={(e) => (e.target.style.color = "#e74c3c")} onMouseLeave={(e) => (e.target.style.color = "#ccc")}>{"\u00D7"}</button>
          </div>))}</div>
          {quote.items.length > 0 && (<div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16, paddingTop: 16, borderTop: "1px solid #eee" }}><div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: "#999", textTransform: "uppercase" }}>Total</div><div style={{ fontSize: 28, fontWeight: 800, color: "#1b4332", fontFamily: "'Playfair Display', serif" }}>{fmt(total)}</div></div></div>)}
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: 24, marginBottom: 24, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1b4332", marginBottom: 10 }}>Personal Note <span style={{ fontWeight: 400, color: "#999", fontSize: 12 }}>(shows on quote)</span></div>
          <textarea style={{ ...inputStyle, height: 80, resize: "vertical" }} value={quote.notes || ""} onChange={(e) => setQuote((q) => ({ ...q, notes: e.target.value }))} placeholder="Hey Josh — excited to build this out for you!" />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onDuplicate} style={{ background: "white", border: "1px solid #ddd", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'", color: "#555" }}>Duplicate</button>
          <button onClick={onDelete} style={{ background: "white", border: "1px solid #e8c4c4", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'", color: "#c0392b" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ quotes, onNew, onEdit }) {
  const sc = { draft: "#f39c12", sent: "#3498db", accepted: "#27ae60", declined: "#e74c3c" };
  return (
    <div style={{ minHeight: "100vh", background: "#f3f2ef" }}>
      <div style={{ background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)", padding: "40px 24px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><span style={{ fontSize: 28 }}>{"\u26F3"}</span><span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>{COMPANY.name}</span></div><div style={{ color: "#b7e4c7", fontSize: 14 }}>Quote Builder — {quotes.length} quote{quotes.length !== 1 ? "s" : ""}</div></div>
          <button onClick={onNew} style={{ background: "white", color: "#1b4332", border: "none", borderRadius: 10, padding: "12px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans'", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>+ New Quote</button>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "-20px auto 0", padding: "0 20px 60px" }}>
        {quotes.length === 0 && (<div style={{ background: "white", borderRadius: 16, padding: "60px 24px", textAlign: "center", border: "1px solid rgba(0,0,0,0.06)" }}><div style={{ fontSize: 48, marginBottom: 16 }}>{"\u26F3"}</div><div style={{ fontSize: 18, fontWeight: 700, color: "#1b4332", marginBottom: 8 }}>No quotes yet</div><div style={{ fontSize: 14, color: "#999", marginBottom: 24 }}>Create your first interactive client quote</div><button onClick={onNew} style={{ background: "#1b4332", color: "white", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans'" }}>Create First Quote</button></div>)}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{quotes.map((q) => { const total = q.items.reduce((s, i) => s + Number(i.price || 0), 0); return (<div key={q.id} onClick={() => onEdit(q.id)} style={{ background: "white", borderRadius: 14, padding: "20px 24px", cursor: "pointer", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 10px rgba(0,0,0,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, transition: "box-shadow 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 10px rgba(0,0,0,0.04)")}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: sc[q.status] || "#ccc" }} /><div><div style={{ fontSize: 15, fontWeight: 700 }}>{q.customer.name || "Untitled Quote"} {q.quoteNumber && <span style={{ color: "#999", fontWeight: 400, fontSize: 13 }}>{q.quoteNumber}</span>}</div><div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{q.date} · {q.items.length} items · <span style={{ color: sc[q.status], textTransform: "capitalize" }}>{q.status}</span></div></div></div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1b4332", fontFamily: "'Playfair Display', serif" }}>{fmt(total)}</div>
        </div>); })}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [quotes, setQuotes] = useState(loadQuotes);
  const [view, setView] = useState("dashboard");
  const [activeId, setActiveId] = useState(null);
  const [sharedQuote, setSharedQuote] = useState(null);
  useEffect(() => { if (window.location.hash.startsWith("#q=")) { const d = decodeQuoteFromURL(window.location.hash); if (d) { setSharedQuote(d); setView("shared"); } } }, []);
  useEffect(() => { persistQuotes(quotes); }, [quotes]);
  const activeQuote = quotes.find((q) => q.id === activeId);
  const setActiveQuote = (updater) => setQuotes((all) => all.map((q) => (q.id === activeId ? (typeof updater === "function" ? updater(q) : updater) : q)));
  const createNew = () => { const q = makeQuote(); setQuotes((all) => [q, ...all]); setActiveId(q.id); setView("builder"); };
  const editQuote = (id) => { setActiveId(id); setView("builder"); };
  const duplicateQuote = () => { if (!activeQuote) return; const dup = { ...JSON.parse(JSON.stringify(activeQuote)), id: uid(), quoteNumber: "", status: "draft", createdAt: new Date().toISOString() }; setQuotes((all) => [dup, ...all]); setActiveId(dup.id); };
  const deleteQuote = () => { if (!activeId || !confirm("Delete this quote?")) return; setQuotes((all) => all.filter((q) => q.id !== activeId)); setActiveId(null); setView("dashboard"); };
  if (view === "shared" && sharedQuote) return <QuotePreview quote={sharedQuote} isShared={true} />;
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {view === "dashboard" && <Dashboard quotes={quotes} onNew={createNew} onEdit={editQuote} />}
      {view === "builder" && activeQuote && <QuoteBuilder quote={activeQuote} setQuote={setActiveQuote} onPreview={() => setView("preview")} onBack={() => setView("dashboard")} onSave={() => persistQuotes(quotes)} onDuplicate={duplicateQuote} onDelete={deleteQuote} />}
      {view === "preview" && activeQuote && <QuotePreview quote={activeQuote} onBack={() => setView("builder")} />}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// interface VerifyResult {
//   is_authentic: boolean;
//   serial_number: string;
//   product_id: string;
//   db_root_hash: string;
//   chain_root_hash: string;
//   tx_hash: string;
//   reason: string;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

// // ── Redline Apparel Colour Palette ──────────────────────────────────────────
// // #C0202A  deep crimson   — primary brand
// // #8B0000  blood red      — dark accent
// // #E8312A  signal red     — hover / active
// // #FAF7F2  warm white     — paper background
// // #F5EFE6  parchment      — surface
// // #F0EBE3  ecru           — page background
// // #2C1A1A  dark ink       — body text
// // #C0202A1A              — tint overlays

// export default function VerifyPage() {
//   const { serial } = useParams<{ serial: string }>();
//   const [result, setResult] = useState<VerifyResult | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch(`${API_URL}/verify/${serial}`)
//       .then((r) => r.json())
//       .then(setResult)
//       .catch(() => setError("Gagal menghubungi server verifikasi."))
//       .finally(() => setIsLoading(false));
//   }, [serial]);

//   // ── Loading ───────────────────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#F0EBE3",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <div
//             style={{
//               width: 40,
//               height: 40,
//               margin: "0 auto 16px",
//               borderRadius: "50%",
//               border: "2px solid #C0202A",
//               borderTopColor: "transparent",
//               animation: "spin 0.8s linear infinite",
//             }}
//           />
//           <p
//             style={{
//               fontFamily: "monospace",
//               fontSize: 10,
//               letterSpacing: "0.3em",
//               color: "#C0202A99",
//               textTransform: "uppercase",
//             }}
//           >
//             Verifying
//           </p>
//           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//         </div>
//       </div>
//     );
//   }

//   // ── Error ─────────────────────────────────────────────────────────────────
//   if (error || !result) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#F0EBE3",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <p style={{ fontFamily: "monospace", fontSize: 13, color: "#C0202A" }}>
//           {error ?? "Serial tidak ditemukan."}
//         </p>
//       </div>
//     );
//   }

//   const isAuth = result.is_authentic;
//   const verifiedAt = new Date().toLocaleDateString("id-ID", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#FFF",
//         padding: "48px 16px",
//         fontFamily: "Georgia, serif",
//       }}
//     >
//       {/* ── Certificate ─────────────────────────────────────────────────────── */}
//       <div
//         style={{
//           position: "relative",
//           maxWidth: 640,
//           margin: "0 auto",
//           background: "#FAF7F2",
//           boxShadow:
//             "0 0 0 1px #C0202A1A, 0 4px 6px rgba(192,32,42,0.06), 0 24px 64px rgba(44,26,26,0.14)",
//           overflow: "hidden",
//         }}
//       >
//         {/* Top bar */}
//         <div
//           style={{
//             height: 6,
//             background:
//               "linear-gradient(90deg, #8B0000, #C0202A, #E8312A, #C0202A, #8B0000)",
//           }}
//         />

//         {/* Corner ornaments — top left */}
//         <svg
//           style={{
//             position: "absolute",
//             top: 6,
//             left: 0,
//             width: 56,
//             height: 56,
//             color: "#C0202A",
//             opacity: 0.2,
//           }}
//           viewBox="0 0 56 56"
//           fill="none"
//         >
//           <path d="M4 4 L24 4 L24 8 L8 8 L8 24 L4 24 Z" fill="currentColor" />
//           <path d="M4 4 L4 14" stroke="currentColor" strokeWidth="0.8" />
//           <path d="M4 4 L14 4" stroke="currentColor" strokeWidth="0.8" />
//         </svg>
//         {/* Corner ornaments — top right */}
//         <svg
//           style={{
//             position: "absolute",
//             top: 6,
//             right: 0,
//             width: 56,
//             height: 56,
//             color: "#C0202A",
//             opacity: 0.2,
//             transform: "scaleX(-1)",
//           }}
//           viewBox="0 0 56 56"
//           fill="none"
//         >
//           <path d="M4 4 L24 4 L24 8 L8 8 L8 24 L4 24 Z" fill="currentColor" />
//           <path d="M4 4 L4 14" stroke="currentColor" strokeWidth="0.8" />
//           <path d="M4 4 L14 4" stroke="currentColor" strokeWidth="0.8" />
//         </svg>
//         {/* Corner ornaments — bottom left */}
//         <svg
//           style={{
//             position: "absolute",
//             bottom: 6,
//             left: 0,
//             width: 56,
//             height: 56,
//             color: "#C0202A",
//             opacity: 0.2,
//             transform: "scaleY(-1)",
//           }}
//           viewBox="0 0 56 56"
//           fill="none"
//         >
//           <path d="M4 4 L24 4 L24 8 L8 8 L8 24 L4 24 Z" fill="currentColor" />
//           <path d="M4 4 L4 14" stroke="currentColor" strokeWidth="0.8" />
//           <path d="M4 4 L14 4" stroke="currentColor" strokeWidth="0.8" />
//         </svg>
//         {/* Corner ornaments — bottom right */}
//         <svg
//           style={{
//             position: "absolute",
//             bottom: 6,
//             right: 0,
//             width: 56,
//             height: 56,
//             color: "#C0202A",
//             opacity: 0.2,
//             transform: "scale(-1,-1)",
//           }}
//           viewBox="0 0 56 56"
//           fill="none"
//         >
//           <path d="M4 4 L24 4 L24 8 L8 8 L8 24 L4 24 Z" fill="currentColor" />
//           <path d="M4 4 L4 14" stroke="currentColor" strokeWidth="0.8" />
//           <path d="M4 4 L14 4" stroke="currentColor" strokeWidth="0.8" />
//         </svg>

//         {/* Dot grid watermark */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             pointerEvents: "none",
//             backgroundImage:
//               "radial-gradient(circle, #C0202A0A 1px, transparent 1px)",
//             backgroundSize: "20px 20px",
//           }}
//         />

//         <div style={{ position: "relative", padding: "40px 56px 36px" }}>
//           {/* ── Header ─────────────────────────────────────────────────────── */}
//           <div style={{ textAlign: "center", marginBottom: 28 }}>
//             {/* Logo row */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 16,
//                 marginBottom: 16,
//               }}
//             >
//               <div
//                 style={{
//                   flex: 1,
//                   height: 1,
//                   background:
//                     "linear-gradient(to right, transparent, #C0202A50)",
//                 }}
//               />
//               <div
//                 style={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: "50%",
//                   border: "1px solid #C0202A30",
//                   background: "#C0202A08",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
//                   <polygon
//                     points="17,2 31,9 31,25 17,32 3,25 3,9"
//                     fill="none"
//                     stroke="#C0202A"
//                     strokeWidth="1.2"
//                   />
//                   <polygon
//                     points="17,8 26,12.5 26,21.5 17,26 8,21.5 8,12.5"
//                     fill="#C0202A"
//                     opacity="0.1"
//                   />
//                   <text
//                     x="17"
//                     y="22"
//                     textAnchor="middle"
//                     fill="#C0202A"
//                     fontSize="12"
//                     fontWeight="700"
//                     fontFamily="Georgia, serif"
//                   >
//                     R
//                   </text>
//                 </svg>
//               </div>
//               <div
//                 style={{
//                   flex: 1,
//                   height: 1,
//                   background:
//                     "linear-gradient(to left, transparent, #C0202A50)",
//                 }}
//               />
//             </div>

//             <p
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: 9,
//                 letterSpacing: "0.5em",
//                 color: "#C0202A",
//                 textTransform: "uppercase",
//                 marginBottom: 4,
//               }}
//             >
//               Redline Apparel
//             </p>
//             <h1
//               style={{
//                 fontSize: 26,
//                 fontWeight: 400,
//                 letterSpacing: "0.22em",
//                 color: "#2C1A1A",
//                 textTransform: "uppercase",
//                 margin: "0 0 4px",
//               }}
//             >
//               Certificate
//             </h1>
//             <p
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: 9,
//                 letterSpacing: "0.45em",
//                 color: "#2C1A1A40",
//                 textTransform: "uppercase",
//               }}
//             >
//               of Authenticity
//             </p>
//           </div>

//           {/* ── Ornamental divider ─────────────────────────────────────────── */}
//           <Divider />

//           {/* ── Status banner ──────────────────────────────────────────────── */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 10,
//               padding: "12px 0",
//               background: isAuth ? "#C0202A08" : "#FFF0F0",
//               border: `1px solid ${isAuth ? "#C0202A25" : "#E8312A40"}`,
//               marginBottom: 24,
//             }}
//           >
//             {isAuth ? (
//               <>
//                 <svg
//                   width="18"
//                   height="18"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="#C0202A"
//                   strokeWidth="1.5"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span
//                   style={{
//                     fontFamily: "monospace",
//                     fontSize: 10,
//                     letterSpacing: "0.3em",
//                     color: "#C0202A",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Verified Authentic
//                 </span>
//               </>
//             ) : (
//               <>
//                 <svg
//                   width="18"
//                   height="18"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="#E8312A"
//                   strokeWidth="1.5"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
//                   />
//                 </svg>
//                 <span
//                   style={{
//                     fontFamily: "monospace",
//                     fontSize: 10,
//                     letterSpacing: "0.3em",
//                     color: "#E8312A",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Not Authentic
//                 </span>
//               </>
//             )}
//           </div>

//           {/* ── Body copy ──────────────────────────────────────────────────── */}
//           <div style={{ textAlign: "center", marginBottom: 24 }}>
//             <p style={{ fontSize: 14, lineHeight: 1.8, color: "#2C1A1A80" }}>
//               This document certifies that the item bearing serial number
//             </p>
//             <p
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: 11,
//                 letterSpacing: "0.15em",
//                 color: "#C0202A",
//                 margin: "10px 0",
//               }}
//             >
//               {result.serial_number}
//             </p>
//             <p style={{ fontSize: 14, lineHeight: 1.8, color: "#2C1A1A80" }}>
//               {isAuth
//                 ? "is a genuine Redline Apparel product. Its authenticity has been cryptographically verified and permanently recorded on the blockchain."
//                 : "could not be verified as a genuine Redline Apparel product. The blockchain authenticity check has failed."}
//             </p>
//           </div>

//           {/* ── Details grid ───────────────────────────────────────────────── */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: 10,
//               marginBottom: 20,
//             }}
//           >
//             {[
//               { label: "Product ID", value: `#${result.product_id}` },
//               { label: "Verified On", value: verifiedAt },
//               {
//                 label: "Merkle Root",
//                 value: `${result.db_root_hash.slice(0, 18)}...`,
//                 full: result.db_root_hash,
//               },
//               {
//                 label: "TX Hash",
//                 value: `${result.tx_hash.slice(0, 18)}...`,
//                 full: result.tx_hash,
//               },
//             ].map(({ label, value, full }) => (
//               <div
//                 key={label}
//                 style={{
//                   padding: "10px 14px",
//                   background: "#F5EFE6",
//                   border: "1px solid #C0202A15",
//                 }}
//               >
//                 <p
//                   style={{
//                     fontFamily: "monospace",
//                     fontSize: 8,
//                     letterSpacing: "0.3em",
//                     color: "#C0202A80",
//                     textTransform: "uppercase",
//                     marginBottom: 4,
//                   }}
//                 >
//                   {label}
//                 </p>
//                 <p
//                   style={{
//                     fontFamily: "monospace",
//                     fontSize: 11,
//                     color: "#2C1A1A80",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                   }}
//                   title={full}
//                 >
//                   {value}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* ── Chain badge ────────────────────────────────────────────────── */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 8,
//               padding: "10px 0",
//               background: "#F5EFE6",
//               border: "1px solid #C0202A12",
//               marginBottom: 24,
//             }}
//           >
//             <svg
//               width="12"
//               height="12"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="#C0202A60"
//               strokeWidth="1.5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
//               />
//             </svg>
//             <span
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: 8,
//                 letterSpacing: "0.25em",
//                 color: "#2C1A1A35",
//                 textTransform: "uppercase",
//               }}
//             >
//               Secured by Ethereum Blockchain · Ganache Network · Chain ID 1337
//             </span>
//           </div>

//           {/* ── Divider ────────────────────────────────────────────────────── */}
//           <Divider />

//           {/* ── Footer ─────────────────────────────────────────────────────── */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "flex-end",
//               justifyContent: "space-between",
//             }}
//           >
//             {/* Signature */}
//             <div>
//               <p
//                 style={{
//                   fontSize: 18,
//                   fontStyle: "italic",
//                   color: "#C0202A90",
//                   marginBottom: 8,
//                 }}
//               >
//                 Redline Apparel
//               </p>
//               <div
//                 style={{
//                   height: 1,
//                   width: 140,
//                   background: "#2C1A1A25",
//                   marginBottom: 6,
//                 }}
//               />
//               <p
//                 style={{
//                   fontFamily: "monospace",
//                   fontSize: 8,
//                   letterSpacing: "0.3em",
//                   color: "#2C1A1A30",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Authorized Signature
//               </p>
//             </div>

//             {/* QR code */}
//             <div style={{ textAlign: "right" }}>
//               <div
//                 style={{
//                   display: "inline-block",
//                   padding: 4,
//                   background: "#fff",
//                   border: "1px solid #C0202A20",
//                   marginBottom: 6,
//                 }}
//               >
//                 <img
//                   src={`${API_URL.replace("/api", "")}/api/items/${result.serial_number}/qr`}
//                   alt="QR Code"
//                   width={72}
//                   height={72}
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).style.display = "none";
//                   }}
//                 />
//               </div>
//               <p
//                 style={{
//                   fontFamily: "monospace",
//                   fontSize: 8,
//                   letterSpacing: "0.25em",
//                   color: "#2C1A1A25",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Scan to verify
//               </p>
//             </div>
//           </div>

//           {/* ── Certificate number ─────────────────────────────────────────── */}
//           <p
//             style={{
//               marginTop: 28,
//               textAlign: "center",
//               fontFamily: "monospace",
//               fontSize: 8,
//               letterSpacing: "0.25em",
//               color: "#2C1A1A20",
//               textTransform: "uppercase",
//             }}
//           >
//             CERT-{result.product_id}-
//             {result.serial_number.slice(0, 8).toUpperCase()} · CERTIPATH
//             VERIFICATION SYSTEM
//           </p>
//         </div>

//         {/* Bottom bar */}
//         <div
//           style={{
//             height: 6,
//             background:
//               "linear-gradient(90deg, #8B0000, #C0202A, #E8312A, #C0202A, #8B0000)",
//           }}
//         />
//       </div>

//       {/* ── Print button ────────────────────────────────────────────────────── */}
//       <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
//         <button
//           onClick={() => window.print()}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             padding: "10px 24px",
//             fontFamily: "monospace",
//             fontSize: 10,
//             letterSpacing: "0.2em",
//             textTransform: "uppercase",
//             color: "#C0202A",
//             background: "transparent",
//             border: "1px solid #C0202A40",
//             cursor: "pointer",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.background = "#C0202A08")}
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.background = "transparent")
//           }
//         >
//           <svg
//             width="14"
//             height="14"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="1.5"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
//             />
//           </svg>
//           Print Certificate
//         </button>
//       </div>

//       <style>{`
//         @media print {
//           body { background: #F0EBE3 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//           button { display: none !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ── Ornamental divider component ────────────────────────────────────────────
// function Divider() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         margin: "20px 0",
//       }}
//     >
//       <div style={{ flex: 1, height: 1, background: "#C0202A20" }} />
//       <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//         <rect
//           x="7"
//           y="0"
//           width="6"
//           height="6"
//           fill="#C0202A"
//           opacity="0.2"
//           transform="rotate(45 10 3)"
//         />
//         <rect
//           x="7"
//           y="7"
//           width="6"
//           height="6"
//           fill="#C0202A"
//           opacity="0.5"
//           transform="rotate(45 10 10)"
//         />
//         <rect
//           x="7"
//           y="14"
//           width="6"
//           height="6"
//           fill="#C0202A"
//           opacity="0.2"
//           transform="rotate(45 10 17)"
//         />
//       </svg>
//       <div style={{ flex: 1, height: 1, background: "#C0202A20" }} />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IconCheck, IconCube, IconLink, IconPrinter, IconShieldCheck } from "@intentui/icons";
// import { HiOutlineShieldCheck, HiOutlineCube, HiOutlineLink, HiOutlinePrinter, HiCheckBadge } from "react-icons/hi2";

interface VerifyResult {
  is_authentic: boolean;
  serial_number: string;
  product_id: string;
  db_root_hash: string;
  chain_root_hash: string;
  tx_hash: string;
  reason: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export default function VerifyPage() {
  const { serial } = useParams<{ serial: string }>();
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/verify/${serial}`)
      .then((r) => r.json())
      .then(setResult)
      .catch(() => setError("Authentication server unreachable."))
      .finally(() => setIsLoading(false));
  }, [serial]);

  if (isLoading) return <LoadingScreen />;
  if (error || !result) return <ErrorScreen message={error} />;


  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const isAuth = result.is_authentic;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8 font-serif selection:bg-[#C0202A]/30">
      {/* Container Sertifikat */}
      <div className="max-w-[800px] mx-auto relative group">

        {/* Background Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-b from-[#C0202A]/20 to-transparent rounded-[40px] blur-2xl opacity-50"></div>

        {/* Main Card */}
        <div className="relative bg-[#FAF7F2] rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10">

          {/* Top Decorative Border */}
          <div className="h-2 bg-gradient-to-r from-[#8B0000] via-[#C0202A] to-[#E8312A]"></div>

          <div className="p-8 sm:p-16 relative">

            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <h1 className="text-[250px] font-black italic">CP</h1>
            </div>

            {/* Header: Brand & Title */}
            <header className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#C0202A]/30"></div>
                <span className="text-[10px] tracking-[0.6em] text-[#C0202A] font-bold uppercase">Redline Apparel</span>
                <div className="h-[1px] w-12 bg-[#C0202A]/30"></div>
              </div>
              <h1 className="text-4xl sm:text-6xl text-[#1a1a1a] font-light tracking-tight mb-4">
                Certificate <span className="italic font-normal">of</span> Authenticity
              </h1>
              <p className="text-[11px] tracking-[0.4em] text-[#1a1a1a]/40 uppercase">Secure Blockchain Verification</p>
            </header>

            {/* Status Section */}
            <div className="flex flex-col items-center mb-16">
              {isAuth ? (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000">
                  <div className="w-20 h-20 bg-[#C0202A] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(192,32,42,0.4)] mb-6">
                    <IconCheck className="text-white size-8" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl text-[#1a1a1a] mb-2 font-medium tracking-wide">Product Verified</h2>
                    <p className="text-sm text-[#1a1a1a]/60 font-sans italic tracking-wide">This item is a certified genuine masterpiece from Redline Apparel.</p>
                  </div>
                </div>
              ) : (
                <div className="text-[#8B0000] text-center">
                  <h2 className="text-2xl font-bold uppercase tracking-widest">Verification Failed</h2>
                </div>
              )}
            </div>

            {/* Product Details Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 border-y border-[#1a1a1a]/5 py-12">
              <div className="space-y-6">
                <DetailItem label="Serial Number" value={result.serial_number} highlight />
                <DetailItem label="Product Collection" value={`Archive Model #${result.product_id}`} />
                <DetailItem label="Origin" value="Kuningan, Indonesia" />
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a]/30 mb-4 font-sans">Cryptographic Evidence</h4>
                <BlockchainItem icon={<IconCube />} label="Network" value="Ethereum Mainnet" />
                <BlockchainItem icon={<IconLink />} label="Transaction" value={result.tx_hash} isHash />
                <BlockchainItem icon={<IconShieldCheck />} label="Root Hash" value={result.db_root_hash} isHash />
              </div>
            </div>

            {/* Signature & QR Area */}
            <footer className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <p className="text-2xl font-serif italic text-[#1a1a1a]/80 mb-2">Redline Apparel</p>
                <div className="h-[1px] w-48 bg-[#1a1a1a]/20 mb-4"></div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#1a1a1a]/40 font-sans">Official Brand Representative</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-2 bg-white border border-[#1a1a1a]/5 rounded-2xl shadow-sm mb-4">
                  <img
                    src={`${API_URL.replace("/api", "")}/api/items/${result.serial_number}/qr`}
                    alt="Verification QR"
                    className="w-24 h-24"
                  />
                </div>
                <p className="text-[8px] tracking-[0.2em] uppercase text-[#1a1a1a]/30 font-sans">Unique Digital ID</p>
              </div>
            </footer>

          </div>

          {/* Bottom Banner */}
          <div className="bg-[#1a1a1a] py-6 px-12 flex justify-between items-center">
            <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-sans">© 2024 Redline Apparel CertiPath System</span>
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-[#C0202A] rounded-full"></div>
              <div className="w-1 h-1 bg-[#C0202A] rounded-full opacity-50"></div>
              <div className="w-1 h-1 bg-[#C0202A] rounded-full opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-center no-print">
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all active:scale-95 group shadow-2xl"
          >
            <IconPrinter className="text-xl group-hover:text-[#C0202A] transition-colors" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] font-sans">Print Archival Copy</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── Supporting Components ──────────────────────────────────────────────────

function DetailItem({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a]/30 mb-1 font-sans">{label}</p>
      <p className={`text-xl ${highlight ? 'text-[#C0202A] font-medium' : 'text-[#1a1a1a]'} tracking-wide`}>{value}</p>
    </div>
  );
}

function BlockchainItem({ icon, label, value, isHash = false }: { icon: any, label: string, value: string, isHash?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-[#C0202A]/60">{icon}</div>
      <div>
        <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-[#1a1a1a]/40 font-sans leading-none mb-1">{label}</p>
        <p className="text-[10px] font-mono text-[#1a1a1a]/60 break-all leading-relaxed italic">
          {isHash ? `${value.slice(0, 16)}...${value.slice(-16)}` : value}
        </p>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#C0202A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[10px] tracking-[0.5em] text-[#C0202A] uppercase">Initializing Verification</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string | null }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-[#C0202A] font-mono text-sm tracking-widest">{message ?? "Record Not Found"}</div>
    </div>
  );
}

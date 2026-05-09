// "use client";

// import GoogleIcon from "@/components/icons/GoogleIcon";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function LoginPage() {
//   const { status } = useSession();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.replace("/");
//     }
//   }, [status, router]);

//   const handleGoogleLogin = async () => {
//     setIsLoading(true);
//     await signIn("google", { callbackUrl: "/" });
//   };

//   if (status === "loading" || status === "authenticated") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
//         <div className="w-10 h-10 border-2 border-[#C0202A] border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden font-sans">
//       {/* 1. Background Image - Seirama dengan Mobile */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: "url('https://images.unsplash.com/photo-1654676066221-500d63a81951?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       />

//       {/* 2. Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60 z-10" />

//       {/* 3. Luxury Glass Card */}
//       <div className="relative z-20 w-full max-w-[400px] backdrop-blur-xl bg-white/10 rounded-[32px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-[fadeUp_0.8s_ease-out]">

//         {/* Decorative Top Glow */}
//         <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

//         <div className="px-10 py-12 flex flex-col items-center">

//           {/* Brand Header */}
//           <div className="mb-8 text-center">
//             <p className="text-[10px] tracking-[0.6em] text-[#C0202A] uppercase font-bold mb-2">
//               Redline Apparel
//             </p>
//             <h1 className="text-4xl tracking-[0.2em] text-white uppercase font-light">
//               CertiPath
//             </h1>
//             <p className="text-sm text-white/60 text-center leading-relaxed mb-5 font-light max-w-[280px] mt-4">
//               Securing Authenticity on Chain
//             </p>
//             <div className="h-[1px] w-12 bg-[#C0202A] mx-auto mt-4 opacity-60" />
//           </div>


//           <p className="text-sm text-white/60 text-center leading-relaxed mb-10 font-light max-w-[280px]">
//             Sign in to access your secure product verification dashboard.
//           </p>

//           {/* Login Button - Luxury Style */}
//           <button
//             onClick={handleGoogleLogin}
//             disabled={isLoading}
//             className="group relative w-full flex items-center justify-center gap-4 py-4 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-gray-100 active:scale-[0.98] disabled:opacity-70 overflow-hidden shadow-xl"
//           >
//             {isLoading ? (
//               <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <>
//                 <div className="transition-transform duration-300 group-hover:scale-110">
//                   <GoogleIcon />
//                 </div>
//                 <span className="text-xs tracking-[0.2em] font-bold uppercase">
//                   Continue with Google
//                 </span>
//               </>
//             )}
//           </button>

//           {/* Small Footer inside Card */}
//           <div className="mt-10 flex items-center gap-2 opacity-30">
//             <div className="w-1 h-1 bg-white rounded-full" />
//             <p className="text-[9px] tracking-[0.2em] text-white uppercase font-medium">
//               Encrypted by CertiPath Protocol
//             </p>
//             <div className="w-1 h-1 bg-white rounded-full" />
//           </div>
//         </div>
//       </div>

//       {/* Global Footer */}
//       <footer className="relative z-20 mt-8 flex flex-col items-center gap-2">
//         <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase font-medium">
//           © {new Date().getFullYear()} Redline Apparel · CertiPath v1.0
//         </p>
//       </footer>

//       {/* Custom Keyframes */}
//       <style jsx global>{`
//         @keyframes fadeUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         body {
//           background-color: #0a0a0a;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import GoogleIcon from "@/components/icons/GoogleIcon";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
    const { status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const error = searchParams.get("error");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    const handleGoogleLogin = async () => {
        setIsLoading(true);

        await signIn("google", {
            callbackUrl: "/",
        });

        setIsLoading(false);
    };

    if (status === "loading" || status === "authenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="w-10 h-10 border-2 border-[#C0202A] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden font-sans">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1654676066221-500d63a81951?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Login Card */}
            <div className="relative z-20 w-full max-w-[400px] backdrop-blur-xl bg-white/10 rounded-[32px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-[fadeUp_0.8s_ease-out]">
                {/* Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="px-10 py-12 flex flex-col items-center">
                    {/* Brand */}
                    <div className="mb-8 text-center">
                        <p className="text-[10px] tracking-[0.6em] text-[#C0202A] uppercase font-bold mb-2">
                            Redline Apparel
                        </p>

                        <h1 className="text-4xl tracking-[0.2em] text-white uppercase font-light">
                            CertiPath
                        </h1>

                        <p className="text-sm text-white/60 text-center leading-relaxed mb-5 font-light max-w-[280px] mt-4">
                            Securing Authenticity on Chain
                        </p>

                        <div className="h-[1px] w-12 bg-[#C0202A] mx-auto mt-4 opacity-60" />
                    </div>

                    <p className="text-sm text-white/60 text-center leading-relaxed mb-8 font-light max-w-[280px]">
                        Sign in to access your secure product verification dashboard.
                    </p>

                    {/* Error Message */}
                    {error === "AccessDenied" && (
                        <div className="w-full mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 backdrop-blur-md">
                            <p className="text-sm text-red-300 text-center font-medium">
                                Your email is not authorized to access this application.
                            </p>
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="group relative w-full flex items-center justify-center gap-4 py-4 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-gray-100 active:scale-[0.98] disabled:opacity-70 overflow-hidden shadow-xl"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <div className="transition-transform duration-300 group-hover:scale-110">
                                    <GoogleIcon />
                                </div>

                                <span className="text-xs tracking-[0.2em] font-bold uppercase">
                                    Continue with Google
                                </span>
                            </>
                        )}
                    </button>

                    {/* Footer Inside Card */}
                    <div className="mt-10 flex items-center gap-2 opacity-30">
                        <div className="w-1 h-1 bg-white rounded-full" />

                        <p className="text-[9px] tracking-[0.2em] text-white uppercase font-medium">
                            Encrypted by CertiPath Protocol
                        </p>

                        <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-20 mt-8 flex flex-col items-center gap-2">
                <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase font-medium">
                    © {new Date().getFullYear()} Redline Apparel · CertiPath v1.0
                </p>
            </footer>

            {/* Animation */}
            <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        body {
          background-color: #0a0a0a;
        }
      `}</style>
        </div>
    );
}
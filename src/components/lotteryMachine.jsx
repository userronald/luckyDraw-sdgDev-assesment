import React, { useState, useRef } from "react";

/**
 * LuckyDraw.jsx
 * Single-file React + Tailwind component for a neon arcade Lucky Draw UI.
 *
 * Usage:
 *   import LuckyDraw from "./LuckyDraw";
 *   <LuckyDraw />
 */

export default function LuckyDraw() {
  // kept a ref for cleanup if needed later (not required but safe)
  const spinTimeoutRef = useRef(null);

  // ---------- BEHAVIORAL STATES (your requested logic) ----------
  const [isSpinning, setIsSpinning] = useState(false);
  const [columns, setColumns] = useState([1, 2, 3, 4, 5, 6]);
  const [isWin, setIsWin] = useState(false);
  const [message, setMessage] = useState("");

  // fixed winning number (single digit as in your logic)
  const WIN_NUMBER = 4;

  // random fail messages
  const failMessages = [
    "Oops! Try once more!",
    "Bad luck! Spin again!",
    "Not this time!",
    "Close! Try again!",
  ];

  const randomDigit = () => Math.floor(Math.random() * 9) + 1;

  const spin = () => {
    if (isSpinning) return;

    // start: reset previous states
    setIsSpinning(true);
    setIsWin(false);
    setMessage("");

    // spinning animation: shuffle digits quickly
    const shuffleInterval = setInterval(() => {
      setColumns([
        randomDigit(),
        randomDigit(),
        randomDigit(),
        randomDigit(),
        randomDigit(),
        randomDigit(),
      ]);
    }, 100);

    // stop spinning after 3 seconds
    spinTimeoutRef.current = setTimeout(() => {
      clearInterval(shuffleInterval);

      const finalNumbers = [
        randomDigit(),
        randomDigit(),
        randomDigit(),
        randomDigit(),
        randomDigit(),
        randomDigit(),
      ];

      setColumns(finalNumbers);

      // WIN LOGIC: if any column contains WIN_NUMBER
      if (finalNumbers.includes(WIN_NUMBER)) {
        // When win: set isWin true, but DO NOT set the small result message.
        // The top CONGRATULATION block will appear (wrapped with isWin).
        setIsWin(true);
        setMessage(""); // ensure small red text area stays empty on win
      } else {
        // When lose: isWin false and show a fail message in the result area.
        setIsWin(false);
        setMessage(
          failMessages[Math.floor(Math.random() * failMessages.length)]
        );
      }

      setIsSpinning(false);
    }, 3000);
  };

  // cleanup if unmounted
  React.useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, []);

  // ---------- MARKUP (UI unchanged, only dynamic bits replaced) ----------
  return (
    <div>
      {/* Neon background extras */}
      {/* Top Purple Arch */}
      {/* Top Purple Arch */}

      {/* Top Purple Arch – stretched, endpoints at top, thin main line + glow */}
      <svg
        className="absolute top-0 left-0 w-full h-40 z-5 pointer-events-none"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="purpleGlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#a020f0" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#d080ff" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#a020f0" stopOpacity="0.18" />
          </linearGradient>

          {/* soft blur for outer glow */}
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* extra stronger blur for halo */}
          <filter id="halo" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="18" result="bigBlur" />
            <feMerge>
              <feMergeNode in="bigBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* THIN crisp center line */}
        <path
          d="M100 0 C450 120 750 120 1100 0"
          fill="none"
          stroke="url(#purpleGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Main card */}
      <div className="relative w-full max-w-8xl mx-auto">
        {/* Top accent glow */}
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full blur-3xl opacity-40"
          style={{
            background: "linear-gradient(90deg,#00f0ff,#6a00ff,#ff7af0)",
          }}
        />

        <div className="relative z-10 px-6 md:px-12 py-28 rounded-3xl overflow-visible">
          {/* Headline */}
          <div className="text-center mb-6">
            {/* -------------------------
                WRAPPED: Top CONGRATULATION + 1st Prize
                — SHOW ONLY WHEN isWin === true
               ------------------------- */}
            {isWin && (
              <div className="relative inline-block">
                {/* upper comet line */}
                <svg
                  className="w-[520px] h-6 -mt-6 mx-auto block"
                  viewBox="0 0 520 24"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="lineGradTop" x1="0" x2="1">
                      <stop offset="0" stopColor="#00f0ff" stopOpacity="0.14" />
                      <stop offset="0.5" stopColor="#7af" stopOpacity="0.32" />
                      <stop offset="1" stopColor="#9f6bff" stopOpacity="0.14" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M10 12 C170 2 350 22 510 12"
                    stroke="url(#lineGradTop)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* comet */}
                  <circle
                    className="comet"
                    r="5"
                    cx="0"
                    cy="12"
                    fill="#cfffff"
                  />
                  <defs>
                    <filter id="glowComet">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <style>{`
                    .comet { filter: url(#glowComet); transform-origin: 0 0; animation: cometMoveTop 3.8s linear infinite; }
                    @keyframes cometMoveTop {
                      0% { transform: translateX(-20px) scale(0.8); opacity: 0; }
                      6% { opacity: 1; }
                      50% { transform: translateX(520px) scale(1.0); opacity: 1; }
                      100% { transform: translateX(540px) scale(0.8); opacity: 0; }
                    }
                  `}</style>
                </svg>

                <h1
                  className="tracking-widest uppercase text-[62px] md:text-5xl font-extrabold"
                  style={{
                    letterSpacing: "6px",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(120,250,255,0.9)",
                    textShadow:
                      "0 0 10px rgba(59,240,255,0.85), 0 0 28px rgba(90,30,200,0.45), 0 4px 24px rgba(0,0,0,0.6)",
                    fontFamily: "RapidoRacersTwo",
                  }}
                >
                  <span
                    style={{
                      color: "#bffcff",
                      textShadow: "0 0 32px rgba(59,240,255,0.9)",
                      fontSize: "74px",
                    }}
                  >
                    CONGRATULATION
                  </span>
                </h1>

                {/* lower comet line */}
                <svg
                  className="w-[520px] h-4 mt-2 mx-auto block"
                  viewBox="0 0 520 18"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10 8 C170 18 350 -2 510 8"
                    stroke="rgba(90,200,255,0.18)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle
                    className="comet2"
                    r="4"
                    cx="0"
                    cy="8"
                    fill="#8fe8ff"
                  />
                  <style>{`
                    .comet2 { filter: blur(6px); animation: cometMoveBottom 4.4s linear infinite; }
                    @keyframes cometMoveBottom {
                      0% { transform: translateX(-20px); opacity: 0; }
                      10% { opacity: 1; }
                      60% { transform: translateX(540px); opacity: 1; }
                      100% { transform: translateX(560px); opacity: 0; }
                    }
                  `}</style>
                </svg>

                <div className="mt-5 select-none">
                  <span className="prize-text uppercase tracking-wider">
                    1st Prize
                  </span>

                  <style>
                    {`
      /* Import Rapido Racers font */
      @font-face {
        font-family: 'RapidoRacers';
        src: url('/fonts/RapidoRacers-nR8J0.otf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }

      .prize-text {
        font-family: 'RapidoRacers', sans-serif;
        font-size: 2.2rem; /* bigger text */
        font-weight: 800;
        letter-spacing: 2px;
        animation: prizePulse 1.8s infinite ease-in-out;
        display: inline-block;
      }

      @keyframes prizePulse {
        0% {
          color: #ffffff;
     
        }
        50% {
          color: #ff1e1e;
         
        }
        100% {
          color: #ffffff;
     
        }
      }
    `}
                  </style>
                </div>
              </div>
            )}
          </div>

          {/* Pillars row */}
          <div className="w-full flex justify-center items-end">
            <div className="w-full max-w-6xl">
              <div className="flex justify-between gap-4 md:gap-6 px-4 md:px-8">
                {columns.map((num, idx) => {
                  // use isSpinning and isWin for classes as per your snippet
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center"
                    >
                      {/* pillar */}
                      <div
                        className={`
                          relative max-w-[86px] md:max-w-[110px] aspect-[0.7/1] overflow-visible transform-gpu transition-all duration-400
                          w-28 h-44 rounded-xl border border-[#e100ff] 
                          bg-[rgba(40,0,70,0.2)] backdrop-blur-xl 
                          flex items-center justify-center text-5xl font-bold
                          text-[#7df3ff] shadow-[0_0_35px_#e100ff]
                          ${isSpinning ? "animate-spinSlow opacity-60" : ""}
                          ${
                            isWin && num === WIN_NUMBER
                              ? "animate-glowWin scale-110"
                              : ""
                          }
                        `}
                        style={{
                          filter: "drop-shadow(0 8px 22px rgba(20,10,40,0.22))",
                          zIndex: 10,
                        }}
                      >
                        {/* Glass pillar with inner gradient (kept) */}
                        <div
                          className="absolute inset-0 rounded-xl border border-transparent"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(150,120,255,0.02))",
                            boxShadow: "inset 0 -10px 30px rgba(10,5,20,0.2)",
                          }}
                        />

                        {/* displayed number */}
                        <div className="relative z-20 h-full flex items-center justify-center">
                          <div
                            className="text-4xl md:text-6xl font-extrabold tracking-wide"
                            style={{
                              color: "#9fe8ff",
                              textShadow: "0 0 14px rgba(0,180,220,0.28)",
                            }}
                          >
                            {num}
                          </div>
                        </div>

                        {/* scanline */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                          <div
                            className="h-[30%] w-full absolute top-[10%] left-0 opacity-10 animate-scanline"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02), rgba(255,255,255,0.04))",
                            }}
                          />
                        </div>
                      </div>

                      {/* base stage ellipse */}
                      <div className="mt-3 w-full flex justify-center">
                        <div
                          className="w-32 md:w-40 h-12 relative"
                          style={{
                            background:
                              "linear-gradient(to bottom, #3a0ca3, #2d0a6b 70%, #1c063f)",
                            border: "2px solid #a020f0",
                            borderRadius: "18px 18px 6px 6px",
                            boxShadow: `
      0 8px 20px rgba(20, 5, 50, 0.6),          /* Outer Drop Shadow */
      inset 0 3px 6px rgba(255, 255, 255, 0.15), /* Top Inner Highlight */
      inset 0 -3px 6px rgba(0, 0, 0, 0.45),      /* Bottom Inner Shadow */
      inset 0 -10px 18px rgba(160, 32, 240, 0.25) /* Purple Glow Plate */
    `,
                          }}
                        >
                          <div
                            className="absolute inset-0 rounded-full opacity-30 blur-sm"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(0,255,200,0.06), rgba(120,60,255,0.07))",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result text + instructions */}
          <div className="mt-8 text-center">
            {isSpinning ? (
              <div className="text-sm md:text-base text-[#bdefff] tracking-wide">
                Spinning... Good luck!
              </div>
            ) : (
              <div
                className="text-lg md:text-xl font-semibold uppercase"
                style={{
                  color: "#dffcff",
                  textShadow: "0 0 18px rgba(40,240,255,0.18)",
                }}
              >
                <span
                  style={{
                    color: isWin ? "#ff6b6b" : "#dffcff",
                    transition: "color 220ms",
                  }}
                >
                  {/* show fail message OR hint text only when NOT a win.
                      When isWin === true we intentionally render an empty string
                      so the small red congratulation near result area does not appear. */}
                  {!isWin ? message || "Press SPIN to try your luck" : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Panel base and Spin button area */}
        <div className="relative mt-24 w-full flex justify-center items-center">
          {/* 🔮 NEW DARK PURPLE SIDE PANELS */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full px-8">
            <div
              className="w-full h-20 rounded-2xl"
              style={{
                background:
                  "linear-gradient(90deg, rgba(40,0,70,0.85), rgba(80,0,120,0.92), rgba(40,0,70,0.85))",
                boxShadow:
                  "0 0 40px rgba(140,0,255,0.35), inset 0 0 15px rgba(90,0,160,0.45)",
                border: "2px solid rgba(150,0,255,0.55)",
              }}
            ></div>
          </div>

          {/* SPIN BUTTON */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-50">
            <button
              onClick={spin}
              disabled={isSpinning}
              aria-pressed={isSpinning}
              className="relative select-none rounded-[22px] overflow-visible px-14 py-5 transition-all active:scale-95 border-none outline-none group"
              style={{
                boxShadow:
                  "0 2px 24px 8px #4aefff38, 0 4px 32px #6a00ff88, inset 0 2px 10px #ab4fff44, 0 1px 0 #39f5ff",
                background: "linear-gradient(180deg,#2b0b45 65%,#1c062d 100%)",
                border: "3px solid #73f7ff",
                minWidth: "230px",
                minHeight: "68px",
              }}
            >
              {/* Glowing outer ring */}
              <div
                className="absolute -inset-2 rounded-[22px] blur-lg opacity-80 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle,#76ffff33 40%,#5a33ff11 100%,transparent)",
                  zIndex: 0,
                }}
              />

              <span
                className="relative z-10 font-extrabold uppercase tracking-widest"
                style={{
                  color: "#39f5ff",
                  fontSize: "1.9rem",
                  letterSpacing: "0.14em",
                  textShadow:
                    "0 0 16px #3bfcff, 0 1.5px 0 #fff, 0 0 24px #7afff9, 0 4px 12px #32004a",
                  filter: "brightness(1.16)",
                }}
              >
                {isSpinning ? "SPINNING..." : "SPIN"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Inline neon utilities and animations */}
      <style>{`
        @layer utilities {
          .blur-3xl { filter: blur(36px); }
        }

        /* scanline animation */
        @keyframes scan {
          0% { transform: translateY(-30%); opacity: 0.04; }
          50% { transform: translateY(30%); opacity: 0.12; }
          100% { transform: translateY(130%); opacity: 0.02; }
        }
        .animate-scanline { animation: scan 3.6s linear infinite; }

        /* neon pulse for active number */
        @keyframes neonPulse {
          0% { text-shadow: 0 0 14px rgba(0,200,255,0.5), 0 8px 22px rgba(60,10,160,0.25); transform: translateY(0); }
          50% { text-shadow: 0 0 30px rgba(0,240,255,0.9), 0 18px 40px rgba(90,10,200,0.32); transform: translateY(-4px) scale(1.02); }
          100% { text-shadow: 0 0 14px rgba(0,200,255,0.5), 0 8px 22px rgba(60,10,160,0.25); transform: translateY(0); }
        }
        .animate-neonPulse { animation: neonPulse 1.6s ease-in-out infinite; }

        /* slow spin visual (keeps UI feeling alive while shuffling) */
        @keyframes spinSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .animate-spinSlow { animation: spinSlow 0.25s linear infinite; }

        /* win glow animation for the winning box */
        @keyframes glowWin {
          0% { box-shadow: 0 0 10px rgba(255, 100, 100, 0.2), 0 0 0 rgba(255,100,100,0); transform: scale(1); }
          50% { box-shadow: 0 0 28px rgba(255, 80, 80, 0.9), 0 0 10px rgba(255,150,150,0.2); transform: scale(1.06); }
          100% { box-shadow: 0 0 10px rgba(255, 100, 100, 0.2), transform: scale(1); }
        }
        .animate-glowWin { animation: glowWin 1.2s ease-in-out infinite; }

        /* utility for subtle motion on heading (optional) */
        @keyframes floaty {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-4px) }
          100% { transform: translateY(0px) }
        }
        .floaty { animation: floaty 5s ease-in-out infinite; }

        /* responsive tweaks */
        @media (max-width: 700px) {
          h1 { font-size: 20px !important; }
          .comet, .comet2 { display: none; } /* hide heavy svg anims on small screens to preserve perf */
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from "react";

const LotteryMachine=()=>{

    const [isSpinning, setIsSpinning] = useState(false);
    const [columns, setColumns] = useState([1, 2, 3, 4, 5, 6]);
    const [isWin, setIsWin] = useState(false);
    const [message, setMessage] = useState("");

    // fixed winning number
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

      setIsSpinning(true);
      setIsWin(false);
      setMessage("");

      // spinning animation
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

      // stop spinning
      setTimeout(() => {
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

        // WIN LOGIC
        if (finalNumbers.includes(WIN_NUMBER)) {
          setIsWin(true);
          setMessage("CONGRATULATION!");
        } else {
          setIsWin(false);
          setMessage(
            failMessages[Math.floor(Math.random() * failMessages.length)]
          );
        }

        setIsSpinning(false);
      }, 3000);
    };

    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="relative w-[900px] rounded-lg p-6 overflow-hidden text-center">
          {/* Message Section */}
          <h1
            className={`
          text-5xl font-extrabold tracking-widest mb-3
          ${
            isWin
              ? "text-neonCyan drop-shadow-[0_0_25px_#00eaff]"
              : "text-red-400"
          }
        `}
          >
            {message}
          </h1>

          {/* 1st Prize Text */}
          {isWin && (
            <h2 className="text-3xl font-bold animate-colorPulse">1st Prize</h2>
          )}

          {/* Number Bars */}
          <div className="flex justify-center gap-8 mt-8">
            {columns.map((num, index) => (
              <div
                key={index}
                className={`
              w-24 h-40 rounded-xl border-2 border-[#00b3ff] 
              bg-[rgba(40,0,70,0.45)] backdrop-blur-xl 
              flex items-center justify-center text-5xl font-bold
              text-[#7df3ff] shadow-[0_0_35px_#00aaff]
              ${isSpinning ? "animate-spinSlow opacity-60" : ""}
              ${isWin && num === WIN_NUMBER ? "animate-glowWin scale-110" : ""}
            `}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Spin Button */}
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`
          mt-10 px-16 py-4 rounded-2xl text-3xl font-bold 
          bg-linear-to-b from-[#5a00c8] to-[#2d005e]
          border-4 border-[#c45bff]
          text-yellow-300 shadow-[0_0_35px_#c700ff]
          hover:shadow-[0_0_45px_#ff00ff]
          transition-all duration-200
          ${isSpinning ? "opacity-40 cursor-not-allowed" : ""}
        `}
          >
            SPIN
          </button>
        </div>
      </div>
    );
     
}

export default LotteryMachine;
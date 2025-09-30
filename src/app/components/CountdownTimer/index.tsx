'use client'

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const total = Math.floor((targetDate.getTime() - new Date().getTime()) / 1000);
  const safeTotal = Math.max(0, total);

  const days = Math.floor(safeTotal / (60 * 60 * 24));
  const hours = Math.floor((safeTotal % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((safeTotal % (60 * 60)) / 60);
  const seconds = safeTotal % 60;

  return { days, hours, minutes, seconds, total: safeTotal };
}

export default function CountdownTimer({
  targetDate,
  message = "¡El tiempo ha terminado!",
}: {
  targetDate: Date;
  message?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => {
      const newTime = getTimeLeft(targetDate);
      setTimeLeft(newTime);
    };

    update(); // primer valor al montar

    const interval = setInterval(() => {
      update();
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Mientras aún no se monta el cliente, no renderizar nada para evitar hydration mismatch
  if (!timeLeft) return null;

  if (timeLeft.total <= 0) {
    return (
      <div className="text-center">
        <p className="text-2xl font-semibold text-red-500">{message}</p>
      </div>
    );
  }

  const units = [
    { label: "Días", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <section className="py-[120px] px-[15px] Timer">
      <p className="text-[60px] font-high-spirited text-black leading-[60px] mt-[50px] mb-[20px]">Faltan</p>
      <div data-aos="fade-up" data-aos-duration="1500" className="flex items-center justify-center max-w-[351px] w-full mx-auto mb-[10px]">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center min-w-[80px]">
            <div className="text-[28px] md:text-[35px] leading-[28px] md:leading-[35px] text-black">
              {String(value).padStart(2, "0")}
            </div>
            <span className="text-[12px] md:text-[20px] leading-[24px] md:leading-[30px] text-black">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-[60px] font-high-spirited text-black leading-[60px] mb-[50px]">para empezar el mejor viaje de nuestras vidas</p>
    </section>
  );
}

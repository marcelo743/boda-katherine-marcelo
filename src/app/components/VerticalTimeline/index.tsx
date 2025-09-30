"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const timelineData = [
  { hour: "05:30 PM", text: "Ceremonia Religiosa", image: "/church.png" },
  { hour: "07:30 PM", text: "Brindis", image: "/cups.png" },
  { hour: "09:00 PM", text: "Celebración", image: "/dishes.png" },
  { hour: "10:00 PM", text: "A bailar", image: "/dance.png" },
];

export default function ScrollTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [iconVisibleIndexes, setIconVisibleIndexes] = useState<number[]>([]);
  const [progressHeightPx, setProgressHeightPx] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elIndex = parseInt(
            entry.target.getAttribute("data-index") || "-1"
          );
          if (entry.isIntersecting && elIndex !== -1) {
            setVisibleIndexes((prev) =>
              prev.includes(elIndex) ? prev : [...prev, elIndex]
            );
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 1 }
    );

    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      setIconVisibleIndexes((prev) => {
        let newVisible = [...prev];
        entries.forEach((entry) => {
          const elIndex = parseInt(entry.target.getAttribute("data-icon-index") || "-1");
          if (elIndex === -1) return;
          if (entry.isIntersecting) {
            if (!newVisible.includes(elIndex)) newVisible.push(elIndex);
          } else {
            newVisible = newVisible.filter((idx) => idx !== elIndex);
          }
        });
        return newVisible;
      });
    },
    {
      root: null,
      rootMargin: "20px",
      threshold: 1,  // Detecta cuando 10% está visible
    }
  );

  const iconItems = timelineRef.current?.querySelectorAll(".timeline-icon-item");
  iconItems?.forEach((item) => observer.observe(item));

  return () => observer.disconnect();
}, []);


  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = 942;
      if (rect.bottom < 0 || rect.top > windowHeight) {
        setProgressHeightPx(0);
        return;
      }

      const visibleTop = Math.min(
        Math.max(0, windowHeight - (rect.top + 300)),
        totalHeight
      );

      setProgressHeightPx(visibleTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section>
      <h2 data-aos="fade-down" className="text-[20px] md:text-[21px] tracking-[1px] text-black leading-[30px] md:leading-[31.5px] w-full max-w-[285px] md:max-w-[318px] mx-auto text-center mb-[75px] md:mb-[95px]">
        Te compartimos los detalles de la celebración
      </h2>
      <div
        className="relative max-w-3xl mx-auto"
        ref={timelineRef}
      >
        <div className="relative z-10 w-full max-w-[350px] mx-auto">
          <div
            className="line absolute transform -translate-x-1/2 w-1 bg-[#F1EDE7] top-[10%]"
            style={{ height: 942 }}
          >
            <div
              className="absolute top-0 w-1 bg-[#BBD3B1] transition-all ease-in left-0"
              style={{ height: progressHeightPx }}
            />
          </div>
          {timelineData.map((item, index) => {
            const isVisible = visibleIndexes.includes(index);
            const isIconVisible = iconVisibleIndexes.includes(index);

            return (
              <div
                key={index}
                className="mb-[65px] flex flex-col items-center text-center"
              >
                <div className="flex flex-row items-center w-full max-w-[350px]">
                  <div className="timeline-icon-item" data-icon-index={index}>
                    <div
                      className={`relative w-[60px] h-[60px] min-w-[60px] rounded-full flex items-center justify-center transition-colors ${
                        isIconVisible ? "bg-[#BBD3B1]" : "bg-[#F1EDE7] duration-3000"
                      }`}
                    >
                      <i className="fa-regular fa-heart text-white text-[20px]" />
                    </div>
                  </div>
                  <div
                    data-index={index}
                    className={`timeline-item w-full max-w-[230px]`}
                  >
                    <div
                      className={`transition-opacity duration-1000 transform ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-12"
                      }`}
                    >
                      <p className="text-[18px] md:text-[19px] text-black tracking-[1px] leading-[22.8px] mb-[13px] md:mb-2.5">
                        {item.hour}
                      </p>
                      <h3 className="font-high-spirited text-[50px] text-black leading-[50px] tracking-[-0.5px] w-full max-w-[130px] mx-auto">
                        {item.text}
                      </h3>
                    </div>
                    <Image
                      className="mx-auto"
                      width={152}
                      height={152}
                      src={item.image}
                      alt={item.text}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

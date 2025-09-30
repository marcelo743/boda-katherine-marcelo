"use client";

import { use, useState } from "react";
import { Suspense } from 'react';
import CountdownTimer from "./components/CountdownTimer";
import ScrollTimeline from "./components/VerticalTimeline";
import Image from "next/image";
import Foreword from "./components/Foreword";
import Inspiration from "./components/Inspiration";
import Families from "./components/Families";
import WeddingInfo from "./components/WeddingInfo";
import Gallery from "./components/Gallery";
import Acknowledgments from "./components/Acknowledgments";
import WeddingDetails from "./components/WeddingDetails";
import GuestList from "./components/GuestList";
import FloatingMusicButton from "./components/FloatingMusicButton";
import { useGuest } from "../hooks/useGuest";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function Home({ searchParams }: Props) {
  const params = use(searchParams);
  const { invitation, ...guestProps } = useGuest(params.invitationId  as string || undefined);
  const [showSplash, setShowSplash] = useState(true);
  const targetDate = new Date("2025-11-15T17:30:00");

  const handleSplashClick = () => {
    setShowSplash(false);
  };

  return (
    <Suspense fallback={null}>
      {showSplash || (invitation?.guest.length ?? 0) === 0 ? (
        <div className="container relative">
          <div
            className="fixed inset-0 z-50 bg-transparent flex items-center justify-center"
            onClick={handleSplashClick}
          >
            <div className="relative w-full max-w-[500px] h-screen cursor-pointer shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
              <Image
                src="/icono-sobre.png"
                alt="Splash"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 500px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      ) : (
        <main>
          <div className="container border-x-[#B4A180] border-x-[1px]">
            <Foreword />
            <Inspiration/>
            <Families />
            <CountdownTimer
              targetDate={targetDate}
              message="🎉 ¡Cuenta regresiva finalizada!"
            />
            <WeddingInfo />
            <ScrollTimeline />
            <GuestList guests={invitation?.guest ?? []} familyName={invitation?.title ?? ""} {...guestProps}/>
            <WeddingDetails />
            <Inspiration
              text="Etiqueta las fotos de nuestra boda con este hashtag"
              fallbackText="#katherineyjuan"
            />
            <Acknowledgments />
            <Gallery />
            <FloatingMusicButton />
          </div>
        </main>
      )}
    </Suspense>
  );
}

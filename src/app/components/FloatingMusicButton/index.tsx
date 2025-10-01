"use client";

import { useWindowFocus } from "@/hooks/useWindowFocus";
import { useRef, useState, useEffect } from "react";

export default function FloatingMusicButton() {
  const { hasFocus, isVisible, isActive } = useWindowFocus();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(!isPlaying) return;

    if(hasFocus || isVisible || isActive) {
      playSong(false);
    } else {
      playSong(true);
    }
  }, [hasFocus, isVisible, isActive])

  const playSong = (play: boolean) => {
    if (!audioRef.current) return;

    if (play) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // No mostrar error para evitar spam en consola
        });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // No mostrar error para evitar spam en consola
        });
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }

    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Si el autoplay es bloqueado, esperar primera interacción
        const enableAudio = () => {
          togglePlay();
          document.removeEventListener("click", enableAudio);
          document.removeEventListener("scroll", enableAudio);
        };

        document.addEventListener("click", enableAudio, { once: true });
        document.addEventListener("scroll", enableAudio, { once: true });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed bottom-0 right-[5px] w-full max-w-[98.5%] md:max-w-[500px] z-10 left-0 mx-auto flex justify-end">
      <audio ref={audioRef} src="/music/BTS_MUSIC_VIOLIN.mp3" loop />
      <button
        onClick={togglePlay}
        className="z-[1] w-[56px] h-[56px] min-w-[56px] bg-[#AE9366] text-white rounded-full p-4"
      >
        <i className={`${isPlaying ? "fas fa-pause" : "fa-solid fa-music"}`} />
      </button>
    </div>
  );
}

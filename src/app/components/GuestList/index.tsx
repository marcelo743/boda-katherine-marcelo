"use client";

import { GuestDTO } from "@/types/guest.dto";
import { sameStringSet } from "@/utils/helper";
import React from "react";

interface GuestListProps {
  submitted: boolean;
  confirmedIds: string[];
  guests: GuestDTO[];
  loading: boolean;
  familyName: string;
  handleCheckboxChange: (id: string) => void;
  handleSubmit: () => void;
  alreadyConfirmedGuestIds: string[];
}

export default function GuestList(props: GuestListProps) {
  const { 
    submitted,
    confirmedIds,
    loading,
    guests,
    familyName,
    handleCheckboxChange,
    handleSubmit,
    alreadyConfirmedGuestIds
  } = props;

  return (
    <section className="pb-[60px] px-[15px] md:px-[0px]">
      <div className="bg-[#E7EEEB] border-double border-2 border-[#AE9366] py-[50px]  px-[20px] md:px-[30px] max-w-full md:max-w-[434px] mx-auto shadow-[-10px_10px_10px_0px_rgba(0,0,0,0.6)]">
        <h2 className="text-center font-high-spirited text-[55px] md:text-[60px] text-black tracking-normal md:tracking-[1px] leading-[66px] md:leading-[60px] mb-[35px] md:mb-[40px]">Invitación para:</h2>
        <h3 className="text-center text-[20px] md:text-[24px] text-black leading-[30px] md:leading-[31.2px] tracking-[0.5px] mb-[35px] md:mb-[30px]">{familyName}</h3>
          {submitted && (
          <p data-aos="fade-down" data-aos-duration="1500" className="text-center text-[21px] text-black italic leading-[21px] mt-[40px] mb-[35px]">
             Se {confirmedIds.length === 1 ? "confirmó" : "confirmaron"} {confirmedIds.length} {confirmedIds.length === 1 ? "asistencia" : "asistencias"}
          </p>
        )}
        <ul className="mb-[25px]">
          {guests.map((guest) => (
            <li key={guest.id} className="flex items-center mb-[5px]">
              <input
                className="mr-[5px] w-[13px] h-[13px] text-black"
                type="checkbox"
                checked={confirmedIds.includes(guest.id)}
                onChange={() => handleCheckboxChange(guest.id)}
                id={guest.id}
              />
              <label className="text-[18px] md:text-[19px] text-black leading-[23.4px] md:leading-[28.5px]" htmlFor={guest.id}>{guest.first_name + " " + guest.last_name}</label>
            </li>
          ))}
        </ul>
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={loading || sameStringSet(confirmedIds, alreadyConfirmedGuestIds)}
            className={`cursor-pointer w-full text-white transition uppercase max-w-[186px] md:max-w-[192px] py-[10px] px-[20px] text-[17px] md:text-[18px]  ${sameStringSet(confirmedIds, alreadyConfirmedGuestIds) ? "bg-[#BBD3B1]" : "bg-[#8A9A5B]"} tracking-[5px] font-light mx-auto block`}
          >
            {loading ? "Enviando..." : "Confirmar"}
          </button>
        )}
      </div>
    </section>
  );
}

"use client"

import { useEffect, useState } from "react";
import { getInvitation } from "../services/invitation.services";
import { HttpStatusCode } from "axios";
import { InvitationDTO } from "@/types/invitation.dto";

export function useGuest(invitationId?: string) {

    const [confirmedIds, setConfirmedIds] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [invitation, setInvitation] = useState<InvitationDTO | null>(null);

    const handleCheckboxChange = (id: string) => {
        setConfirmedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if(!invitationId) return;
        
        getInvitation(invitationId)
        .then((response) => {
           if(response.error != null && response.status != HttpStatusCode.Ok) return;

           console.log("response.data", response.data);
           setInvitation(response.data)
        });
    }, [invitationId])

    const handleSubmit = async () => {
        setLoading(true);
        setSubmitted(false);

        try {
        const result = await sendConfirmedGuests(confirmedIds);
        console.log("Respuesta del servidor:", result);
        setSubmitted(true);
        } catch (error) {
        console.error("Error al enviar datos:", error);
        } finally {
        setLoading(false);
        }
    };

    const sendConfirmedGuests = async (confirmedIds: string[]) => {
        console.log('confirmedIds', confirmedIds)
    };

    return {
        submitted,
        confirmedIds,
        invitation,
        loading,
        handleCheckboxChange,
        handleSubmit
    }
}
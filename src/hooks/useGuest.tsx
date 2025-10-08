"use client"

import { useEffect, useState } from "react";
import { getInvitation, sendConfirmedGuests, setInvitationSeen } from "../services/invitation.services";
import { HttpStatusCode } from "axios";
import { InvitationDTO } from "@/types/invitation.dto";
import { useAppNavigation } from "./useNavigation";
import { useUserSupabase } from "./useUserSupabase";

export function useGuest(invitationId?: string) {
    const { user, userLoading} = useUserSupabase();
    const { replace } = useAppNavigation();
    const [confirmedIds, setConfirmedIds] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [invitation, setInvitation] = useState<InvitationDTO | null>(null);
    const [alreadyConfirmedGuestIds, setAlreadyConfirmedGuestIds] = useState<string[]>([]);

    const handleCheckboxChange = (id: string) => {
        setConfirmedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );

        if(submitted) {
            setSubmitted(prev => !prev);
        }
    };

    useEffect(() => {
        // update invitation seen
        updateInvitationSeen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invitationId, user, userLoading]);

    useEffect(() => {
        if(!invitationId) {
            return replace('/admin');
        };
        
        getInvitation(invitationId)
        .then((response) => {
           if(response.error != null && response.status != HttpStatusCode.Ok) return;

           const confirmGuestIds = response.data?.guest.filter(x => x.confirmed).map(x => x.id) ?? []
           setInvitation(response.data)
           setConfirmedIds(confirmGuestIds);
           setAlreadyConfirmedGuestIds(confirmGuestIds);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invitationId]);

    const handleSubmit = async () => {
        setLoading(true);
        setSubmitted(false);

        try {
            await sendConfirmedGuests(confirmedIds, invitationId ?? "");
            setSubmitted(true);
            setAlreadyConfirmedGuestIds(confirmedIds);
        } catch (error) {
            console.error("Error al enviar datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateInvitationSeen = async () => {
        if(user !== null || userLoading) return;

        try {
            await setInvitationSeen(invitationId ?? "");
        } catch (error) {
            console.error("Error al enviar datos:", error);
        }
    };

    return {
        submitted,
        confirmedIds,
        invitation,
        loading,
        handleCheckboxChange,
        handleSubmit,
        alreadyConfirmedGuestIds
    }
}
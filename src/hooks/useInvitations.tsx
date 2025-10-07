"use client"

import { getInvitationGuest } from "@/services/invitation.services";
import { GetAllInvitations } from "@/services/invitations.services";
import { GuestDTO } from "@/types/guest.dto";
import { InvitationRow } from "@/types/invitationTable";
import { useEffect, useState } from "react";

export function useUseInvitations() {
    const [invitations, setInvitations] = useState<InvitationRow[]>([]);
    const [invitationLength, setInvitationLength] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [invitationSelected, setInvitationSelected] = useState<InvitationRow | null>(null);
    const [guests, setGuests] = useState<GuestDTO[]>([]);

    useEffect(() => {
        GetAllInvitations().then((response) => {
            setInvitations(response ?? []);
            setInvitationLength(response.length);
        });
    }, []);

    useEffect(() => {
        if(invitationSelected == null) return;
        setGuests([]);

        getInvitationGuest(invitationSelected.id).then((response) => {
            const { data } = response;

            setGuests(data ?? []);
        })
    }, [invitationSelected])

    return {
        invitations,
        invitationLength,
        drawerOpen,
        setDrawerOpen,
        invitationSelected,
        setInvitationSelected,
        guests
    };
}
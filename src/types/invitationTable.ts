import type React from "react";

export interface InvitationRow {
  id: string;
  title: string;
  seen: boolean;
  invitationUrl: string;
}

export type ActionKey = "editInvitation" | "editGuest" | "viewGuests" | "copyLink" | "viewInvitation";

export interface InvitationsTableProps {
  rows: InvitationRow[];
  onCopy?: (row: InvitationRow) => void | Promise<void>;
  onViewGuests?: (row: InvitationRow) => void;
  onEditInvitation?: (row: InvitationRow) => void;
  onEditGuest?: (row: InvitationRow) => void;
  onViewInvitation?: (row: InvitationRow) => void;
  className?: string;
  disableActions?:
    | Partial<Record<ActionKey, boolean>>
    | ((row: InvitationRow) => Partial<Record<ActionKey, boolean>>);
  disabledReason?:
    | Partial<Record<ActionKey, string>>
    | ((row: InvitationRow) => Partial<Record<ActionKey, string>>);
}

export type Placement = "top" | "bottom";

export interface MenuPosition {
  top: number;
  left: number;
  maxHeight: number;
  placement: Placement;
}

export type KebabItem = {
  key: ActionKey;
  label: string;
  icon: React.ReactNode;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  reason?: string;
};
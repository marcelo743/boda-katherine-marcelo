"use client";

import React, { MouseEvent as ReactMouseEvent, useMemo, useRef, useState } from "react";
import { MoreHorizontal, Users, Edit3, Copy } from "lucide-react";
import { Pill } from "./Pill";
import { KebabPortal } from "./KebabPortal";
import { useToast } from "@/hooks/useToast";
import { cx } from "@/utils/helper";
import type { InvitationRow, InvitationsTableProps, KebabItem, ActionKey } from "@/types/invitationTable";

export default function InvitationsTable({
  rows,
  onCopy,
  onViewGuests,
  onEditInvitation,
  onEditGuest,
  className,
  disableActions,
  disabledReason,
}: InvitationsTableProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const anchors = useRef(new Map<string, HTMLElement | null>());

  const setEl = (key: string) => (el: HTMLDivElement | null): void => {
    if (anchors) anchors.current.set(key, el);
  };
    const { push, node: toastNode } = useToast();

  const resolveDisable = (row: InvitationRow): Partial<Record<ActionKey, boolean>> =>
    typeof disableActions === "function" ? disableActions(row) : (disableActions ?? {});

  const resolveReason = (row: InvitationRow): Partial<Record<ActionKey, string>> =>
    typeof disabledReason === "function" ? disabledReason(row) : (disabledReason ?? {});

  const buildItems = useMemo(
    () => (row: InvitationRow): KebabItem[] => {
      const dis = resolveDisable(row);
      const why = resolveReason(row);

      const handleCopy = async () => {
        try {
          if (onCopy) {
            await onCopy(row);
          } else {
            await navigator.clipboard.writeText(row.invitationUrl);
          }
          push("Enlace de invitación copiado");
        } catch {
          push("No se pudo copiar el enlace");
        }
      };

      return [
        {
          key: "editInvitation",
          label: "Editar invitación",
          icon: <Edit3 className="h-4 w-4" />,
          onClick: () => onEditInvitation?.(row),
          disabled: !!dis.editInvitation,
          reason: why.editInvitation,
        },
        {
          key: "editGuest",
          label: "Editar invitado",
          icon: <Users className="h-4 w-4" />,
          onClick: () => onEditGuest?.(row),
          disabled: !!dis.editGuest,
          reason: why.editGuest,
        },
        {
          key: "viewGuests",
          label: "Ver invitados",
          icon: <Users className="h-4 w-4" />,
          onClick: () => onViewGuests?.(row),
          disabled: !!dis.viewGuests,
          reason: why.viewGuests,
        },
        {
          key: "copyLink",
          label: "Copiar enlace de invitación",
          icon: <Copy className="h-4 w-4" />,
          onClick: handleCopy,
          disabled: !!dis.copyLink,
          reason: why.copyLink,
        },
      ];
    },
    [onCopy, onViewGuests, onEditInvitation, onEditGuest, disableActions, disabledReason, push]
  );

  const onToggleKebab = (e: ReactMouseEvent, id: string) => {
    e.stopPropagation();
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <>
      {/* Toast container */}
      {toastNode}

      <div
        className={cx(
          "w-full max-w-full rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm",
          "max-h-[75vh] overflow-y-auto",
          "overflow-x-auto md:overflow-x-hidden",
          className
        )}
      >
        <table className="min-w-[720px] md:min-w-full table-fixed text-sm">
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "38%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "12%" }} />
          </colgroup>

          <thead className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur">
            <tr className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3 text-left">Id</th>
              <th className="px-4 py-3 text-left">Título</th>
              <th className="px-4 py-3 text-left">Visto</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => {
              const items = buildItems(row);
              const isOpen = openId === row.id;

              return (
                <tr key={row.id} className={cx("border-t border-slate-200", i % 2 === 1 && "bg-slate-50/40")}>
                  <td className="px-4 py-5 align-middle font-medium text-slate-700">{row.id}</td>
                  <td className="px-4 py-5 align-middle">
                    <span className="block break-words md:truncate text-slate-800">{row.title}</span>
                  </td>
                  <td className="px-4 py-5 align-middle">
                    <Pill seen={row.seen} />
                  </td>
                  <td className="px-4 py-5 align-middle text-right">
                    <div ref={setEl(row.id)} className="relative inline-block">
                      <button
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                        onClick={(e) => onToggleKebab(e, row.id)}
                        className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-800 shadow-sm transition hover:border-indigo-200 hover:shadow"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>

                      <KebabPortal
                        open={isOpen}
                        onClose={() => setOpenId(null)}
                        items={items}
                        anchorEl={anchors.current.get(row.id) ?? null}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

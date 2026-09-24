"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarX2, CheckCircle2, Minus, Phone, Plus, Users } from "lucide-react";
import {
    timeSlots,
    tablesLeftFor,
    bestFitTableSize,
    MAX_ONLINE_PARTY_SIZE,
} from "@/lib/data/tables";
import { AvailabilityGrid, SlotState } from "@/components/booking/AvailabilityGrid";
import { WaitlistModal, WaitlistRequest } from "@/components/booking/WaitlistModal";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/context/BookingContext";
import { useToast } from "@/context/ToastContext";
import {
    todayISO,
    maxAdvanceDateISO,
    isPastDate,
    isTodayAndPastTime,
    formatDateLong,
    formatTime12,
} from "@/lib/utils";
import { Reservation } from "@/lib/types";

const PHONE_RE = /^[0-9+\s-]{7,15}$/;

export function BookingForm() {
    const [date, setDate] = useState(todayISO());
    const [partySize, setPartySize] = useState(2);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [touched, setTouched] = useState(false);
    const [waitlistReq, setWaitlistReq] = useState<WaitlistRequest | null>(null);
    const [confirmed, setConfirmed] = useState<Reservation | null>(null);

    const { addReservation, addWaitlist, reservations } = useBooking();
    const { push } = useToast();

    const dateInvalid = isPastDate(date);
    const isLargeParty = partySize > MAX_ONLINE_PARTY_SIZE;
    const tableSize = bestFitTableSize(Math.min(partySize, MAX_ONLINE_PARTY_SIZE));

    const slots: SlotState[] = useMemo(() => {
        if (dateInvalid || isLargeParty || !tableSize) return [];
        return timeSlots().map((time) => {
            const disabled = isTodayAndPastTime(date, time);
            const alreadyBookedThisSession = reservations.filter(
                (r) => r.date === date && r.time === time && bestFitTableSize(r.partySize) === tableSize
            ).length;
            const raw = tablesLeftFor(date, time, tableSize);
            const tablesLeft = Math.max(0, raw - alreadyBookedThisSession);
            return { time, tablesLeft, disabled };
        });
    }, [date, dateInvalid, isLargeParty, tableSize, reservations]);

    const selectedSlot = slots.find((s) => s.time === selectedTime) ?? null;

    function resetForNewBooking() {
        setConfirmed(null);
        setSelectedTime(null);
        setName("");
        setPhone("");
        setNotes("");
        setTouched(false);
    }

    function handleConfirm() {
        setTouched(true);
        if (!selectedTime || !name.trim() || !PHONE_RE.test(phone.trim())) return;
        const reservation = addReservation({
            date,
            time: selectedTime,
            partySize,
            name: name.trim(),
            phone: phone.trim(),
            notes: notes.trim() || undefined,
        });
        setConfirmed(reservation);
        push("Table booked — see you then!");
    }

    function submitWaitlist(waitlistName: string, waitlistPhone: string) {
        if (!waitlistReq) return;
        addWaitlist({
            date: waitlistReq.date,
            time: waitlistReq.time,
            partySize: waitlistReq.partySize,
            name: waitlistName,
            phone: waitlistPhone,
        });
        push("You're on the waitlist — we'll call if a table opens up.");
        setWaitlistReq(null);
    }

    if (confirmed) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-card border border-herb/25 bg-herb/[0.05] p-7 text-center"
            >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-herb text-paper">
                    <CheckCircle2 size={22} />
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink">Table confirmed</h3>
                <p className="mt-1.5 text-sm text-ink/60">
                    {formatDateLong(confirmed.date)} at {formatTime12(confirmed.time)} · party of{" "}
                    {confirmed.partySize}
                </p>
                <p className="mt-3 inline-block rounded-pill bg-white px-4 py-1.5 font-mono text-xs text-ink/60">
                    {confirmed.id}
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Button variant="secondary" onClick={resetForNewBooking}>
                        Book another table
                    </Button>
                    <a href="/profile">
                        <Button variant="outline" className="w-full">
                            View my bookings
                        </Button>
                    </a>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-ink/60">Date</label>
                    <input
                        type="date"
                        value={date}
                        min={todayISO()}
                        max={maxAdvanceDateISO()}
                        onChange={(e) => {
                            setDate(e.target.value);
                            setSelectedTime(null);
                        }}
                        className="w-full rounded-card border border-ink/15 bg-white/60 px-3.5 py-2.5 text-sm focus:border-ink/35 focus:outline-none"
                    />
                    {dateInvalid && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-brick">
                            <CalendarX2 size={13} /> That date has already passed — pick today or later.
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-medium text-ink/60">Party size</label>
                    <div className="flex items-center gap-3 rounded-card border border-ink/15 bg-white/60 px-3.5 py-2">
                        <Users size={16} className="text-ink/40" />
                        <button
                            onClick={() => {
                                setPartySize((p) => Math.max(1, p - 1));
                                setSelectedTime(null);
                            }}
                            aria-label="Decrease party size"
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-ink/5"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{partySize}</span>
                        <button
                            onClick={() => {
                                setPartySize((p) => Math.min(30, p + 1));
                                setSelectedTime(null);
                            }}
                            aria-label="Increase party size"
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-ink/5"
                        >
                            <Plus size={14} />
                        </button>
                        <span className="ml-auto text-xs text-ink/45">guests</span>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {dateInvalid ? null : isLargeParty ? (
                    <motion.div
                        key="large-party"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-card border border-dashed border-brick/30 bg-brick/[0.04] p-5"
                    >
                        <p className="font-display text-lg text-ink">
                            Parties over {MAX_ONLINE_PARTY_SIZE} need a personal touch
                        </p>
                        <p className="mt-1.5 text-sm text-ink/60">
                            {` For ${partySize} guests we'll need to arrange seating by hand. Call us and we'll `}
                            {"sort it directly, or join the waitlist and we'll call you back."}
                        </p>
                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                            <a href="tel:+8801700000000">
                                <Button variant="outline" className="w-full">
                                    <Phone size={15} /> Call +880 1700-000000
                                </Button>
                            </a>
                            <Button
                                variant="secondary"
                                onClick={() => setWaitlistReq({ date, time: "any", partySize })}
                                className="w-full"
                            >
                                Join the large-party waitlist
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="slots" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <p className="mb-2.5 text-xs font-medium text-ink/60">
                            Available times for {formatDateLong(date)}
                        </p>
                        <AvailabilityGrid
                            slots={slots}
                            selected={selectedTime}
                            onSelect={setSelectedTime}
                            onWaitlist={(time) => setWaitlistReq({ date, time, partySize })}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedSlot && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-3 rounded-card border border-ink/10 bg-white/40 p-5">
                            <p className="font-display text-base text-ink">
                                {formatDateLong(date)} at {formatTime12(selectedSlot.time)} · party of {partySize}
                            </p>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full name"
                                        className="w-full rounded-card border border-ink/15 bg-white/70 px-3.5 py-2.5 text-sm focus:border-ink/35 focus:outline-none"
                                    />
                                    {touched && !name.trim() && (
                                        <p className="mt-1 text-xs text-brick">Enter a name for the booking.</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone number"
                                        className="w-full rounded-card border border-ink/15 bg-white/70 px-3.5 py-2.5 text-sm focus:border-ink/35 focus:outline-none"
                                    />
                                    {touched && !PHONE_RE.test(phone.trim()) && (
                                        <p className="mt-1 text-xs text-brick">Enter a valid phone number.</p>
                                    )}
                                </div>
                            </div>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Anything we should know? (optional)"
                                rows={2}
                                className="w-full resize-none rounded-card border border-ink/15 bg-white/70 px-3.5 py-2.5 text-sm focus:border-ink/35 focus:outline-none"
                            />
                            <Button variant="secondary" size="lg" onClick={handleConfirm} className="w-full">
                                Confirm table for {partySize}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <WaitlistModal
                request={waitlistReq}
                onClose={() => setWaitlistReq(null)}
                onSubmit={submitWaitlist}
            />
        </div>
    );
}

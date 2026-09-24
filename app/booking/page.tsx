import { BookingForm } from "@/components/booking/BookingForm";

export default function BookingPage() {
    return (
        <div className="px-5 pt-6 sm:px-6">
            <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-wide text-brick">Reservations</p>
                <h1 className="mt-1 font-display text-3xl text-ink">Book a table</h1>
                <p className="mt-1.5 max-w-md text-sm text-ink/55">
                    {"Pick a date, time, and party size. We'll confirm instantly if a table is free - and "}
                    {"offer the waitlist if it isn't."}
                </p>
            </div>
            <BookingForm />
        </div>
    );
}

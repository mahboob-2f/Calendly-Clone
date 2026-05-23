export const generateSlots = (startTime,endTime,duration) => {
    const slots = [];

    let current = new Date(`2026-01-01T${startTime}`);

    const end = new Date(`2026-01-01T${endTime}`);

    while (current < end) {
        slots.push(
            current.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        );

        current = new Date(
            current.getTime() +
            duration * 60 * 1000 // moved by event duration
        );
    }

    return slots;
};
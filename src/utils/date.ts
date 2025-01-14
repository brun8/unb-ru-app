const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const yearMonths = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

/** Returns the week day of a date, eg "Segunda", "Terca"... */
export const getWeekDay = (date: string): string => {
    const dayNumber = new Date(
        parseInt(date.slice(0, 4)),
        parseInt(date.slice(5, 7)) - 1,
        parseInt(date.slice(8))
    );
    const result = dayNumber.getDay();
    return weekDays[result];
};

export const getFormatedDate = (date: string): string => {
    return `${getWeekDay(date)} ${date.slice(8)}/${date.slice(5, 7)}`;
};

/**Returns the month(s) of a week separated by "/"*/
export const getMonthsFromWeek = (menu: WeekMenu): string => {
    const months: string[] = [];
    Object.keys(menu).map((date: string) => {
        const newItem = date.slice(5, 7);
        months.indexOf(yearMonths[parseInt(newItem) - 1]) === -1
            ? months.push(yearMonths[parseInt(newItem) - 1])
            : null;
    });
    return months.join(" / ");
};

/**Returns the apropriate date to show the user */
export const getApropriateDate = (date = new Date()) => {
    const today = date;
    const currentHour = today.getHours();
    const endDinner = 19;

    // If the dinner ended returns tomorrow date
    if (currentHour >= endDinner) {
        console.log("entrou");
        today.setDate(today.getDate() + 1);
    }
    return today.toISOString().slice(0, 10);
};

/**Returns the apropriate meal based on current time */
export const getMealByTime = (date = new Date()) => {
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const endBreakfast = 9;
    const endLunch = 14;
    const endDinner = 19;

    if (currentHour <= endBreakfast || currentHour > endDinner) {
        return "Desjejum";
    }
    if (endLunch >= currentHour && currentHour >= endBreakfast) {
        return "Almoço";
    }
    if (endDinner >= currentHour && currentHour >= endLunch) {
        return "Jantar";
    }
};

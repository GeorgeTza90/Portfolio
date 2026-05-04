import type { TicketProps } from "../types/types";

export default function useTicketPrice({ticketType, ticketQuantity}: TicketProps ) {
    let calculatedPrice = 0;

    switch (ticketType) {
        case "Mars - New Olympus":
        calculatedPrice = 14199.99 * ticketQuantity;
        break;
        case "Europa - Aquatropolis":
        calculatedPrice = 27599.99 * ticketQuantity;
        break;
        case "Titan - Titan Harbor":
        calculatedPrice = 32299.99 * ticketQuantity;
        break;
        case "Enceladus - Crystal Bay":
        calculatedPrice = 25699.99 * ticketQuantity;
        break;
        case "Ganymede - Auroria":
        calculatedPrice = 20599.99 * ticketQuantity;
        break;
        case "Callisto - Stormhaven":
        calculatedPrice = 13599.99 * ticketQuantity;
        break;
        default:
        calculatedPrice = 0;
    }

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(calculatedPrice);

    return formattedPrice;
}
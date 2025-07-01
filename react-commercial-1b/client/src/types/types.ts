export interface Post {
    id: number;
    label: string;
    text: string;
    imgLink: string;
}

export interface Comment {
    id: number;
    username: string;
    text: string;
    kind: string;
    kindID: number;
}

export interface Like {
    id: number;
    kind: "post" | "comment";
    kindID: number;
    user: string;
}

export interface Destination {
    id: number;
    planet: string;
    city: string;
    text: string;
    price: number;
}

export interface NewsData {
    heading: string;
    user?: string;
    posts: Post[];
    comments?: Comment[];
    likes?: Like[];
}

export interface AboutData {
    heading: string;
}

export interface DestinationData {
    heading: string;
    destinations: Destination[];
}

export interface DeleteLikeDataParams {
    kind: string;
    id: string | number;
    user: string;
}

export interface PurchaseData {
    firstName: string;
    lastName: string;
    email: string;
    ticketType: string;
    ticketQuantity: number;
}
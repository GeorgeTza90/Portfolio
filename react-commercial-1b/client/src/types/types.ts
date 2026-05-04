import type { AxiosRequestHeaders } from "axios";
import type { MouseEventHandler } from "react";

//--------- BASIC TYPES ---------//
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

export interface Liked {
    id: number;
    liked: boolean;
    user: string
}

export interface _Destination {
    id: number;
    planet: string;
    city: string;
    text: string;
    price: number;
}

//--------- DATA TYPES ---------//
export interface NewsData {    
    user?: string;
    posts: Post[];
    comments?: Comment[];
    likes?: Like[];
}

export interface DestinationData {    
    destinations: _Destination[];
}

export interface ContactData {    
    user?: string;
}

export interface PurchaseData {    
    firstName: string;
    lastName: string;
    email: string;
    ticketType: string;
    ticketQuantity: number;
}

//--------- PARAM TYPES ---------//
export interface DeleteLikeDataParams {
    kind: string;
    id: number;
    user: string;
}

//--------- PROPS TYPES ---------//
export interface DestCardProps {
  dest: _Destination[];
}

export interface HeadingProps {
  heading?: string;
}

export interface TicketProps {
    ticketType: string;
    ticketQuantity: number;
}

export interface ContactFormProps {
  user?: string | null;
}

export interface CommentsCardProps {
  comments: Comment[];
  likes: Like[];
  user: string;
  postID: number;
  sendData: (data: { id: number; counter: number }) => void;
}

export interface CommentItemProps {
  comment: Comment;
  currentUser: string;
  likeCount: number;
  onLike: (kind: string, id: number) => void;
  onDelete: (id: number) => void;
}

export interface CarouselProps {
  images: string[];
}

export interface PostCardProps {
  posts: Post[];
  comments: Comment[];
  user: string;
  likes: Like[];
}

export interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export interface ButtonProps {
  slot?: React.ReactNode;
  disabled?: boolean;
  size?: number;
  to?: string;
  image?: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;  
}


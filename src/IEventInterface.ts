export interface IEvent {
    title: string;
    date: string;
    venue: string;
    image: string;
    time?: string;
}
export interface IEvents {
    events: IEvent[];
}

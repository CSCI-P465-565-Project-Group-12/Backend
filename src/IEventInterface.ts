export interface IEvent {
    title: string;
    date: string;
    venue: string;
    image: string;
    time?: string;
    description?: string;
}
export interface IEvents {
    events: IEvent[];
}

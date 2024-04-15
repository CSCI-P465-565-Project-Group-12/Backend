export interface IEvent {
    name: string;
    venueId?: string;
    ageRange: string;
    cost: string;
    capacity: number;
    activityStatus: string;
    startTime: string;
    endTime: string;
    images: string[];
    coverImg: string;
}
export interface IEvents {
    events: IEvent[];
}

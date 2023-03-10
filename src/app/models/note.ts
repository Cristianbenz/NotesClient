export interface Note {
    id: number;
    title: string;
    text: string;
    date: Date;
    statusType: "Enabled" | "Disabled";
}
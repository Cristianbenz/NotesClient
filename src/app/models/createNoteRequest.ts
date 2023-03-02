export interface CreateNoteRequest {
    userId: number;
    title: string | null;
    text: string | null;
}
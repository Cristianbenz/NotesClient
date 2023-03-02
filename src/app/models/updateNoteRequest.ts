export interface UpdateNoteRequest {
    title: string | null;
    text: string | null;
    statusType: 'Enabled' | 'Disabled' | null;
}
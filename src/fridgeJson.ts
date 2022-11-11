export type fridgeJson = {
    fridgeName: string;
    numOfActiveNotes: number;
    numOfAllNotes: number;
    notes: [
        {
            noteID: string;
            noteText: string;
            currentX: number;
            currentY: number;
            width: number;
            height: number;
            zIndex: number;
        }
    ];
};

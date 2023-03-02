import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Note } from "../../models/note";
import { ApiNotesService } from "../../services/api-notes.service";

@Component({
    selector: "app-edit-dialog",
    templateUrl: './editDialog.component.html',
    styleUrls: ['./editDialog.component.scss']
})
export class EditDialogComponent {
    public editForm = this.formBuilder.group({
        title: [this.note.title, Validators.required],
        text: [this.note.text, Validators.required],
        statusType: [this.note.statusType, Validators.pattern("[1-2]")]
    })

    constructor(
        public dialogRef : MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private note : Note,
        private formBuilder : FormBuilder,
        private notesService : ApiNotesService
    ) {}

    close() {
        this.dialogRef.close();
    }

    editNote() {
        const id = this.note.id;
        this.notesService.updateNote(id, this.editForm.getRawValue()).subscribe(response => {
          if (response.success) this.close();
        })
      }
} 
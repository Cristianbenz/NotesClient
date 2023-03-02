import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteDialogComponent } from '../../components/createNoteDialog/createNoteDialog.component';
import { EditDialogComponent } from '../../components/editDialog/editDialog.component';
import { Note } from '../../models/note';
import { ApiNotesService } from '../../services/api-notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public notesList: Note[] = new Array();
  private readonly dialogSize = {
    width: "500px",
    minWidth: "250px"
  }

  private notesService = inject(ApiNotesService);
  private dialog = inject(MatDialog)

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.notesService.getNotes().subscribe(response => {
      if (response.success) return this.notesList = response.data
    })
  }

  addNote() {
    this.dialog.open(CreateNoteDialogComponent, {
      ...this.dialogSize
    })
    .afterClosed().subscribe(() => this.getData())
  }
}
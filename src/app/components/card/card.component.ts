import { Component, inject, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Note } from "src/app/models/note";
import { EditDialogComponent } from "../editDialog/editDialog.component";
import { HomeComponent } from "src/app/pages/home/home.component";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input() note! : Note;
    private dialog = inject(MatDialog)
    private home = inject(HomeComponent);

    private readonly dialogSize = {
        width: "500px",
        minWidth: "250px"
      }

    openForm(note: Note) {
        this.dialog.open(EditDialogComponent, {
          data: note,
          ...this.dialogSize
        })
        .afterClosed().subscribe(() => this.home.getData())
      }
}
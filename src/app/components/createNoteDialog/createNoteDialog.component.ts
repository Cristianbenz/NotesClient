import { Component } from '@angular/core';
import { ApiNotesService } from '../../services/api-notes.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from '../../services/api-auth.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
    selector: 'app-createNote',
    templateUrl: './createNoteDialog.component.html',
    styleUrls: ['./createNoteDialog.component.scss']
})

export class CreateNoteDialogComponent {

    public createForm = this.formBuilder.group({
        title: ["", Validators.required],
        text: ["", Validators.required]
    });

    private user = this.authService.userData;

    constructor(
        private dialogRef : DialogRef,
        private noteService: ApiNotesService,
        private formBuilder: FormBuilder,
        private authService: ApiAuthService,
        private router: Router
    ) {}

    close() {
        this.dialogRef.close();
    }

    createNote() {
        if (!this.user) {
            this.router.navigate(['/'])
        } else {
            const userId = this.user.id
            this.noteService.createNote({ userId, ...this.createForm.getRawValue() })
                .subscribe(response => {
                    if (response.success) this.close();
                });
        }
    }
}
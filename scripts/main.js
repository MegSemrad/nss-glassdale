/*
    Use this for API : json-server -p 8088 -w notes.json
*/

import { CriminalList } from './criminals/criminalList.js';
import { ConvictionSelect } from './convictions/convictionSelect.js';
import { OfficerSelect } from './officers/OfficerSelect.js';
import { NoteForm } from './notes/NoteForm.js';
import { ShowNoteButton } from './notes/ShowNotesButton.js';
import './notes/NoteList.js';
import './alibis/associateAlibiDisplay.js';


CriminalList();
ConvictionSelect(); 
OfficerSelect();
NoteForm();
ShowNoteButton();


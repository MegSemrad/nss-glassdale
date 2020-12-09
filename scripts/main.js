import { CriminalList } from './criminals/criminalList.js';
import { ConvictionSelect } from './convictions/convictionSelect.js';
import { OfficerSelect } from './officers/OfficerSelect.js';
import { NoteForm } from '../notes/NoteForm.js';
import { ShowNoteButton } from '../notes/ShowNotesButton.js';
import '../notes/NoteList.js';
/*
- We are importing '../notes/NoteList.js' because....
  
*/

CriminalList();
ConvictionSelect(); 
OfficerSelect();
NoteForm();
ShowNoteButton();

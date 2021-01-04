import { CriminalList } from './criminals/criminalList.js';
import { ConvictionSelect } from './convictions/convictionSelect.js';
import { OfficerSelect } from './officers/OfficerSelect.js';
import { NoteForm } from '../notes/NoteForm.js';
import { ShowNoteButton } from '../notes/ShowNotesButton.js';
import '../notes/NoteList.js';
import './alibis/associateAlibiDisplay.js';
import { witnessButton } from './witnesses/witnesses.js';
/*
- We are importing '../notes/NoteList.js' because....
  
*/

CriminalList();
ConvictionSelect(); 
OfficerSelect();
NoteForm();
ShowNoteButton();
witnessButton();


/* CHAPTER 8 ALIBIS
- Add a new button to Criminal.js component (HTML converter) 
- Add a new component AssociateAlibiDisplay.js (job: create an HTML representation of
    associates and alibis)
- Do not need new provider - dealing with CriminalProvider.js - loop over to find criminal want
 and do that in AssociateAlibiDisplay.js
- Criminal.js should listen for click and dispatch custom event ("KnownAssociatesClicked") 
  because that is where button lives - to alert other modules that the associate 
  button has been clicked
- AssociateDisplay.js listens for "KnownAssociatesClicked" event 
- Need to send criminal id as data (detail) and AssociateAlibiDisplay.js component 
  needs to FIND criminal with matching id
  
- Loop over the found criminal's known_associates and dispaly them 
- Create new DOM element for this to go into (a dialouge box is the adventurous choice - 
  but to just get it working can use sth like section) 
*/

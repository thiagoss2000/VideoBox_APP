import { useEffect, useState } from "react";
import styled from "styled-components";
import NotesList from "../../components/notes/NotesList";

export default function Notes() {

    return (
        <NotesContainer>
            <NotesList />
            
        </NotesContainer>
    );
}

const NotesContainer = styled.nav`
    
`
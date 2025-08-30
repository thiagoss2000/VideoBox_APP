import { useEffect, useState } from "react";
import dayjs from "dayjs"
import { FaRegNoteSticky, FaNoteSticky } from "react-icons/fa6";
import { useData } from "../../context/MainContext"
import { createNote, deleteNote, editNote } from "../../api/foldersApi";
import { TextBox, NotesContainer, NotesCard, NewNoteBox, ModalOverlay, ModalBox } from "./styles";

export default function Notes() {
    const { folders, setFolders, fetchFoldersData } = useData()
    const [selectedFolder, setSelectedFolder] = useState(null)
    const [editingNote, setEditingNote] = useState(null) // guarda nota em edição
    const [newNoteText, setNewNoteText] = useState("")

    useEffect(() => {
        fetchFoldersData()
    }, [])

    useEffect(() => {
        if (selectedFolder) {
            const freshFolder = folders.find(f => f.name === selectedFolder.name);
            if (freshFolder) setSelectedFolder(freshFolder);
        }
    }, [folders]);

    // Criar nova nota
    async function handleNewNote() {
        if (!selectedFolder || !newNoteText.trim()) return;
    
        try {
        const token = localStorage.getItem("token")
        const updatedFolder = await createNote(token, selectedFolder.name, newNoteText );
        
        // atualiza state global
        setFolders(folders.map(f => f.name === updatedFolder.data.name ? updatedFolder.data : f));
        setNewNoteText("");
        await fetchFoldersData();
        } catch (err) {
        console.error("Erro ao criar nota:", err);
        }
    }
    
    // Editar nota
    async function handleEditNote() {
        if (!editingNote) return;
    
        try {
        const token = localStorage.getItem("token")
        const updatedFolder = await editNote(token, selectedFolder.name, editingNote.id, editingNote.text );
    
        setFolders(folders.map(f => f.name === updatedFolder.data.name ? updatedFolder.data : f));
        setEditingNote(null);
        await fetchFoldersData();
        } catch (err) {
        console.error("Erro ao editar nota:", err);
        }
    }

    async function handleDeleteNote() {
        if (!editingNote) return;
      
        try {
            const token = localStorage.getItem("token")
            const updatedFolder = await deleteNote(token, selectedFolder.name, editingNote.id);
      
            setFolders(folders.map(f => 
                f.name === updatedFolder.data.name ? updatedFolder.data : f
            ));
        
            setEditingNote(null); // fecha modal
            await fetchFoldersData();
        } catch (err) {
            console.error("Erro ao deletar nota:", err);
        }
      }

    return (
        <>
        <NotesContainer>
            {folders.map((folder, index) => (
                <NotesCard key={index}>
                    <div onClick={() => setSelectedFolder(folder)}>
                        { folder.name == selectedFolder?.name ? 
                            <FaRegNoteSticky className="noteIcon"/> : 
                            <FaNoteSticky className="noteIcon"/>
                        }
                        <h4>{folder.name}</h4>
                    </div>
                </NotesCard>  
            ))}
        </NotesContainer>

        {selectedFolder && (
            <TextBox>
                <h4>{selectedFolder?.name}</h4>
                <div className="line"></div>

                {/* Input para nova nota */}
                <NewNoteBox>
                    <input 
                        type="text" 
                        placeholder="Nova nota..." 
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                    />
                    <button onClick={handleNewNote}>Adicionar</button>
                </NewNoteBox>

                {selectedFolder?.notes && selectedFolder?.notes.map((note, index) => (
                    <div key={index} className="note">
                        {note.updatedAt ? 
                            <h5>{dayjs(note.updatedAt).format("DD/MM/YYYY HH:mm")} (edit)</h5>
                            : <h5>{dayjs(note.createdAt).format("DD/MM/YYYY HH:mm")}</h5>
                        }
                        <p onClick={() => {setEditingNote(note);}}>{note.text}</p>
                    </div>
                ))}                
            </TextBox>
        )}

        {/* Modal de edição */}
        {editingNote && (
            <ModalOverlay>
                <ModalBox>
                    <h3>Editar Nota</h3>
                    <textarea 
                        value={editingNote.text} 
                        onChange={(e) => setEditingNote({ ...editingNote, text: e.target.value })}
                    />
                    <div className="actions">
                        <button onClick={handleDeleteNote} style={{ color: "red" }}>Excluir</button>
                        <button onClick={() => setEditingNote(null)}>Cancelar</button>
                        <button onClick={handleEditNote}>Salvar</button>
                    </div>
                </ModalBox>
            </ModalOverlay>
        )}
        </>
    );
}

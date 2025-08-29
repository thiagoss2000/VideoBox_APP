
export default function NotesList({folders}) {
  return (
    <>
      {folders.map((folder, index) => (
        <NoteCard key={index}>
          <div onClick={() => onSelect(folder)}>
            {folder.name == folderName ? 
              <></> :
              <></>
            }
            <h4>{folder.name}</h4>
          </div>
        </NoteCard>
      ))}
    </>
  )
}
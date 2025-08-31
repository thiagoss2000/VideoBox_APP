import { FolderCard } from "./styles"
import { ImCancelCircle } from "react-icons/im"
import { RiEditCircleFill } from "react-icons/ri";
import { FaFolderOpen, FaFolderClosed } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";

export default function FolderList({ activeEdit, folders, folderName, onSelect, onRename, onDelete, onEditDays }) {
	return (
		<>
		{folders.map((folder, index) => (
			<FolderCard key={index}>
			<div onClick={() => onSelect(folder)}>
				{folder.name == folderName ? 
				<FaFolderOpen className="folderIcon"/> :
				<FaFolderClosed className="folderIcon"/>
				}
				<h4>{folder.name}</h4>
				{folder.videos?.length > 0 && <p>Vídeos: {folder.videos.length}</p>}
			</div>
			{activeEdit ? 
				<>
				<ImCancelCircle
					className="deleteIcon"
					onClick={() => onDelete(folder)}
				/>
				<RiEditCircleFill 
					className="editIcon"
					onClick={() => onRename(folder)}
				/>
				</>
			: <FaRegClock 
				className="deleteIcon"
				color="#AE9F2E"
				onClick={() => onEditDays(folder)}
			/>}
			</FolderCard>
		))}
		</>
	)
}
import { useEffect, useState } from "react"
import { ModalOverlay, ModalContent, Input, Buttons, ModalButton, DaysContainer, Day } from "./styles"

export function ModalNewFolder({ open, onClose, value, onChange, onSave }) {
  if (!open) return null
  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Criar nova pasta</h3>
        <Input type="text" placeholder="Nome da pasta" value={value} onChange={onChange} />
        <Buttons>
          <ModalButton onClick={onSave}>Criar</ModalButton>
          <ModalButton onClick={onClose}>Cancelar</ModalButton>
        </Buttons>
      </ModalContent>
    </ModalOverlay>
  )
}

export function ModalRenameFolder({ open, onClose, value, onChange, onSave }) {
  if (!open) return null
  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Renomear pasta</h3>
        <Input type="text" value={value} onChange={onChange} />
        <Buttons>
          <ModalButton onClick={onSave}>Salvar</ModalButton>
          <ModalButton onClick={onClose}>Cancelar</ModalButton>
        </Buttons>
      </ModalContent>
    </ModalOverlay>
  )
}

export function ModalDeleteFolder({ open, onClose, folderName, onDelete }) {
  if (!open) return null
  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Excluir pasta</h3>
        <p>Tem certeza que deseja excluir a pasta "{folderName}"?</p>
        <Buttons>
          <ModalButton onClick={onDelete}>Excluir</ModalButton>
          <ModalButton onClick={onClose}>Cancelar</ModalButton>
        </Buttons>
      </ModalContent>
    </ModalOverlay>
  )
}

const allDays = [
	"domingo",
	"segunda-feira",
	"terça-feira",
	"quarta-feira",
	"quinta-feira",
	"sexta-feira",
	"sábado"
];

export function ModalDaysOfWeek({ open, folder, onClose, onSave }) {
	const [selectedDays, setSelectedDays] = useState([]);

	useEffect(() => {
		if (folder) {
		setSelectedDays(folder.daysOfWeek || []);
		}
	}, [folder]);

	const toggleDay = (day) => {
		setSelectedDays((prev) =>
		prev.includes(day)
			? prev.filter((d) => d !== day)
			: [...prev, day]
		);
	};

	const handleSave = () => {
		onSave(folder.name, selectedDays);
		onClose();
	};

	if (!open) return null;

	return (
		<ModalOverlay>
		<ModalContent>
			<h3>Selecionar dias da semana</h3>
			<DaysContainer>
			{allDays.map((day) => (
				<Day
				key={day}
				selected={selectedDays.includes(day)}
				onClick={() => toggleDay(day)}
				>
				{day}
				</Day>
			))}
			</DaysContainer>
			<Buttons>
			<ModalButton onClick={onClose}>Cancelar</ModalButton>
			<ModalButton onClick={handleSave}>Salvar</ModalButton>
			</Buttons>
		</ModalContent>
		</ModalOverlay>
	);
}

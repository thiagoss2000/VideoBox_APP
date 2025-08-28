import { ModalOverlay, ModalContent, Input, Buttons, ModalButton } from "./styles"

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

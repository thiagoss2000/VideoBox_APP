import styled from 'styled-components';
import { AiOutlineUser } from "react-icons/ai";
import { BsList } from "react-icons/bs";

export default function Header({setCollapsed, collapsed}) {
  return (
    <Style_header>
      <div className="left menu">
        <BsList className='icon' onClick={() => setCollapsed(!collapsed)}/>
        <h1 className="text-xl font-bold">VideoBox</h1>
      </div>
      <input placeholder="Pesquisar"></input>
      <button className='user'>
        <AiOutlineUser className="icon" />
      </button>
    </Style_header>
  );
}

const Style_header = styled.header`
  width: 100%;
  height: 60px;
  /* background linear gradient */
  background: linear-gradient(135deg, #282626, #8E8484);
  /* fallback para navegadores antigos */
  background-color: #282626;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  .left {
    display: flex;
    align-items: center;
    font-size: 2.5rem;         /* tamanho do ícone */
  }

  .menu {
    cursor: pointer;
  }

  h1 {
    font-size: 1.75rem; /* equivalente a text-xl */
    font-weight: 700;   /* bold */
    margin-left: 10px;
    color: #B4E0FF; /* fallback caso gradiente não funcione */
    background: linear-gradient(90deg, #B4E0FF, #8AAAC2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
  }

  input {
    height: 45%;
    width: 30%;
    border: 1px solid #ccc;       /* borda padrão */
    border-radius: 20px;           /* cantos arredondados */
    padding: 8px 10px;            /* espaçamento interno */
    font-size: 1rem;              /* tamanho do texto */
    outline: none;                /* remove outline padrão do foco */
    background-color: #D0D0D0;
  }
  input::placeholder {
    color: #1d75d949;                  /* cor do texto placeholder */
  }

  .user {
    height: 50%;            /* define altura */
    aspect-ratio: 1 / 1;     /* largura = 3x altura */
    margin-right: 15px;
    background-color: transparent;
    display: flex;
    align-items: center;       /* centraliza verticalmente */
    justify-content: center;   /* centraliza horizontalmente */
    font-size: 1.5rem;         /* tamanho do ícone */
    cursor: pointer;
    border: 1px solid #7ED8FF;
    border-radius: 8px;
  }
  
  .icon {
    color: #7ED8FF
  }
`;
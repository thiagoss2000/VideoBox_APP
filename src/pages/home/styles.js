import styled from "styled-components"

export const Main = styled.nav`
    .nameContainer {
        padding: 20px;
        color: #ffffff7a;
        font-weight: lighter;
        display: flex;
        align-items: center;
    }
    .icon {
        color: #7ED8FF;
        margin-right: 15px;
        font-size: 1.6rem;
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    .icon:hover {
        transform: rotate(90deg);
    }
`

export const VideosContainer = styled.nav`
    display: flex;
    flex-wrap: nowrap;          /* não quebrar linha */
    gap: 12px;                  /* espaçamento entre itens (opcional) */
    overflow-x: auto;           /* rolagem horizontal */
    overflow-y: hidden;         /*evita barra vertical */
    -webkit-overflow-scrolling: touch; /* inércia no iOS */
    scroll-snap-type: x proximity;     /* snap suave (opcional) */
    padding-bottom: 20px;
    border-radius: 8px;
    height: max-content;
    max-width: 95%;
    margin-inline: auto;

`
export const VideoCard = styled.div`
    width: 540px;
    height: 380px;
    background-color: #282626;
    padding: 20px;
    color: #7ED8FF;
    border-radius: 8px;
    
    cursor: pointer;

    .thumbnail img {
        width: 500px;
        aspect-ratio: 16/9;
        object-fit: cover;
    }

    .info {
        h4 { 
            margin: 0 0 4px 0; 
            font-size: 0.95rem; 
            font-weight: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;     /* número máximo de linhas */
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            /* max-width: 300px;           */
        }
        p { 
            margin: 0; 
            font-size: 0.75rem; 
            color: #c0e8ff; 
            white-space: nowrap;       /* não quebra linha */
            overflow: hidden;          /* esconde o excesso */
            text-overflow: ellipsis;   /* adiciona "..." */
            /* max-width: 300px;       */
        }
    }
`
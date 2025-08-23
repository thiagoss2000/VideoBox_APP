import ReactPlayer from 'react-player'

export default function MainContent() {
  return (
    <main>
      <div className="p-4">
           <ReactPlayer
                src="https://www.youtube.com/"
                controls
                width="100%"
                height="360px"
            />
        </div>
    </main>
  );
}
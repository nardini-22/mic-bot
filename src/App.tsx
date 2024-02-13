import { AudioLines } from 'lucide-react'
import { useAudioRecorder } from './hooks/useAudioRecorder'

function App() {
  const { audioPlayer, startRecording, stopRecording } = useAudioRecorder()
  return (
    <div className="h-screen w-screen rounded border border-zinc-700 p-3">
      <div className="item-center flex justify-center rounded-lg border border-dashed border-zinc-700 p-5 hover:bg-zinc-500 hover:bg-opacity-10 active:bg-opacity-30">
        <AudioLines className="size-12" color="#fff" />
        <AudioLines className="size-12" color="#fff" />
        <AudioLines className="size-12" color="#fff" />
      </div>
      <button onClick={startRecording}>Gravar</button>
      <button onClick={stopRecording}>Parar</button>
      <audio ref={audioPlayer} controls />
      <div>Quit</div>
    </div>
  )
}

export default App

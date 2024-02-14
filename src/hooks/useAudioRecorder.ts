import { useRef, useState } from 'react'

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const audioPlayer = useRef<HTMLAudioElement | null>(null)

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream)

        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.current.push(event.data)
          }
        }

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(chunks.current, { type: 'audio/wav' })
          const audioUrl = URL.createObjectURL(audioBlob)
          if (audioPlayer.current) audioPlayer.current.src = audioUrl
          console.log('Áudio gravado:', audioUrl)
        }

        mediaRecorder.current.start()
        setIsRecording(true)
      })
      .catch((error) => {
        console.error('Erro ao acessar o microfone:', error)
      })
  }

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop()
      setIsRecording(false)
    }
  }
  return { audioPlayer, isRecording, startRecording, stopRecording }
}

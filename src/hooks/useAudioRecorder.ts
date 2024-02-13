import { useRef } from 'react'

export const useAudioRecorder = () => {
  let mediaRecorder: MediaRecorder
  let audioChunks: Blob[] = []

  const audioPlayer = useRef<HTMLAudioElement | null>(null)

  const startRecording = () => {
    audioChunks = []
    mediaRecorder.start()
  }

  const stopRecording = () => {
    if (mediaRecorder.state === 'recording') {
      mediaRecorder.stop()
    }
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        if (audioPlayer.current) audioPlayer.current.src = audioUrl
      }
    })
    .catch((err) => {
      console.log('Erro ao acessar o microfone:', err)
    })

  return { audioPlayer, startRecording, stopRecording }
}

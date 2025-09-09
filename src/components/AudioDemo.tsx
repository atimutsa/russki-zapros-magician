import { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AudioSample {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
}

const audioSamples: AudioSample[] = [
  {
    id: "female-voice",
    name: "Женский голос - Анна",
    description: "Дружелюбный и профессиональный женский голос для консультаций",
    audioUrl: "/audio/female-voice-sample.mp3" // Загрузите файл сюда
  },
  {
    id: "male-voice", 
    name: "Мужской голос - Александр",
    description: "Уверенный мужской голос для технической поддержки",
    audioUrl: "/audio/male-voice-sample.mp3" // Загрузите файл сюда
  },
  {
    id: "assistant-voice",
    name: "Голос ассистента - Мария", 
    description: "Приятный голос для виртуального помощника",
    audioUrl: "/audio/assistant-voice-sample.mp3" // Загрузите файл сюда
  }
];

const AudioDemo = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});

  const handlePlayPause = (sample: AudioSample) => {
    // Остановить все другие аудио
    Object.values(audioElements).forEach(audio => {
      if (!audio.paused) {
        audio.pause();
      }
    });

    if (playingId === sample.id) {
      // Остановить текущее
      setPlayingId(null);
      if (audioElements[sample.id]) {
        audioElements[sample.id].pause();
      }
    } else {
      // Воспроизвести новое
      let audio = audioElements[sample.id];
      if (!audio) {
        audio = new Audio(sample.audioUrl);
        audio.addEventListener('ended', () => setPlayingId(null));
        audio.addEventListener('error', () => {
          console.warn(`Не удалось загрузить аудио: ${sample.audioUrl}`);
          setPlayingId(null);
        });
        setAudioElements(prev => ({ ...prev, [sample.id]: audio }));
      }
      
      setPlayingId(sample.id);
      audio.currentTime = 0;
      audio.play().catch(() => {
        console.warn(`Не удалось воспроизвести аудио: ${sample.audioUrl}`);
        setPlayingId(null);
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/50 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Как звучат наши боты?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Послушайте примеры голосов наших ИИ-ассистентов. Каждый голос настраивается под специфику вашего бизнеса.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audioSamples.map((sample) => (
            <Card key={sample.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{sample.name}</CardTitle>
                <CardDescription className="text-sm">
                  {sample.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <Button
                  onClick={() => handlePlayPause(sample)}
                  variant="outline"
                  size="lg"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  {playingId === sample.id ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Остановить
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Послушать
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground mt-3">
                  Нажмите для воспроизведения примера
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground bg-muted/30 inline-block px-4 py-2 rounded-lg">
            💡 <strong>Совет:</strong> Загрузите ваши аудио файлы в папку <code className="bg-background px-2 py-1 rounded text-xs">public/audio/</code> и обновите пути в компоненте
          </p>
        </div>
      </div>
    </section>
  );
};

export default AudioDemo;
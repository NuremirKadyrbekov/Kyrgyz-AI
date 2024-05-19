import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import Salam from "./assets/sound/yaleikym.mp3";
import Salam32 from "./assets/sound/salam.mp3";
import Off from "./assets/sound/jarvis-og/off.wav";
import {
  AudioMutedOutlined,
  AudioOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
// import VideoBackground from "./components/VideoBgc";
import GoogleResults from "./components/GoogleResults";
// import OpenAI from "openai";
// OpenAI.Chat.Completions()


const App = () => {
  const [results, setResults] = useState([]);
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const [message, setMessage] = useState("");
  const Salam2 = new Audio(Salam);
  const Salam3 = new Audio(Salam32);

  const stop = new Audio(Off);

  const commands = [
    {
      command: ["Привет", "Здраствуйте", "Здорово", "Даров", "Дарова"],
      callback: () => {
        setMessage("Саламатсызбы");
        Salam3.play();
      },
    },

    {
      command: ["Ассалам алейкум", "Салам алейкум", "Салам"],
      callback: () => {
        setMessage("Уалейкум Ассалям");
        Salam2.play();
      },
    },
    {
      command: ["Стоп"],
      callback: () => {
        setMessage("Как пожелаете:)");
        stop.play();
        SpeechRecognition.stopListening();
      },
    },
    {
      command: "так",
      callback: () => setMessage(`Эмне болду?`),
    },

    {
      command: "Очистка",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: ["Убрать сообщение", "удалить сообщение", "Удалить сообщение"],
      callback: () => setMessage("  "),
    },

    {
      command: "Скопировать",
      callback: () => setCopied,
    },
    {
      command: "Красный",
      callback: () => {
        document.getElementById("container").style.backgroundColor =
          "rgba(230, 46, 46, 0.451)";

        setTimeout(() => {
          document.getElementById("container").style.backgroundColor =
            "rgba(215, 212, 212, 0.595)";
        }, 1000);
      },
    },
    {
      command: "зелёный",
      callback: () => {
        document.getElementById("container").style.backgroundColor =
          "rgba(0, 128, 0, 0.434)";

        setTimeout(() => {
          document.getElementById("container").style.backgroundColor =
            "rgba(215, 212, 212, 0.595)";
        }, 1000);
      },
    },
    {
      command: "жёлтый",
      callback: () => {
        document.getElementById("container").style.backgroundColor =
          "rgba(122, 128, 0, 0.434)";

        setTimeout(() => {
          document.getElementById("container").style.backgroundColor =
            "rgba(215, 212, 212, 0.595)";
        }, 1000);
      },
    },
    {
      command: "синий",
      callback: () => {
        document.getElementById("container").style.backgroundColor =
          "rgba(0, 34, 128, 0.434)";

        setTimeout(() => {
          document.getElementById("container").style.backgroundColor =
            "rgba(215, 212, 212, 0.595)";
        }, 1000);
      },
    },
    {
      command: "розовый",
      callback: () => {
        document.getElementById("container").style.backgroundColor =
          "rgba(128, 0, 100, 0.434)";

        setTimeout(() => {
          document.getElementById("container").style.backgroundColor =
            "rgba(215, 212, 212, 0.595)";
        }, 1000);
      },
    },

    {
      command: "открой YouTube",
      callback: () => window.open("https://www.youtube.com/", "_blanck"),
    },
    {
      command: "открой WhatsApp",
      callback: () => window.open("https://web.whatsapp.com/", "_blanck"),
    },
    {
      command: "открой Instagram",
      callback: () => window.open("https://www.instagram.com/", "_blanck"),
    },

    {
      command: ["Поиск", "Поиск в Google", "Инфо", "найди", "Узнай", "Search"],
      callback: () => { handleSearch()}
    },
  ];

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyC6YQ6WBFLXgme_bKVhPQERkhK-7WnlpjU&cx=d47eae4c2eacf4804&q=${encodeURIComponent(
          transcript
        )}& `
      );
      const data = await response.json();
      setResults(data.items);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "ru" });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition(
    { commands }
  );

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // console.log(isCopied);
  return (
    <div className="main">
      <div className="container">
        {/* <VideoBackground /> */}

        <div
          className="main-content"
          id="container"
          onClick={() => setTextToCopy(transcript)}
        >
          {transcript}
          <p className="message">{message}</p>
        </div>
        

        <div className="btn-style">
          <Button
            block
            onClick={setCopied}
            style={{
              width: "100px",
              backgroundColor: "rgba(215, 212, 212, 0.595)",
            }}
          >
            <CopyOutlined />
          </Button>

          <Button
            onClick={startListening}
            className="microOn"
            block
            style={{
              width: "100px",
              backgroundColor: "rgba(215, 212, 212, 0.595)",
            }}
          >
            <AudioOutlined />
          </Button>
          <Button
            onClick={SpeechRecognition.stopListening}
            className="microOff"
            style={{
              width: "100px",
              backgroundColor: "rgba(215, 212, 212, 0.595)",
            }}
          >
            <AudioMutedOutlined />
          </Button>
          {transcript ? (
            <Button
              onClick={handleSearch}
              className="SearchBtn"
              style={{
                width: "100px",
                backgroundColor: "rgba(215, 212, 212, 0.595)",
              }}
            >
              Search
            </Button>
          ) : (
            <Button
              className="SearchBtnF"
              style={{
                width: "100px",
                backgroundColor: "rgba(84, 80, 80, 0.451)",
              }}
            >
              Search
            </Button>
          )}
        </div>
      </div>
      <div className="container2">
        <GoogleResults results={results} />
        {console.log(results)}
      </div>
      <div className="container3"></div>
      <div className="container4"></div>
    </div>
  );
};

export default App;

import { useEffect, useRef, useState} from 'react';

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
  console.log(event.data);
};

ws.onopen = () => {
  console.log("Connected to server");
};

ws.onerror = error => {
  console.error("WebSocket error:", error);
};


function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2,2)
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;

     // Establish WebSocket connection
     const websocket = new WebSocket('ws://localhost:8080');
     websocket.onmessage = handleReceiveDrawingData;
     setWs(websocket);
 
  }, []);

  const handleReceiveDrawingData = (event) => {
    const dataUrl = event.data;
    drawImageFromDataUrl(dataUrl);
  };

  const drawImageFromDataUrl = (dataUrl) => {
    const image = new Image();
    image.onload = () => {
      contextRef.current.drawImage(image, 0, 0);
    };
    image.src = dataUrl;
  };

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} =  nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();

  };

  const draw = ({nativeEvent}) => {
    if(!isDrawing) {
      return;
    }
    const {offsetX, offsetY} =  nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false)
    sendDrawingData(canvasRef.current.toDataURL()); // Send drawing data to server
  };
  
  const sendDrawingData = dataUrl => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(dataUrl);
    }
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = 'source-over';
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = 'destination-out';

  };

  return (
    <>
    <div>
      <p className ='text-pink-500'>Whiteboard page</p>
      <canvas className="container py-2 px-2 mx-auto border-2 border-l-gray-500" 
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}>
      </canvas>
    </div>
    <div>
      <button className ="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={setToDraw}
      >
        Pen
      </button>
      <button className=
      "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={setToErase}
      >
        Erase
      </button>

    </div>
    </>
  )
}

export default Whiteboard;
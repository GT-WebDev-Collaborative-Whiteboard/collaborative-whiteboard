import { useEffect, useRef, useState} from 'react';

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
    // console.log(dataUrl);
    drawImageFromDataUrl(dataUrl);
  };

  const drawImageFromDataUrl = async (dataUrl) => {
    const image = new Image();
    image.onload = () => {
      contextRef.current.drawImage(image, 0, 0);
    };
    image.src = await dataUrl.text();
    console.log("url", image.src);
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

  const closeConnection = () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
      window.close();
   }
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
      <button className=
      "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={closeConnection}>
        Close
      </button>

    </div>
    </>
  )
}

export default Whiteboard;
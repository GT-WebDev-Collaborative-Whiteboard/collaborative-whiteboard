import { useEffect, useMemo, useRef, useState} from 'react';
function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const socketRef = useRef(null); // Ref for WebSocket connection
  const drawingDataRef = useRef(null); // Ref for storing drawing data

  const [isDrawing, setIsDrawing] = useState(false);
  const colors = useMemo(() => ["#FCA5A5", "#FDE047", "#93C5FD", "#86EFAC", "#000000"], [])

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

    // Connect to WebSocket server
    const socket = new WebSocket('ws://localhost:8080', ["testprotocol"]);
    socketRef.current = socket;

    socket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });

    socket.addEventListener('message', (event) => {
      // Handle incoming updates and draw on the whiteboard
      const data = JSON.parse(event.data);
      if (data.type === 'draw') {
        drawOnWhiteboard(data.x, data.y, data.color);
      }
      if (data.type === 'stop') {
        contextRef.current.closePath();
      }
    });
  }, [colors]);

  const drawOnWhiteboard = (x, y, color) => {
    contextRef.current.strokeStyle = color;
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    contextRef.current.closePath();
  };

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} =  nativeEvent;
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
    drawOnWhiteboard(offsetX, offsetY, contextRef.current.strokeStyle);
    nativeEvent.preventDefault();
    // Send drawing data to server
    const data = { type: 'draw', x: offsetX, y: offsetY, color: contextRef.current.strokeStyle };
    socketRef.current.send(JSON.stringify(data));
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false)
  };

  
  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = 'source-over';
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = 'destination-out';

  };

    const setColor = color => {
      contextRef.current.strokeStyle = color;
    }

    const saveImageToLocal = (event) => {
      let link = event.currentTarget;
      link.setAttribute('download', 'canvas.png');
      let image = canvasRef.current.toDataURL('image/png');
      link.setAttribute('href', image);
    }


  return (
    <>
    <div>
      <h1 className ='text-xl font-bold text-center'>Whiteboard page</h1>
      <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}>
      </canvas>
    </div>
    <div className='container flex justify-center items-center'>
      <ul className="flex">
        <li className='mr-6'>
          <button className ="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={setToDraw}>
            Pen
          </button>
        </li>
        <li className='mr-6'>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={setToErase}>
            Erase
          </button>
      </li>
      <li className='mr-6'>
      <button onClick={() => setColor(colors[4])} className="bg-black py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mr-6'>
      <button onClick={() => setColor(colors[0])} className="bg-red-300 py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mr-6'>
      <button onClick={() => setColor(colors[1])} className="bg-yellow-300 py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mr-6'>
      <button onClick={() => setColor(colors[2])} className="bg-blue-300 py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mr-6'>
      <button onClick={() => setColor(colors[3])} className="bg-green-300 py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mr-6'>
      <a id="download_image_link" href="download_link" onClick={saveImageToLocal} className='text-gray-900 underline'> export as image </a>
      </li>
      </ul>
    </div>
    </>
  )
}

export default Whiteboard;
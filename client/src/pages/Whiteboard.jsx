import { useEffect, useMemo, useRef, useState} from 'react';
import { FaEraser } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";



function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lineSize, changeLineSize] = useState(5);
  const [ws, setWs] = useState(null);

  const colors = useMemo(() => ["#FCA5A5", "#FDE047", "#93C5FD", "#86EFAC", "#000000"], [])

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    //reference for the canvas object
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;

     // Establish WebSocket connection
     const websocket = new WebSocket('ws://localhost:8080');
     websocket.onmessage = handleReceiveDrawingData;
     setWs(websocket);

  }, [colors]);

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

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
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
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };

  const closeConnection = () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
   }
  };

    const setColor = color => {
      contextRef.current.strokeStyle = color;
    }

    const increaseLineSize = () => {
      if (contextRef.current.lineWidth < 50) {
        contextRef.current.lineWidth++;
        changeLineSize(contextRef.current.lineWidth);
      } else {
        return;
      }
    }

    const decreaseLineSize = () => {
      if (contextRef.current.lineWidth > 0) {
          contextRef.current.lineWidth--;
          changeLineSize(contextRef.current.lineWidth);
      } else {
        return;
      }
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
   
    <div className='flex justify-center py-4 bg-white sm: shadow-md md:shadow-lg lg: shadow-2xl rounded-full mx-3 my-5'>
      <ul className="flex items-center">
        <li className='mx-3'>
          <button className ="bg-white hover:bg-gray-200 focus:bg-gray-200 text-gray-800 font-semibold  py-3 px-3 rounded-full"
          onClick={setToDraw}>
            <IconContext.Provider value={{className: "shared-class", size:30}}> 
          <FaPencilAlt/>
          </IconContext.Provider>
          </button>
        </li>
        <li className='mx-3'>
          <button className="bg-white hover:bg-gray-200 focus:bg-gray-200 text-gray-800 font-semibold  py-3 px-3 rounded-full"
          onClick={setToErase}>
          <IconContext.Provider value={{ size:30}}> 
          <FaEraser/>
          </IconContext.Provider>
          </button>
      </li>
      <li>
        <p>
          stroke size:   {lineSize}
        </p>
      </li>
      <li className='ml-1 mr-1'>
        <button className='"bg-white hover:bg-gray-200  text-gray-800 font-semibold  py-3 px-3 rounded-full' 
        onClick={() => decreaseLineSize()}> 
          <IconContext.Provider value={{ size:20}}> 
          <FaMinus/>
          </IconContext.Provider>
        
        </button>
      </li>
      <li className='ml-1 mr-1'>
        <button className='"bg-white hover:bg-gray-200  text-gray-800 font-semibold  py-3 px-3 rounded-full' 
        onClick={() => increaseLineSize()}> 
          <IconContext.Provider value={{ size:20}}> 
          <FaPlus/>
          </IconContext.Provider>
        
        </button>
      </li>
      <li className='mx-3'>
      <button onClick={() => setColor(colors[4])} className="bg-black py-4 px-4 w-5 h-5 rounded-full"> </button>
      </li>
      <li className='mx-3'>
      <button onClick={() => setColor(colors[0])} className="bg-red-300 py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mx-3'>
      <button onClick={() => setColor(colors[1])} className="bg-yellow-300 py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mx-3'>
      <button onClick={() => setColor(colors[2])} className="bg-blue-300 py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mx-3'>
      <button onClick={() => setColor(colors[3])} className="bg-green-300 py-4 px-4 w-4 h-4 rounded-full"> </button>
      </li>
      <li className='mx-6'>
      <a id="download_image_link" href="download_link" onClick={saveImageToLocal} className='text-gray-800'> 
      <IconContext.Provider value={{size:30}}> 
          <FaDownload/> 
          </IconContext.Provider>
      </a>
      </li>
      </ul>
     
    </div>
    
    </div>
    </>
  )
}

export default Whiteboard;

import { useEffect, useMemo, useRef, useState} from 'react';
function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

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
  }, [colors]);

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
};

export default Whiteboard;
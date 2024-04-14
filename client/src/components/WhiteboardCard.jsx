export const WhiteboardCard = () => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow mb-8 px-2 md:max-w-xs md:px-4 flex flex-col h-80 relative"> 
      <div className="px-6 py-4 flex-grow flex justify-center"> 
        <div className="font-bold text-xl text-center">Project Name Placeholder</div>
      </div>
      <img className="w-full object-cover" src="/img/placeholder.jpeg" alt="Placeholder Image"/>
      <div className="px-6 pt-4 pb-2 flex justify-center space-x-2">
        <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Add</button>
        <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Edit</button>
        <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Share</button>
      </div>
    </div>
  );
}

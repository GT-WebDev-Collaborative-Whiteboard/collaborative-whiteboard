export const NewWhiteboardCard = () => {
    return (
      <div className="max-w-xs rounded overflow-hidden shadow mb-8 px-2 md:max-w-xs md:px-4 flex flex-col h-80 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="inline-block font-bold bg-gray-200 rounded-full py-2 px-4 text-lg font-semibold text-gray-700 mb-2 text-center">
            Create
          </button>
        </div>
        <div className="px-6 py-4 flex-grow">
          <div className="font-bold text-xl mb-2">
            <div className="m-auto text-center">Create New Project</div>
          </div>
        </div>
        
      </div>
    );
  }
  
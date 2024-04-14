import { WhiteboardCard } from '../components/WhiteboardCard';
import { NewWhiteboardCard } from '../components/NewWhiteboardCard';

function Dashboard() {
  return (
    <div className="p-10 md:p-8">
      {/* feel free to adjust the rows dynamically */}
      <div className="flex justify-center mb-8">
        <div className="w-1/5 px-2">
          <NewWhiteboardCard/>
        </div>
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
        <div className="w-1/5 px-2">
          <WhiteboardCard/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

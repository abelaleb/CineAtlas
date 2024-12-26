// import MainContent from './components/MainContent';
// import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ActorPage from './pages/ActorPage';
function App() {
  return (
    <>
      <div className="flex flex-col">
        <div>
          <Navbar />
        </div>
        <div>
          <ActorPage />
        </div>
        <div className="grid grid-cols-4">
          {/* <div className="col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-3 bg-red-200">
            <MainContent />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;

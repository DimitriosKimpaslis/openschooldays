import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className=" ">
      <Header />
      {/* a spacer for the transparent absolute header */}
      <Outlet />
    </div>
  );
}

export default App;

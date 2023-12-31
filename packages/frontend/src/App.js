import './App.css';
import Main from "./views/Main"
import { useState } from 'react';
import BlueHeader from './components/Headers';
import Logs from './views/Logs';
function App() {

const [main, setMain] = useState(true)
  
  return (
    <div className="App">
      <BlueHeader nav={main}  showLogs={()=>setMain(false)} showMobiles={()=>setMain(true)}/>
      {main ? <Main/>  :<Logs/> }
   
      

    </div>
  );
}

export default App;

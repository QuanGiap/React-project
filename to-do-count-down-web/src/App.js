import './App.css';
import InputNote from './component/InputNote';
import Navbar from './component/Navbar';
import useStyle from './component/style';
function App() {
  const classes = useStyle();
  return (
    <div>
      <Navbar/>
      <InputNote classes={classes}/>
    </div>
  );
}

export default App;

import './App.css';
import ChatBot from './components/chatbot';
import Background from './assets/Background.jpg';


function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', paddingRight:'20px',alignItems:'center',backgroundImage: `url(${Background})`,
    backgroundSize:'100% 120%',
    backgroundRepeat:'no-repeat' ,backgroundColor: '#F8F8F8', height: '100vh' }}>
      <div>
        <ChatBot />
      </div>
    </div>

  );
}

export default App;

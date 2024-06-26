import './App.css';
import { AuthProvider } from './components/context/AuthContext';
import GymApp from './components/main/GymApp';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <GymApp />
      </AuthProvider>
    </div>
  );
}

export default App;

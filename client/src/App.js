import logo from './logo.svg';
import LoginForm from '../components/login';
import UserRegistrationForm from '../components/registration';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LoginForm/>
        <UserRegistrationForm/>
      </header>
    </div>
  );
}

export default App;

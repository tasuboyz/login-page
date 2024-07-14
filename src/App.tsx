import React from 'react';
import './App.css'
import { Telegram } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

function App() {
  const [password, setPassword] = React.useState('');
  const [account, setAccount] = React.useState('');
  // const [initData, setInitData] = useState('');

  const inviaMessaggio = (): void => {
    const post = {
        account: account,
        password: password
    }
    window.Telegram.WebApp.sendData(JSON.stringify(post));
};

  return (
    <>
      <div className="container">
      <input
        type="text"
        placeholder="Write here account"
        className="input-account"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <input
        type="password"
        placeholder="Write here password"
        className="input-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Bottone di invio post */}
      <button className="button" onClick={inviaMessaggio}>Login</button>
    </div>
    </>
  )
}

export default App

import React from 'react';
import './App.css'
import { Telegram } from "@twa-dev/types";
import { postAPI } from './api/http_request';

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

function App() {
  const [wif, setWif] = React.useState('');
  const [account, setAccount] = React.useState('');
  // const [initData, setInitData] = useState('');

  const inviaMessaggio = (): void => {
    const post = {
        account: account,
        password: wif
    }
    window.Telegram.WebApp.sendData(JSON.stringify(post));
};

return (
  <div className="wrapper">
      <form>
          <h1>Login</h1>
          <div className="group">
              <input type="account" required value={account} onChange={(e) => setAccount(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Account</label>
          </div>
          <div className="group">
              <input type="password" required value={wif} onChange={(e) => setWif(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Posting Key</label>
          </div>
          <div className="btn-box">
              <button className="btn btn-submit" type="button" onClick={inviaMessaggio}>Login</button>
          </div>
      </form>
  </div>
  )
}

export default App

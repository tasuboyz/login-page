import React from 'react';
import { Telegram } from "@twa-dev/types";
import { postAPI } from './api/http_request';
import './App.css'

declare global {
    interface Window {
        Telegram: Telegram;
    }
}

function LoginPage() {
    const [account, setAccount] = React.useState('');
    const [wif, setWif] = React.useState('');

    const inviaMessaggio = async (): Promise<void> => {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        const login_info = { userId: user ? user.id : null, account: account, wif: wif };
        try {
            const response = await postAPI.login(login_info);
            if (response.error) {
                throw new Error(response.error);
            }
            window.Telegram.WebApp.showPopup({
                title: "Login effettuato",
                message: `Login effettuato con successo!`,
                buttons: [{ type: 'ok' }]
            });
            window.location.reload();
        } catch (error) {
            window.Telegram.WebApp.showPopup({
                title: "Errore",
                message: `${error}`,
                buttons: [{ type: 'ok' }]
            });
            console.error('Errore durante l\'invio del messaggio:', error);
        }
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
    );
}

export default LoginPage;

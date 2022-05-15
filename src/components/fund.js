import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAccount, getDefaults } from './redux/selector';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
const reach = loadStdlib(process.env);

const navigate = useNavigate();
const {standardUnit} = reach;

function FundAccount() {
    const [amount, setAmount] = useState();
    const dispatch = useDispatch();
    const _fetch = useSelector();

    const handleChange = (e) => {
        e.preventDefault;
        setAmount(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault;
        await reach.fundFromFaucet(_fetch(getAccount.acc), reach.parseCurrency(amount));
        navigate("/role");
    };

    const skip = (e) => {
        e.preventDefault;
        navigate("/role");
    };

    return (
        <div className='fund'>
            <div className='bal'>
                <h1>Your Balance is currently {_fetch(getAccount.Balance)}</h1>
            </div>
            <h1>Do you want to fund your account with more {standardUnit}</h1>
            <div className='funding'>
                <input onChange={handleChange} placeholder={_fetch(getDefaults.defaultFundAmt)} type='text'/>
                <button className='funding_btn' onClick={handleClick}>Fund your Account</button>
            </div>
            <div className='skip'>
                <button className='skip_btn' onClick={skip}>Skip</button>
            </div>
        </div>
    );
};

export default FundAccount;
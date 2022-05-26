import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './Nav.css';
import logo from '../../../assets/Koibanx-Logo.png';
import { AiOutlineUser } from 'react-icons/ai';

const Nav = () => {
  let resolved = useResolvedPath('/');
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div id={'nav'} className={'container'}>
      <div>
        <Link to={'/'}><img src={logo} alt={'Koibanx'} />
        </Link>
      </div>
      <div>
        <Link to={'/'}><button className={`btn-nav${match ? ' active' : ''}`}>Wallet</button></Link>
        <Link to={'/convert'}><button className={`btn-nav${!match ? ' active' : ''}`}>Convert</button></Link>
      </div>
      <div>
        <button className={'btn-account'}><AiOutlineUser /></button>
      </div>
    </div>
  );
};

export default Nav;

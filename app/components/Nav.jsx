import { func } from 'prop-types';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { moonIcon } from './icons';
import { sunIcon } from './icons';
export default function Nav({ theme, toggleTheme }) {
   return (
      <nav className='split'>
         <NavLink
            to='/'
            className={({ clicked }) => 'nav-link' + (clicked ? ' active' : '')}
         >
            Github Battle
         </NavLink>
         <ul className='row'>
            <li>
               <NavLink
                  to='/'
                  className={({ clicked }) =>
                     'nav-link ' + (clicked ? ' active' : '')
                  }
               >
                  Popular
               </NavLink>
            </li>
            <li>
               <NavLink
                  to='/battle'
                  className={({ isActive }) =>
                     'nav-link ' + (isActive ? ' active' : '')
                  }
               >
                  Battle
               </NavLink>
            </li>
            <li>
               <button className='btn secondary icon' onClick={toggleTheme}>
                  {theme === 'light' ? moonIcon : sunIcon}
               </button>
            </li>
            <li>
               <NavLink
                  to='/'
                  className={({ isActive }) =>
                     'btn secondary ' + (isActive ? ' active' : '')
                  }
               >
                  Reset
               </NavLink>
            </li>
         </ul>
      </nav>
   );
}

Nav.propTypes = {
   theme: PropTypes.string.isRequired,
   toggleTheme: PropTypes.func.isRequired,
};

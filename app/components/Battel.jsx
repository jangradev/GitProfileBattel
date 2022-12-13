import * as React from 'react';
import PropType from 'prop-types';
import { close } from './icons';
import { Link } from 'react-router-dom';

function Instruction() {
   return (
      <section className='instructions-container'>
         <h2>Instruction</h2>
         <ol>
            <li> Enter 2 Github Users</li>
            <li> Battel</li>
            <li> See the winner</li>
         </ol>
      </section>
   );
}
class PlayerInput extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state.username);
   }
   handleChange(e) {
      this.setState({
         username: e.target.value,
      });
   }

   render() {
      return (
         <form className='card bg-light' onSubmit={this.handleSubmit}>
            <label htmlFor='username' className='player-label'>
               {this.props.label}
            </label>
            <div className='input-row'>
               <input
                  input='text'
                  id='username'
                  className='input-light'
                  placeholder='github username'
                  autoComplete='off'
                  value={this.state.username}
                  onChange={this.handleChange}
               />
               <button
                  className='btn link btn-dark'
                  type='submit'
                  disabled={!this.state.username}
               >
                  Submit
               </button>
            </div>
         </form>
      );
   }
}
function PlayerPreview({ username, onReset, label }) {
   return (
      <article className='card'>
         <h3 className='player-label'>{label}</h3>
         <div className='split'>
            <div className='row gap-md'>
               <img
                  width={32}
                  height={32}
                  className='avatar'
                  src={`http://github.com/${username}.png?size200`}
                  alt={`Avatar for ${username}`}
               />
               <a href={`http://github.com/${username}`} className='link'>
                  {username}
               </a>
            </div>
            <button onClick={onReset} className='btn secondary icon'>
               {close}
            </button>
         </div>
      </article>
   );
}
PlayerPreview.prototype = {
   username: PropType.string.isRequired,
   onReset: PropType.func.isRequired,
   label: PropType.string.isRequired,
};
export default class Battel extends React.Component {
   state = {
      playerOne: null,
      playerTwo: null,
   };

   handleSubmit = (id, player) => {
      this.setState({
         [id]: player,
      });
   };
   handleReset = (id) => {
      this.setState({
         [id]: null,
      });
   };
   render() {
      const { playerOne, playerTwo } = this.state;
      const disabled = !playerOne || !playerTwo;

      return (
         <main className='stack main-stack animate-in'>
            <div className='split'>
               <Link
                  to={{
                     pathname: '/results',
                     search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
                  }}
                  className={`btn primary ${disabled ? 'disabled' : ''}`}
               >
                  Battel
               </Link>
            </div>
            <section className='grid'>
               {playerOne === null ? (
                  <PlayerInput
                     label='Player One'
                     onSubmit={(player) =>
                        this.handleSubmit('playerOne', player)
                     }
                  />
               ) : (
                  <PlayerPreview
                     label={playerOne}
                     username={playerOne}
                     onReset={() => this.handleReset('playerOne')}
                  />
               )}
               {playerTwo === null ? (
                  <PlayerInput
                     label='Player Two'
                     onSubmit={(player) =>
                        this.handleSubmit('playerTwo', player)
                     }
                  />
               ) : (
                  <PlayerPreview
                     label={playerTwo}
                     username={playerTwo}
                     onReset={() => this.handleReset('playerTwo')}
                  />
               )}
            </section>
            <section>
               <Instruction />
            </section>
         </main>
      );
   }
}

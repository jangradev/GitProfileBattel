import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Nav from './components/Nav';

const Results = React.lazy(() => import('./components/Result'));
const Popular = React.lazy(() => import('./components/Popular'));
const Battel = React.lazy(() => import('./components/Battel'));

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         theme: 'light',
      };
      this.toggleTheme = this.toggleTheme.bind(this);
   }
   toggleTheme() {
      this.setState(({ theme }) => ({
         theme: theme === 'light' ? 'dark' : 'light',
      }));
   }
   render() {
      return (
         <Router>
            <div className={this.state.theme}>
               <div className='container'>
                  <Nav
                     theme={this.state.theme}
                     toggleTheme={this.toggleTheme}
                  />
                  <React.Suspense fallback={<Loading />}>
                     <Routes>
                        <Route path='/' element={<Popular />} />
                        <Route path='/battle' element={<Battel />} />
                        <Route path='/results' element={<Results />} />
                     </Routes>
                  </React.Suspense>
               </div>
            </div>
         </Router>
      );
   }
}
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

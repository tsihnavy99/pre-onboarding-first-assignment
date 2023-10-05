import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import IssuesList from './pages/IssuesList';
import IssueDetail from './pages/IssueDetail';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header/>
      <Routes>
        <Route path='/' element={<IssuesList/>}/>
        <Route path='/:issueNum' element={<IssueDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

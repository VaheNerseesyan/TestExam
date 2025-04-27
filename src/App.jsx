import './App.css';
import ProductList from './components/ProductList/ProductList';
import { DarkModeProvider } from './components/context';

function App() {
  return (
    <DarkModeProvider>
      <ProductList />
    </DarkModeProvider>
  );
}

export default App;
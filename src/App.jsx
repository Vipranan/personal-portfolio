import ScrollProgressBar from './components/ScrollProgressBar';
import CursorFollowers from './components/CursorFollowers';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import InfoBand from './components/InfoBand';
import SelectedWork from './components/SelectedWork';
import Background from './components/Background';
import ContactFooter from './components/ContactFooter';
import { useScrollFX } from './hooks/useScrollFX';
import './index.css';

function App() {
  const { progressRef, heroRef } = useScrollFX();

  return (
    <div className="noir">
      <ScrollProgressBar innerRef={progressRef} />
      <CursorFollowers />
      <TopBar />
      <Hero heroRef={heroRef} />
      <InfoBand />
      <SelectedWork />
      <Background />
      <ContactFooter />
    </div>
  );
}

export default App;

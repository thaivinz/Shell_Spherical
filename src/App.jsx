import { useState } from 'react';
import { RESULTS } from './data/sphericalData';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import StatusBar from './components/StatusBar';
import ModelSetup from './panels/ModelSetup';
import SensorConfig from './panels/SensorConfig';
import DamageConfig from './panels/DamageConfig';
import PipelineControl from './panels/PipelineControl';
import MFBDIResults from './panels/MFBDIResults';
import DNNRefinement from './panels/DNNRefinement';
import Convergence from './panels/Convergence';
import FinalReport from './panels/FinalReport';

const PANELS = {
  'model-setup': ModelSetup,
  'sensor-config': SensorConfig,
  'damage-config': DamageConfig,
  'pipeline-control': PipelineControl,
  'stage-1-mfbdi': MFBDIResults,
  'stage-2-dnn': DNNRefinement,
  'convergence': Convergence,
  'final-report': FinalReport,
};

export default function App() {
  const [activePanel, setActivePanel] = useState('model-setup');
  const [activeCaseId, setActiveCaseId] = useState('case1');
  const [noiseKey, setNoiseKey] = useState('noise_free');

  const ActivePanel = PANELS[activePanel] || ModelSetup;

  const currentResult = RESULTS[activeCaseId]?.[noiseKey];
  const elementCount = currentResult?.mfbdi?.suspected?.length ?? 0;

  return (
    <div className="min-h-screen bg-surface">
      <TopBar
        activeCaseId={activeCaseId}
        noiseKey={noiseKey}
        onCaseChange={setActiveCaseId}
        onNoiseChange={setNoiseKey}
      />
      <div className="flex min-h-[calc(100vh-64px-32px)]">
        <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />
        <main className="ml-64 flex-1 p-8 bg-surface overflow-x-hidden mb-8">
          <div className="max-w-7xl mx-auto">
            <ActivePanel activeCaseId={activeCaseId} noiseKey={noiseKey} />
          </div>
        </main>
      </div>
      <StatusBar
        activeCaseId={activeCaseId}
        noiseKey={noiseKey}
        engineStatus="idle"
        currentStage={1}
      />
    </div>
  );
}

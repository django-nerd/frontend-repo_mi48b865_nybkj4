import React, { useMemo, useState } from 'react';
import HeaderNav from './components/HeaderNav';
import Hero from './components/Hero';
import ModelSelector from './components/ModelSelector';
import ParameterForm from './components/ParameterForm';
import VisualizationPanel from './components/VisualizationPanel';
import SpaceDictionary from './components/SpaceDictionary';

function fakeClassifier(model, params){
  // Simple deterministic mapping for demo
  const sum = ['u','g','r','i'].reduce((acc,k)=> acc + parseFloat(params[k]||0), 0);
  if(model==='rf') return sum < 60 ? 'STAR' : sum < 90 ? 'GALAXY' : 'QUASAR';
  if(model==='svm') return sum < 65 ? 'STAR' : sum < 95 ? 'GALAXY' : 'QUASAR';
  return sum < 70 ? 'STAR' : sum < 100 ? 'GALAXY' : 'QUASAR';
}

export default function App(){
  const [tab, setTab] = useState('classifier');
  const [model, setModel] = useState('rf');
  const [params, setParams] = useState({ ra: '', dec: '', u: '', g: '', r: '', i: '' });
  const [result, setResult] = useState(null);
  const [facts, setFacts] = useState([]);

  const resultType = result || 'STAR';

  const onSubmit = () => {
    const res = fakeClassifier(model, params);
    setResult(res);
    setFacts([]);
  };

  const onReset = () => {
    setParams({ ra: '', dec: '', u: '', g: '', r: '', i: '' });
    setResult(null);
    setFacts([]);
  };

  const handleRegionClick = (region, fact) => {
    setFacts((prev) => {
      if(prev.find((f)=> f.region===region)) return prev;
      return [...prev, { region, fact }];
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black text-white">
      <HeaderNav activeTab={tab} onChange={setTab} />
      <Hero />

      {tab === 'classifier' ? (
        <main className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-6 backdrop-blur">
              <div>
                <h2 className="text-xl font-semibold">Choose Model</h2>
                <p className="text-violet-200/70 text-sm">Select a learning algorithm to classify SDSS-17 objects.</p>
              </div>
              <ModelSelector selected={model} onSelect={setModel} />

              <div className="pt-2">
                <h3 className="text-lg font-semibold mb-2">Input Parameters</h3>
                <ParameterForm
                  values={params}
                  onChange={(k,v)=> setParams((p)=> ({...p, [k]: v }))}
                  onSubmit={onSubmit}
                  onReset={onReset}
                />
              </div>
            </div>
          </section>

          <section>
            <div className="space-y-4">
              <VisualizationPanel resultType={result || 'STAR'} onRegionClick={handleRegionClick} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-violet-200/70 text-xs mb-1">Result</p>
                    <p className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-indigo-300">
                      {result}
                    </p>
                    <p className="text-violet-200/70 text-sm mt-1">Model: {model === 'rf' ? 'Random Forest' : model === 'svm' ? 'Support Vector Machine' : 'Neural Network'}</p>
                  </div>
                )}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-violet-200/70 text-xs mb-2">Educational Facts</p>
                  {facts.length === 0 ? (
                    <p className="text-violet-300/70 text-sm">Click on different regions of the 3D model to reveal facts.</p>
                  ) : (
                    <ul className="space-y-2">
                      {facts.map((f)=> (
                        <li key={f.region} className="rounded-xl p-3 bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                          <p className="text-fuchsia-200 text-xs mb-1 uppercase tracking-wide">{f.region}</p>
                          <p className="text-violet-100/90 text-sm">{f.fact}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <SpaceDictionary />
      )}

      <footer className="mx-auto max-w-7xl px-4 pb-10 text-center text-violet-300/60 text-sm">
        Built with love for the cosmos.
      </footer>
    </div>
  );
}

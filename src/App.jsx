import React from 'react';
import Layout from './components/Layout';
import DiscoverySection from './components/DiscoverySection';
import PerformanceSection from './components/PerformanceSection';

const App = () => {
  return (
    <Layout>
      <DiscoverySection />
      <PerformanceSection />
    </Layout>
  );
};

export default App; 
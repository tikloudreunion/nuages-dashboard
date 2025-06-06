import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ContainerList from './components/ContainerList';
import CreateContainerModal from './components/CreateContainerModal';
import AccountSettings from './components/AccountSettings';
import NotificationBar from './components/NotificationBar';
import type { Container, Notification, CreateContainerData } from './types';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Welcome to Ti Kloud Réunion! Your dashboard is ready.',
      type: 'success',
      timestamp: new Date().toISOString(),
    },
  ]);

  const [containers, setContainers] = useState<Container[]>([
    {
      id: '1',
      name: 'webapp-demo',
      domain: 'webapp-demo.nuages.tikloud.re',
      status: 'running',
      uptime: '2d 14h',
      ram: { used: 1536, total: 2048 },
      cpu: 23,
      createdAt: '2024-01-15',
      image: 'ubuntu-22.04',
      services: ['nginx', 'nodejs', 'postgresql'],
    },
    {
      id: '2',
      name: 'api-server',
      domain: 'api-server.nuages.tikloud.re',
      status: 'stopped',
      uptime: '0d 0h',
      ram: { used: 0, total: 1024 },
      cpu: 0,
      createdAt: '2024-01-10',
      image: 'debian-12',
      services: ['python', 'redis'],
    },
  ]);

  const handleCreateContainer = (data: CreateContainerData) => {
    const newContainer: Container = {
      id: Date.now().toString(),
      name: data.name,
      domain: `${data.name}.nuages.tikloud.re`,
      status: 'stopped',
      uptime: '0d 0h',
      ram: { used: 0, total: 1024 },
      cpu: 0,
      createdAt: new Date().toISOString().split('T')[0],
      image: data.image,
      services: data.services,
    };

    setContainers(prev => [...prev, newContainer]);
    
    // Add success notification
    const notification: Notification = {
      id: Date.now().toString(),
      message: `Container "${data.name}" has been created successfully!`,
      type: 'success',
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  const handleStartContainer = (id: string) => {
    setContainers(prev => prev.map(container => 
      container.id === id 
        ? { ...container, status: 'running' as const, uptime: '0d 0h', cpu: Math.floor(Math.random() * 50) + 10 }
        : container
    ));
    
    const container = containers.find(c => c.id === id);
    if (container) {
      const notification: Notification = {
        id: Date.now().toString(),
        message: `Container "${container.name}" is now running.`,
        type: 'success',
        timestamp: new Date().toISOString(),
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  const handleStopContainer = (id: string) => {
    setContainers(prev => prev.map(container => 
      container.id === id 
        ? { ...container, status: 'stopped' as const, uptime: '0d 0h', cpu: 0 }
        : container
    ));
    
    const container = containers.find(c => c.id === id);
    if (container) {
      const notification: Notification = {
        id: Date.now().toString(),
        message: `Container "${container.name}" has been stopped.`,
        type: 'info',
        timestamp: new Date().toISOString(),
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  const handleDeleteContainer = (id: string) => {
    const container = containers.find(c => c.id === id);
    setContainers(prev => prev.filter(container => container.id !== id));
    
    if (container) {
      const notification: Notification = {
        id: Date.now().toString(),
        message: `Container "${container.name}" has been deleted.`,
        type: 'warning',
        timestamp: new Date().toISOString(),
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (view === 'create') {
      setShowCreateModal(true);
      setCurrentView('containers'); // Stay on containers view
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard containers={containers} />;
      case 'containers':
        return (
          <ContainerList
            containers={containers}
            onCreateNew={() => setShowCreateModal(true)}
            onStart={handleStartContainer}
            onStop={handleStopContainer}
            onDelete={handleDeleteContainer}
          />
        );
      case 'settings':
        return <AccountSettings />;
      default:
        return <Dashboard containers={containers} />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={handleViewChange}>
      <NotificationBar 
        notifications={notifications} 
        onDismiss={handleDismissNotification} 
      />
      {renderCurrentView()}
      <CreateContainerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateContainer}
      />
    </Layout>
  );
}

export default App;
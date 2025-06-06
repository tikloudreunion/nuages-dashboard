import React from 'react';
import { Plus, Cloud } from 'lucide-react';
import ContainerCard from './ContainerCard';
import type { Container } from '../types';

interface ContainerListProps {
  containers: Container[];
  onCreateNew: () => void;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ContainerList({ 
  containers, 
  onCreateNew, 
  onStart, 
  onStop, 
  onDelete 
}: ContainerListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Nuages</h1>
          <p className="text-gray-600">Manage your personal LXC containers</p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Nuage</span>
        </button>
      </div>

      {containers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No containers yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first Nuage to start building and deploying your applications.
          </p>
          <button
            onClick={onCreateNew}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Nuage</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {containers.map((container) => (
            <ContainerCard
              key={container.id}
              container={container}
              onStart={onStart}
              onStop={onStop}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
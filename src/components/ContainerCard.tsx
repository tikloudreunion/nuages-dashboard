import React from 'react';
import { 
  Play, 
  Square, 
  Trash2, 
  Clock, 
  Cpu, 
  HardDrive,
  ExternalLink,
  Circle
} from 'lucide-react';
import type { Container } from '../types';

interface ContainerCardProps {
  container: Container;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ContainerCard({ container, onStart, onStop, onDelete }: ContainerCardProps) {
  const formatRAM = (used: number, total: number) => {
    return `${(used / 1024).toFixed(1)}GB / ${(total / 1024).toFixed(1)}GB`;
  };

  const getStatusColor = (status: Container['status']) => {
    return status === 'running' 
      ? 'text-green-600 bg-green-100' 
      : 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{container.name}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(container.status)}`}>
              <Circle className="w-2 h-2 mr-1 fill-current" />
              {container.status === 'running' ? 'Running' : 'Stopped'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
            <ExternalLink className="w-4 h-4" />
            <a 
              href={`https://${container.domain}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              {container.domain}
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Image: {container.image} • Created {new Date(container.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Metrics */}
      {container.status === 'running' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Uptime</p>
              <p className="text-sm font-medium text-gray-900">{container.uptime}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">RAM Usage</p>
              <p className="text-sm font-medium text-gray-900">
                {formatRAM(container.ram.used, container.ram.total)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">CPU Usage</p>
              <p className="text-sm font-medium text-gray-900">{container.cpu}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Services */}
      {container.services.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Services:</p>
          <div className="flex flex-wrap gap-2">
            {container.services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        {container.status === 'stopped' ? (
          <button
            onClick={() => onStart(container.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <Play className="w-4 h-4" />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={() => onStop(container.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm font-medium"
          >
            <Square className="w-4 h-4" />
            <span>Stop</span>
          </button>
        )}
        <button
          onClick={() => onDelete(container.id)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
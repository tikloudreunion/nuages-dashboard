import React from 'react';
import { Cloud, Server, Activity, Users } from 'lucide-react';
import type { Container } from '../types';

interface DashboardProps {
  containers: Container[];
}

export default function Dashboard({ containers }: DashboardProps) {
  const runningContainers = containers.filter(c => c.status === 'running').length;
  const totalContainers = containers.length;
  const totalRAM = containers.reduce((sum, c) => sum + c.ram.used, 0);
  const avgCPU = containers.length > 0 
    ? containers.reduce((sum, c) => sum + c.cpu, 0) / containers.length 
    : 0;

  const stats = [
    {
      label: 'Active Nuages',
      value: runningContainers,
      total: totalContainers,
      icon: Cloud,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Total RAM Usage',
      value: `${(totalRAM / 1024).toFixed(1)}GB`,
      icon: Server,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'Average CPU',
      value: `${avgCPU.toFixed(1)}%`,
      icon: Activity,
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      label: 'Total Containers',
      value: totalContainers,
      icon: Users,
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Ti Kloud Réunion dashboard. Manage your Nuages with ease.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                    {stat.total !== undefined && (
                      <span className="text-sm text-gray-500 ml-1">/ {stat.total}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {containers.length === 0 ? (
          <div className="text-center py-8">
            <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No containers yet</p>
            <p className="text-sm text-gray-500">Create your first Nuage to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {containers.slice(0, 5).map((container) => (
              <div key={container.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    container.status === 'running' ? 'bg-green-400' : 'bg-gray-300'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{container.name}</p>
                    <p className="text-sm text-gray-500">{container.domain}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 capitalize">{container.status}</p>
                  <p className="text-xs text-gray-500">
                    {container.status === 'running' ? container.uptime : 'Stopped'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
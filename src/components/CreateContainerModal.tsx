import React, { useState } from 'react';
import { X, Cloud, Server, Package } from 'lucide-react';
import type { CreateContainerData } from '../types';

interface CreateContainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateContainerData) => void;
}

const baseImages = [
  { id: 'ubuntu-22.04', name: 'Ubuntu 22.04 LTS', description: 'Latest Ubuntu with long-term support' },
  { id: 'debian-12', name: 'Debian 12', description: 'Stable Debian release' },
  { id: 'alpine-3.18', name: 'Alpine Linux 3.18', description: 'Lightweight security-focused distribution' },
  { id: 'centos-9', name: 'CentOS Stream 9', description: 'Enterprise-class Linux distribution' },
];

const availableServices = [
  { id: 'nginx', name: 'Nginx', description: 'High-performance web server' },
  { id: 'apache', name: 'Apache HTTP Server', description: 'Popular web server' },
  { id: 'nodejs', name: 'Node.js', description: 'JavaScript runtime for server-side applications' },
  { id: 'python', name: 'Python', description: 'Python programming language and pip' },
  { id: 'php', name: 'PHP', description: 'Server-side scripting language' },
  { id: 'mysql', name: 'MySQL', description: 'Popular database management system' },
  { id: 'postgresql', name: 'PostgreSQL', description: 'Advanced open-source database' },
  { id: 'redis', name: 'Redis', description: 'In-memory data structure store' },
];

export default function CreateContainerModal({ isOpen, onClose, onSubmit }: CreateContainerModalProps) {
  const [formData, setFormData] = useState<CreateContainerData>({
    name: '',
    image: 'ubuntu-22.04',
    services: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Container name is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain lowercase letters, numbers, and hyphens';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: '', image: 'ubuntu-22.04', services: [] });
      onClose();
    }
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Cloud className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Create New Nuage</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Container Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Container Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., my-webapp"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            <p className="mt-1 text-sm text-gray-500">
              Your container will be accessible at: {formData.name || 'your-name'}.nuages.tikloud.re
            </p>
          </div>

          {/* Base Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Base Image
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {baseImages.map((image) => (
                <label
                  key={image.id}
                  className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                    formData.image === image.id
                      ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="image"
                    value={image.id}
                    checked={formData.image === image.id}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="sr-only"
                  />
                  <div className="flex items-start space-x-3">
                    <Server className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{image.name}</div>
                      <div className="text-sm text-gray-500">{image.description}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Optional Services
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableServices.map((service) => (
                <label
                  key={service.id}
                  className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                    formData.services.includes(service.id)
                      ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                    className="sr-only"
                  />
                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-500">{service.description}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Create Nuage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
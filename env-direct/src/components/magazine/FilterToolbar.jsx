import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  Squares2X2Icon,
  ViewColumnsIcon,
  MapIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const FilterToolbar = ({
  searchTerm,
  onSearchChange,
  onSearch,
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  sortOptions,
  viewMode,
  onViewModeChange,
  showFilters,
  onToggleFilters,
  totalElements
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleFilterReset = () => {
    Object.keys(filters).forEach(key => {
      onFilterChange(key, '');
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'all').length;

  const viewModes = [
    { id: 'grid', icon: Squares2X2Icon, label: 'Grid' },
    { id: 'masonry', icon: ViewColumnsIcon, label: 'Masonry' },
    { id: 'map', icon: MapIcon, label: 'Map' }
  ];

  const categories = [
    'Climate Science', 'Marine Conservation', 'Restoration', 'AI Research', 'Policy Analysis'
  ];

  const locations = [
    'Dominica', 'Caribbean', 'Roseau', 'Portsmouth', 'Soufrière', 'Boiling Lake'
  ];

  return (
    <div className="py-4">
      {/* Main Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left Section - Search */}
        <div className="flex-1 max-w-2xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={localSearchTerm}
              onChange={(e) => {
                setLocalSearchTerm(e.target.value);
                onSearchChange(e.target.value);
              }}
              placeholder="Search environmental intelligence..."
              className="w-full bg-lavaGrey-800/80 border border-envGreen-800/30 text-white placeholder-skyAsh-400 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-envGreen-500 focus:ring-2 focus:ring-envGreen-500/20 transition-all duration-300"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-skyAsh-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-envGreen-600 hover:bg-envGreen-700 p-1.5 rounded-lg transition-colors"
            >
              <MagnifyingGlassIcon className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Results Count */}
          <div className="text-skyAsh-300 text-sm hidden lg:block">
            {totalElements?.toLocaleString() || 0} articles
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-lavaGrey-800 border border-envGreen-800/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-envGreen-500 transition-colors"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-lavaGrey-800 border border-envGreen-800/30 rounded-lg p-1">
            {viewModes.map(mode => (
              <button
                key={mode.id}
                onClick={() => onViewModeChange(mode.id)}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === mode.id
                    ? 'bg-envGreen-600 text-white'
                    : 'text-skyAsh-400 hover:text-white hover:bg-lavaGrey-700'
                }`}
                title={mode.label}
              >
                <mode.icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={onToggleFilters}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
              showFilters || activeFiltersCount > 0
                ? 'bg-envGreen-600 border-envGreen-600 text-white'
                : 'bg-lavaGrey-800 border-envGreen-800/30 text-skyAsh-300 hover:text-white hover:border-envGreen-600'
            }`}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-sandGold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-lavaGrey-800/50 backdrop-blur-sm border border-envGreen-800/30 rounded-xl p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
              <div className="flex items-center space-x-2">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleFilterReset}
                    className="text-coralRed-400 hover:text-coralRed-300 text-sm transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onToggleFilters}
                  className="text-skyAsh-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-skyAsh-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => onFilterChange('category', e.target.value)}
                  className="w-full bg-lavaGrey-700 border border-envGreen-800/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-envGreen-500 transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-skyAsh-300 mb-2">
                  Location
                </label>
                <select
                  value={filters.location || ''}
                  onChange={(e) => onFilterChange('location', e.target.value)}
                  className="w-full bg-lavaGrey-700 border border-envGreen-800/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-envGreen-500 transition-colors"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div>
                <label className="block text-sm font-medium text-skyAsh-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={filters.author || ''}
                  onChange={(e) => onFilterChange('author', e.target.value)}
                  placeholder="Search by author..."
                  className="w-full bg-lavaGrey-700 border border-envGreen-800/30 text-white placeholder-skyAsh-400 rounded-lg px-3 py-2 focus:outline-none focus:border-envGreen-500 transition-colors"
                />
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-skyAsh-300 mb-2">
                  Date Range
                </label>
                <select
                  value={filters.dateRange || 'all'}
                  onChange={(e) => onFilterChange('dateRange', e.target.value)}
                  className="w-full bg-lavaGrey-700 border border-envGreen-800/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-envGreen-500 transition-colors"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t border-envGreen-800/20">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-skyAsh-300">Active filters:</span>
                  {Object.entries(filters).map(([key, value]) => {
                    if (value && value !== 'all') {
                      return (
                        <button
                          key={key}
                          onClick={() => onFilterChange(key, '')}
                          className="flex items-center space-x-1 bg-envGreen-600 text-white px-3 py-1 rounded-full text-sm hover:bg-envGreen-700 transition-colors"
                        >
                          <span>{key}: {value}</span>
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterToolbar; 
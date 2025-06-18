import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Radio, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  Zap,
  Users,
  Satellite,
  Activity,
  Send
} from 'lucide-react';

const LiveCommandLog = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      type: 'system',
      level: 'info',
      source: 'SENSOR-GRID',
      message: 'Rainfall sensor LAY-003 calibration complete',
      details: 'New threshold: 45mm/hr flood warning'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'alert',
      level: 'warning',
      source: 'THREAT-DETECT',
      message: 'Soil moisture levels critical at MORT-012',
      details: 'Landslide risk assessment initiated'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      type: 'comms',
      level: 'success',
      source: 'FIELD-TEAM-A',
      message: 'Response team deployed to Portsmouth Bay',
      details: 'ETA: 15 minutes, Equipment: Marine cleanup kit'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      type: 'satellite',
      level: 'info',
      source: 'SAT-LINK',
      message: 'Sentinel-2 imagery analysis complete',
      details: 'Forest cover change detected: -0.3% in Sector 7'
    }
  ]);

  const [newCommand, setNewCommand] = useState('');
  const logEndRef = useRef(null);
  
  const typeIcons = {
    system: Activity,
    alert: AlertCircle,
    comms: Radio,
    satellite: Satellite,
    user: Terminal
  };

  const levelColors = {
    info: 'text-blue-400 bg-blue-900/20',
    success: 'text-green-400 bg-green-900/20',
    warning: 'text-yellow-400 bg-yellow-900/20',
    error: 'text-red-400 bg-red-900/20',
    critical: 'text-red-500 bg-red-900/40'
  };

  const commandTemplates = [
    'sensor status all',
    'threat level update',
    'deploy team alpha',
    'satellite refresh',
    'alert broadcast',
    'system diagnostic'
  ];

  // Simulate real-time log updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = generateRandomLog();
      setLogs(prev => [newLog, ...prev.slice(0, 19)]); // Keep last 20 logs
    }, 12000 + Math.random() * 8000); // Random interval 12-20 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const generateRandomLog = () => {
    const logTypes = [
      {
        type: 'system',
        level: 'info',
        source: 'SENSOR-GRID',
        messages: [
          'Water level sensor CAR-005 online',
          'Temperature monitoring station updated',
          'Wind speed calibration completed',
          'Solar panel efficiency: 94.2%'
        ]
      },
      {
        type: 'alert',
        level: 'warning',
        source: 'THREAT-DETECT',
        messages: [
          'Unusual wave pattern detected near Scott\'s Head',
          'Bird migration pattern anomaly recorded',
          'Ocean temperature spike: +1.8°C detected'
        ]
      },
      {
        type: 'satellite',
        level: 'info',
        source: 'SAT-LINK',
        messages: [
          'LANDSAT-8 pass completed successfully',
          'Cloud cover analysis updated',
          'Vegetation index calculation finished'
        ]
      }
    ];

    const selectedType = logTypes[Math.floor(Math.random() * logTypes.length)];
    const message = selectedType.messages[Math.floor(Math.random() * selectedType.messages.length)];
    
    return {
      id: Date.now(),
      timestamp: new Date(),
      type: selectedType.type,
      level: selectedType.level,
      source: selectedType.source,
      message: message,
      details: 'Processing automated response protocols'
    };
  };

  const handleCommandSend = () => {
    if (newCommand.trim()) {
      const userLog = {
        id: Date.now(),
        timestamp: new Date(),
        type: 'user',
        level: 'info',
        source: 'COMMANDER',
        message: newCommand,
        details: 'Command executed successfully'
      };
      
      setLogs(prev => [userLog, ...prev]);
      setNewCommand('');
    }
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-green-500/30 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-green-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">COMMAND LOG</h3>
              <p className="text-xs text-green-400">LIVE OPERATIONS</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Log Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-black/20 font-mono text-sm">
        <AnimatePresence initial={false}>
          {logs.map((log, index) => {
            const Icon = typeIcons[log.type] || Activity;
            
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group hover:bg-slate-800/30 p-2 rounded transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {formatTimestamp(log.timestamp)}
                    </span>
                    <div className={`w-4 h-4 rounded flex items-center justify-center ${levelColors[log.level]}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-cyan-400 text-xs font-bold min-w-0">
                      [{log.source}]
                    </span>
                  </div>
                </div>
                
                <div className="ml-6 mt-1">
                  <div className="text-white text-sm">{log.message}</div>
                  <div className="text-gray-400 text-xs mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {log.details}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={logEndRef} />
      </div>

      {/* Command Input */}
      <div className="p-4 border-t border-green-500/30 bg-slate-800/50">
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-mono text-sm">$</span>
          <input
            type="text"
            value={newCommand}
            onChange={(e) => setNewCommand(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCommandSend()}
            placeholder="Enter command..."
            className="flex-1 bg-transparent text-white text-sm font-mono border-none outline-none placeholder-gray-500"
          />
          <button
            onClick={handleCommandSend}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
        
        {/* Quick Commands */}
        <div className="flex flex-wrap gap-1 mt-2">
          {commandTemplates.map((cmd, index) => (
            <button
              key={index}
              onClick={() => setNewCommand(cmd)}
              className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded hover:bg-slate-600 transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCommandLog; 
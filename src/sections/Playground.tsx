import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaCode, FaCheckCircle, FaExclamationTriangle, FaTerminal, FaPlus, FaTrash, FaSearch } from 'react-icons/fa';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/FormElements';
import { useToast } from '../components/ui/Toast';

// ----------------------------------------------------
// Tab 1: Zod Schema & Validation Setup
// ----------------------------------------------------
const jobValidationSchema = z.object({
  jobName: z.string().min(3, { message: 'Job name must be at least 3 characters.' }),
  cargoWeight: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({ invalid_type_error: 'Weight must be a positive number.' }).positive({ message: 'Weight must be greater than 0.' })
  ),
  assignVessel: z.boolean(),
  vesselCode: z.string().optional(),
}).refine(
  (data) => {
    if (data.assignVessel && (!data.vesselCode || data.vesselCode.trim() === '')) {
      return false;
    }
    return true;
  },
  {
    message: 'Vessel Code is required when "Assign Vessel" is enabled.',
    path: ['vesselCode'],
  }
).refine(
  (data) => {
    if (data.assignVessel && data.vesselCode && !data.vesselCode.startsWith('VSL-')) {
      return false;
    }
    return true;
  },
  {
    message: 'Vessel Code must start with prefix "VSL-" (e.g. VSL-1098).',
    path: ['vesselCode'],
  }
);

type JobFormData = z.infer<typeof jobValidationSchema>;

// ----------------------------------------------------
// Tab 2: Zustand-style State Management Setup
// ----------------------------------------------------
interface ShipmentItem {
  id: string;
  destination: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  containerCount: number;
}

const INITIAL_SHIPMENTS: ShipmentItem[] = [
  { id: 'SHP-802', destination: 'Port of Rotterdam', status: 'In Transit', containerCount: 12 },
  { id: 'SHP-441', destination: 'Port of Singapore', status: 'Delivered', containerCount: 25 },
  { id: 'SHP-909', destination: 'Port of New York', status: 'Pending', containerCount: 8 },
];

export const Playground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'validation' | 'state'>('validation');
  const { showToast } = useToast();

  // Tab 1 States (React Hook Form + Zod)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobValidationSchema),
    mode: 'onChange',
    defaultValues: {
      jobName: '',
      assignVessel: false,
      vesselCode: '',
    },
  });

  const formData = watch();
  const assignVesselValue = watch('assignVessel');

  const onFormSubmit = (data: JobFormData) => {
    showToast(`Schema validation passed! Job "${data.jobName}" successfully queued.`, 'success');
    reset();
  };

  // Tab 2 States (Shipment List State Simulator)
  const [shipments, setShipments] = useState<ShipmentItem[]>(INITIAL_SHIPMENTS);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'In Transit' | 'Delivered'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newDest, setNewDest] = useState('');
  const [newContainers, setNewContainers] = useState('5');

  const handleAddShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDest.trim()) return;
    const newId = `SHP-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: ShipmentItem = {
      id: newId,
      destination: newDest,
      status: 'Pending',
      containerCount: parseInt(newContainers) || 1,
    };
    setShipments((prev) => [newItem, ...prev]);
    setNewDest('');
    showToast(`Added ${newId} tracking state.`, 'info');
  };

  const handleDeleteShipment = (id: string) => {
    setShipments((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed tracking entry ${id}.`, 'info');
  };

  const toggleShipmentStatus = (id: string) => {
    setShipments((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus: Record<ShipmentItem['status'], ShipmentItem['status']> = {
            'Pending': 'In Transit',
            'In Transit': 'Delivered',
            'Delivered': 'Pending',
          };
          return { ...item, status: nextStatus[item.status] };
        }
        return item;
      })
    );
  };

  const filteredShipments = shipments.filter((shp) => {
    const matchesFilter = filterStatus === 'All' || shp.status === filterStatus;
    const matchesSearch = shp.destination.toLowerCase().includes(searchQuery.toLowerCase()) || shp.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="playground" className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[-15%] w-[45%] h-[45%] rounded-full bg-indigo-500/3 dark:bg-indigo-500/1.5 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary"
        >
          Interactive Playground
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed"
        >
          A sandbox dashboard illustrating complex cross-field validation rules and state flow logic in real-time.
        </motion.p>
      </div>

      {/* Tab Selectors */}
      <div className="flex justify-center mb-10">
        <div className="bg-bg-secondary p-1 rounded-2xl border border-border-primary/80 flex gap-2">
          <button
            onClick={() => setActiveTab('validation')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'validation'
                ? 'bg-accent text-white shadow-md shadow-accent/15'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Form Schema (Zod Validation)
          </button>
          <button
            onClick={() => setActiveTab('state')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'state'
                ? 'bg-accent text-white shadow-md shadow-accent/15'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            State Explorer (List Simulator)
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'validation' ? (
          <motion.div
            key="validation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start"
          >
            {/* Input Form Column */}
            <div className="lg:col-span-6 space-y-6">
              <Card variant="default" className="p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-border-primary pb-4">
                  <FaTerminal className="text-accent w-5 h-5" />
                  <h3 className="font-heading font-bold text-lg text-text-primary">
                    Maritime Job Planner Form
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                  <Input
                    label="Job / Cargo Name"
                    id="jobName"
                    placeholder="e.g. Iron Ore Shipment B"
                    error={errors.jobName?.message}
                    {...register('jobName')}
                  />

                  <Input
                    label="Cargo Weight (Metric Tons)"
                    id="cargoWeight"
                    type="number"
                    placeholder="e.g. 150"
                    error={errors.cargoWeight?.message}
                    {...register('cargoWeight')}
                  />

                  {/* Toggle Assign Vessel */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-bg-secondary border border-border-primary/60">
                    <div className="text-left space-y-0.5">
                      <label className="text-sm font-semibold text-text-primary cursor-pointer" htmlFor="assignVessel">
                        Assign Cargo Vessel
                      </label>
                      <span className="block text-xs text-text-secondary font-light">
                        Requires validation of custom vessel code structures.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      id="assignVessel"
                      className="w-4.5 h-4.5 accent-accent rounded cursor-pointer"
                      {...register('assignVessel')}
                    />
                  </div>

                  {/* Conditional Vessel Code Input */}
                  <AnimatePresence>
                    {assignVesselValue && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <Input
                          label="Vessel Code"
                          id="vesselCode"
                          placeholder="Must start with VSL- (e.g. VSL-ABC9)"
                          error={errors.vesselCode?.message}
                          {...register('vesselCode')}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full shadow-sm cursor-pointer"
                  >
                    Submit Job Request
                  </Button>
                </form>
              </Card>
            </div>

            {/* Output Visualizer Console */}
            <div className="lg:col-span-6 space-y-6 h-full">
              <Card variant="glass" className="p-6 md:p-8 flex flex-col justify-between h-full bg-[#030712]/45 font-mono text-xs text-slate-300 min-h-[420px]">
                <div className="space-y-4">
                  {/* Console Header */}
                  <div className="flex items-center justify-between border-b border-border-primary pb-3.5">
                    <span className="flex items-center gap-2 font-bold text-text-primary uppercase tracking-wide">
                      <FaCode className="text-accent" />
                      Zod validation console
                    </span>
                    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                      isValid 
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                        : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                    }`}>
                      {isValid ? (
                        <>
                          <FaCheckCircle /> VALID STATE
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle /> INVALID STATE
                        </>
                      )}
                    </span>
                  </div>

                  {/* Watch variables */}
                  <div className="space-y-2">
                    <span className="text-text-secondary font-semibold">// Reactive State values</span>
                    <pre className="p-3.5 bg-bg-primary/80 border border-border-primary/50 rounded-xl overflow-x-auto text-[11px] leading-relaxed">
                      {JSON.stringify(formData, null, 2)}
                    </pre>
                  </div>

                  {/* Active schema errors */}
                  <div className="space-y-2 pt-2">
                    <span className="text-text-secondary font-semibold">// Active schema errors ({Object.keys(errors).length})</span>
                    <div className="space-y-2">
                      {Object.keys(errors).length === 0 ? (
                        <div className="text-emerald-500/80 font-light text-[11px] leading-relaxed p-3.5 border border-emerald-500/20 bg-emerald-500/5 rounded-xl">
                          ✓ No validation schema errors. Form payload conforms to the Zod definition.
                        </div>
                      ) : (
                        <div className="p-3.5 border border-red-500/20 bg-red-500/5 rounded-xl space-y-1.5 text-rose-400 text-[11px]">
                          {Object.entries(errors).map(([field, err]) => (
                            <div key={field} className="flex gap-2 items-start leading-relaxed">
                              <span className="font-bold text-rose-500 shrink-0">[{field}]:</span>
                              <span>{err?.message as string}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-text-secondary text-right pt-6">
                  Real-time validation schema resolution is running on every input change.
                </div>
              </Card>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start"
          >
            {/* Left Side: Shipment Controls */}
            <div className="lg:col-span-7 space-y-6">
              <Card variant="default" className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-primary pb-4">
                  <h3 className="font-heading font-bold text-lg text-text-primary">
                    Active Shipments Tracker
                  </h3>

                  {/* Filter Selectors */}
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Pending', 'In Transit', 'Delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status as 'All' | 'Pending' | 'In Transit' | 'Delivered')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer ${
                          filterStatus === status
                            ? 'bg-accent border-transparent text-white'
                            : 'bg-bg-secondary border-border-primary/80 text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search query */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search destination or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-secondary/45 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                  <FaSearch className="absolute left-3.5 top-[13px] w-3 h-3 text-text-secondary/60 pointer-events-none" />
                </div>

                {/* Interactive list items */}
                <div className="space-y-3 min-h-[220px]">
                  {filteredShipments.map((shp) => (
                    <div
                      key={shp.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-bg-secondary border border-border-primary/60 hover:border-accent-border/30 transition-all"
                    >
                      <div className="text-left space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-text-primary bg-bg-tertiary px-2 py-0.5 rounded border border-border-primary/40">
                            {shp.id}
                          </span>
                          <span className="text-sm font-semibold text-text-primary">{shp.destination}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-text-secondary font-sans font-light">
                          <span>Containers: {shp.containerCount}</span>
                          <span>•</span>
                          {/* Toggle Status badge */}
                          <button
                            onClick={() => toggleShipmentStatus(shp.id)}
                            className={`px-2 py-0.5 rounded font-semibold text-[10px] cursor-pointer border hover:opacity-90 ${
                              shp.status === 'Delivered'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                                : shp.status === 'In Transit'
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-500'
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                            }`}
                            title="Click to toggle status (State Cycle)"
                          >
                            {shp.status}
                          </button>
                        </div>
                      </div>

                      {/* Delete action */}
                      <button
                        onClick={() => handleDeleteShipment(shp.id)}
                        className="p-2 text-text-secondary hover:text-red-500 rounded-lg hover:bg-red-500/5 transition-colors cursor-pointer"
                        title="Remove shipment state"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {filteredShipments.length === 0 && (
                    <div className="text-center py-12 text-text-secondary text-sm font-light">
                      No active shipments match filters.
                    </div>
                  )}
                </div>

                {/* Inline Add Shipment Form */}
                <form onSubmit={handleAddShipment} className="flex flex-col sm:flex-row gap-3 border-t border-border-primary/50 pt-5">
                  <input
                    type="text"
                    placeholder="Enter destination port..."
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border-primary bg-bg-secondary text-text-primary text-sm focus:outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="Containers"
                    value={newContainers}
                    onChange={(e) => setNewContainers(e.target.value)}
                    className="w-full sm:w-24 px-4 py-2.5 rounded-xl border border-border-primary bg-bg-secondary text-text-primary text-sm focus:outline-none focus:border-accent"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="inline-flex gap-2 items-center justify-center cursor-pointer shadow-sm"
                  >
                    <FaPlus className="w-3 h-3" /> Add
                  </Button>
                </form>
              </Card>
            </div>

            {/* Right Side: Reactive State Visualizer */}
            <div className="lg:col-span-5 space-y-6">
              <Card variant="glass" className="p-6 md:p-8 bg-[#030712]/45 font-mono text-xs text-slate-300 min-h-[420px] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border-primary pb-3.5">
                    <FaTerminal className="text-accent" />
                    <span className="font-bold text-text-primary uppercase tracking-wide">
                      State visualizer console
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-text-secondary font-semibold">// Current state tree structure (JSON)</span>
                    <pre className="p-3.5 bg-bg-primary/80 border border-border-primary/50 rounded-xl overflow-x-auto text-[11px] leading-relaxed max-h-[300px] overflow-y-auto scrollbar-thin">
                      {JSON.stringify(shipments, null, 2)}
                    </pre>
                  </div>
                </div>

                <div className="text-[10px] text-text-secondary text-right pt-6">
                  Adding, deleting, or status-toggling immediately re-renders the reactive state container.
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Playground;

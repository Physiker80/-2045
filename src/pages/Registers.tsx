import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Briefcase, MapPin, Zap, Leaf, Landmark, HeartHandshake,
  Search, X, Database, CheckCircle2, Clock, BarChart3, Activity,
  Play, Server, Terminal, ArrowRight, Filter, Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const registers = [
  {
    id: 1, title: 'سجل السكان الوطني', icon: Users, color: 'emerald',
    description: 'البيانات الديموغرافية الشاملة تشمل العمر والجنس والتعليم والصحة ومحل الإقامة والحالة المدنية وحالة النزوح وبيانات المغتربين.',
    status: 'أولوية قصوى',
    stats: { completeness: 85, records: '2,540,120', lastUpdated: 'قبل ساعتين', activeNodes: 142 }
  },
  {
    id: 2, title: 'السجل الاقتصادي الوطني', icon: Briefcase, color: 'blue',
    description: 'المنشآت الصناعية والتجارية والزراعية والإنتاج والتصدير ومعدلات التوظيف والبطالة والأجور والإيرادات الضريبية.',
    status: 'أولوية قصوى',
    stats: { completeness: 62, records: '12,450', lastUpdated: 'قبل 5 ساعات', activeNodes: 38 }
  },
  {
    id: 3, title: 'سجل الأراضي والعقارات الرقمي', icon: MapPin, color: 'orange',
    description: 'الملكيات وتاريخها واستخداماتها وحجم الأضرار وقيم السوق والحالة القانونية. حاسم في مرحلة إعادة الإعمار.',
    status: 'أولوية عالية',
    stats: { completeness: 45, records: '180,000', lastUpdated: 'قبل يوم واحد', activeNodes: 56 }
  },
  {
    id: 4, title: 'سجل البنية التحتية', icon: Zap, color: 'yellow',
    description: 'الطرق والشبكات الكهربائية والمياه والصرف الصحي والاتصالات والمستشفيات والمدارس، مرتبطةً بنظام معلومات جغرافية GIS.',
    status: 'أولوية عالية',
    stats: { completeness: 70, records: '8,920', lastUpdated: 'قبل 3 ساعات', activeNodes: 24 }
  },
  {
    id: 5, title: 'سجل الموارد الطبيعية والزراعية', icon: Leaf, color: 'green',
    description: 'الأراضي الزراعية ومصادر المياه والموارد المعدنية ومعطيات التغير المناخي، يدعم المشروع الزراعي البالغ $4.8–5.6 مليار.',
    status: 'أولوية عالية',
    stats: { completeness: 55, records: '3,400', lastUpdated: 'قبل يومين', activeNodes: 12 }
  },
  {
    id: 6, title: 'سجل المالية العامة', icon: Landmark, color: 'purple',
    description: 'الإيرادات الضريبية والإنفاق الحكومي والدين العام والتدفقات المالية الدولية والمساعدات والقروض.',
    status: 'استراتيجي',
    stats: { completeness: 90, records: '450,000', lastUpdated: 'قبل ساعة', activeNodes: 85 }
  },
  {
    id: 7, title: 'سجل الرفاه الاجتماعي', icon: HeartHandshake, color: 'pink',
    description: 'معدلات الفقر ومؤشرات التنمية البشرية وخدمات الحماية الاجتماعية ومستوى الخدمات الصحية والتعليمية.',
    status: 'استراتيجي',
    stats: { completeness: 78, records: '520,000', lastUpdated: 'قبل 4 ساعات', activeNodes: 41 }
  }
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blue: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

const progressColorMap: Record<string, string> = {
  emerald: 'bg-emerald-500',
  blue: 'bg-cyan-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500',
  green: 'bg-emerald-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
};

const mockFlowData = [
  { time: '10:00', requests: 120 },
  { time: '10:05', requests: 250 },
  { time: '10:10', requests: 180 },
  { time: '10:15', requests: 300 },
  { time: '10:20', requests: 280 },
  { time: '10:25', requests: 420 },
];

export default function Registers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegister, setSelectedRegister] = useState<typeof registers[0] | null>(null);
  const [modalView, setModalView] = useState<'overview' | 'query' | 'flow'>('overview');
  const [isQuerying, setIsQuerying] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[10:25:01] SYNC_OK: Node_Ministry_Interior - 150 records',
    '[10:25:03] SYNC_OK: Node_Aleppo_Municipality - 42 records',
    '[10:25:05] VALIDATION_PASS: Batch #8921',
  ]);

  useEffect(() => {
    if (modalView === 'flow') {
      const interval = setInterval(() => {
        const newLog = `[${new Date().toLocaleTimeString()}] SYNC_OK: Node_${Math.floor(Math.random() * 100)} - ${Math.floor(Math.random() * 50)} records`;
        setLogs(prev => [newLog, ...prev].slice(0, 10));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [modalView]);

  const filteredRegisters = registers.filter(reg => 
    reg.title.includes(searchTerm) || reg.description.includes(searchTerm)
  );

  const handleCloseModal = () => {
    setSelectedRegister(null);
    setTimeout(() => setModalView('overview'), 300); // Reset view after animation
  };

  const renderOverview = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      {/* Progress */}
      <div>
        <div className="flex justify-between items-end mb-2">
          <h4 className="font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            نسبة اكتمال البيانات
          </h4>
          <span className="text-2xl font-bold text-white font-mono">{selectedRegister?.stats.completeness}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${selectedRegister?.stats.completeness}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full rounded-full ${selectedRegister ? progressColorMap[selectedRegister.color] : ''} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-sm mb-1 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-500" />
            إجمالي السجلات
          </div>
          <div className="text-xl font-bold text-white font-mono">{selectedRegister?.stats.records}</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-sm mb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            آخر تحديث
          </div>
          <div className="text-xl font-bold text-white">{selectedRegister?.stats.lastUpdated}</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 col-span-2 md:col-span-1">
          <div className="text-slate-400 text-sm mb-1 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            عقد الربط النشطة
          </div>
          <div className="text-xl font-bold text-white font-mono">{selectedRegister?.stats.activeNodes} <span className="text-sm font-sans text-slate-500">جهة</span></div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-slate-800">
        <button 
          onClick={() => setModalView('query')}
          className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 border border-slate-700"
        >
          <Database className="w-5 h-5 text-cyan-400" />
          استعلام البيانات
        </button>
        <button 
          onClick={() => setModalView('flow')}
          className="flex-1 bg-cyan-500/10 text-cyan-400 py-3 rounded-xl font-bold hover:bg-cyan-500/20 transition-colors border border-cyan-500/30 flex items-center justify-center gap-2"
        >
          <Activity className="w-5 h-5" />
          مراقبة التدفق
        </button>
      </div>
    </motion.div>
  );

  const renderQuery = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="اكتب استعلامك هنا (مثال: SELECT * FROM records WHERE status='active')" 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900 font-mono text-left text-sm text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-600"
            dir="ltr"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 text-slate-300 px-4 py-3 rounded-xl hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setIsQuerying(true);
              setTimeout(() => setIsQuerying(false), 1000);
            }}
            className="bg-cyan-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            {isQuerying ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Play className="w-4 h-4" />
                تنفيذ
              </>
            )}
          </button>
        </div>
      </div>

      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900">
          <h3 className="font-bold text-slate-300">نتائج الاستعلام (أحدث 5 سجلات)</h3>
          <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            تصدير CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-medium">المعرف (ID)</th>
                <th className="p-4 font-medium">البيان</th>
                <th className="p-4 font-medium">تاريخ التحديث</th>
                <th className="p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className={isQuerying ? 'opacity-50' : ''}>
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono text-cyan-500">#{selectedRegister?.id}00{i}A</td>
                  <td className="p-4 text-slate-300">سجل بيانات تجريبي مرتبط بـ {selectedRegister?.title}</td>
                  <td className="p-4 font-mono text-slate-400">2026-03-12 10:4{i}:00</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-xs font-bold">
                      موثق
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderFlow = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-sm mb-1">معدل التدفق (بالدقيقة)</div>
          <div className="text-2xl font-bold text-white flex items-center gap-2 font-mono">
            420 <span className="text-sm text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">+12%</span>
          </div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-sm mb-1">حالة الخوادم</div>
          <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <Server className="w-5 h-5" /> متصل
          </div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
          <div className="text-slate-400 text-sm mb-1">معدل الأخطاء (24h)</div>
          <div className="text-2xl font-bold text-white font-mono">0.01%</div>
        </div>
      </div>

      <div className="h-64 border border-slate-800 rounded-xl p-4 bg-slate-900/50">
        <h3 className="font-bold text-slate-300 mb-4 text-sm">حجم البيانات المتدفقة (آخر ساعة)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={mockFlowData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} dx={-10} />
            <RechartsTooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#f8fafc' }}
              itemStyle={{ color: '#22d3ee' }}
            />
            <Line type="monotone" dataKey="requests" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2, stroke: '#22d3ee' }} activeDot={{ r: 6, fill: '#22d3ee' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm h-48 flex flex-col relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
        <div className="flex justify-between items-center mb-2 z-20 border-b border-slate-800 pb-2">
          <span className="text-slate-400 font-sans font-bold text-xs">سجل العمليات الحي (Live Log)</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            <span className="text-cyan-400 text-xs">متصل</span>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 flex flex-col-reverse z-0 space-y-1 space-y-reverse">
          {logs.map((log, i) => (
            <div key={i} className={`${i === 0 ? 'text-cyan-400' : 'text-slate-500'} transition-colors duration-500`}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 relative"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider">السجلات الوطنية السبعة</h1>
          <p className="text-slate-400 mt-2 text-lg">
            الركائز المتكاملة للقاعدة الوطنية للبيانات وفق منهجية الأمم المتحدة GSBPM
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="بحث في السجلات..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow shadow-sm placeholder-slate-600"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRegisters.map((reg, index) => {
          const Icon = reg.icon;
          return (
            <motion.div
              key={reg.id}
              layoutId={`card-${reg.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedRegister(reg)}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-800 hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-2 h-full ${progressColorMap[reg.color]} opacity-50 transition-all group-hover:w-3 group-hover:opacity-100`}></div>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorMap[reg.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  {reg.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{reg.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                {reg.description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Database className="w-4 h-4" />
                  <span className="font-mono">{reg.stats.records}</span> سجل
                </div>
                <div className="text-cyan-400 text-sm font-medium flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                  <span>تصفح السجل</span>
                  <Search className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRegister && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
            />
            <motion.div 
              layoutId={`card-${selectedRegister.id}`}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-cyan-900/20 z-50 overflow-hidden max-h-[90vh] flex flex-col"
              dir="rtl"
            >
              <div className={`p-6 md:p-8 ${colorMap[selectedRegister.color].split(' ')[0]} bg-opacity-10 relative shrink-0 border-b border-slate-800`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4 mb-4">
                    {modalView !== 'overview' && (
                      <button 
                        onClick={() => setModalView('overview')}
                        className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors ml-2 border border-slate-700"
                      >
                        <ArrowRight className="w-5 h-5 text-slate-300" />
                      </button>
                    )}
                    <div className={`p-4 rounded-2xl bg-slate-950 shadow-sm border border-slate-800 ${colorMap[selectedRegister.color].split(' ')[1]}`}>
                      <selectedRegister.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold px-3 py-1 bg-slate-800/80 text-slate-300 rounded-full mb-2 inline-block border border-slate-700">
                        {modalView === 'overview' ? selectedRegister.status : modalView === 'query' ? 'استعلام البيانات' : 'مراقبة التدفق الحي'}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedRegister.title}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors border border-slate-700"
                  >
                    <X className="w-5 h-5 text-slate-300" />
                  </button>
                </div>
                {modalView === 'overview' && (
                  <p className="text-slate-400 leading-relaxed text-lg">
                    {selectedRegister.description}
                  </p>
                )}
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-slate-950/50">
                <AnimatePresence mode="wait">
                  {modalView === 'overview' && <motion.div key="overview">{renderOverview()}</motion.div>}
                  {modalView === 'query' && <motion.div key="query">{renderQuery()}</motion.div>}
                  {modalView === 'flow' && <motion.div key="flow">{renderFlow()}</motion.div>}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Users, 
  Briefcase, 
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const kpiData = [
  { year: '2026', unemployment: 20, gdp: 7.3, income: 3500 },
  { year: '2028', unemployment: 16, gdp: 12.5, income: 5200 },
  { year: '2030', unemployment: 13, gdp: 20.1, income: 7500 },
  { year: '2035', unemployment: 10, gdp: 32.0, income: 9800 },
  { year: '2045', unemployment: 8, gdp: 42.0, income: 12000 },
];

export default function AleppoModel() {
  const stats = [
    { title: 'سكان حلب المستهدفين', value: '3.5M', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-500/20' },
    { title: 'مواقع ضرر موثقة', value: '35,936', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border border-red-500/20' },
    { title: 'نزاعات عقارية متوقعة', value: '180,000', icon: MapPin, color: 'text-orange-400', bg: 'bg-orange-500/10 border border-orange-500/20' },
    { title: 'وظائف صناعية مستهدفة', value: '470,000', icon: Briefcase, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border border-cyan-500/20' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3 uppercase tracking-wider">
          <Building2 className="text-cyan-400 w-8 h-8" />
          نموذج حلب 2045
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          النموذج الريادي لتطبيق منظومة الإحصاء الوطنية بمحفظة استثمارية 18-22 مليار دولار
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-800 hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all flex items-center gap-4 group"
            >
              <div className={`${stat.bg} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1 font-mono">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GDP Chart */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-300">الناتج المحلي الإقليمي المستهدف (مليار دولار)</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpiData}>
                <defs>
                  <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontFamily: 'monospace' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontFamily: 'monospace' }} dx={-10} />
                <Tooltip 
                  cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#f8fafc' }}
                  itemStyle={{ color: '#22d3ee', fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="gdp" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorGdp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Unemployment Chart */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-300">معدل البطالة المستهدف (%)</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontFamily: 'monospace' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontFamily: 'monospace' }} dx={-10} />
                <Tooltip 
                  cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#f8fafc' }}
                  itemStyle={{ color: '#10b981', fontFamily: 'monospace' }}
                />
                <Line type="monotone" dataKey="unemployment" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#0f172a', stroke: '#10b981' }} activeDot={{ r: 6, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Required Surveys */}
      <div className="bg-slate-950/80 rounded-2xl p-8 text-white shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <TrendingUp className="text-cyan-400" />
          المسوحات والسجلات الضرورية في حلب
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:bg-slate-800/50 transition-colors group">
            <h3 className="font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">التعداد السكاني التفصيلي</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              يستهدف 127 حياً و85 قرية ريفية بإجمالي 2.1–2.5 مليون نسمة حالياً، ليُحدد الاحتياجات الفعلية للإسكان والمدارس والمستشفيات.
            </p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:bg-slate-800/50 transition-colors group">
            <h3 className="font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">مسح الأضرار العمرانية الميداني</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              يتحقق ميدانياً من 35,936 موقع ضرر موثق في 227,081 مبنى، ضروري لحسم تعويضات الملكية وتحديد أولويات البناء.
            </p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:bg-slate-800/50 transition-colors group">
            <h3 className="font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">سجل العقارات الرقمي الموحد</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              يستهدف تسوية 180,000 نزاع عقاري متوقع في 840 كيلومتراً مربعاً، مما يُطلق سوقاً عقارياً منظماً.
            </p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:bg-slate-800/50 transition-colors group">
            <h3 className="font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">قاعدة بيانات النازحين والعائدين</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              تُدير 500,000–700,000 عودة متوقعة مرتبطةً بسجل الهوية الوطني لتوجيه المساعدات ومنع الازدواجية.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

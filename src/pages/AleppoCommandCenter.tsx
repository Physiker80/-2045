import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Building2, MapPin, Users, Briefcase, TrendingUp, AlertTriangle,
  LayoutDashboard, FileText, DollarSign, Clock, ShieldCheck, BarChart3, Layers
} from 'lucide-react';

const COLORS = ['#007A3D', '#185FA5', '#d4ac0d', '#CE1126', '#007A3D88', '#185FA588', '#d4ac0d88', '#CE112688'];

const sectorsData = [
  { name: 'الإسكان', min: 4.2, max: 5.8 },
  { name: 'التعليم', min: 1.9, max: 3.06 },
  { name: 'الطبية', min: 1.3, max: 1.85 },
  { name: 'السياحة', min: 1.45, max: 2.28 },
  { name: 'الرقمي', min: 0.68, max: 1.005 },
  { name: 'المياه', min: 0.85, max: 1.15 },
  { name: 'الإبداعي', min: 0.305, max: 0.46 },
  { name: 'النفايات', min: 0.484, max: 0.745 },
  { name: 'الضوئيات', min: 0.227, max: 0.37 },
];

const fundingData = [
  { name: 'خاص محلي+شتات', value: 47 },
  { name: 'FDI أجنبي', value: 27 },
  { name: 'قطاع عام', value: 17 },
  { name: 'تمويل دولي', value: 9 },
];

const unempData = [
  { year: '2025', rate: 20 },
  { year: '2027', rate: 18 },
  { year: '2030', rate: 15 },
  { year: '2033', rate: 12 },
  { year: '2037', rate: 10 },
  { year: '2040', rate: 9 },
  { year: '2045', rate: 8 },
];

const finSecData = [
  { name: 'صناعة', value: 9.6 },
  { name: 'إسكان', value: 5.0 },
  { name: 'نقل', value: 3.0 },
  { name: 'طاقة', value: 2.2 },
  { name: 'تعليم+صحة', value: 3.5 },
  { name: 'تراث+سياحة', value: 2.3 },
  { name: 'رقمي+ضوئيات', value: 1.1 },
  { name: 'مياه+بيئة', value: 1.5 },
];

const cumInvData = [
  { year: '2026', opt: 0.35, base: 0.3, cons: 0.25 },
  { year: '2028', opt: 2.0, base: 1.8, cons: 1.5 },
  { year: '2030', opt: 5.5, base: 5.0, cons: 4.2 },
  { year: '2032', opt: 9.0, base: 8.0, cons: 7.0 },
  { year: '2035', opt: 13.5, base: 12.0, cons: 10.5 },
  { year: '2038', opt: 17.0, base: 15.5, cons: 14.0 },
  { year: '2041', opt: 19.5, base: 18.0, cons: 16.5 },
  { year: '2045', opt: 22.0, base: 20.0, cons: 18.0 },
];

const sqiData = [
  { year: '2026', sqi: 22, premium: 773 },
  { year: '2027', sqi: 31, premium: 628 },
  { year: '2028', sqi: 40, premium: 495 },
  { year: '2029', sqi: 49, premium: 368 },
  { year: '2030', sqi: 56, premium: 268 },
  { year: '2032', sqi: 67, premium: 175 },
  { year: '2035', sqi: 76, premium: 118 },
  { year: '2038', sqi: 83, premium: 90 },
  { year: '2040', sqi: 88, premium: 72 },
];

const priorityData = [
  { name: 'أولوية 1 (ضرر ≥45%)', count: 13, fill: '#CE1126' },
  { name: 'أولوية 2 (25-44%)', count: 30, fill: '#d4ac0d' },
  { name: 'أولوية 3 (10-24%)', count: 37, fill: '#185FA5' },
  { name: 'أولوية 4 (<10%)', count: 47, fill: '#007A3D' },
];

export default function AleppoCommandCenter() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'reports', label: 'التقارير الـ37', icon: FileText },
    { id: 'finance', label: 'المنظومة المالية', icon: DollarSign },
    { id: 'timeline', label: 'الخارطة الزمنية', icon: Clock },
    { id: 'governance', label: 'منظومة الحوكمة', icon: ShieldCheck },
    { id: 'statistics', label: 'الأساس الإحصائي', icon: BarChart3 },
    { id: 'integration', label: 'مصفوفة التكامل', icon: Layers },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-800 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 uppercase tracking-wider">رؤية حلب 2045 — مركز القيادة المتكامل</h1>
            <p className="text-emerald-400/80 text-sm md:text-base mb-4 font-mono">
              الإطار الشامل لإعادة الإعمار • 37 تقريراً • 18–22 مليار دولار • 20 عاماً
            </p>
            <p className="text-cyan-400 text-xs md:text-sm italic border-r-4 border-cyan-500 pr-3">
              ثمانية آلاف سنة من الحضارة تُلزمنا بالبناء — لا بالبكاء
            </p>
          </div>
          
          <div className="text-center bg-slate-950/80 backdrop-blur-sm p-4 rounded-xl border border-slate-800/80 min-w-[150px] shadow-inner">
            <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">التقدم الكلي</div>
            <div className="text-4xl font-bold text-emerald-400 font-mono">9/37</div>
            <div className="text-xs text-slate-500 mb-2">تقرير مكتمل</div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" style={{ width: '24.3%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${activeTab === tab.id 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                  : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 hover:text-slate-300'}
              `}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-cyan-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">الاستثمار الإجمالي</div>
                <div className="text-xl font-bold text-white font-mono">18–22B$</div>
                <div className="text-[10px] text-slate-500 mt-1">على 20 عاماً</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-red-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">مباني متضررة (UNOSAT)</div>
                <div className="text-xl font-bold text-white font-mono">35,936</div>
                <div className="text-[10px] text-slate-500 mt-1">موقع ضرر موثّق</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">الوظائف المستهدفة</div>
                <div className="text-xl font-bold text-white font-mono">470–700K</div>
                <div className="text-[10px] text-slate-500 mt-1">وظيفة بحلول 2045</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-yellow-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">السكان المستهدفون</div>
                <div className="text-xl font-bold text-white font-mono">3.5M</div>
                <div className="text-[10px] text-slate-500 mt-1">نسمة بحلول 2045</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-cyan-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">التقارير المكتملة</div>
                <div className="text-xl font-bold text-white font-mono">9 / 37</div>
                <div className="text-[10px] text-slate-500 mt-1">24.3% من الإطار الكامل</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-red-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">الأحياء ذات الأولوية القصوى</div>
                <div className="text-xl font-bold text-white font-mono">13 حياً</div>
                <div className="text-[10px] text-slate-500 mt-1">ضرر ≥ 45%</div>
              </div>
            </div>

            {/* Charts */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">الاستثمار المُنمذَج في التقارير الـ9 المكتملة (مليار دولار)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', fontFamily: 'monospace' }} />
                    <Legend wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
                    <Bar dataKey="min" name="الحد الأدنى (B$)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="max" name="الحد الأقصى (B$)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">هيكل التمويل المختلط</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={fundingData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                        {fundingData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#06b6d4', '#10b981', '#3b82f6', '#8b5cf6'][index % 4]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', fontFamily: 'monospace' }} />
                      <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">معدل البطالة — مسار التحول 2025→2045</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={unempData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 25]} />
                      <Tooltip cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', fontFamily: 'monospace' }} />
                      <Line type="monotone" dataKey="rate" name="معدل البطالة %" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', stroke: '#06b6d4', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#06b6d4' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Transformation Table */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 overflow-hidden">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">مؤشرات التحول الكبرى 2025 → 2045</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                    <tr>
                      <th className="p-3 font-medium rounded-tr-lg">المؤشر</th>
                      <th className="p-3 font-medium">2025 الراهن</th>
                      <th className="p-3 font-medium">2030</th>
                      <th className="p-3 font-medium">2035</th>
                      <th className="p-3 font-medium text-cyan-400">2045 الهدف</th>
                      <th className="p-3 font-medium rounded-tl-lg">نسبة التغيير</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-400">
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">عدد السكان</td><td className="p-3 font-mono">2.1M</td><td className="p-3 font-mono">2.5M</td><td className="p-3 font-mono">3.0M</td><td className="p-3 font-bold text-cyan-400 font-mono">3.5M</td><td className="p-3 text-emerald-400 font-bold font-mono">+67%</td></tr>
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">متوسط الدخل الفردي ($)</td><td className="p-3 font-mono">3,500</td><td className="p-3 font-mono">5,000</td><td className="p-3 font-mono">8,500</td><td className="p-3 font-bold text-cyan-400 font-mono">12,000</td><td className="p-3 text-emerald-400 font-bold font-mono">+243%</td></tr>
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">معدل البطالة</td><td className="p-3 font-mono">20%</td><td className="p-3 font-mono">15%</td><td className="p-3 font-mono">10%</td><td className="p-3 font-bold text-cyan-400 font-mono">8%</td><td className="p-3 text-emerald-400 font-bold font-mono">−60%</td></tr>
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">حصة النقل العام</td><td className="p-3 font-mono">15%</td><td className="p-3 font-mono">30%</td><td className="p-3 font-mono">50%</td><td className="p-3 font-bold text-cyan-400 font-mono">60%</td><td className="p-3 text-emerald-400 font-bold font-mono">+300%</td></tr>
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">نسبة الطاقة المتجددة</td><td className="p-3 font-mono">3%</td><td className="p-3 font-mono">10%</td><td className="p-3 font-mono">22%</td><td className="p-3 font-bold text-cyan-400 font-mono">30%</td><td className="p-3 text-emerald-400 font-bold font-mono">+900%</td></tr>
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">المساحات الخضراء (م²/فرد)</td><td className="p-3 font-mono">8</td><td className="p-3 font-mono">10</td><td className="p-3 font-mono">13</td><td className="p-3 font-bold text-cyan-400 font-mono">15</td><td className="p-3 text-emerald-400 font-bold font-mono">+88%</td></tr>
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">مؤشر جودة الحياة (/10)</td><td className="p-3 font-mono">5.2</td><td className="p-3 font-mono">6.5</td><td className="p-3 font-mono">7.8</td><td className="p-3 font-bold text-cyan-400 font-mono">8.5</td><td className="p-3 text-emerald-400 font-bold font-mono">+63%</td></tr>
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">مؤشر جودة الإحصاء SQI</td><td className="p-3 font-mono">22</td><td className="p-3 font-mono">56</td><td className="p-3 font-mono">76</td><td className="p-3 font-bold text-cyan-400 font-mono">88</td><td className="p-3 text-emerald-400 font-bold font-mono">+300%</td></tr>
                    <tr className="hover:bg-slate-800/50 transition-colors"><td className="p-3 font-medium text-slate-300">انبعاثات CO₂ (طن/فرد/سنة)</td><td className="p-3 font-mono">3.5</td><td className="p-3 font-mono">2.8</td><td className="p-3 font-mono">2.0</td><td className="p-3 font-bold text-cyan-400 font-mono">1.5</td><td className="p-3 text-emerald-400 font-bold font-mono">−57%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reports' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-cyan-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">مكتملة</div>
                <div className="text-xl font-bold text-cyan-400 font-mono">9</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-red-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">متبقية</div>
                <div className="text-xl font-bold text-white font-mono">28</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-yellow-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">إجمالي الاستثمار المُنمذَج</div>
                <div className="text-xl font-bold text-white font-mono">14.1B$</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">الإطار الكلي المستهدف</div>
                <div className="text-xl font-bold text-white font-mono">18–22B$</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">المرحلة الأولى — البنية التحتية الأساسية (تقريران مكتملان)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm relative hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-3 left-3 bg-slate-900 text-slate-400 text-xs px-2 py-1 rounded border border-slate-800 font-mono">01</div>
                    <h4 className="font-bold text-white mb-1 ml-8">منظومة المياه والصرف الصحي الذكية</h4>
                    <div className="text-emerald-400 text-sm font-medium mb-1 font-mono">850M – 1,150M$</div>
                    <div className="text-xs text-slate-400 mb-2">IoT 2.3M مستشعر | شبكة 4,800 كم | هدف تغطية 98%</div>
                    <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded">✓ مكتمل</span>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm relative hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-3 left-3 bg-slate-900 text-slate-400 text-xs px-2 py-1 rounded border border-slate-800 font-mono">02</div>
                    <h4 className="font-bold text-white mb-1 ml-8">الإسكان الاجتماعي وإعادة تأهيل العشوائيات</h4>
                    <div className="text-emerald-400 text-sm font-medium mb-1 font-mono">4,200M – 5,800M$</div>
                    <div className="text-xs text-slate-400 mb-2">220,000–280,000 وحدة سكنية | 4 مسارات تنفيذية</div>
                    <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded">✓ مكتمل</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">المرحلة الثانية — الرأس المال البشري (تقريران مكتملان)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm relative hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-3 left-3 bg-slate-900 text-slate-400 text-xs px-2 py-1 rounded border border-slate-800 font-mono">03</div>
                    <h4 className="font-bold text-white mb-1 ml-8">البنية الطبية 2045</h4>
                    <div className="text-emerald-400 text-sm font-medium mb-1 font-mono">1,300M – 1,850M$</div>
                    <div className="text-xs text-slate-400 mb-2">5 مستشفيات مركزية + 50 مركز صحي + تطبيب عن بُعد</div>
                    <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded">✓ مكتمل</span>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm relative hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-3 left-3 bg-slate-900 text-slate-400 text-xs px-2 py-1 rounded border border-slate-800 font-mono">04</div>
                    <h4 className="font-bold text-white mb-1 ml-8">التعليم والبحث — مدينة المعرفة</h4>
                    <div className="text-emerald-400 text-sm font-medium mb-1 font-mono">1,900M – 3,060M$</div>
                    <div className="text-xs text-slate-400 mb-2">15 جامعة + 200 مدرسة + مدينة المعرفة الكاملة</div>
                    <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded">✓ مكتمل</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">المرحلة الثالثة — الهوية الاقتصادية (تقريران مكتملان)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm relative hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-3 left-3 bg-slate-900 text-slate-400 text-xs px-2 py-1 rounded border border-slate-800 font-mono">05</div>
                    <h4 className="font-bold text-white mb-1 ml-8">الاقتصاد الإبداعي والحرف التراثية</h4>
                    <div className="text-emerald-400 text-sm font-medium mb-1 font-mono">305M – 460M$</div>
                    <div className="text-xs text-slate-400 mb-2">HCAZ 300 هكتار | 37,000 وظيفة | صادرات 430–800M$/سنة</div>
                    <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded">✓ مكتمل</span>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm relative hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-3 left-3 bg-slate-900 text-slate-400 text-xs px-2 py-1 rounded border border-slate-800 font-mono">06</div>
                    <h4 className="font-bold text-white mb-1 ml-8">السياحة والتراث الحضاري</h4>
                    <div className="text-emerald-400 text-sm font-medium mb-1 font-mono">1,450M – 2,280M$</div>
                    <div className="text-xs text-slate-400 mb-2">هدف 4.5–5 مليون زائر سنوياً | نمو +300–430% عن 2010</div>
                    <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded">✓ مكتمل</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">التقارير المتبقية — 28 تقريراً (جاهزة للإطلاق)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800 border-r-4 border-r-slate-600 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                    <div className="absolute top-3 left-3 bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">10</div>
                    <h4 className="font-bold text-slate-300 mb-1 ml-8">منظومة الطاقة النظيفة المتكاملة</h4>
                    <div className="text-slate-400 text-sm font-medium mb-1 font-mono">2,000M – 3,200M$ (مُقدَّر)</div>
                    <span className="inline-block bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded">قيد الإعداد</span>
                  </div>
                  <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800 border-r-4 border-r-slate-600 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                    <div className="absolute top-3 left-3 bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">11</div>
                    <h4 className="font-bold text-slate-300 mb-1 ml-8">شبكة النقل العام المتكاملة BRT + مترو</h4>
                    <div className="text-slate-400 text-sm font-medium mb-1 font-mono">2,500M – 3,500M$ (مُقدَّر)</div>
                    <span className="inline-block bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded">قيد الإعداد</span>
                  </div>
                  <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800 border-r-4 border-r-slate-500 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                    <div className="absolute top-3 left-3 bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">12</div>
                    <h4 className="font-bold text-slate-300 mb-1 ml-8">حي مقرات الدولة السورية في حلب</h4>
                    <div className="text-slate-400 text-sm font-medium mb-1 font-mono">3,000M – 3,800M$ (مُقدَّر)</div>
                    <span className="inline-block bg-slate-700 text-slate-300 text-[10px] px-2 py-1 rounded">مسودة جاهزة</span>
                  </div>
                  <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800 border-r-4 border-r-cyan-600 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                    <div className="absolute top-3 left-3 bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">16</div>
                    <h4 className="font-bold text-slate-300 mb-1 ml-8">وزارة الإحصاء وقاعدة البيانات الوطنية</h4>
                    <div className="text-slate-400 text-sm font-medium mb-1 font-mono">310M – 475M$ (مُقدَّر)</div>
                    <span className="inline-block bg-cyan-900/50 text-cyan-400 text-[10px] px-2 py-1 rounded border border-cyan-800">تقرير موسّع مكتمل</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'finance' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-emerald-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">إجمالي الإطار المالي (متوسط)</div>
                <div className="text-xl font-bold text-emerald-400 font-mono">20B$</div>
                <div className="text-[10px] text-slate-500 mt-1">نطاق 18–22 مليار دولار</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-cyan-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">القطاع الخاص (محلي + شتات)</div>
                <div className="text-xl font-bold text-cyan-400 font-mono">45–50%</div>
                <div className="text-[10px] text-slate-500 mt-1">9–11 مليار دولار</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-red-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">الاستثمار الأجنبي المباشر</div>
                <div className="text-xl font-bold text-red-400 font-mono">25–30%</div>
                <div className="text-[10px] text-slate-500 mt-1">5–6.6 مليار دولار</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800 border-r-4 border-r-yellow-500 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">IRR المشاريع الصناعية</div>
                <div className="text-xl font-bold text-yellow-400 font-mono">6–8%</div>
                <div className="text-[10px] text-slate-500 mt-1">استرداد رأس المال 8–12 سنة</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">توزيع الاستثمار حسب القطاع (مليار $)</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={finSecData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(51, 65, 85, 0.3)" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={80} />
                      <Tooltip cursor={{ fill: 'rgba(51, 65, 85, 0.2)' }} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px', color: '#f8fafc' }} itemStyle={{ color: '#e2e8f0' }} />
                      <Bar dataKey="value" name="مليار $" fill="#0ea5e9" radius={[0, 4, 4, 0]}>
                        {finSecData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">التدفقات الاستثمارية التراكمية — ثلاثة سيناريوهات (B$)</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cumInvData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(51, 65, 85, 0.3)" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <Tooltip cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px', color: '#f8fafc' }} itemStyle={{ color: '#e2e8f0' }} />
                      <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                      <Line type="monotone" dataKey="opt" name="متفائل 22B$" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="base" name="أساسي 20B$" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: '#0ea5e9', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="cons" name="متحفظ 18B$" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">مصادر التمويل الاستراتيجية الأربعة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-emerald-500/30 transition-colors">
                  <h4 className="font-bold text-emerald-400 mb-2 text-sm">القطاع الخاص — المحرك الرئيسي</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">شركات حلبية مغتربة | شركات خليجية وإقليمية | PPP بصيغ BOT وBOO | صناديق استثمار تنموية | المستثمرون السوريون العائدون</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-cyan-500/30 transition-colors">
                  <h4 className="font-bold text-cyan-400 mb-2 text-sm">التمويل الدولي — الرافعة</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">البنك الدولي | صندوق النقد الدولي | بنك التنمية الإسلامي | الاتحاد الأوروبي | EBRD | صناديق المناخ GCF/GEF/AF</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-yellow-500/30 transition-colors">
                  <h4 className="font-bold text-yellow-400 mb-2 text-sm">القطاع العام — الضامن والميسِّر</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">تخصيص أراضٍ بأسعار تفضيلية | بنية تحتية مدعومة | إعفاءات ضريبية 10 سنوات | ضمانات سيادية | صندوق حلب للتنمية</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-red-500/30 transition-colors">
                  <h4 className="font-bold text-red-400 mb-2 text-sm">الأدوات المالية المبتكرة</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">سندات إعمار حلب (Green Bonds) | صكوك إسلامية | صناديق ريادة أعمال | منصة تمويل جماعي للشتات | ضرائب قيمة الأرض التنموية</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">الخارطة الزمنية — 4 مراحل استراتيجية</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono">1</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-950/50 p-4 rounded-xl shadow-sm border border-emerald-500/30 hover:border-emerald-500/60 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-emerald-400">المرحلة الأولى: التعافي والأساسيات</h4>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded font-mono border border-emerald-500/20">2026 - 2030</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">التركيز على البنية التحتية الحرجة، الإسكان العاجل، وإعادة تشغيل المناطق الصناعية الأساسية.</p>
                    <ul className="text-xs text-slate-500 space-y-1">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span> تأهيل 13 حياً (أولوية 1)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span> إطلاق منظومة المياه الذكية (المرحلة 1)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span> تفعيل 30% من مدينة المعرفة</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span> إطلاق صندوق حلب للتنمية</li>
                    </ul>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-cyan-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono">2</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-950/50 p-4 rounded-xl shadow-sm border border-cyan-500/30 hover:border-cyan-500/60 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-cyan-400">المرحلة الثانية: النمو والتوسع</h4>
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded font-mono border border-cyan-500/20">2031 - 2035</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">توسيع نطاق الخدمات، ربط شبكات النقل، وتطوير الاقتصاد الإبداعي والسياحي.</p>
                    <ul className="text-xs text-slate-500 space-y-1">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span> اكتمال شبكة BRT والمرحلة 1 من المترو</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span> تشغيل 5 مستشفيات مركزية</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span> تفعيل المنطقة الحرة الإبداعية HCAZ</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span> تأهيل 30 حياً (أولوية 2)</li>
                    </ul>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-yellow-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono">3</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-950/50 p-4 rounded-xl shadow-sm border border-yellow-500/30 hover:border-yellow-500/60 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-yellow-400">المرحلة الثالثة: التحول الذكي</h4>
                      <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded font-mono border border-yellow-500/20">2036 - 2040</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">رقمنة كاملة للخدمات، طاقة نظيفة متكاملة، واقتصاد قائم على المعرفة.</p>
                    <ul className="text-xs text-slate-500 space-y-1">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span> تغطية 80% بالطاقة المتجددة</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span> اكتمال مدينة المعرفة بـ 15 جامعة</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span> منظومة إدارة نفايات صفرية (Zero Waste)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span> حي مقرات الدولة الذكي يعمل بالكامل</li>
                    </ul>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-700 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono">4</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-950/50 p-4 rounded-xl shadow-sm border border-slate-700 hover:border-slate-500 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-300">المرحلة الرابعة: حلب 2045</h4>
                      <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded font-mono border border-slate-700">2041 - 2045</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">مدينة عالمية، مستدامة، ومحرك اقتصادي رئيسي في الشرق الأوسط.</p>
                    <ul className="text-xs text-slate-500 space-y-1">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2"></span> ناتج محلي إجمالي يتجاوز 15 مليار دولار</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2"></span> بطالة أقل من 8%</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2"></span> 5 مليون سائح سنوياً</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2"></span> صفر انبعاثات كربونية في القطاع الحكومي</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'governance' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">الهيكل التنظيمي لإدارة مشروع حلب 2045</h3>
              
              <div className="flex flex-col items-center space-y-6">
                {/* Level 1 */}
                <div className="bg-slate-950/80 text-white px-8 py-4 rounded-xl shadow-md w-full max-w-md text-center border border-slate-800 border-b-4 border-b-emerald-500">
                  <h4 className="font-bold text-lg text-emerald-400">المجلس الأعلى لإعمار حلب</h4>
                  <p className="text-xs text-slate-400 mt-1">برئاسة رئيس مجلس الوزراء | يضع السياسات ويقر الميزانيات</p>
                </div>
                
                <div className="w-0.5 h-8 bg-slate-700"></div>
                
                {/* Level 2 */}
                <div className="bg-slate-900/80 text-white px-8 py-4 rounded-xl shadow-md w-full max-w-lg text-center border border-slate-800 border-b-4 border-b-cyan-500 relative">
                  <h4 className="font-bold text-lg text-cyan-400">هيئة تطوير حلب (ADA)</h4>
                  <p className="text-xs text-slate-400 mt-1">الذراع التنفيذي المستقل | إدارة المشاريع | الشراكات PPP</p>
                  
                  {/* Horizontal line for children */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-slate-700 hidden md:block"></div>
                </div>
                
                <div className="w-0.5 h-8 bg-slate-700 md:hidden"></div>
                
                {/* Level 3 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full pt-4 md:pt-8 relative">
                  {/* Vertical lines connecting to horizontal line */}
                  <div className="absolute -top-4 left-[12.5%] w-0.5 h-4 bg-slate-700 hidden md:block"></div>
                  <div className="absolute -top-4 left-[37.5%] w-0.5 h-4 bg-slate-700 hidden md:block"></div>
                  <div className="absolute -top-4 left-[62.5%] w-0.5 h-4 bg-slate-700 hidden md:block"></div>
                  <div className="absolute -top-4 left-[87.5%] w-0.5 h-4 bg-slate-700 hidden md:block"></div>
                  
                  <div className="bg-slate-900/50 p-4 rounded-xl shadow-sm border border-slate-800 text-center hover:border-emerald-500/30 transition-colors">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
                      <Building2 size={20} />
                    </div>
                    <h5 className="font-bold text-emerald-400 text-sm mb-1">شركة حلب للبنية التحتية</h5>
                    <p className="text-[10px] text-slate-400">المياه، الكهرباء، النقل، الاتصالات</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl shadow-sm border border-slate-800 text-center hover:border-yellow-500/30 transition-colors">
                    <div className="w-10 h-10 bg-yellow-500/10 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-yellow-500/20">
                      <Briefcase size={20} />
                    </div>
                    <h5 className="font-bold text-yellow-400 text-sm mb-1">صندوق حلب للتنمية</h5>
                    <p className="text-[10px] text-slate-400">التمويل، الاستثمار، إدارة الأصول</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl shadow-sm border border-slate-800 text-center hover:border-cyan-500/30 transition-colors">
                    <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-cyan-500/20">
                      <Users size={20} />
                    </div>
                    <h5 className="font-bold text-cyan-400 text-sm mb-1">وكالة التنمية البشرية</h5>
                    <p className="text-[10px] text-slate-400">الصحة، التعليم، الإسكان الاجتماعي</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl shadow-sm border border-slate-800 text-center hover:border-emerald-500/30 transition-colors">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
                      <BarChart3 size={20} />
                    </div>
                    <h5 className="font-bold text-emerald-400 text-sm mb-1">مركز البيانات والمراقبة</h5>
                    <p className="text-[10px] text-slate-400">الإحصاء، مؤشرات الأداء، التقييم</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">مبادئ الحوكمة الرشيدة</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-emerald-500/10 p-2 rounded-lg mr-3 shrink-0 border border-emerald-500/20">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-400">الشفافية المطلقة</h4>
                      <p className="text-xs text-slate-400 mt-1">نشر كافة المناقصات والعقود والتقارير المالية على منصة رقمية مفتوحة للجمهور.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyan-500/10 p-2 rounded-lg mr-3 shrink-0 border border-cyan-500/20">
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-cyan-400">المساءلة والتقييم المستقل</h4>
                      <p className="text-xs text-slate-400 mt-1">تدقيق مالي ربع سنوي من قبل شركات دولية (Big 4) لضمان كفاءة الإنفاق.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-yellow-500/10 p-2 rounded-lg mr-3 shrink-0 border border-yellow-500/20">
                      <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-400">المشاركة المجتمعية</h4>
                      <p className="text-xs text-slate-400 mt-1">مجالس استشارية من أهالي الأحياء والنقابات المهنية تشارك في التخطيط والرقابة.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">إدارة المخاطر</h3>
                <div className="space-y-4">
                  <div className="p-3 border border-slate-800 rounded-lg bg-slate-950/50 border-r-4 border-r-yellow-500">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-yellow-400">مخاطر التمويل (نقص السيولة)</span>
                      <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/20">متوسطة</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2"><div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '50%' }}></div></div>
                    <p className="text-[10px] text-slate-400">التخفيف: تنويع مصادر التمويل، الاعتماد على PPP، إصدار سندات محلية.</p>
                  </div>
                  <div className="p-3 border border-slate-800 rounded-lg bg-slate-950/50 border-r-4 border-r-red-500">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-red-400">مخاطر التنفيذ (تأخير المشاريع)</span>
                      <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">عالية</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2"><div className="bg-red-500 h-1.5 rounded-full" style={{ width: '75%' }}></div></div>
                    <p className="text-[10px] text-slate-400">التخفيف: عقود صارمة مع شروط جزائية، إدارة مشاريع رشيقة (Agile)، استيراد تكنولوجيا بناء حديثة.</p>
                  </div>
                  <div className="p-3 border border-slate-800 rounded-lg bg-slate-950/50 border-r-4 border-r-emerald-500">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-emerald-400">مخاطر تشغيلية (نقص الكوادر)</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">منخفضة</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '25%' }}></div></div>
                    <p className="text-[10px] text-slate-400">التخفيف: برامج تدريب مهني مكثفة، استقطاب الكفاءات السورية المهاجرة بحوافز مجزية.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'statistics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border-r-4 border-emerald-500 shadow-sm border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">عدد السكان (2025)</div>
                <div className="text-xl font-bold text-white font-mono">2.1 مليون</div>
                <div className="text-[10px] text-emerald-400 mt-1">الهدف 2045: 4.5 مليون</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border-r-4 border-emerald-500 shadow-sm border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">المساحة العمرانية</div>
                <div className="text-xl font-bold text-white font-mono">190 كم²</div>
                <div className="text-[10px] text-emerald-400 mt-1">توسع مدروس نحو الشرق</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border-r-4 border-red-500 shadow-sm border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">الأحياء المتضررة</div>
                <div className="text-xl font-bold text-white font-mono">127 حياً</div>
                <div className="text-[10px] text-red-400 mt-1">من أصل 240 حياً</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border-r-4 border-yellow-500 shadow-sm border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">المباني المدمرة كلياً/جزئياً</div>
                <div className="text-xl font-bold text-white font-mono">~35,000</div>
                <div className="text-[10px] text-yellow-400 mt-1">تحتاج إعادة بناء أو ترميم هيكلي</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">توزع الأحياء حسب أولوية التدخل</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={priorityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={120} />
                      <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }} />
                      <Bar dataKey="count" name="عدد الأحياء" radius={[0, 4, 4, 0]}>
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">مؤشر جودة الحياة (SQI) المتوقع</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sqiData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }} />
                      <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                      <Line yAxisId="left" type="monotone" dataKey="sqi" name="مؤشر جودة الحياة (0-100)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6 }} />
                      <Line yAxisId="right" type="monotone" dataKey="premium" name="علاوة المخاطر (نقطة أساس)" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#ef4444', strokeWidth: 2, stroke: '#0f172a' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'integration' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 inline-block uppercase tracking-wider">مصفوفة التكامل القطاعي (Synergy Matrix)</h3>
              <p className="text-sm text-slate-400 mb-6">يوضح هذا النموذج كيف تعتمد القطاعات على بعضها البعض لتحقيق أقصى عائد استثماري وتنموي.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right border-collapse">
                  <thead className="bg-slate-950/80 text-white">
                    <tr>
                      <th className="p-3 font-medium border border-slate-800 text-emerald-400">القطاع / التأثير على</th>
                      <th className="p-3 font-medium border border-slate-800 text-center text-cyan-400">الإسكان</th>
                      <th className="p-3 font-medium border border-slate-800 text-center text-cyan-400">الصناعة</th>
                      <th className="p-3 font-medium border border-slate-800 text-center text-cyan-400">السياحة</th>
                      <th className="p-3 font-medium border border-slate-800 text-center text-cyan-400">التعليم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3 font-bold bg-slate-950/50 border border-slate-800 text-slate-300">البنية التحتية (مياه/كهرباء)</td>
                      <td className="p-3 border border-slate-800 text-center bg-emerald-500/10 text-emerald-400 font-bold">عالي جداً<br/><span className="text-[10px] font-normal text-slate-400">شرط أساسي للسكن</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-emerald-500/10 text-emerald-400 font-bold">عالي جداً<br/><span className="text-[10px] font-normal text-slate-400">عصب الإنتاج</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-emerald-500/10 text-emerald-400 font-bold">عالي<br/><span className="text-[10px] font-normal text-slate-400">جودة الخدمات</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-yellow-500/10 text-yellow-400 font-bold">متوسط<br/><span className="text-[10px] font-normal text-slate-400">تشغيل المرافق</span></td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3 font-bold bg-slate-950/50 border border-slate-800 text-slate-300">النقل (BRT/مترو)</td>
                      <td className="p-3 border border-slate-800 text-center bg-emerald-500/10 text-emerald-400 font-bold">عالي<br/><span className="text-[10px] font-normal text-slate-400">يرفع قيمة العقار</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-emerald-500/10 text-emerald-400 font-bold">عالي<br/><span className="text-[10px] font-normal text-slate-400">نقل العمالة</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-emerald-500/10 text-emerald-400 font-bold">عالي جداً<br/><span className="text-[10px] font-normal text-slate-400">سهولة وصول السياح</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-emerald-500/10 text-emerald-400 font-bold">عالي<br/><span className="text-[10px] font-normal text-slate-400">وصول الطلاب</span></td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3 font-bold bg-slate-950/50 border border-slate-800 text-slate-300">التعليم (مدينة المعرفة)</td>
                      <td className="p-3 border border-slate-800 text-center bg-yellow-500/10 text-yellow-400 font-bold">متوسط<br/><span className="text-[10px] font-normal text-slate-400">سكن طلابي</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-emerald-500/10 text-emerald-400 font-bold">عالي جداً<br/><span className="text-[10px] font-normal text-slate-400">توفير كفاءات R&D</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-yellow-500/10 text-yellow-400 font-bold">متوسط<br/><span className="text-[10px] font-normal text-slate-400">سياحة تعليمية</span></td>
                      <td className="p-3 border border-slate-800 text-center bg-slate-800/50 text-slate-500">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Add other tabs here as needed, following the same pattern */}
        {activeTab !== 'overview' && activeTab !== 'reports' && activeTab !== 'finance' && activeTab !== 'timeline' && activeTab !== 'governance' && activeTab !== 'statistics' && activeTab !== 'integration' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900/50 backdrop-blur-sm p-12 rounded-xl border border-slate-800 shadow-sm text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
              <FileText className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">محتوى قيد التطوير</h3>
            <p className="text-slate-500">هذا القسم متاح في النسخة الكاملة من مركز القيادة.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

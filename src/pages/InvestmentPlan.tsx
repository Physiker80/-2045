import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  CheckCircle2, 
  ArrowRight,
  Landmark
} from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const fundingSources = [
  { name: 'الميزانية الحكومية', value: 25, amount: '$66M', color: '#3b82f6' },
  { name: 'قروض البنك الدولي', value: 30, amount: '$80M', color: '#10b981' },
  { name: 'منح الاتحاد الأوروبي', value: 20, amount: '$53M', color: '#f59e0b' },
  { name: 'صناديق التنمية', value: 15, amount: '$40M', color: '#8b5cf6' },
  { name: 'شراكات القطاع الخاص', value: 10, amount: '$26M', color: '#ec4899' },
];

const phases = [
  {
    title: 'المرحلة الأولى: البنية والتعداد',
    years: '2026 - 2028',
    cost: '$117M',
    items: [
      'البنية التحتية التقنية ($28M)',
      'منصة GIS الوطنية ($22M)',
      'التعداد العام وإحصاء الأضرار ($35M)',
      'الكوادر البشرية والتدريب ($18M)',
      'منصة البيانات المفتوحة ($8M)'
    ]
  },
  {
    title: 'المرحلة الثانية: التكامل والربط',
    years: '2028 - 2031',
    cost: '$82M',
    items: [
      'تكامل الوزارات وربطها رقمياً ($32M)',
      'تطوير سجل الأراضي الرقمي ($18M)',
      'توسعة الكوادر والتدريب ($22M)',
      'ترقية الأمن والبنية ($10M)'
    ]
  },
  {
    title: 'المرحلة الثالثة: التطوير والنضج',
    years: '2031 - 2035',
    cost: '$66M',
    items: [
      'الربط الكامل لـ26 وزارة ($22M)',
      'تطوير الذكاء الاصطناعي ($18M)',
      'التحديثات التقنية والاستدامة ($26M)'
    ]
  }
];

export default function InvestmentPlan() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="mb-8 border-b border-slate-800/50 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="text-cyan-400 w-8 h-8" />
          <h1 className="text-3xl font-bold text-white tracking-wide">الخطة الاستثمارية والمالية</h1>
        </div>
        <p className="text-slate-400 mt-2 text-sm font-mono tracking-wide">
          تحليل التكلفة والعائد الاقتصادي على مدى عشر سنوات (2026 - 2035) | <span className="text-cyan-500">FIN.MODEL: ACTIVE</span>
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Funding Sources Chart */}
        <div className="lg:col-span-1 bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider">
            <PieChart className="text-cyan-400 w-5 h-5" />
            مصادر التمويل المقترحة
          </h2>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={fundingSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {fundingSources.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-auto">
            {fundingSources.map((source, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: source.color }}></div>
                  <span className="text-slate-300">{source.name}</span>
                </div>
                <div className="font-bold text-white font-mono">{source.amount} <span className="text-slate-500 font-normal">({source.value}%)</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Return */}
        <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl rounded-xl p-8 border border-slate-800 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
          <h2 className="text-lg font-bold mb-8 flex items-center gap-3 relative z-10 text-white uppercase tracking-wider">
            <Landmark className="text-emerald-400 w-6 h-6" />
            العائد الاقتصادي الصافي (NPV)
            <span className="text-sm font-bold font-mono bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-md text-emerald-400 mr-auto shadow-inner">
              $1.6B - $2.7B
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-slate-950/50 p-5 rounded-lg border border-slate-800/80 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
              <h3 className="font-bold text-emerald-400 mb-2 text-sm uppercase tracking-wider">تحسين كفاءة الإنفاق العام</h3>
              <p className="text-2xl font-bold text-white mb-2 font-mono">$450M - $780M</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                تقليل هدر مشاريع الحكومة بنسبة 15-25% من خلال قرارات مبنية على بيانات دقيقة.
              </p>
            </div>
            <div className="bg-slate-950/50 p-5 rounded-lg border border-slate-800/80 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
              <h3 className="font-bold text-emerald-400 mb-2 text-sm uppercase tracking-wider">جذب الاستثمار الأجنبي</h3>
              <p className="text-2xl font-bold text-white mb-2 font-mono">$380M - $620M</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                تحسين تصنيف مناخ الأعمال والشفافية لاستقطاب رؤوس الأموال الدولية.
              </p>
            </div>
            <div className="bg-slate-950/50 p-5 rounded-lg border border-slate-800/80 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
              <h3 className="font-bold text-emerald-400 mb-2 text-sm uppercase tracking-wider">تسوية الملكيات العقارية</h3>
              <p className="text-2xl font-bold text-white mb-2 font-mono">$320M - $480M</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                تحرير أصول مجمدة بقيمة $4.2B عبر حسم النزاعات العقارية في حلب.
              </p>
            </div>
            <div className="bg-slate-950/50 p-5 rounded-lg border border-slate-800/80 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
              <h3 className="font-bold text-emerald-400 mb-2 text-sm uppercase tracking-wider">تحسين الكفاءة الضريبية</h3>
              <p className="text-2xl font-bold text-white mb-2 font-mono">$280M - $420M</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                مضاعفة الإيرادات عبر رقمنة السجلات وإحكام قاعدة دافعي الضرائب.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phases Timeline */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800">
        <h2 className="text-lg font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-wider">
          <DollarSign className="text-cyan-400 w-6 h-6" />
          مراحل الاستثمار (TCO)
        </h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-slate-800">
          {phases.map((phase, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-950/80 p-6 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-colors shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-slate-800/50 pb-4 gap-2">
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">{phase.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-md font-mono">{phase.cost}</span>
                    <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">{phase.years}</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <ArrowRight className="w-4 h-4 text-cyan-500/70 shrink-0 mt-0.5 rotate-180" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

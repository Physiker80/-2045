import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Database,
  ShieldCheck,
  Globe,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = [
  { name: '2026', value: 35 },
  { name: '2027', value: 82 },
  { name: '2028', value: 117 },
  { name: '2029', value: 150 },
  { name: '2030', value: 199 },
  { name: '2031', value: 265 },
];

const radarData = [
  { subject: 'البنية التحتية', A: 120, B: 110, fullMark: 150 },
  { subject: 'الابتكار', A: 98, B: 130, fullMark: 150 },
  { subject: 'الاستقرار الاقتصادي', A: 86, B: 130, fullMark: 150 },
  { subject: 'الصحة والتعليم', A: 99, B: 100, fullMark: 150 },
  { subject: 'كفاءة المؤسسات', A: 85, B: 90, fullMark: 150 },
  { subject: 'الاستدامة البيئية', A: 65, B: 85, fullMark: 150 },
];

export default function Dashboard() {
  const stats = [
    { title: 'العائد الاقتصادي المتوقع', value: '$2.7B', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'الاستثمار المطلوب', value: '$265M', icon: BarChart3, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { title: 'الوزارات المربوطة (2035)', value: '26', icon: Database, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { title: 'سكان حلب المستهدفين', value: '3.5M', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="mb-8 border-b border-slate-800/50 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="text-cyan-400 w-8 h-8" />
          <h1 className="text-3xl font-bold text-white tracking-wide">الملخص التنفيذي</h1>
        </div>
        <p className="text-slate-400 mt-2 text-sm font-mono tracking-wide">
          دور وزارة الإحصاء في بناء القاعدة الوطنية الشاملة للبيانات | <span className="text-cyan-500">SYS.STATUS: ONLINE</span>
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 flex items-center gap-4 relative overflow-hidden group hover:border-slate-600 transition-colors"
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
              <div className={`${stat.bg} border p-3 rounded-lg shadow-inner`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1 font-mono">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              الاستثمار التراكمي (مليون دولار)
            </h2>
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-cyan-400 rounded text-xs font-mono">2026 - 2031</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="lg:col-span-1 bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50"></div>
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider">
            <Activity className="w-5 h-5 text-emerald-400" />
            مؤشرات التنافسية (2026 vs 2035)
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} />
                <Radar name="2026 (الأساس)" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                <Radar name="2035 (الهدف)" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', fontFamily: 'monospace' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Highlights */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 rounded-xl p-6 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-white uppercase tracking-wider">
              <ShieldCheck className="text-emerald-400 w-5 h-5" />
              الاستقلالية المؤسسية
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              الضمانات القانونية الأربع: هيئة مستقلة دستورياً، تعيين بأمر جمهوري، ميزانية مستقلة (0.3% من الناتج المحلي)، وحظر نشر إحصاءات دون اعتماد المكتب المركزي.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Globe className="text-blue-400 w-5 h-5" />
              تجارب دولية
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 relative">
                <div className="absolute right-1 top-3 bottom-[-20px] w-px bg-slate-800"></div>
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)] z-10"></div>
                <div>
                  <p className="font-bold text-sm text-slate-200">رواندا (2000-2010)</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">ارتقاء 122 مرتبة في سهولة الأعمال بعد استثمار $47M.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 relative">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10"></div>
                <div>
                  <p className="font-bold text-sm text-slate-200">إندونيسيا (1998-2010)</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">خفض الفقر من 24% إلى 11% باستثمار $320M.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Context */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50"></div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider">
            <Globe className="w-5 h-5 text-purple-400" />
            السياق الجيوسياسي والاقتصادي
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-purple-500/30 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-purple-400 text-sm">طريق الحرير الجديد (BRI)</h4>
                <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20 font-mono">فرصة استراتيجية</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                تموضع حلب كعقدة لوجستية رئيسية تربط شرق المتوسط بآسيا الوسطى، مما يفتح آفاقاً لاستثمارات صينية في البنية التحتية والنقل.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-cyan-400 text-sm">التعافي المبكر (Early Recovery)</h4>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20 font-mono">تمويل دولي</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                الاستفادة من برامج الأمم المتحدة والاتحاد الأوروبي لدعم مشاريع المياه، الصحة، والتعليم كجزء من استراتيجية التعافي المبكر.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-emerald-400 text-sm">الاقتصاد الأخضر والمناخ</h4>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 font-mono">استدامة</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                توجيه الاستثمارات نحو الطاقة المتجددة (شمسية، رياح) لتقليل الاعتماد على الوقود الأحفوري وجذب صناديق التمويل المناخي (GCF).
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Polyline, Marker, Tooltip, LayersControl, useMap, LayerGroup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as MapIcon, Layers, Activity, Home, Zap, BarChart2, Info, AlertTriangle, Search, Filter, Crosshair } from 'lucide-react';

// Fix Leaflet icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const center: [number, number] = [36.202, 37.157];

const coreNeighborhoods = [
  {n:'المدينة القديمة',lat:36.1993,lng:37.1577,dmg:42,p:2,pop:35000},
  {n:'الجديدة / جدة',lat:36.2041,lng:37.1491,dmg:55,p:1,pop:28000},
  {n:'السليمانية',lat:36.2105,lng:37.1448,dmg:18,p:3,pop:42000},
  {n:'الميدان',lat:36.1955,lng:37.1512,dmg:28,p:2,pop:31000},
  {n:'حلب الجديدة',lat:36.2098,lng:37.1285,dmg:8,p:4,pop:85000},
  {n:'العزيزية',lat:36.2155,lng:37.1352,dmg:5,p:4,pop:62000},
  {n:'السبيل',lat:36.1832,lng:37.1445,dmg:38,p:2,pop:44000},
  {n:'الراموسة',lat:36.1745,lng:37.1285,dmg:22,p:3,pop:55000},
  {n:'الشيخ سعيد',lat:36.1812,lng:37.1601,dmg:60,p:1,pop:29000},
  {n:'كرم الميسر',lat:36.1938,lng:37.1648,dmg:52,p:1,pop:24000},
  {n:'الصالحين',lat:36.1875,lng:37.1512,dmg:45,p:1,pop:38000},
  {n:'الأنصاري',lat:36.1965,lng:37.1689,dmg:35,p:2,pop:41000},
  {n:'الحمدانية',lat:36.1892,lng:37.1228,dmg:4,p:4,pop:92000},
  {n:'الزهراء',lat:36.2202,lng:37.1312,dmg:3,p:4,pop:78000},
  {n:'حلب الشرقية',lat:36.1988,lng:37.1798,dmg:48,p:1,pop:22000},
  {n:'الشعار',lat:36.2018,lng:37.1712,dmg:32,p:2,pop:35000},
  {n:'بستان الباشا',lat:36.2068,lng:37.1612,dmg:25,p:2,pop:28000},
  {n:'الكلاسة',lat:36.1978,lng:37.1548,dmg:55,p:1,pop:18000},
  {n:'فرافرة',lat:36.2005,lng:37.1534,dmg:58,p:1,pop:15000},
  {n:'الهلك',lat:36.2198,lng:37.1598,dmg:12,p:3,pop:32000},
  {n:'الشيخ مقصود',lat:36.2285,lng:37.1645,dmg:20,p:3,pop:48000},
  {n:'هنانو',lat:36.2155,lng:37.1755,dmg:28,p:2,pop:65000},
  {n:'مساكن هنانو',lat:36.2212,lng:37.1812,dmg:15,p:3,pop:72000},
  {n:'الأتارب (ريف)',lat:36.2082,lng:37.0982,dmg:5,p:4,pop:18000},
  {n:'النيرب',lat:36.1822,lng:37.2112,dmg:8,p:4,pop:35000},
  {n:'الجامعة',lat:36.2145,lng:37.1198,dmg:2,p:4,pop:38000},
  {n:'الشهباء',lat:36.2235,lng:37.1425,dmg:6,p:4,pop:45000},
  {n:'تشرين',lat:36.1988,lng:37.1085,dmg:4,p:4,pop:58000},
  {n:'الفرقان',lat:36.1928,lng:37.1602,dmg:42,p:2,pop:26000},
  {n:'باب النيرب',lat:36.1985,lng:37.1682,dmg:38,p:2,pop:22000},
];

// Generate remaining neighborhoods to reach 127
const generateMockNeighborhoods = () => {
  const generated = [];
  // Seeded random for consistency
  let seed = 1;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 1; i <= 97; i++) {
    const angle = random() * Math.PI * 2;
    const radius = random() * 0.06 + 0.01; // 1km to 7km spread
    const lat = 36.202 + Math.cos(angle) * radius;
    const lng = 37.157 + Math.sin(angle) * radius * 1.2; // slightly wider longitude
    const dmg = Math.floor(random() * 70);
    const p = dmg >= 45 ? 1 : dmg >= 25 ? 2 : dmg >= 10 ? 3 : 4;
    const pop = Math.floor(random() * 40000) + 5000;
    generated.push({ n: `قطاع إحصائي ${i}`, lat, lng, dmg, p, pop });
  }
  return generated;
};

const neighborhoods = [...coreNeighborhoods, ...generateMockNeighborhoods()];

const zones = [
  {n:'الشيخ نجار SNZ 2.0',lat:36.2482,lng:37.2185,invest:'1.0–1.3B$',jobs:'150K–200K',phase:'p1',color:'#f97316', coords: [[36.2220,37.1850],[36.2580,37.1900],[36.2650,37.2250],[36.2500,37.2550],[36.2200,37.2520],[36.2100,37.2200],[36.2180,37.1880]]},
  {n:'AAMZ التقنية المتقدمة',lat:36.1985,lng:37.2285,invest:'1.8–2.5B$',jobs:'45K–65K',phase:'p2',color:'#ea580c', coords: [[36.2480,37.2200],[36.2680,37.2200],[36.2720,37.2650],[36.2550,37.2700],[36.2420,37.2550],[36.2430,37.2300]]},
  {n:'Agro-Industrial Park',lat:36.1682,lng:37.2082,invest:'0.65–0.95B$',jobs:'35K–55K',phase:'p1',color:'#f59e0b', coords: [[36.1480,37.2050],[36.1680,37.2050],[36.1720,37.2420],[36.1550,37.2480],[36.1420,37.2320],[36.1420,37.2120]]},
  {n:'اللوجستيات والتجارة الحرة',lat:36.1785,lng:37.2382,invest:'0.45–0.65B$',jobs:'22K–35K',phase:'p1',color:'#eab308', coords: [[36.1680,37.2050],[36.1780,37.2050],[36.1820,37.2350],[36.1920,37.2480],[36.1850,37.2580],[36.1650,37.2520],[36.1600,37.2200]]},
  {n:'منطقة الراموسة الصناعية',lat:36.1705,lng:37.1285,invest:'مضمّنة في SNZ',jobs:'30K–50K',phase:'p1',color:'#ef4444', coords: [[36.1620,37.1050],[36.1750,37.1050],[36.1780,37.1380],[36.1650,37.1420],[36.1580,37.1300],[36.1560,37.1120]]},
  {n:'Heritage Craft Zone — HCAZ',lat:36.1950,lng:37.1500,invest:'0.28–0.42B$',jobs:'25K–40K',phase:'p1',color:'#a855f7', coords: [[36.1940,37.1350],[36.2050,37.1350],[36.2100,37.1600],[36.2040,37.1700],[36.1920,37.1680],[36.1870,37.1520],[36.1900,37.1380]]},
];

const cbdCoords: [number, number][] = [[36.2550,37.0950],[36.2650,37.0980],[36.2700,37.1100],[36.2600,37.1200],[36.2500,37.1150],[36.2480,37.1050]];
const govCoords: [number, number][] = [[36.2650,37.0750],[36.2800,37.0750],[36.2850,37.0950],[36.2700,37.1000],[36.2600,37.0900],[36.2600,37.0800]];

const tramLine: [number, number][] = [
  [36.1988, 37.1548], // City Center
  [36.2040, 37.1490], // Saadallah Al Jabiri
  [36.2080, 37.1350], // Al-Razi
  [36.2145, 37.1198], // University
  [36.2220, 37.1150], // Al-Zahraa
  [36.2350, 37.1080], // Castello Road approach
  [36.2480, 37.1020], // Kafr Hamra Outskirts
  [36.2550, 37.0950], // CBD
  [36.2650, 37.0850]  // Gov District
];

const metro1: [number, number][] = [[36.2485,37.1685],[36.2380,37.1660],[36.2285,37.1645],[36.2180,37.1550],[36.2098,37.1448],[36.2040,37.1490],[36.1988,37.1548],[36.1920,37.1530],[36.1855,37.1512],[36.1780,37.1400],[36.1745,37.1285]];
const metro2: [number, number][] = [[36.1822,37.2112],[36.1880,37.1950],[36.1950,37.1800],[36.1985,37.1712],[36.1990,37.1620],[36.1988,37.1548],[36.1968,37.1425],[36.1920,37.1320],[36.1892,37.1228],[36.1870,37.1150],[36.1855,37.1048]];
const metro3: [number, number][] = [[36.2285,37.1445],[36.2250,37.1580],[36.2212,37.1712],[36.2120,37.1850],[36.2018,37.1912],[36.1950,37.1820],[36.1892,37.1728],[36.1940,37.1620],[36.1988,37.1548],[36.1900,37.1480],[36.1832,37.1445],[36.1860,37.1320],[36.1892,37.1228],[36.1980,37.1180],[36.2098,37.1148],[36.2180,37.1200],[36.2285,37.1285],[36.2285,37.1445]];
const metro4: [number, number][] = [[36.2482,37.2185],[36.2350,37.2050],[36.2212,37.1948],[36.2100,37.1750],[36.1988,37.1548],[36.1900,37.1800],[36.1825,37.2082]];

const brtLines: [number, number][][] = [
  // BRT-A: East-West Arterial
  [[36.1822,37.2112], [36.1850,37.1950], [36.1920,37.1750], [36.1988,37.1548], [36.2020,37.1400], [36.2050,37.1250], [36.2080,37.0985]],
  // BRT-B: North-South Arterial
  [[36.2550,37.1650], [36.2400,37.1620], [36.2250,37.1600], [36.2100,37.1580], [36.1988,37.1548], [36.1850,37.1500], [36.1745,37.1450], [36.1600,37.1350]],
  // BRT-C: Inner Ring Road
  [[36.2212,37.1285], [36.2300,37.1400], [36.2320,37.1550], [36.2280,37.1700], [36.2150,37.1800], [36.1950,37.1850], [36.1800,37.1750], [36.1700,37.1550], [36.1750,37.1350], [36.1900,37.1200], [36.2050,37.1150], [36.2212,37.1285]],
];

const stations = [
  {n:'محطة حلب المركزية الكبرى',lat:36.1988,lng:37.1548,type:'محطة تبادل شاملة'},
  {n:'القلعة',lat:36.1993,lng:37.1577,type:'تراث'},
  {n:'مطار حلب',lat:36.1822,lng:37.2112,type:'مطار'},
  {n:'الشيخ نجار (صناعي)',lat:36.2482,lng:37.2185,type:'صناعي'},
  {n:'جامعة حلب',lat:36.2145,lng:37.1198,type:'تعليمي'},
];

const solar = [
  {n:'مزرعة طاقة شمسية جنوب حلب',lat:36.1285,lng:37.1445,mw:500,type:'solar'},
  {n:'مزرعة PV الشرقية',lat:36.1485,lng:37.2285,mw:300,type:'solar'},
  {n:'محطة CSP المركّزة',lat:36.1345,lng:37.0985,mw:200,type:'csp'},
];

const wind = [
  {n:'مزرعة رياح جبل سمعان',lat:36.2705,lng:36.8398,mw:250},
  {n:'مزرعة رياح دارة عزة',lat:36.2485,lng:36.9015,mw:200},
  {n:'مزرعة رياح خان العسل',lat:36.2185,lng:36.9848,mw:150},
];

const heritage = [
  {n:'قلعة حلب',lat:36.1993,lng:37.1577,desc:'تراث عالمي UNESCO'},
  {n:'السوق المسقف — القيسارية',lat:36.1978,lng:37.1548,desc:'أطول سوق مسقوف في العالم'},
  {n:'الجامع الكبير — الأموي',lat:36.1962,lng:37.1518,desc:'القرن الثامن الميلادي'},
  {n:'خان الوزير',lat:36.1985,lng:37.1535,desc:'خان أثري'},
  {n:'المدينة القديمة (المنطقة الكاملة)',lat:36.1993,lng:37.155,desc:'UNESCO World Heritage Site 1986'},
];

const waterStations = [
  {n:'محطة معالجة مياه الشمال',lat:36.2520,lng:37.1580,cap:'50,000 م³/يوم'},
  {n:'محطة معالجة مياه الجنوب',lat:36.1620,lng:37.1280,cap:'80,000 م³/يوم'},
  {n:'محطة معالجة مياه الشرق',lat:36.2050,lng:37.2380,cap:'60,000 م³/يوم'},
  {n:'محطة معالجة صرف صحي المركزية',lat:36.1850,lng:37.0980,cap:'60,000 م³/يوم'},
  {n:'محطة معالجة صرف صحي الغرب',lat:36.2250,lng:37.0850,cap:'50,000 م³/يوم'},
];

const quwayq: [number, number][] = [
  [36.2909, 37.1997], [36.2757, 37.1923], [36.2669, 37.1780],
  [36.2560, 37.1765], [36.2501, 37.1700], [36.2443, 37.1654],
  [36.2391, 37.1652], [36.2336, 37.1657], [36.2289, 37.1654],
  [36.2239, 37.1604], [36.2179, 37.1550], [36.2152, 37.1527],
  [36.2116, 37.1498], [36.2096, 37.1476], [36.2077, 37.1475],
  [36.2039, 37.1476], [36.2003, 37.1487], [36.1989, 37.1481],
  [36.1986, 37.1465], [36.1938, 37.1363], [36.1907, 37.1379],
  [36.1871, 37.1417], [36.1845, 37.1438], [36.1830, 37.1456],
  [36.1778, 37.1473], [36.1734, 37.1463], [36.1671, 37.1456],
  [36.1600, 37.1443], [36.1529, 37.1393], [36.1460, 37.1346],
  [36.1408, 37.1347], [36.1367, 37.1370], [36.1321, 37.1422]
];

function dmgColor(p: number) {
  return p===1?'#ef4444':p===2?'#eab308':p===3?'#3b82f6':'#10b981';
}

const getNearest = (lat: number, lng: number, nodes: any[]) => {
  let nearest = nodes[0];
  let minDist = Infinity;
  nodes.forEach(n => {
    const dist = Math.pow(n.lat - lat, 2) + Math.pow(n.lng - lng, 2);
    if (dist < minDist) {
      minDist = dist;
      nearest = n;
    }
  });
  return nearest;
};

function MapController({ searchQuery, activePhase }: { searchQuery: string, activePhase: string }) {
  const map = useMap();
  
  useEffect(() => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      let found: any = neighborhoods.find(n => n.n.toLowerCase().includes(q));
      if (!found) found = zones.find(z => z.n.toLowerCase().includes(q));
      if (!found) found = stations.find(s => s.n.toLowerCase().includes(q));
      if (!found) found = solar.find(s => s.n.toLowerCase().includes(q));
      if (!found) found = wind.find(w => w.n.toLowerCase().includes(q));
      if (!found) found = heritage.find(h => h.n.toLowerCase().includes(q));

      if (found) {
        map.flyTo([found.lat, found.lng], 15, { duration: 1 });
      }
    }
  }, [searchQuery, map]);

  return null;
}

export default function GISPlatform() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedInfo, setSelectedInfo] = useState<any>(null);
  const [activePhase, setActivePhase] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const createCustomIcon = (type: string, color: string) => {
    return L.divIcon({
      html: `<div style="background:${color};width:14px;height:14px;border-radius:${type === 'heritage' ? '2px' : '50%'};border:2px solid #0f172a;${type === 'heritage' ? 'transform:rotate(45deg)' : ''};display:flex;align-items:center;justify-content:center;box-shadow:0 0 10px ${color}"></div>`,
      className: '',
      iconSize: [14, 14]
    });
  };

  const filteredZones = useMemo(() => {
    if (activePhase === 'all') return zones;
    return zones.filter(z => z.phase === activePhase);
  }, [activePhase]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header className="mb-4 border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <MapIcon className="text-cyan-400 w-8 h-8" />
          <h1 className="text-3xl font-bold text-white tracking-wide uppercase">المخطط التنفيذي الشامل</h1>
        </div>
        <p className="text-slate-400 mt-2 text-sm font-mono tracking-wide">
          خريطة رؤية حلب 2045 التفاعلية | <span className="text-cyan-500">GIS.MODULE: ACTIVE</span> | <span className="text-emerald-400">127 SECTORS LOADED</span> | <span className="text-pink-400">TOPOLOGY: ALIGNED</span>
        </p>
      </header>

      <div className="relative h-[750px] rounded-xl overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <MapContainer 
          center={center} 
          zoom={12} 
          style={{ height: '100%', width: '100%', zIndex: 1, backgroundColor: '#020617' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />
          
          <MapController searchQuery={searchQuery} activePhase={activePhase} />

          <LayersControl position="topleft">
            <LayersControl.Overlay checked name="أحياء حلب (127 قطاع إحصائي)">
              <LayerGroup>
                {neighborhoods.map((nh, i) => (
                  <CircleMarker
                    key={i}
                    center={[nh.lat, nh.lng]}
                    radius={nh.pop > 50000 ? 12 : nh.pop > 30000 ? 8 : 5}
                    pathOptions={{ fillColor: dmgColor(nh.p), color: '#0f172a', weight: 1.5, fillOpacity: 0.8 }}
                    eventHandlers={{
                      click: () => setSelectedInfo({
                        type: 'neighborhood',
                        lat: nh.lat,
                        lng: nh.lng,
                        title: nh.n,
                        rows: [
                          ['نسبة الضرر', nh.dmg + '%'],
                          ['الأولوية', ['—', 'فورية', 'عاجلة', 'متوسطة', 'طويلة الأمد'][nh.p]],
                          ['السكان التقديريون', (nh.pop / 1000).toFixed(1) + 'K'],
                          ['أقرب محطة نقل', getNearest(nh.lat, nh.lng, stations).n],
                          ['أقرب منطقة صناعية', getNearest(nh.lat, nh.lng, zones).n],
                        ],
                        tag: { c: nh.p === 1 ? 'r' : nh.p === 2 ? 'gold' : nh.p === 3 ? 'b' : 'g', l: ['—', 'أولوية 1', 'أولوية 2', 'أولوية 3', 'أولوية 4'][nh.p] }
                      })
                    }}
                  >
                    <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">
                      {nh.n} | ضرر: {nh.dmg}%
                    </Tooltip>
                  </CircleMarker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="المناطق الصناعية">
              <LayerGroup>
                {filteredZones.map((z, i) => (
                  <Polygon 
                    key={`poly-${i}`} 
                    positions={z.coords as [number, number][]} 
                    pathOptions={{ color: z.color, fillColor: z.color, fillOpacity: 0.2, weight: 2, dashArray: '5,5' }}
                    eventHandlers={{
                      click: () => setSelectedInfo({
                        title: z.n,
                        rows: [['الاستثمار', z.invest], ['الوظائف', z.jobs], ['الجدول الزمني', z.phase]],
                        tag: { c: 'gold', l: 'صناعية' }
                      })
                    }}
                  >
                    <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">{z.n}</Tooltip>
                  </Polygon>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="مركز الأعمال (CBD) - كفر حمرة">
              <Polygon positions={cbdCoords} pathOptions={{ color: '#a855f7', fillColor: '#a855f7', fillOpacity: 0.2, weight: 2 }}>
                <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">مركز الأعمال المركزي CBD (كفر حمرة)</Tooltip>
              </Polygon>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="حي مقرات الدولة - كفر حمرة">
              <Polygon positions={govCoords} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 2, dashArray: '10,5' }}>
                <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">حي مقرات الدولة السورية (كفر حمرة)</Tooltip>
              </Polygon>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="شبكة النقل (مترو + BRT + ترام)">
              <LayerGroup>
                <Polyline positions={tramLine} pathOptions={{ color: '#ec4899', weight: 4, opacity: 0.9, dashArray: '4,4' }}>
                  <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">خط الترام السريع (حلب - كفر حمرة)</Tooltip>
                </Polyline>
                <Polyline positions={metro1} pathOptions={{ color: '#ef4444', weight: 4, opacity: activePhase === 'all' || activePhase === 'p1' ? 0.9 : 0.2 }}>
                  <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">مترو الخط 1 (أحمر)</Tooltip>
                </Polyline>
                <Polyline positions={metro2} pathOptions={{ color: '#3b82f6', weight: 4, opacity: activePhase === 'all' || activePhase === 'p1' ? 0.9 : 0.2 }}>
                  <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">مترو الخط 2 (أزرق)</Tooltip>
                </Polyline>
                <Polyline positions={metro3} pathOptions={{ color: '#10b981', weight: 4, opacity: activePhase === 'all' || activePhase === 'p2' ? 0.9 : 0.2, dashArray: '8,4' }}>
                  <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">مترو الخط 3 (أخضر)</Tooltip>
                </Polyline>
                <Polyline positions={metro4} pathOptions={{ color: '#eab308', weight: 4, opacity: activePhase === 'all' || activePhase === 'p2' ? 0.9 : 0.2 }}>
                  <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">مترو الخط 4 (أصفر)</Tooltip>
                </Polyline>
                {brtLines.map((pts, i) => (
                  <Polyline key={i} positions={pts} pathOptions={{ color: '#8b5cf6', weight: 3, opacity: 0.75, dashArray: '12,6' }}>
                    <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">BRT الخط {['A', 'B', 'C'][i]}</Tooltip>
                  </Polyline>
                ))}
                {stations.map((s, i) => (
                  <CircleMarker 
                    key={i} 
                    center={[s.lat, s.lng]} 
                    radius={s.type === 'محطة تبادل شاملة' ? 10 : 6} 
                    pathOptions={{ 
                      fillColor: s.type === 'محطة تبادل شاملة' ? '#eab308' : '#0f172a', 
                      color: s.type === 'محطة تبادل شاملة' ? '#0f172a' : '#eab308', 
                      weight: 2, 
                      fillOpacity: 1 
                    }}
                  >
                    <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">{s.n} | {s.type}</Tooltip>
                  </CircleMarker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="مواقع الطاقة والمياه">
              <LayerGroup>
                {solar.map((s, i) => (
                  <Marker key={`solar-${i}`} position={[s.lat, s.lng]} icon={createCustomIcon(s.type, s.type === 'csp' ? '#f97316' : '#eab308')}>
                    <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">{s.n} | {s.mw}MW</Tooltip>
                  </Marker>
                ))}
                {wind.map((w, i) => (
                  <Marker key={`wind-${i}`} position={[w.lat, w.lng]} icon={createCustomIcon('wind', '#06b6d4')}>
                    <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">{w.n} | {w.mw}MW</Tooltip>
                  </Marker>
                ))}
                {waterStations.map((w, i) => (
                  <CircleMarker key={`water-${i}`} center={[w.lat, w.lng]} radius={7} pathOptions={{ fillColor: '#3b82f6', color: '#06b6d4', weight: 2, fillOpacity: 0.9 }}>
                    <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">{w.n} | {w.cap}</Tooltip>
                  </CircleMarker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="مواقع التراث">
              <LayerGroup>
                {heritage.map((h, i) => (
                  <Marker 
                    key={i} 
                    position={[h.lat, h.lng]} 
                    icon={createCustomIcon('heritage', '#eab308')}
                    eventHandlers={{
                      click: () => setSelectedInfo({
                        title: h.n,
                        rows: [['الوصف', h.desc]],
                        tag: { c: 'gold', l: 'تراث' }
                      })
                    }}
                  >
                    <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">{h.n} | {h.desc}</Tooltip>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
            
            <LayersControl.Overlay checked name="نهر قويق">
              <Polyline positions={quwayq} pathOptions={{ color: '#0ea5e9', weight: 4, opacity: 0.8, dashArray: '6,3' }}>
                <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono">نهر قويق — مشروع الإحياء</Tooltip>
              </Polyline>
            </LayersControl.Overlay>
          </LayersControl>

          {/* Active Neighborhood Connections */}
          {selectedInfo && selectedInfo.type === 'neighborhood' && (
            <LayerGroup>
              {/* Radar Lock Rings */}
              <CircleMarker center={[selectedInfo.lat, selectedInfo.lng]} radius={30} pathOptions={{ color: '#22d3ee', fillColor: 'transparent', weight: 1, dashArray: '4,6', opacity: 0.8, className: 'radar-ring' }} />
              <CircleMarker center={[selectedInfo.lat, selectedInfo.lng]} radius={15} pathOptions={{ color: '#22d3ee', fillColor: '#22d3ee', fillOpacity: 0.3, weight: 2 }} />
              
              {/* Connection to nearest Transport */}
              <Polyline 
                positions={[[selectedInfo.lat, selectedInfo.lng], [getNearest(selectedInfo.lat, selectedInfo.lng, stations).lat, getNearest(selectedInfo.lat, selectedInfo.lng, stations).lng]]} 
                pathOptions={{ color: '#eab308', weight: 2, className: 'animated-dash', opacity: 0.8 }} 
              >
                <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono" direction="center" permanent>ربط نقل</Tooltip>
              </Polyline>

              {/* Connection to nearest Industrial Zone */}
              <Polyline 
                positions={[[selectedInfo.lat, selectedInfo.lng], [getNearest(selectedInfo.lat, selectedInfo.lng, zones).lat, getNearest(selectedInfo.lat, selectedInfo.lng, zones).lng]]} 
                pathOptions={{ color: '#f97316', weight: 2, className: 'animated-dash', opacity: 0.8 }} 
              >
                <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono" direction="center" permanent>ربط صناعي</Tooltip>
              </Polyline>

              {/* Connection to nearest Water Station */}
              <Polyline 
                positions={[[selectedInfo.lat, selectedInfo.lng], [getNearest(selectedInfo.lat, selectedInfo.lng, waterStations).lat, getNearest(selectedInfo.lat, selectedInfo.lng, waterStations).lng]]} 
                pathOptions={{ color: '#3b82f6', weight: 2, className: 'animated-dash', opacity: 0.8 }} 
              >
                <Tooltip className="bg-slate-900 border-slate-700 text-slate-300 font-mono" direction="center" permanent>ربط خدمي</Tooltip>
              </Polyline>
            </LayerGroup>
          )}
        </MapContainer>

        {/* Custom UI Overlays */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-4 w-72 pointer-events-none">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-2 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center gap-2 pointer-events-auto">
            <input 
              type="text" 
              placeholder="ابحث عن حي أو مشروع..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent border-none text-white placeholder-slate-500 focus:outline-none w-full px-2 text-sm font-mono"
            />
            <button type="submit" className="bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/30 text-cyan-400 p-2 rounded-lg transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Phase Filter */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto">
            <h3 className="text-cyan-400 font-bold mb-3 text-xs uppercase tracking-widest border-b border-slate-800 pb-2 font-mono flex items-center gap-2">
              <Filter className="w-4 h-4" />
              المراحل الزمنية
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setActivePhase('all')} className={`text-xs py-1.5 rounded border font-mono transition-colors ${activePhase === 'all' ? 'bg-slate-700 border-slate-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>الكل</button>
              <button onClick={() => setActivePhase('p0')} className={`text-xs py-1.5 rounded border font-mono transition-colors ${activePhase === 'p0' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-red-500/50'}`}>0: 26-27</button>
              <button onClick={() => setActivePhase('p1')} className={`text-xs py-1.5 rounded border font-mono transition-colors ${activePhase === 'p1' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-yellow-500/50'}`}>1: 27-32</button>
              <button onClick={() => setActivePhase('p2')} className={`text-xs py-1.5 rounded border font-mono transition-colors ${activePhase === 'p2' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-blue-500/50'}`}>2: 31-36</button>
              <button onClick={() => setActivePhase('p3')} className={`text-xs py-1.5 rounded border font-mono transition-colors ${activePhase === 'p3' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-emerald-500/50'}`}>3: 36-40</button>
              <button onClick={() => setActivePhase('p4')} className={`text-xs py-1.5 rounded border font-mono transition-colors ${activePhase === 'p4' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-purple-500/50'}`}>4: 41-45</button>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto">
            <h3 className="text-cyan-400 font-bold mb-3 text-xs uppercase tracking-widest border-b border-slate-800 pb-2 font-mono flex items-center gap-2">
              <Layers className="w-4 h-4" />
              مفتاح الألوان
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div><span className="text-xs text-slate-300 font-medium">ضرر فوري (≥45%)</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div><span className="text-xs text-slate-300 font-medium">ضرر عاجل (25–44%)</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div><span className="text-xs text-slate-300 font-medium">ضرر متوسط (10–24%)</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div><span className="text-xs text-slate-300 font-medium">ضرر طويل الأمد (&lt;10%)</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-sm bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div><span className="text-xs text-slate-300 font-medium">مناطق صناعية</span></div>
              <div className="flex items-center gap-3"><div className="w-4 h-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div><span className="text-xs text-slate-300 font-medium">مترو (مقترح)</span></div>
              <div className="flex items-center gap-3"><div className="w-4 h-1 border-t-2 border-dashed border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]"></div><span className="text-xs text-slate-300 font-medium">ترام كفر حمرة</span></div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-mono">الأرقام الرئيسية</div>
              <div className="flex justify-between mb-2"><span className="text-xs text-slate-400">الاستثمار الكلي</span><span className="text-xs text-cyan-400 font-bold font-mono">18–22B$</span></div>
              <div className="flex justify-between mb-2"><span className="text-xs text-slate-400">المباني المتضررة</span><span className="text-xs text-cyan-400 font-bold font-mono">35,936</span></div>
              <div className="flex justify-between mb-1"><span className="text-xs text-slate-400">الوظائف المستهدفة</span><span className="text-xs text-cyan-400 font-bold font-mono">563K–700K</span></div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {selectedInfo && (
          <div className="absolute bottom-6 right-4 z-[1000] bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-5 rounded-xl w-72 shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-cyan-400 font-bold text-sm tracking-wide flex items-center gap-2">
                <Crosshair className="w-4 h-4" />
                {selectedInfo.title}
              </h3>
              <button onClick={() => setSelectedInfo(null)} className="text-slate-500 hover:text-white transition-colors bg-slate-800 rounded-full p-1">&times;</button>
            </div>
            {selectedInfo.tag && (
              <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold mb-4 border bg-opacity-10 font-mono tracking-wider
                ${selectedInfo.tag.c === 'r' ? 'bg-red-500 border-red-500/30 text-red-400' : 
                  selectedInfo.tag.c === 'gold' ? 'bg-yellow-500 border-yellow-500/30 text-yellow-400' : 
                  selectedInfo.tag.c === 'b' ? 'bg-blue-500 border-blue-500/30 text-blue-400' : 
                  'bg-emerald-500 border-emerald-500/30 text-emerald-400'}`}
              >
                {selectedInfo.tag.l}
              </span>
            )}
            <div className="space-y-3">
              {selectedInfo.rows.map((row: any, i: number) => (
                <div key={i} className="flex justify-between text-xs border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-400">{row[0]}</span>
                  <span className="text-white font-medium font-mono">{row[1]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

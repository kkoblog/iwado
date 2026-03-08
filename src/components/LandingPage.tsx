import React from 'react';
import { Phone, CheckCircle, Clock, Palette, Heart, ShieldCheck, ArrowRight, Menu, X, ChevronDown, Star, Home, UserCheck, Calculator, Sparkles, Zap, Umbrella, Thermometer, Leaf, Coins, Award, Search, Map, FileText, ZoomIn } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from "react-router-dom";

// --- Components ---

const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeader: React.FC<{ en: string; jp: string; white?: boolean }> = ({ en, jp, white = false }) => (
  <div className="text-center mb-16 relative z-10">
    <span className={`block text-sm font-bold tracking-widest mb-2 ${white ? 'text-emerald-200' : 'text-emerald-600'} uppercase font-mono`}>
      {en}
    </span>
    <h2 className={`text-3xl sm:text-4xl font-bold ${white ? 'text-white' : 'text-stone-800'}`}>
      {jp}
    </h2>
    <div className={`w-16 h-1 mt-6 mx-auto rounded-full ${white ? 'bg-orange-500' : 'bg-emerald-600'}`}></div>
  </div>
);

const SurveyCarousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const surveys = [
    {
      id: 1,
      name: "杉元様",
      location: "岡山県津山市",
      image: "/assets/survey_sugimoto.jpg",
      summary: "見積もりが詳細で、職人さんがみんな真面目で仕事が丁寧でした。",
      points: ["見積もりが詳細であった", "職人が真面目で丁寧"],
      feedback: "もう少し積極的な提案がいただければ更にいいと思います。"
    },
    {
      id: 2,
      name: "K.K様",
      location: "岡山市",
      image: "/assets/survey_2.jpg",
      summary: "丁寧な作業で、且つ作業途中での要望・確認事項にも気持ちよく対応していただき、仕上がりレベルについても近所の評判も良く満足しています。何よりもコストパフォーマンスが素晴らしい。",
      points: ["丁寧な作業", "作業途中での要望・確認事項にも気持ちよく対応"],
      feedback: "・見積前の現場診断をお客様の立場で、口頭説明だけでなく、もっとわかりやすく詳細に提示すればより信頼性がアップすると思います。（劣化・破損・不具合状況の写真及び説明資料etc.）\n・工事開始前におよその工程計画を提示すれば、お客様側で予定が立てやすく、安心感が増すと思います。"
    },
    {
      id: 3,
      name: "大森様",
      location: "岡山市",
      image: "/assets/survey_3.jpg",
      summary: "安くて、ていねいでした。色を決めるのに、何度も見本を持って来ていただき、本当にお世話になりました。",
      points: ["安くて", "ていねい"],
      feedback: "もっとPRを！"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % surveys.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + surveys.length) % surveys.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Mobile View: Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide">
        {surveys.map((item) => (
          <div key={item.id} className="snap-center shrink-0 w-[85vw] bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden">
            <div className="bg-emerald-50 p-3 border-b border-emerald-100 flex justify-between items-center">
              <span className="font-bold text-emerald-800 text-sm">{item.location} {item.name}</span>
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden group">
              <img 
                src={item.image} 
                alt={`${item.name} アンケート`}
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/600x800/f5f5f4/a8a29e?text=Questionnaire+Image`;
                }}
              />
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <ZoomIn className="w-3 h-3" /> 拡大
              </div>
            </div>
            <div className="p-4">
              <p className="font-bold text-stone-800 text-lg mb-2 leading-snug">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {item.points.map((point, i) => (
                  <span key={i} className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
                    {point}
                  </span>
                ))}
              </div>
              <p className="text-sm text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-100">
                <span className="font-bold block mb-1 text-xs text-stone-400">ご意見・ご感想</span>
                {item.feedback}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Grid/Carousel */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {surveys.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden flex flex-col h-full"
          >
            <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex justify-between items-center">
              <span className="font-bold text-emerald-800">{item.location} {item.name}</span>
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer group border-b border-stone-100">
              <img 
                src={item.image} 
                alt={`${item.name} アンケート`}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/600x800/f5f5f4/a8a29e?text=Questionnaire+Image`;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-white/90 text-stone-800 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" /> 拡大して見る
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h4 className="font-bold text-stone-800 text-xl leading-snug mb-3">
                  {item.summary}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.points.map((point, i) => (
                    <span key={i} className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-stone-100">
                <p className="text-sm text-stone-600">
                  <span className="font-bold block mb-1 text-xs text-stone-400">ご意見・ご感想</span>
                  {item.feedback}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-stone-500 text-sm mb-4">※掲載のアンケートはお客様の許可をいただいて掲載しております</p>
        <a
  href="https://tosou-iwashou.com/category/voice"
  className="inline-flex items-center justify-center px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-full hover:bg-emerald-50 transition-colors"
>
  お客様の声をもっと見る
  <ArrowRight className="w-4 h-4 ml-2" />
</a>
      </div>
    </div>
  );
};

const BenefitCard: React.FC<{ number: string; title: string; desc: string; icon: React.ReactNode; img: string }> = ({ number, title, desc, icon, img }) => (
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-stone-100 flex flex-col h-full group hover:shadow-xl transition-shadow duration-300">
    <div className="relative h-56 overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
      <div className="absolute top-0 left-0 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-2 px-4 rounded-br-3xl font-bold text-lg shadow-md z-10">
        Point <span className="text-2xl">{number}</span>
      </div>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
    </div>
    <div className="p-8 flex-1 flex flex-col relative">
      <div className="absolute -top-8 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-emerald-900 mb-4 mt-2 border-b border-emerald-100 pb-3">
        {title}
      </h3>
      <p className="text-stone-600 leading-relaxed flex-1">
        {desc}
      </p>
    </div>
  </div>
);

const CtaButton: React.FC<{ text: string; subText?: string; primary?: boolean; onClick?: () => void; href?: string }> = ({ text, subText, primary = true, onClick, href }) => {
  const classes = `
    relative overflow-hidden group w-full sm:w-auto inline-flex flex-col items-center justify-center 
    py-4 px-10 rounded-full shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl
    ${primary 
      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-2 border-orange-400' 
      : 'bg-white text-emerald-800 border-2 border-emerald-100 hover:bg-emerald-50'}
  `;

  const content = (
    <>
      <span className={`text-xl font-bold flex items-center ${primary ? 'drop-shadow-sm' : ''}`}>
        {primary && <Calculator className="w-6 h-6 mr-2" />}
        {!primary && <Phone className="w-6 h-6 mr-2" />}
        {text}
        {primary && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
      </span>
      {subText && <span className={`text-xs mt-1 font-medium ${primary ? 'text-orange-100' : 'text-emerald-600'}`}>{subText}</span>}
    </>
  );

  if (href) {
    return <a href={href} className={classes}>{content}</a>;
  }
  return <button onClick={onClick} className={classes}>{content}</button>;
};



const AchievementCarousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardWidth = isMobile ? 320 : 450;
  const gap = 32;

  const achievements = [
    {
      id: 1,
      location: "岡山市中区",
      name: "Y様邸",
      cost: "約150万円",
      before: "/assets/construction_before_1.jpg",
      after: "/assets/construction_after_1.jpg",
    },
    {
      id: 2,
      location: "赤磐市",
      name: "M様邸",
      cost: "約125万円",
      before: "/assets/construction_before_2.jpg",
      after: "/assets/construction_after_2.jpg",
    },
    {
      id: 3,
      location: "瀬戸内市",
      name: "M様邸",
      cost: "約185万円",
      before: "/assets/construction_before_3.jpg",
      after: "/assets/construction_after_3.jpg",
    },
     {
      id: 4,
      location: "赤磐市",
      name: "K様邸",
      cost: "約160万円",
      before: "/assets/construction_before_4.jpg",
      after: "/assets/construction_after_4.jpg",
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % achievements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [achievements.length]);

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ 
          transform: `translateX(calc(50% - ${cardWidth / 2}px - ${activeIndex * (cardWidth + gap)}px))`,
          gap: `${gap}px`
        }}
      >
        {achievements.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div 
              key={item.id} 
              className={`shrink-0 transition-all duration-700 ${isActive ? 'scale-105 opacity-100 z-10' : 'scale-90 opacity-60 grayscale-[50%]'}`}
              style={{ width: `${cardWidth}px` }}
            >
              <div className="border-4 border-emerald-900 bg-white shadow-xl">
                <div className="bg-emerald-900 text-white font-bold py-3 text-center text-lg tracking-wider">
                  外壁・屋根 塗装工事
                </div>
                <div className="p-4 flex gap-4 h-64">
                  <div className="w-5/12 flex flex-col justify-between">
                    <div className="relative h-24">
                      <img 
                        src={item.before} 
                        alt="Before" 
                        className="w-full h-full object-cover border border-stone-200" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/seed/before${item.id}/300/300`;
                        }}
                      />
                      <span className="absolute bottom-0 right-0 bg-white text-[10px] font-bold px-1 border border-stone-300 text-stone-600">施工前</span>
                    </div>
                    <div className="font-bold text-emerald-900 text-sm leading-tight mt-2">
                      {item.location}<br /><span className="text-lg">{item.name}</span>
                    </div>
                  </div>
                  <div className="w-7/12 relative h-full">
                    <img 
                      src={item.after} 
                      alt="After" 
                      className="w-full h-full object-cover border border-stone-200" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = `https://picsum.photos/seed/after${item.id}/600/450`;
                      }}
                    />
                    <span className="absolute bottom-2 right-2 bg-white text-emerald-900 font-bold px-3 py-1 shadow-md text-sm">施工後</span>
                  </div>
                </div>
                <div className="bg-yellow-300 text-emerald-900 font-bold text-center py-3 text-2xl tracking-wider border-t-2 border-emerald-900">
                  費用 {item.cost}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {achievements.map((_, i) => (
          <button 
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors border border-emerald-900 ${i === activeIndex ? 'bg-emerald-900' : 'bg-transparent'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Notification Bar */}
        <div className="bg-emerald-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-2 text-sm font-bold tracking-wide">
            <Map className="w-4 h-4 text-emerald-300" />
            <span>岡山市東区の<span className="text-yellow-400">外壁塗装</span>ならイワショウ</span>
          </div>
        </div>

        {/* Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex flex-col justify-center">
              {/* ロゴ画像: /assets/logo.png を配置してください */}
              <img 
                src="/assets/logo.png" 
                alt="イワショウ" 
                className="h-17 md:h-15 w-auto object-contain mb-1"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // ロゴ画像がない場合のプレースホルダー
                  e.currentTarget.src = "https://placehold.co/200x60/ffffff/064e3b?text=IWASHO+LOGO";
                }}
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <Phone className="w-6 h-6 text-emerald-600 mr-2" />
            <div className="text-right">
              <a href="tel:0120932576" className="block text-3xl font-bold text-emerald-600 font-mono leading-none hover:text-orange-500 transition-colors">
                0120-932-576
              </a>
              <p className="text-xs text-stone-400 mt-1">9:00〜18:00 | 土日祝も対応</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Navigation Bar (Desktop) */}
        <div className="hidden md:block bg-emerald-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between">
              {[
                { id: 'trust', label: '施工実績', icon: <Home className="w-5 h-5 mr-2" /> },
                { id: 'concerns', label: 'お客様の声', icon: <UserCheck className="w-5 h-5 mr-2" /> },
                { id: 'price', label: '料金', icon: <Coins className="w-5 h-5 mr-2" /> },
                { id: 'faq', label: 'よくある質問', icon: <Clock className="w-5 h-5 mr-2" /> },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="flex-1 py-4 flex items-center justify-center font-bold hover:bg-emerald-800 transition-colors border-r border-emerald-800 last:border-r-0"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 absolute w-full shadow-xl">
            <div className="px-4 py-4 space-y-2">
              {[
                { id: 'trust', label: '施工実績' },
                { id: 'concerns', label: 'お客様の声' },
                { id: 'price', label: '料金' },
                { id: 'faq', label: 'よくある質問' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="block w-full text-left px-4 py-3 text-base font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-stone-100">
                <button onClick={() => scrollToSection('contact')} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg shadow-sm">
                  無料見積もりを依頼する
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - スマホファーストビュー最適化 */}
      <section className="relative bg-emerald-900 text-white overflow-hidden min-h-[calc(100dvh-6rem)] sm:min-h-0 flex flex-col justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero_bg.png" 
            alt="美しい日本の家" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/house_japan/1920/1080?blur=1"; }}
          />
          <div className="absolute inset-0 bg-emerald-900/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 w-full">
          <div className="flex flex-col items-start max-w-4xl">
            {/* Text & Badges */}
            <div className="w-full text-left">
              <div className="mb-6 sm:mb-12">
                <div className="inline-block bg-orange-500 text-white text-sm sm:text-base font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full mb-4 sm:mb-6 shadow-md">
                  創業50年の信頼と実績
                </div>
                <h1 className="text-[2rem] leading-tight sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg sm:leading-tight">
                  築40年の我が家、<br />
                  あと20年<span className="text-orange-400 inline-block border-b-2 sm:border-b-4 border-orange-400/50 pb-0.5 sm:pb-1">安心して住める家</span>に。
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-emerald-50 mb-6 sm:mb-8 leading-relaxed max-w-xl drop-shadow-md">
                  完全自社施工の職人が、あなたの家を「わが家」のように守ります。<br className="hidden sm:inline" />
                  小さな修繕から本格的な塗装まで、お任せください。
                </p>
              </div>

              {/* Badges */}
              <div className="flex justify-start gap-4 sm:gap-6">
                {[
                  { 
                    alt: "保証期間 最長15年", 
                    src: "/assets/1.png",
                    fallbackText: "保証期間"
                  },
                  { 
                    alt: "施工実績 5000件以上", 
                    src: "/assets/2.png",
                    fallbackText: "施工実績"
                  },
                  { 
                    alt: "お客様満足度 100%", 
                    src: "/assets/3.png",
                    fallbackText: "満足度"
                  },
                ].map((badge, index) => (
                  <div key={index} className="relative w-32 h-32 sm:w-40 sm:h-40 flex flex-col items-center justify-center">
                    <img 
                      src={badge.src} 
                      alt={badge.alt} 
                      className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/300x300/eab308/ffffff?text=${encodeURIComponent(badge.fallbackText)}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey/Achievements Section (New) */}
      <section id="concerns"className="py-16 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <FadeInSection>
            <SectionHeader en="VOICE" jp="お客様の直筆アンケート" />
            <p className="text-center text-stone-600 mt-4 max-w-2xl mx-auto">
              創業50年。地域の方々からいただいた<span className="text-emerald-600 font-bold">5,000件以上</span>のお喜びの声が、私たちの誇りです。<br />
              実際のアンケート用紙をご覧ください。
            </p>
          </FadeInSection>
        </div>
        <FadeInSection delay={0.2}>
          <SurveyCarousel />
        </FadeInSection>
      </section>

      {/* Concerns Section */}
      <section className="py-24 bg-stone-50 relative scroll-mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4">
                イワショウはこんなお悩みを解決します
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {[
              { title: "色あせ", img: "/assets/concern_fade.png", fallback: "https://picsum.photos/seed/fade/400/400" },
              { title: "ひび割れ", img: "/assets/concern_crack.png", fallback: "https://picsum.photos/seed/crack/400/400" },
              { title: "剥がれ", img: "/assets/concern_peel.png", fallback: "https://picsum.photos/seed/peel/400/400" },
              { title: "雨漏り", img: "/assets/concern_leak.png", fallback: "https://picsum.photos/seed/leak/400/400" }
            ].map((item, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-md group cursor-pointer">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = item.fallback; }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                  
                  {/* Inner Border */}
                  <div className="absolute inset-2 sm:inset-3 border border-white/80 rounded-lg pointer-events-none"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl sm:text-2xl font-bold tracking-widest drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
          

        </div>
      </section>

      {/* Trust & History Section */}
      <section id="trust" className="py-24 bg-white relative overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <FadeInSection>
            <SectionHeader en="ACHIEVEMENT" jp="50年で培った確かな技術" />
            <p className="text-center text-stone-500 mt-4">岡山市東区を中心に外壁塗装を行なっています</p>
          </FadeInSection>
        </div>
        
        <FadeInSection delay={0.2}>
  <AchievementCarousel />
  <div className="mt-10 text-center">
    <a
      href="https://tosou-iwashou.com/category/jirei"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-full hover:bg-emerald-50 transition-colors bg-white"
    >
      施工事例をもっと見てイメージする
      <ArrowRight className="w-4 h-4 ml-2" />
    </a>
  </div>
</FadeInSection>
      </section>

      {/* Voices Section */}
      <section className="py-20 bg-stone-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 mb-16">
            {/* Voice 1 (Left) */}
            <FadeInSection>
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="shrink-0">
                  <img 
                    src="/assets/customer_voice_1.png" 
                    alt="Customer" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-50 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=Nala";
                    }}
                  />
                </div>
                <div className="relative bg-white border border-emerald-100 p-6 rounded-2xl rounded-tl-none shadow-sm flex-1 max-w-lg">
                  <p className="text-stone-700 font-medium leading-relaxed">
                    築45年の我が家が、まるで<span className="text-emerald-600 font-bold">新築のように</span>生まれ変わりました。
                    職人さんの<span className="text-emerald-600 font-bold">丁寧な仕事</span>ぶりに、近所の方からも褒められました！
                  </p>
                  {/* Triangle */}
                  <div className="absolute top-0 -left-3 w-0 h-0 border-t-[15px] border-t-emerald-100 border-l-[15px] border-l-transparent"></div>
                  <div className="absolute top-[1px] -left-[11px] w-0 h-0 border-t-[14px] border-t-white border-l-[14px] border-l-transparent"></div>
                  {/* Sparkles */}
                  <div className="absolute -right-6 -bottom-4 text-yellow-400">
                    <Sparkles className="w-8 h-8 rotate-12" />
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Voice 2 (Right) */}
            <FadeInSection delay={0.2}>
              <div className="flex items-start justify-end gap-4 sm:gap-6">
                <div className="relative bg-white border border-emerald-100 p-6 rounded-2xl rounded-tr-none shadow-sm flex-1 max-w-lg">
                  <p className="text-stone-700 font-medium leading-relaxed">
                    「<span className="text-emerald-600 font-bold">あと20年は安心して住みたい</span>」という要望に、プロの視点で親身に提案してくれました。
                    <span className="text-emerald-600 font-bold">自社施工</span>のイワショウさんなら安心です。
                  </p>
                  {/* Triangle */}
                  <div className="absolute top-0 -right-3 w-0 h-0 border-t-[15px] border-t-emerald-100 border-r-[15px] border-r-transparent"></div>
                  <div className="absolute top-[1px] -right-[11px] w-0 h-0 border-t-[14px] border-t-white border-r-[14px] border-r-transparent"></div>
                  {/* Sparkles */}
                  <div className="absolute -left-6 -bottom-4 text-yellow-400">
                    <Sparkles className="w-8 h-8 -rotate-12" />
                  </div>
                </div>
                <div className="shrink-0 order-last">
                  <img 
                    src="/assets/customer_voice_2.png" 
                    alt="Customer" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-50 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah";
                    }}
                  />
                </div>
              </div>
            </FadeInSection>
          </div>

          <FadeInSection delay={0.3}>
            <h3 className="text-center text-xl sm:text-2xl font-bold text-stone-800">
              などの<span className="text-emerald-600 text-2xl sm:text-3xl mx-1">お喜びの声</span>をたくさんいただいています
            </h3>
          </FadeInSection>
        </div>
      </section>

      

      {/* CEO Message Section */}
      <section className="relative">
        {/* Header Bar */}
        <div className="bg-emerald-600 py-16 text-center relative text-white">
          <div className="flex justify-center items-center gap-4 mb-4 opacity-90">
            <div className="h-px w-8 bg-white"></div>
            <span className="tracking-widest text-sm md:text-base font-medium">どうして</span>
            <div className="h-px w-8 bg-white"></div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold leading-relaxed px-4">
            イワショウの外壁塗装は<br className="md:hidden" />
            「理想の色」が長持ちするの？
          </h2>
          {/* Triangle at bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-emerald-600 z-10"></div>
        </div>

        {/* Content Area */}
        <div className="bg-stone-100 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
           {/* Background Pattern */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none text-stone-900">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                       <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                 </defs>
                 <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
           </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Catchphrase */}
            <FadeInSection>
              <div className="text-center mb-12">
                <h3 className="text-xl md:text-3xl font-bold text-stone-800 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 leading-snug">
                  <span className="text-yellow-400 text-4xl md:text-5xl font-serif">“</span>
                  <span>
                    日本でも数少ない<span className="text-emerald-600 text-2xl md:text-4xl mx-2">自社調色センター</span>を持つ<br className="md:hidden" />プロだから
                  </span>
                  <span className="text-yellow-400 text-4xl md:text-5xl font-serif">”</span>
                </h3>
              </div>
            </FadeInSection>

            {/* White Card */}
            <FadeInSection delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 leading-relaxed text-stone-700 space-y-6 text-base md:text-lg">
                <p>
                  こんにちは。イワショウ・代表の岩藤正宏です。<br />
                  弊社は、屋根・外壁塗装に加え、日本でも数少ない「自社調色センター」を持つ建築塗装屋です。
                </p>
                <p>
                  調色業務は経験が特に重要な仕事です。長年の実績による高度な技術と先進の機械を備え、大手塗料メーカーからも信頼されています。<br />
                  お客様から指定された「理想の色」を再現するには、熟練の技術者でなければなりません。
                </p>
                <p>
                  しかし、どんなに良い塗料を使っても、職人の腕が悪ければその性能は発揮されません。<br />
                  弊社には、技術・知識・プライド、そして社会人としてのマナーを兼ね備えた職人が多数在籍しています。
                </p>
                <p className="font-bold text-emerald-800 text-lg md:text-xl py-2">
                  『そこまでやるか』『そんなとこまで・・・』
                </p>
                <p>
                  お客様にそう感動していただくことこそが、私たちの目標です。<br />
                  外壁塗装は決して安い買い物ではありません。だからこそ、「イワショウに頼んで良かった」と心から思っていただけるよう、岡山の地元で、一切の手抜きのない仕事を約束します。
                </p>

                {/* CEO Profile */}
                <div className="flex items-center justify-end gap-4 mt-10 pt-8 border-t border-stone-100">
                   <div className="text-right">
                      <p className="text-sm text-stone-500 mb-1">株式会社イワショウ 代表取締役</p>
                      <p className="text-xl font-bold text-stone-800">岩藤 正宏</p>
                   </div>
                   <div className="w-24 h-24 rounded-lg overflow-hidden bg-stone-200 shadow-md">
                      <img 
                        src="/assets/ceo_profile.jpg" 
                        alt="岩藤 正宏" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/ceo_iwasho/200/200"; }}
                      />
                   </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4 Reasons Section (OUR STRENGTH) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">OUR STRENGTH</span>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mt-2 mb-6">
                イワショウが選ばれる<br className="md:hidden" />
                <span className="text-emerald-600">「4つの安心」</span>
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
                創業50年。地元岡山で5,000件の外壁・屋根塗装工事を受注している<br className="hidden md:block" />
                イワショウが選ばれる理由をご紹介します。
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-24">
            {/* Reason 1 */}
            <FadeInSection>
              <div className="bg-emerald-50/50 rounded-3xl overflow-hidden shadow-sm border border-emerald-100">
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-stone-800 text-white py-2 px-6 rounded-br-2xl z-10">
                    <span className="text-sm font-medium tracking-widest">Point</span>
                    <span className="text-2xl font-bold ml-2">01</span>
                  </div>
                  
                  <div className="pt-16 pb-8 px-6 md:px-12 text-center border-b border-emerald-200/50">
                    <p className="text-stone-600 font-bold mb-2">納得のお値打ち価格</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-800">
                      自社工場併設で<br className="md:hidden" />
                      <span className="text-emerald-600">「理想の色」</span>をオーダーメイド
                    </h3>
                  </div>

                  <div className="p-6 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6 text-stone-700 leading-relaxed">
                      <p>
                        岡山外壁塗装専門店イワショウは、一般的な塗装店とは違い、塗料を生産するための<span className="font-bold text-emerald-700">「自社工場（岡山SS工場）」</span>を併設しています。
                      </p>
                      <p>
                        自社で塗料を調合・調色するため、<span className="bg-yellow-100 px-1 font-bold">高品質なのに低コスト</span>で必要な塗料を調達することが可能です。
                      </p>
                      <p>
                        また、通常は2・3色に限定されがちな色も、イワショウならお客様が求める<span className="font-bold text-emerald-700">どのような色でも調合</span>し、理想の仕上がりを実現します。
                      </p>
                    </div>
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src="/assets/strength_factory.png" 
                        alt="自社調色工場" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/paint_factory/600/400"; }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-bold text-sm">岡山SS工場での調色風景</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-100/50 p-8 text-center relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-400">
                      <ChevronDown className="w-12 h-12 animate-bounce" />
                    </div>
                    <div className="bg-yellow-400 text-stone-900 font-bold py-2 px-8 rounded-full inline-block mb-4 shadow-sm">
                      イワショウなら
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-stone-800">
                      高品質塗料を<span className="text-emerald-700 text-2xl md:text-3xl mx-1">リーズナブル</span>に提供できる！
                    </h4>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Reason 2 */}
            <FadeInSection>
              <div className="bg-emerald-50/50 rounded-3xl overflow-hidden shadow-sm border border-emerald-100">
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-stone-800 text-white py-2 px-6 rounded-br-2xl z-10">
                    <span className="text-sm font-medium tracking-widest">Point</span>
                    <span className="text-2xl font-bold ml-2">02</span>
                  </div>
                  
                  <div className="pt-16 pb-8 px-6 md:px-12 text-center border-b border-emerald-200/50">
                    <p className="text-stone-600 font-bold mb-2">確かな技術と実績</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-800">
                      <span className="text-emerald-600">創業50年</span>以上の歴史と<br className="md:hidden" />
                      <span className="text-emerald-600">5,000件超</span>の施工実績
                    </h3>
                  </div>

                  <div className="p-6 md:p-12 grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                    <div className="order-2 md:order-1 relative h-64 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src="/assets/strength_history.png" 
                        alt="豊富な実績" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/history_50/600/400"; }}
                      />
                    </div>
                    <div className="order-1 md:order-2 space-y-6 text-stone-700 leading-relaxed">
                      <p>
                        岡山の老舗として50年。皆様の厚い信頼により、これまでに<span className="font-bold text-emerald-700">5,000件以上</span>もの屋根・外壁塗装のご依頼をいただいております。
                      </p>
                      <p>
                        長年培った豊富な知識と経験があるからこそ、岡山で最高の塗装パフォーマンスを提供できると自負しております。
                      </p>
                      <p>
                        さらに、プロ資格である<span className="bg-yellow-100 px-1 font-bold">「外壁診断士」</span>が常駐。第三者の視点から公正に建物の状態を診断し、本当に必要なメンテナンスをご提案します。
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-100/50 p-8 text-center relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-400">
                      <ChevronDown className="w-12 h-12 animate-bounce" />
                    </div>
                    <div className="bg-yellow-400 text-stone-900 font-bold py-2 px-8 rounded-full inline-block mb-4 shadow-sm">
                      イワショウなら
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-stone-800">
                      有資格者による<span className="text-emerald-700 text-2xl md:text-3xl mx-1">安心の診断</span>と最適な提案がある！
                    </h4>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Reason 3 */}
            <FadeInSection>
              <div className="bg-emerald-50/50 rounded-3xl overflow-hidden shadow-sm border border-emerald-100">
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-stone-800 text-white py-2 px-6 rounded-br-2xl z-10">
                    <span className="text-sm font-medium tracking-widest">Point</span>
                    <span className="text-2xl font-bold ml-2">03</span>
                  </div>
                  
                  <div className="pt-16 pb-8 px-6 md:px-12 text-center border-b border-emerald-200/50">
                    <p className="text-stone-600 font-bold mb-2">丁寧な仕事</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-800">
                      高い技術力を支える<br className="md:hidden" />
                      <span className="text-emerald-600">「熟練の職人たち」</span>
                    </h3>
                  </div>

                  <div className="p-6 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6 text-stone-700 leading-relaxed">
                      <p>
                        イワショウでは、塗装の技術面はもちろんのこと、<span className="font-bold text-emerald-700">「お客様ファースト」</span>を掲げ、マナーや丁寧な気配りを徹底しています。
                      </p>
                      <p>
                        外壁塗装は、お客様が生活している状態で行う工事です。だからこそ、工事中も快適に過ごしていただくための配慮は最重要課題です。
                      </p>
                      <p>
                        徹底した社員教育を受けた職人が、お客様が<span className="bg-yellow-100 px-1 font-bold">ストレスを感じることなく生活</span>できるよう、細部までこだわった施工を行います。
                      </p>
                    </div>
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src="/assets/strength_craftsman.png" 
                        alt="熟練の職人" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/craftsman_smile/600/400"; }}
                      />
                    </div>
                  </div>

                  <div className="bg-emerald-100/50 p-8 text-center relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-400">
                      <ChevronDown className="w-12 h-12 animate-bounce" />
                    </div>
                    <div className="bg-yellow-400 text-stone-900 font-bold py-2 px-8 rounded-full inline-block mb-4 shadow-sm">
                      イワショウなら
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-stone-800">
                      細部までこだわる施工で<span className="text-emerald-700 text-2xl md:text-3xl mx-1">ストレスフリー</span>を実現！
                    </h4>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Reason 4 */}
            <FadeInSection>
              <div className="bg-emerald-50/50 rounded-3xl overflow-hidden shadow-sm border border-emerald-100">
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-stone-800 text-white py-2 px-6 rounded-br-2xl z-10">
                    <span className="text-sm font-medium tracking-widest">Point</span>
                    <span className="text-2xl font-bold ml-2">04</span>
                  </div>
                  
                  <div className="pt-16 pb-8 px-6 md:px-12 text-center border-b border-emerald-200/50">
                    <p className="text-stone-600 font-bold mb-2">きめ細かなアフターフォロー</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-800">
                      工事後も安心の<br className="md:hidden" />
                      <span className="text-emerald-600">「長期保証」</span>と<span className="text-emerald-600">「定期点検」</span>
                    </h3>
                  </div>

                  <div className="p-6 md:p-12 grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                    <div className="order-2 md:order-1 relative h-64 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src="/assets/strength_after.jpg" 
                        alt="アフターフォロー" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/handshake_trust/600/400"; }}
                      />
                    </div>
                    <div className="order-1 md:order-2 space-y-6 text-stone-700 leading-relaxed">
                      <p>
                        工事が終わってからが、お客様との本当のお付き合いの始まりです。イワショウでは、使用材料に伴う<span className="font-bold text-emerald-700">保証書を発行</span>しています。
                      </p>
                      <p>
                        万が一メンテナンスが必要になった場合でも、保証書があることで迅速に対応が可能。どんな小さな不具合にも誠意を持って対応します。
                      </p>
                      <p>
                        さらに、<span className="bg-yellow-100 px-1 font-bold">1年・3年・5年後の無料点検</span>を実施。短いスパンで点検を行うことで、大切なお家を長く守り続けます。
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-100/50 p-8 text-center relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-400">
                      <ChevronDown className="w-12 h-12 animate-bounce" />
                    </div>
                    <div className="bg-yellow-400 text-stone-900 font-bold py-2 px-8 rounded-full inline-block mb-4 shadow-sm">
                      イワショウなら
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-stone-800">
                      徹底したサポートで<span className="text-emerald-700 text-2xl md:text-3xl mx-1">塗りたての美しさ</span>が長持ち！
                    </h4>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Consultation Section (Fast View Style) */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero_bg.png" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/painter_consult/1920/1080"; }}
          />
          <div className="absolute inset-0 bg-emerald-900/85"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-16 tracking-wide">
              どんなことでも<br />
              お気軽にご相談ください
            </h2>

            <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-4xl mx-auto">
              {/* Item 1: Price */}
              <div className="flex flex-col items-center group">
                <div className="w-24 h-24 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300 relative border-4 border-white/10 p-4">
                  <img 
                    src="/assets/icon_price.png" 
                    alt="お値段" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/200x200/ffffff/333333?text=Price"; }}
                  />
                </div>
                <p className="text-lg md:text-2xl font-bold text-white tracking-widest">お値段</p>
              </div>

              {/* Item 2: Color */}
              <div className="flex flex-col items-center group">
                <div className="w-24 h-24 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300 relative border-4 border-white/10 p-4">
                  <img 
                    src="/assets/icon_color.png" 
                    alt="色" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/200x200/ffffff/333333?text=Color"; }}
                  />
                </div>
                <p className="text-lg md:text-2xl font-bold text-white tracking-widest">色</p>
              </div>

              {/* Item 3: Deterioration */}
              <div className="flex flex-col items-center group">
                <div className="w-24 h-24 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300 relative border-4 border-white/10 p-4">
                  <img 
                    src="/assets/icon_deterioration.png" 
                    alt="外壁の劣化" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/200x200/ffffff/333333?text=Deterioration"; }}
                  />
                </div>
                <p className="text-lg md:text-2xl font-bold text-white tracking-widest">外壁の劣化</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Price Plan Section */}
      <section id="price" className="py-24 bg-stone-50 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeader en="PRICE PLAN" jp="イワショウの施工価格" />
            <div className="text-center mb-16">
              <p className="text-stone-600 max-w-3xl mx-auto leading-relaxed">
                屋根・外壁塗装50年のイワショウが自信をもっておすすめする、<br className="hidden md:block" />
                高品質・低価格で提供する屋根外壁塗装の料金プランです。<br />
                料金別だけではなく、初心者にも分かりやすい「機能別」塗料の塗装プランもご提案させていただいております。
              </p>
              <div className="mt-6 bg-emerald-100/50 p-4 rounded-xl inline-block text-left max-w-2xl mx-auto">
                <p className="text-sm text-emerald-800 font-medium flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    外壁塗装プランの料金は全プラン<span className="font-bold underline decoration-emerald-500 decoration-2">足場代と雨樋・軒天・破風板の塗装も含んだ料金設定</span>になっておりますので、
                    お客様に余計な追加請求やオプションを請求することはございません*。
                  </span>
                </p>
                <p className="text-xs text-stone-500 mt-2 text-right">*一般社団法人「全国住宅外壁診断士協会」資格</p>
              </div>
            </div>
          </FadeInSection>

          {/* Basic Plans */}
          <div className="mb-20">
            <FadeInSection>
              <h3 className="text-2xl font-bold text-stone-800 mb-8 flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
                <Palette className="w-6 h-6 text-emerald-600" />
                基本プラン
              </h3>
            </FadeInSection>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Platinum Plan */}
              <FadeInSection delay={0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-stone-100 hover:border-emerald-400 transition-all duration-300 h-full flex flex-col relative group">
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-300 text-stone-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10 shadow-sm">
                    最高級
                  </div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src="/assets/plan_platinum.png" 
                      alt="プラチナプラン" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/platinum_house/600/400"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-xl drop-shadow-md">プラチナプラン</h4>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-emerald-600 font-bold text-sm mb-2">まさに最高級！</p>
                    <p className="text-stone-600 text-sm mb-4 flex-grow">
                      汚れにくく、長持ちする「プレミアム無機塗料」を使用。塗膜が硬いため、最高級の耐久性を誇ります。
                    </p>
                    <div className="mt-auto pt-4 border-t border-stone-100">
                      <p className="text-xs text-stone-500 mb-1">参考価格(税込)</p>
                      <p className="text-3xl font-bold text-red-600 font-mono">
                        ¥898,000<span className="text-sm text-stone-600 font-normal">~</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>

              {/* Gold Plan */}
              <FadeInSection delay={0.2}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-500 transform scale-105 z-10 h-full flex flex-col relative group">
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10 shadow-sm">
                    人気No.1
                  </div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src="/assets/plan_gold.png" 
                      alt="ゴールドプラン" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/gold_house/600/400"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-xl drop-shadow-md">ゴールドプラン</h4>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col bg-emerald-50/30">
                    <p className="text-emerald-600 font-bold text-sm mb-2">定番でコスパの高いプラン</p>
                    <p className="text-stone-600 text-sm mb-4 flex-grow">
                      最も多く利用されている「水性フッ素塗料」を使用。コスパがよく、経済的な外壁塗料です。
                    </p>
                    <div className="mt-auto pt-4 border-t border-emerald-100">
                      <p className="text-xs text-stone-500 mb-1">参考価格(税込)</p>
                      <p className="text-4xl font-bold text-red-600 font-mono">
                        ¥798,000<span className="text-sm text-stone-600 font-normal">~</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>

              {/* Silver Plan */}
              <FadeInSection delay={0.3}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-stone-100 hover:border-emerald-400 transition-all duration-300 h-full flex flex-col relative group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src="/assets/plan_silver.png" 
                      alt="シルバープラン" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/silver_house/600/400"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-xl drop-shadow-md">シルバープラン</h4>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-emerald-600 font-bold text-sm mb-2">ご奉仕プラン</p>
                    <p className="text-stone-600 text-sm mb-4 flex-grow">
                      安く、快適な機能を追求した「ラジカルシリコン塗料」を使用。とにかく安く行いたい方にピッタリ。
                    </p>
                    <div className="mt-auto pt-4 border-t border-stone-100">
                      <p className="text-xs text-stone-500 mb-1">参考価格(税込)</p>
                      <p className="text-3xl font-bold text-red-600 font-mono">
                        ¥598,000<span className="text-sm text-stone-600 font-normal">~</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>

               {/* Roof Painting Plan */}
               <FadeInSection delay={0.4}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-stone-100 hover:border-emerald-400 transition-all duration-300 h-full flex flex-col relative group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src="/assets/c" 
                      alt="屋根塗装" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/roof_painting/600/400"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-xl drop-shadow-md">屋根塗装</h4>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-emerald-600 font-bold text-sm mb-2">屋根専用プラン</p>
                    <p className="text-stone-600 text-sm mb-4 flex-grow">
                      「溶剤シリコン」を使ったプランです。グレードは変更可能ですので、ぜひご相談ください。
                    </p>
                    <div className="mt-auto pt-4 border-t border-stone-100">
                      <p className="text-xs text-stone-500 mb-1">参考価格(税込)</p>
                      <p className="text-3xl font-bold text-red-600 font-mono">
                        ¥198,000<span className="text-sm text-stone-600 font-normal">~</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>

          {/* Functional Plans */}
          <div>
            <FadeInSection>
              <h3 className="text-2xl font-bold text-stone-800 mb-8 flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
                <Award className="w-6 h-6 text-emerald-600" />
                機能性塗料プラン
              </h3>
            </FadeInSection>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Energy Saving Plan */}
              <FadeInSection delay={0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-stone-100 hover:border-emerald-400 transition-all duration-300 h-full flex flex-col relative group">
                  <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 shadow-sm flex items-center gap-1">
                    <Leaf className="w-3 h-3" /> 省エネ
                  </div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src="/assets/plan_eco.png" 
                      alt="省エネ・節電対策" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/eco_house/600/400"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-lg drop-shadow-md">省エネ・節電対策塗料プラン</h4>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-stone-600 text-sm mb-4 flex-grow leading-relaxed">
                      遮熱性が高い「アドグリーンコート」を使用。塗るだけで電気代を20%削減可能。世界最高峰のセラミック素材で最先端の省エネ対策を。
                    </p>
                    <div className="mt-auto pt-4 border-t border-stone-100">
                      <p className="text-xs text-stone-500 mb-1">参考価格(税込)</p>
                      <p className="text-3xl font-bold text-red-600 font-mono">
                        ¥768,000<span className="text-sm text-stone-600 font-normal">~</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>

              {/* Waterproof Plan */}
              <FadeInSection delay={0.2}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-stone-100 hover:border-emerald-400 transition-all duration-300 h-full flex flex-col relative group">
                  <div className="absolute top-0 left-0 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 shadow-sm flex items-center gap-1">
                    <Umbrella className="w-3 h-3" /> 超防水
                  </div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src="/assets/plan_waterproof.png" 
                      alt="超防水プラン" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/waterproof/600/400"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-lg drop-shadow-md">超防水プラン</h4>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-stone-600 text-sm mb-4 flex-grow leading-relaxed">
                      伸縮率600%以上の「アステックペイント ピュアアクリル」を使用。飛行機の窓にも使われる高耐久・高弾性で、まさに「超防水」を実現。
                    </p>
                    <div className="mt-auto pt-4 border-t border-stone-100">
                      <p className="text-xs text-stone-500 mb-1">参考価格(税込)</p>
                      <p className="text-3xl font-bold text-red-600 font-mono">
                        ¥998,000<span className="text-sm text-stone-600 font-normal">~</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>

              {/* Heat Insulation Plan */}
              <FadeInSection delay={0.3}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-stone-100 hover:border-emerald-400 transition-all duration-300 h-full flex flex-col relative group">
                  <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 shadow-sm flex items-center gap-1">
                    <Thermometer className="w-3 h-3" /> 遮熱/断熱
                  </div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src="/assets/plan_insulation.png" 
                      alt="遮熱/断熱塗料の定番プラン" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/insulation/600/400"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-lg drop-shadow-md">遮熱/断熱塗料の定番プラン</h4>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-stone-600 text-sm mb-4 flex-grow leading-relaxed">
                      JAXAの技術を応用した「ガイナ」を使用。夏は涼しく冬は暖かく。さらにマイナスイオン発生効果で快適な生活環境を提供します。
                    </p>
                    <div className="mt-auto pt-4 border-t border-stone-100">
                      <p className="text-xs text-stone-500 mb-1">参考価格(税込)</p>
                      <p className="text-3xl font-bold text-red-600 font-mono">
                        ¥898,000<span className="text-sm text-stone-600 font-normal">~</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Construction Flow Section */}
      <section className="py-24 bg-emerald-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-20">
              <div className="inline-block bg-yellow-100 text-stone-800 font-bold px-8 py-3 rounded-full mb-6 relative shadow-sm text-lg">
                最短で1ヶ月で着工
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-yellow-100"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
                イワショウ<span className="text-emerald-600">こだわり</span>の施工の流れ
              </h2>
            </div>
          </FadeInSection>

          <div className="space-y-24">
            {/* Flow 01 */}
            <FadeInSection>
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8 border-b border-emerald-200 pb-4">
                   <div className="flex items-end gap-4 justify-center md:justify-start">
                     <div className="text-center">
                       <span className="block text-sm font-bold text-emerald-600 uppercase tracking-widest">Flow</span>
                       <span className="block text-5xl font-bold text-emerald-800 leading-none font-mono">01</span>
                     </div>
                     <div className="h-12 w-px bg-emerald-200 mx-2 hidden md:block"></div>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-stone-800 pb-1 text-center md:text-left flex-grow">お見積り</h3>
                </div>
                
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-emerald-100">
                  <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                    <div className="bg-emerald-50 p-8 rounded-xl text-center border border-emerald-100">
                      <p className="flex items-center justify-center text-2xl md:text-3xl font-bold text-emerald-600 mb-2 font-mono">
                        <Phone className="w-6 h-6 md:w-8 md:h-8 mr-2" /> 0120-39-4116
                      </p>
                      <p className="text-emerald-800 text-sm font-medium">9:00~18:00 | 火水祝 定休日</p>
                    </div>
                    <div>
                      <p className="text-stone-700 leading-relaxed text-lg font-medium">
                        専門スタッフがご要望を承ります。細かいどんなことでも、ご質問にお答えします。
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                     <CtaButton text="無料お見積りはこちらから" primary={true} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Flow 02 - 06 */}
            {[
              {
                id: '02',
                title: '現地調査・無料診断',
                desc: '担当者が現地へ伺い、屋根や外壁の劣化状況を細かく確認する無料の建物診断を行います。ひび割れや塗膜の劣化などを写真や動画で記録し、その場で現在の状態をわかりやすくご説明いたします。',
                note: '※無理な営業は一切いたしませんのでご安心ください。',
                img: '/assets/flow_02.png',
                fallback: 'https://picsum.photos/seed/flow_check/600/400'
              },
              {
                id: '03',
                title: '診断結果のご説明・お見積り',
                desc: '現地調査の結果をもとに、建物の状態やご予算に合わせた最適な塗装プランとお見積りを作成します。写真付きの診断内容とあわせて、後日わかりやすくご説明いたします。',
  　　　　　　    note: '※お見積書はメールでもお送りでき、ご家族とも共有してご検討いただけます。',
                img: '/assets/flow_03.png',
                fallback: 'https://picsum.photos/seed/flow_meeting/600/400'
              },
              {
                id: '04',
                sub: 'お見積りにご納得いただけましたら',
                title: '工事開始〜完成',
                desc: '工事開始の前日までに、近隣へ工事が始まる旨のご挨拶をさせていただきます。その後、工程表を基に工事がスタート。工事の日は、朝のご挨拶、夕方のご連絡をいたします。',
                img: '/assets/flow_04.png',
                fallback: 'https://picsum.photos/seed/flow_work/600/400'
              },
              {
                id: '05',
                title: '工事完了のご報告',
                desc: '工事が完了しましたら、お客様の目で工事内容をご確認いただきます。後日、工事工程写真を付けた工事完了報告書と保証書（最大10年間）をご提出いたします。',
                img: '/assets/flow_05.png',
                fallback: 'https://picsum.photos/seed/flow_complete/600/400'
              },
              {
                id: '06',
                title: 'アフターフォロー',
                desc: '工事完了後もお客様とのお付き合いが続くと考え、使用材料に応じた保証書を発行。万が一の不具合にも迅速に対応します。さらに1年・3年・5年の無料点検を実施し、屋根・外壁の状態を定期的にチェック。長期保証と丁寧なアフターサポートで安心をお届けします。',
                img: '/assets/flow_06.png',
                fallback: 'https://picsum.photos/seed/flow_after/600/400'
              }
            ].map((item) => (
              <FadeInSection key={item.id}>
                 <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start">
                   {/* Header for Mobile */}
                   <div className="md:hidden w-full border-b border-emerald-200 pb-4 mb-2">
                      <div className="text-center mb-2">
                         <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Flow</span>
                         <span className="block text-4xl font-bold text-emerald-800 font-mono">{item.id}</span>
                      </div>
                      {item.sub && <p className="text-sm text-stone-600 mb-1 text-center font-bold">{item.sub}</p>}
                      <h3 className="text-2xl font-bold text-stone-800 text-center">{item.title}</h3>
                   </div>

                   {/* Image */}
                   <div className="w-full md:w-1/2">
                     <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                       <img 
                         src={item.img} 
                         alt={item.title} 
                         className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700" 
                         referrerPolicy="no-referrer" 
                         onError={(e) => { e.currentTarget.src = item.fallback; }}
                       />
                     </div>
                   </div>

                   {/* Content */}
                   <div className="w-full md:w-1/2 pt-2">
                      {/* Header for Desktop */}
                      <div className="hidden md:flex items-end gap-6 mb-8 border-b border-emerald-200 pb-4">
                         <div className="text-center">
                           <span className="block text-xs font-bold text-emerald-600 uppercase tracking-widest">Flow</span>
                           <span className="block text-5xl font-bold text-emerald-800 leading-none font-mono">{item.id}</span>
                         </div>
                         <div className="h-12 w-px bg-emerald-200"></div>
                         <div className="pb-1">
                           {item.sub && <p className="text-sm text-stone-600 mb-1 font-bold">{item.sub}</p>}
                           <h3 className="text-3xl font-bold text-stone-800 leading-none">{item.title}</h3>
                         </div>
                      </div>

                      <p className="text-stone-700 leading-loose text-lg mb-6 font-medium">
                        {item.desc}
                      </p>
                      {item.note && (
                        <p className="text-sm text-stone-500 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                          {item.note}
                        </p>
                      )}
                   </div>
                 </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white scroll-mt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeader en="Q & A" jp="よくある質問" />
          </FadeInSection>

          <div className="space-y-4">
            {[
              { 
                q: "見積もりは無料ですか？", 
                a: "はい、完全無料（0円）です。最短30分の現地調査からお見積り提出まで、費用は一切いただきません。「相見積もり」も大歓迎です。しつこい営業は100%いたしませんので、安心してお申し込みください。" 
              },
              {
                q: "費用はどのくらいかかりますか？",
                a: "屋根・外壁塗装セットで80万円〜150万円が一般的な目安です（塗料や面積により変動）。イワショウでは、「一式」という曖昧な見積もりは出しません。塗料代、足場代、施工費などを項目ごとに明確に提示し、ご納得いただけるまで丁寧にご説明します。"
              },
              {
                q: "施工期間はどのくらいですか？",
                a: "一般的な一戸建て（30坪前後）の場合、足場の設置から完工まで約10日〜14日が目安です。天候や劣化状況により前後しますが、「急いで雑な仕事」は一切いたしません。乾燥時間をしっかり確保した、品質重視のスケジュールをご提案します。"
              },
              {
                q: "塗料の選び方がわかりません。",
                a: "「耐久年数」と「ご予算」のバランスが重要です。コスト重視のシリコン（耐久10年）、バランスの良いフッ素（15年）、最高級の無機（20年以上）など、選択肢は様々。プロの診断士が、お客様の立地環境（日当たりや湿気など）を診断し、最もコスパの良いプランを松竹梅でご提案します。"
              },
              {
                q: "色見本やカラー相談はできますか？",
                a: "もちろんです！日本塗料工業会の色見本帳や、A4サイズの大きな塗り板で実際の質感をご確認いただけます。さらに、カラーシミュレーションを使って、ご自宅の写真に色を合わせた完成イメージを作成。「思っていた色と違う」という失敗を防ぎます。"
              },
              {
                q: "職人さんはどんな人が何人くらい来ますか？",
                a: "通常、2〜4名の専属チームで施工します。日替わりのアルバイトではなく、イワショウの教育を受けた熟練職人が一貫して担当。「誰が来ているかわからない」という不安を解消し、責任を持って施工します。"
              },
              { 
                q: "ご近所への挨拶はしてもらえますか？", 
                a: "これが一番気になりますよね。着工の1週間前までに、向こう三軒両隣へ粗品を持ってご挨拶に伺います。工事期間や音が出る日程などを丁寧に説明し、ご近所トラブルゼロを目指します。お客様は何も気にせずお過ごしください。" 
              },
              { 
                q: "工事中は留守にしても大丈夫ですか？", 
                a: "はい、95%以上のお客様がお留守にされています。戸締まりさえしていただければ、責任を持って施工いたします。毎日の進捗は写真付きのLINEや交換日記で100%ご報告しますので、外出先でも安心です。" 
              },
              {
                q: "雨が降った場合はどうなりますか？",
                a: "雨の日は作業を中止させていただきます。無理に塗装すると、後々の「剥がれ」や「膨れ」の原因になるからです。工期が延びる場合は必ず事前にご連絡し、品質最優先で進めさせていただきますのでご安心ください。"
              },
              {
                q: "工事前の事前準備は必要ですか？",
                a: "お客様にしていただくのは、家の周りの片付け（植木鉢や自転車の移動）程度です。重い荷物などは、私たちスタッフがお手伝いしますので、そのままで構いません。また、足場設置のための駐車スペースの確保をお願いする場合もございます。"
              },
              {
                q: "足場はどのようなものですか？",
                a: "安全性と近隣への配慮を徹底した「飛散防止メッシュシート付き」の足場を設置します。塗料の飛び散りや、高圧洗浄の水しぶきを完全に防ぎます。また、工事完了後は徹底的に清掃を行い、来た時よりも美しくしてお引き渡しします。"
              },
              {
                q: "保証や定期点検はありますか？",
                a: "自信があるからこそ、最長15年の自社保証とメーカー保証のW保証をお付けします。さらに、工事後1年・3年・5年・10年の定期巡回点検を実施。「塗って終わり」ではなく、一生のお付き合いとしてお家を見守り続けます。"
              },
              { 
                q: "小さなことでも頼めますか？", 
                a: "もちろんです。「網戸1枚の張替え」「雨樋の詰まり抜き」など、5,000円からの小さな工事でも喜んで承ります。地域密着の「御用聞き」として、お困りごとは何でもご相談ください。" 
              },
              {
                q: "なぜ、外壁塗装が必要なの？",
                a: "家の寿命を延ばし、資産価値を守るためです。塗装は「防水・遮熱」のバリアとなり、雨漏りや柱の腐食を防ぎます。放置すると雨漏り修理で300万円以上かかることも。また、遮熱塗料なら表面温度を最大20℃下げ、エアコン代の節約にも効果的です。"
              },
              {
                q: "見積もりをとるにあたって何業者くらいに連絡をすればいい？",
                a: "3社程度の相見積もりをおすすめします。同じ工事内容でも、業者によって価格が30〜50万円違うことも珍しくありません。「価格」だけでなく、「塗料の耐久年数」や「保証内容」も含めて比較し、一番納得できる業者をお選びください。"
              },
              {
                q: "支払いのタイミングはいつですか？",
                a: "工事が完了し、お客様にご納得いただいてからの完全後払いです。着手金や中間金は0円ですので、安心してご依頼ください。"
              }
            ].map((item, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <details className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm open:shadow-md transition-all duration-300">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-stone-50 transition-colors">
                    <span className="font-bold text-lg text-emerald-900 flex items-start">
                      <span className="bg-emerald-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-4 text-sm flex-shrink-0 font-mono mt-0.5">Q</span>
                      <span className="pt-0.5">{item.q}</span>
                    </span>
                    <span className="transition-transform duration-300 group-open:rotate-180 ml-4">
                      <ChevronDown className="w-5 h-5 text-emerald-500" />
                    </span>
                  </summary>
                  <div className="px-6 pb-8 pt-2 text-stone-700 text-lg leading-relaxed">
                    <div className="flex items-start pl-12 border-l-2 border-stone-100 ml-4">
                      <span className="text-orange-500 font-bold mr-3 mt-0.5">A.</span>
                      {item.a}
                    </div>
                  </div>
                </details>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Smile Paint Style) */}
      <section id="contact" className="py-24 bg-emerald-900 text-white relative overflow-hidden scroll-mt-32">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 opacity-10">
           <img 
            src="/assets/hero_bg.png" 
            alt="Background" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/worker2/1920/1080"; }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInSection>
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-emerald-100 mb-8 font-medium tracking-wider">
            無料で外壁・屋根の劣化をプロが診断
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight">
            塗装が必要ない場合は
            <br />
              <span className="text-orange-400">「まだ大丈夫です」</span>と正直にお伝えします。
            </h2>
            
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl text-stone-800 max-w-3xl mx-auto transform transition-transform hover:scale-[1.01]">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                <div className="text-center md:text-left">
                  <p className="text-sm font-bold text-stone-500 mb-1 uppercase tracking-wider">お電話でのご相談</p>
                  <a href="tel:0120932576" className="text-4xl sm:text-5xl font-bold text-emerald-800 font-mono tracking-tighter hover:text-orange-500 transition-colors">
                    0120-932-576
                  </a>
                  <p className="text-sm text-stone-400 mt-1">受付 8:00〜20:00 (土日祝対応)</p>
                </div>
                <div className="hidden md:block w-px h-20 bg-stone-200"></div>
                <div className="w-full md:w-auto">
                <CtaButton 
  text="無料診断・見積もりを依頼する" 
  subText="24時間受付中・60秒で完了"
  href="https://tosou-iwashou.com/contact"
 />
                </div>
              </div>
              
              <p className="text-xs text-stone-400 border-t border-stone-100 pt-6">
                ※診断結果に基づき、塗装の必要がない場合は正直にお伝えします。<br />
                ※しつこい営業電話や訪問は一切行いませんのでご安心ください。
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">イワショウ</h3>
              <p className="mb-6 leading-relaxed text-stone-400 max-w-md">
                創業50年。地域に根差した完全自社施工の塗装店。<br />
                お客様の人生を見守る「御用聞き」として、住まいのあらゆる困りごとに対応します。
              </p>
              <div className="flex items-center text-white font-bold text-lg">
                <Phone className="w-5 h-5 mr-3 text-emerald-500" />
                0120-932-576
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 border-b border-stone-700 pb-2 inline-block">メニュー</h4>
              <ul className="space-y-3">
                {['お悩み', '選ばれる理由', '施工実績', 'よくある質問', '無料見積もり'].map((item) => (
                  <li key={item}>
                    <button className="hover:text-emerald-400 transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-stone-600 rounded-full mr-2"></span>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 border-b border-stone-700 pb-2 inline-block">会社情報</h4>
              <address className="not-italic space-y-3 text-sm">
                <p>〒703-8212</p>
                <p>岡山県岡山市東区古都宿289-4</p>
                <p>営業時間: 8:00〜20:00</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
            <p>&copy; {new Date().getFullYear()} Iwasho Painting. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://tosou-iwashou.com/about" className="hover:text-white transition-colors">会社概要</a>
              <a href="https://tosou-iwashou.com/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a>
              
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-stone-200 p-3 md:hidden z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] pb-safe">
        <div className="flex gap-3 max-w-md mx-auto">
          <a href="tel:0120932576" className="flex-1 bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl flex flex-col items-center justify-center shadow-sm active:scale-95 transition-transform leading-none">
            <div className="flex items-center mb-1">
              <Phone className="w-4 h-4 mr-1.5" />
              <span className="text-sm">電話相談</span>
            </div>
            <span className="text-xs opacity-80 font-normal">8:00-20:00</span>
          </a>
          <button onClick={() => scrollToSection('contact')} className="flex-[1.5] bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3.5 px-4 rounded-xl flex flex-col items-center justify-center shadow-md active:scale-95 transition-transform leading-none">
            <div className="flex items-center mb-1">
              <Calculator className="w-4 h-4 mr-1.5" />
              <span className="text-sm">無料見積もり</span>
            </div>
            <span className="text-xs opacity-90 font-normal">最短60秒で完了</span>
          </button>
        </div>
      </div>
      
      {/* Safe area padding for mobile footer */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}

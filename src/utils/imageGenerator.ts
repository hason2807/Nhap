export function generateCourseImage(type: string) {
  const colors: Record<string, { bg: string; icon: string }> = {
    react: { bg: '#61DAFB', icon: '⚛️' },
    marketing: { bg: '#FF6B6B', icon: '📢' },
    design: { bg: '#A855F7', icon: '🎨' },
    python: { bg: '#3776AB', icon: '🐍' },
    business: { bg: '#10B981', icon: '💼' },
    english: { bg: '#F59E0B', icon: '🌍' },
    flutter: { bg: '#02569B', icon: '📱' },
    java: { bg: '#007396', icon: '☕' },
    devops: { bg: '#2496ED', icon: '⚙️' },
    csharp: { bg: '#239120', icon: 'C#' },
    javascript: { bg: '#F7DF1E', icon: 'JS' },
    laravel: { bg: '#FF2D20', icon: 'L' },
    unity: { bg: '#000000', icon: '🎮' },
    blockchain: { bg: '#3C3C3D', icon: '⛓️' },
    facebook: { bg: '#1877F2', icon: 'f' },
    googleads: { bg: '#4285F4', icon: 'G' },
    content: { bg: '#FF6D00', icon: '📝' },
    tiktok: { bg: '#000000', icon: '🎵' },
    email: { bg: '#FF6B6B', icon: '✉️' },
    affiliate: { bg: '#00C853', icon: '💰' },
    photoshop: { bg: '#31A8FF', icon: 'Ps' },
    aftereffects: { bg: '#9999FF', icon: 'Ae' },
    xd: { bg: '#FF61F6', icon: 'Xd' },
    logo: { bg: '#FFD700', icon: '🖋️' },
    blender: { bg: '#F5792A', icon: 'B' },
    illustrator: { bg: '#FF9A00', icon: 'Ai' },
    finance: { bg: '#4CAF50', icon: '💹' },
    digitaltrans: { bg: '#2196F3', icon: '🔄' },
    ecommerce: { bg: '#FF9800', icon: '🛒' },
    hr: { bg: '#9C27B0', icon: '👥' },
    sales: { bg: '#E91E63', icon: '📈' },
    communication: { bg: '#3F51B5', icon: '🗣️' },
    toeic: { bg: '#009688', icon: '📘' },
    japanese: { bg: '#BC002D', icon: '🇯🇵' },
    chinese: { bg: '#DE2910', icon: '🇨🇳' },
    photography: { bg: '#000000', icon: '📷' },
    productphoto: { bg: '#795548', icon: '📦' },
    lightroom: { bg: '#2C2C2C', icon: 'Lr' },
    portrait: { bg: '#607D8B', icon: '👤' },
    videophone: { bg: '#00BCD4', icon: '🎥' }
  };
  
  const color = colors[type] || { bg: '#6B7280', icon: '📚' };
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.bg};stop-opacity:0.7" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#grad)"/>
      <text x="200" y="110" font-size="60" text-anchor="middle" fill="${type === 'javascript' ? '#000000' : '#FFFFFF'}">${color.icon}</text>
    </svg>
  `)}`;
}
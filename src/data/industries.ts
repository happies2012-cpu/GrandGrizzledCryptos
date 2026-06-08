export interface Industry {
  key: string
  name: string
  icon: string
  color: string
  glowColor: string
  themes: string[]
  pages: string[]
  tagline: string
}

export const INDUSTRIES: Industry[] = [
  {
    key: 'healthcare',
    name: 'Healthcare & Medical',
    icon: '🏥',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.3)',
    tagline: 'Clinical Intelligence Systems',
    themes: ['Clinical Dashboard', 'Patient Portal', 'Medical Records', 'Pharmacy System', 'Telemedicine'],
    pages: ['Command Center','Patient Matrix','Neural Profile','Appointment Grid','Medical Archive',
            'Lab Analytics','Prescription Engine','Billing Protocol','Report Generator','Staff Command',
            'Telemedicine Hub','Emergency Protocol','Inventory Control','System Settings',
            'Alert Network','Analytics Core','Insurance Module','Referral System','Audit Terminal','Help Matrix'],
  },
  {
    key: 'ecommerce',
    name: 'E-Commerce & Retail',
    icon: '🛒',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.3)',
    tagline: 'Commerce Execution Matrix',
    themes: ['Marketplace', 'Fashion Store', 'Electronics Hub', 'Grocery Platform', 'Luxury Brand'],
    pages: ['Storefront','Product Catalog','Item Detail','Category Navigator','Search Engine','Cart System',
            'Checkout Protocol','Order Confirmation','Order Archive','Shipment Tracker','User Profile',
            'Wishlist Matrix','Review Engine','Seller Command','Inventory Grid','Analytics Core',
            'Promotion Engine','Support Terminal','Returns Protocol','Loyalty Program'],
  },
  {
    key: 'fintech',
    name: 'Fintech & Banking',
    icon: '💳',
    color: '#6366f1',
    glowColor: 'rgba(99,102,241,0.3)',
    tagline: 'Financial Intelligence Core',
    themes: ['Digital Bank', 'Investment Platform', 'Payment Gateway', 'Insurance Portal', 'Crypto Exchange'],
    pages: ['Financial Dashboard','Account Matrix','Transaction Log','Transfer Protocol','Receive Node',
            'Investment Engine','Savings Grid','Budget Analyzer','Loan Module','Credit Scanner',
            'Card Management','Statement Archive','Analytics Core','Security Terminal',
            'KYC Verification','System Settings','Alert Network','Support Matrix','Offers Engine','Referral Grid'],
  },
  {
    key: 'edtech',
    name: 'EdTech & Learning',
    icon: '🎓',
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.3)',
    tagline: 'Knowledge Acquisition System',
    themes: ['Online University', 'Skill Platform', 'Kids Learning', 'Corporate Training', 'Language Engine'],
    pages: ['Learning Hub','Course Catalog','Module Detail','Lesson Renderer','Assessment Engine',
            'Assignment Matrix','Progress Tracker','Certificate Core','Discussion Network','Live Session',
            'Student Command','Instructor Terminal','Grade Matrix','Schedule Grid','Resource Library',
            'Leaderboard','Community Node','System Settings','Alert Matrix','Support Terminal'],
  },
  {
    key: 'saas',
    name: 'SaaS & Productivity',
    icon: '⚡',
    color: '#ec4899',
    glowColor: 'rgba(236,72,153,0.3)',
    tagline: 'Operational Command Interface',
    themes: ['Project Manager', 'CRM Platform', 'Analytics Hub', 'HR System', 'DevOps Terminal'],
    pages: ['Command Dashboard','Project Matrix','Task Engine','Kanban Grid','Calendar Protocol',
            'Team Network','Report Generator','Integration Hub','Workflow Engine','Document Archive',
            'Time Tracker','Invoice System','System Settings','Billing Module','API Key Manager',
            'Audit Terminal','Alert Network','Help Command','Onboarding Sequence','Profile Matrix'],
  },
  {
    key: 'realestate',
    name: 'Real Estate',
    icon: '🏠',
    color: '#14b8a6',
    glowColor: 'rgba(20,184,166,0.3)',
    tagline: 'Property Intelligence Network',
    themes: ['Property Marketplace', 'Rental Platform', 'Agent Portal', 'Commercial Grid', 'Vacation Rentals'],
    pages: ['Property Hub','Search Matrix','Asset Detail','Map Navigator','Saved Properties',
            'Comparison Engine','Virtual Tour Protocol','Agent Profile','Agency Node','Mortgage Calculator',
            'Neighborhood Intel','Visit Scheduler','Agent Contact','My Portfolio','Listing Command',
            'Analytics Core','CRM Terminal','Document Archive','System Settings','Support Matrix'],
  },
  {
    key: 'social',
    name: 'Social & Community',
    icon: '💬',
    color: '#f97316',
    glowColor: 'rgba(249,115,22,0.3)',
    tagline: 'Neural Social Network',
    themes: ['Social Network', 'Community Forum', 'Creator Platform', 'Event Engine', 'Live Grid'],
    pages: ['Neural Feed','Discovery Engine','User Profile','Follower Network','Following Matrix',
            'Story Protocol','Message System','Alert Network','Group Hub','Event Calendar',
            'Marketplace Grid','Live Stream','Content Studio','Post Creator','Archive System',
            'Privacy Control','System Settings','Analytics Core','Monetization Module','Support Hub'],
  },
  {
    key: 'logistics',
    name: 'Logistics & Supply Chain',
    icon: '🚚',
    color: '#64748b',
    glowColor: 'rgba(100,116,139,0.3)',
    tagline: 'Supply Chain Command Matrix',
    themes: ['Fleet Manager', 'Warehouse System', 'Delivery Tracker', 'Import/Export', 'Last Mile Engine'],
    pages: ['Operations Hub','Shipment Matrix','Tracking Engine','Fleet Command','Driver Network',
            'Route Optimizer','Warehouse Grid','Inventory Protocol','Order System','Customer Matrix',
            'Supplier Network','Report Engine','Analytics Core','Billing Terminal','Compliance Module',
            'Alert System','System Settings','API Gateway','Help Matrix','Audit Log'],
  },
]

export const getIndustry = (key: string) => INDUSTRIES.find(i => i.key === key)

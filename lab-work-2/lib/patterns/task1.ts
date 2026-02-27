// lib/patterns/task1.ts

// Продукт
export interface Subscription {
  type: string;
  monthlyPrice: number;
  minPeriod: number;
  channels: string[];
  details: string;
}

export class DomesticSubscription implements Subscription {
  type = 'Domestic';
  monthlyPrice = 100;
  minPeriod = 6;
  channels = ['News', 'Sports'];
  details = 'Local channels only';
}

export class EducationalSubscription implements Subscription {
  type = 'Educational';
  monthlyPrice = 150;
  minPeriod = 12;
  channels = ['Discovery', 'History', 'Science'];
  details = 'Access to educational content';
}

export class PremiumSubscription implements Subscription {
  type = 'Premium';
  monthlyPrice = 300;
  minPeriod = 1;
  channels = ['All Movies', '4K Sports', 'Exclusive'];
  details = 'Full access + offline mode';
}

// Творець
export interface SubscriptionFactory {
  createSubscription(type: 'domestic' | 'educational' | 'premium'): Subscription;
}

export class WebSite implements SubscriptionFactory {
  createSubscription(type: 'domestic' | 'educational' | 'premium'): Subscription {
    console.log('Creating via WebSite...');
    if (type === 'premium') return new PremiumSubscription();
    if (type === 'educational') return new EducationalSubscription();
    return new DomesticSubscription();
  }
}

export class MobileApp implements SubscriptionFactory {
  createSubscription(type: 'domestic' | 'educational' | 'premium'): Subscription {
    console.log('Creating via MobileApp (with 10% discount logic)...');
    // Логіка може відрізнятися
    const sub = new WebSite().createSubscription(type);
    sub.monthlyPrice = sub.monthlyPrice * 0.9; 
    return sub;
  }
}

export class ManagerCall implements SubscriptionFactory {
  createSubscription(type: 'domestic' | 'educational' | 'premium'): Subscription {
    console.log('Creating via ManagerCall (personalized)...');
    return new PremiumSubscription(); // Менеджер завжди пропонує Premium
  }
}
// KODİ Sponsor Keşfi Demo Veri Seti ve Sıralama Fonksiyonları

export const TOPICS = ['Cilt Bakımı', 'Sürdürülebilir Yaşam', 'Teknoloji', 'Gastronomi'];

// Varsayılan ağırlıklar (Sıralama modlarına göre güncellenecek veya temel topicScore hesaplamasında kullanılacak)
export const DEFAULT_WEIGHTS = {
  engagement: 0.35,      // Etkileşim oranı ağırlığı
  saveRate: 0.25,        // Kaydetme oranı ağırlığı
  shareRate: 0.20,       // Paylaşım oranı ağırlığı
  viewsNormalized: 0.10, // Normalize edilmiş görüntülenme performansı ağırlığı
  verifiedHistory: 0.10  // Doğrulanmış içerik geçmişi / içerik sayısı ağırlığı
};

export const creators = [
  {
    id: 'creator-a',
    name: 'Elif Şen (Creator A)',
    username: 'elifsen',
    followers: 1200000,
    openToCollaboration: true,
    topicData: {
      'Cilt Bakımı': {
        verifiedCount: 5,
        avgViews: 85000,
        engagementRate: 0.021, // %2.1 (Orta düzey performans)
        saveRate: 0.005,       // %0.5
        shareRate: 0.003,      // %0.3
        historyLength: 5       // Az sayıda içerik geçmişi
      },
      'Gastronomi': {
        verifiedCount: 15,
        avgViews: 120000,
        engagementRate: 0.045,
        saveRate: 0.015,
        shareRate: 0.008,
        historyLength: 15
      }
    }
  },
  {
    id: 'creator-b',
    name: 'Buse Yılmaz (Creator B)',
    username: 'busebeauty',
    followers: 85000,
    openToCollaboration: true,
    topicData: {
      'Cilt Bakımı': {
        verifiedCount: 42,     // Uzun ve doğrulanmış içerik geçmişi
        avgViews: 45000,       // Takipçisine göre çok güçlü izlenme
        engagementRate: 0.082, // %8.2 (Güçlü etkileşim)
        saveRate: 0.038,       // %3.8 (Güçlü kaydetme)
        shareRate: 0.024,      // %2.4 (Güçlü paylaşım)
        historyLength: 42
      }
    }
  },
  {
    id: 'creator-c',
    name: 'Cemre Kaya (Creator C)',
    username: 'cemreskincare',
    followers: 12000,
    openToCollaboration: true,
    topicData: {
      'Cilt Bakımı': {
        verifiedCount: 2,      // Çok düşük doğrulanmış içerik sayısı (veri güvenilirliği düşük)
        avgViews: 8000,
        engagementRate: 0.185, // %18.5 (Çok yüksek yüzdesel oran)
        saveRate: 0.092,       // %9.2 (Çok yüksek kaydetme)
        shareRate: 0.061,      // %6.1 (Çok yüksek paylaşım)
        historyLength: 2
      }
    }
  },
  {
    id: 'creator-d',
    name: 'Deniz Aral (Creator D)',
    username: 'denizaral',
    followers: 48200,
    openToCollaboration: true,
    topicData: {
      'Cilt Bakımı': {
        verifiedCount: 25,
        avgViews: 18000,
        engagementRate: 0.054,
        saveRate: 0.018,
        shareRate: 0.012,
        historyLength: 25
      },
      'Sürdürülebilir Yaşam': {
        verifiedCount: 30,
        avgViews: 22000,
        engagementRate: 0.068,
        saveRate: 0.024,
        shareRate: 0.016,
        historyLength: 30
      }
    }
  },
  {
    id: 'creator-e',
    name: 'Mina Uslu (Creator E)',
    username: 'minauslu',
    followers: 31700,
    openToCollaboration: false, // İşbirliklerine kapalı (filtrelenmeli)
    topicData: {
      'Cilt Bakımı': {
        verifiedCount: 12,
        avgViews: 15000,
        engagementRate: 0.075,
        saveRate: 0.025,
        shareRate: 0.015,
        historyLength: 12
      }
    }
  },
  {
    id: 'creator-f',
    name: 'Fatih Yılmaz (Creator F)',
    username: 'fatihtech',
    followers: 95000,
    openToCollaboration: true,
    topicData: {
      'Teknoloji': {
        verifiedCount: 50,
        avgViews: 65000,
        engagementRate: 0.062,
        saveRate: 0.021,
        shareRate: 0.014,
        historyLength: 50
      }
    }
  }
];

/**
 * Veri güvenilirliği seviyesini hesaplar.
 * @param {number} verifiedCount 
 * @returns {{ level: 'Yüksek' | 'Orta' | 'Düşük', multiplier: number }}
 */
export function getVeriGuvenilirligi(verifiedCount) {
  if (!verifiedCount) return { level: 'Düşük', multiplier: 0.2 };
  if (verifiedCount >= 20) {
    return { level: 'Yüksek', multiplier: 1.0 };
  } else if (verifiedCount >= 5) {
    return { level: 'Orta', multiplier: 0.6 };
  } else {
    return { level: 'Düşük', multiplier: 0.2 };
  }
}

/**
 * Görüntülenme performansını normalize eder.
 * Basit demo amaçlı: max izlenmeye (örneğin 150.000) bölerek 0-1 arası bir değer üretir.
 */
function normalizeViews(views) {
  const MAX_EXPECTED_VIEWS = 150000;
  return Math.min(views / MAX_EXPECTED_VIEWS, 1);
}

/**
 * Doğrulanmış içerik geçmişini normalize eder.
 * Basit demo amaçlı: 50 içeriği tavan kabul edip 0-1 arası bir değer üretir.
 */
function normalizeHistory(count) {
  const MAX_EXPECTED_COUNT = 50;
  return Math.min(count / MAX_EXPECTED_COUNT, 1);
}

/**
 * Bir creator'ın belirli bir konu için detaylı puan bileşenlerini ve nihai topicScore değerini hesaplar.
 */
export function calculateTopicScore(creator, topic, weights = DEFAULT_WEIGHTS) {
  const data = creator.topicData?.[topic];
  if (!data) return null;

  // Veri güvenilirliği katsayısı (multiplier)
  const reliabilityInfo = getVeriGuvenilirligi(data.verifiedCount);
  const reliabilityMultiplier = reliabilityInfo.multiplier;

  // Metrikleri normalize et (zaten oran olanlar 0-1 arasında)
  // Etkileşim oranı genelde %20'yi aşmaz, daha iyi bir kontrast için 0.20'ye bölüp sınırlayabiliriz.
  const normEngagement = Math.min(data.engagementRate / 0.20, 1);
  const normSave = Math.min(data.saveRate / 0.10, 1);
  const normShare = Math.min(data.shareRate / 0.08, 1);
  const normViews = normalizeViews(data.avgViews);
  const normHistory = normalizeHistory(data.verifiedCount);

  // Ağırlıklı ham skor (0 - 1 arası)
  const rawScore = 
    (normEngagement * weights.engagement) +
    (normSave * weights.saveRate) +
    (normShare * weights.shareRate) +
    (normViews * weights.viewsNormalized) +
    (normHistory * weights.verifiedHistory);

  // Güvenilirlik katsayısı ile çarparak nihai kontrollü skoru elde et.
  // Bu sayede çok az doğrulanmış içeriği olan ama yüzdesel metrikleri uçan Creator C'nin skoru törpülenir.
  const finalScore = rawScore * reliabilityMultiplier;

  return {
    rawScore,
    finalScore,
    reliabilityInfo,
    breakdown: {
      normEngagement,
      normSave,
      normShare,
      normViews,
      normHistory
    }
  };
}

/**
 * Belirtilen sıralama moduna göre ağırlık konfigürasyonunu ve sıralamayı döndürür.
 * Modlar: 'Konu Uyumu' | 'Etkileşim' | 'Yükselen Creator' | 'Yeni Creator'
 */
export function getSortedCreators(topic, sortingMode) {
  // Filtreleme kuralları:
  // 1. openToCollaboration === true
  // 2. seçilen konuda doğrulanmış içeriği bulunan (topicData[topic] mevcut olan)
  // 3. minimum veri/yeterlilik koşulunu sağlayan (en az 1 doğrulanmış içerik)
  const filtered = creators.filter(c => 
    c.openToCollaboration && 
    c.topicData?.[topic] && 
    c.topicData[topic].verifiedCount >= 1
  );

  let weights = { ...DEFAULT_WEIGHTS };

  if (sortingMode === 'Etkileşim') {
    // Etkileşim, kaydetme ve paylaşım oranlarını daha güçlü ağırlıklandır
    weights = {
      engagement: 0.50,
      saveRate: 0.25,
      shareRate: 0.20,
      viewsNormalized: 0.03,
      verifiedHistory: 0.02
    };
  } else if (sortingMode === 'Yükselen Creator') {
    // Yakın dönem performansı güçlü, yeterli veri miktarına sahip (görüntülenme ve geçmişe de dengeli önem veren)
    weights = {
      engagement: 0.30,
      saveRate: 0.20,
      shareRate: 0.15,
      viewsNormalized: 0.25,
      verifiedHistory: 0.10
    };
  } else if (sortingMode === 'Yeni Creator') {
    // Daha kısa içerik geçmişine sahip olanları öne çıkarmak için
    // verifiedHistory ağırlığını negatif veya sıfır yapıp, diğer metriklerin verimliliğini koruyabiliriz.
    // Ancak yine de minimum veri yeterliliği için güvenilirlik katsayısı geçerlidir.
    weights = {
      engagement: 0.40,
      saveRate: 0.30,
      shareRate: 0.20,
      viewsNormalized: 0.10,
      verifiedHistory: 0.00 // Geçmiş uzunluğu büyük olanlar ekstra puan almaz
    };
  }

  const results = filtered.map(creator => {
    const scoreDetails = calculateTopicScore(creator, topic, weights);
    return {
      creator,
      scoreDetails,
      score: scoreDetails.finalScore
    };
  });

  // Skora göre azalan sırada sırala. Eşitlik durumunda veya 'Yeni Creator' modunda secondary sorting yapısı
  return results.sort((a, b) => {
    if (sortingMode === 'Yeni Creator') {
      // Birincil kriter: Puan farkı belirginse (%5'ten büyükse) puana göre sırala
      const scoreDiff = b.score - a.score;
      if (Math.abs(scoreDiff) > 0.05) {
        return scoreDiff;
      }
      // İkincil kriter: Benzer/yakın puanlarda daha yeni (içerik sayısı daha az olan) creator'ı öne al
      const countA = a.creator.topicData[topic].verifiedCount;
      const countB = b.creator.topicData[topic].verifiedCount;
      return countA - countB;
    }
    return b.score - a.score;
  });
}

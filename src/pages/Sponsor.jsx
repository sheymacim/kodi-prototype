import { useState } from 'react';
import Badge from '../components/Badge.jsx';
import Card from '../components/Card.jsx';
import Avatar from '../components/Avatar.jsx';
import { TOPICS, getSortedCreators, DEFAULT_WEIGHTS } from '../data/sponsorData.js';

export default function Sponsor() {
  const [selectedTopic, setSelectedTopic] = useState('Cilt Bakımı');
  const [sortingMode, setSortingMode] = useState('Konu Uyumu');

  const sortedList = getSortedCreators(selectedTopic, sortingMode);

  // Sıralama modu açıklamaları
  const sortingModeDescriptions = {
    'Konu Uyumu': 'Konuya özgü genel performansı, doğrulanmış içerik geçmişini ve veri güvenilirliğini dengeli şekilde esas alan standart sıralama.',
    'Etkileşim': 'Etkileşim, kaydetme ve paylaşım oranlarına maksimum ağırlık veren, izleyici katılımı odaklı sıralama.',
    'Yükselen Creator': 'Yüksek etkileşim oranlarının yanı sıra güçlü görüntülenme performansına ve yeterli örneklem büyüklüğüne odaklanan sıralama.',
    'Yeni Creator': 'Minimum doğrulanmış içerik sınırını aşan, kısa ve taze içerik geçmişine sahip creator\'lara hafif öncelik tanıyan sıralama.'
  };

  // Neden bu sırada olduğunu açıklayan dinamik metin üretici
  function getReasoningText(item, index) {
    const { creator, scoreDetails } = item;
    const data = creator.topicData[selectedTopic];
    const reliability = scoreDetails.reliabilityInfo.level;

    if (creator.id === 'creator-b') {
      return `Creator B, ${data.verifiedCount} adet doğrulanmış içerikle Yüksek veri güvenilirliğine ve çok güçlü etkileşim/paylaşım metriklerine sahip olduğundan zirvededir.`;
    }
    if (creator.id === 'creator-a') {
      return `Creator A, 1.2M yüksek takipçi sayısına sahip olsa da bu konudaki doğrulanmış içerik geçmişi (${data.verifiedCount}) kısıtlı ve etkileşim performansı orta seviyede olduğundan daha geridedir.`;
    }
    if (creator.id === 'creator-c') {
      return `Creator C, %${(data.engagementRate * 100).toFixed(1)} gibi çok yüksek etkileşim oranlarına sahip olsa da sadece ${data.verifiedCount} doğrulanmış içerik ürettiği için veri güvenilirliği düşüktür ve sıralama skoru dengelenmiştir.`;
    }

    return `${reliability} güvenilirlik seviyesindeki veri kümesinde, dengeli performans oranları ve ${data.verifiedCount} doğrulanmış içerik sayısı ile ${index + 1}. sırada yer almaktadır.`;
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge tone="primary">Sponsor Keşfi</Badge>
        <h1>Markaların konuya özgü performansla creator keşfetmesini sağla.</h1>
        <p>
          KODİ Sponsor Keşfi, markaların sadece takipçi büyüklüğüne değil, seçilen konudaki doğrulanmış içerik geçmişi,
          normalize edilmiş izlenme performansı ve etkileşim sinyallerinin veri güvenilirliğine göre arama yapmasını sağlar.
        </p>
      </section>

      {/* Konu ve Sıralama Seçim Kontrolleri */}
      <Card style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '0.9rem' }}>
              Arama Yapılacak Konu
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {TOPICS.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`button ${selectedTopic === topic ? 'button-primary' : 'button-secondary'}`}
                  style={{ fontSize: '0.85rem', padding: '6px 12px', minHeight: '36px' }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '0.9rem' }}>
              Sıralama Modu
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Konu Uyumu', 'Etkileşim', 'Yükselen Creator', 'Yeni Creator'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setSortingMode(mode)}
                  className={`button ${sortingMode === mode ? 'button-primary' : 'button-secondary'}`}
                  style={{ fontSize: '0.85rem', padding: '6px 12px', minHeight: '36px' }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>
            <strong>Seçili Sıralama Mantığı:</strong> {sortingModeDescriptions[sortingMode]}
          </p>
        </div>
      </Card>

      {/* Sonuç Listesi */}
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem' }}>
            Arama Sonuçları ({sortedList.length} Creator Listeleniyor)
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            * Sadece işbirliklerine açık ve konuda doğrulanmış içeriği olanlar gösterilir.
          </span>
        </div>

        {sortedList.length === 0 ? (
          <Card className="placeholder-panel">
            <p>Seçilen konuda aktif işbirliği yürüten doğrulanmış creator bulunamadı.</p>
          </Card>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {sortedList.map((item, index) => {
              const { creator, scoreDetails, score } = item;
              const data = creator.topicData[selectedTopic];
              const reliability = scoreDetails.reliabilityInfo.level;

              // Badge rengi tonunu güvenilirlik seviyesine göre ayarla
              let reliabilityTone = 'muted';
              if (reliability === 'Yüksek') reliabilityTone = 'primary';
              else if (reliability === 'Orta') reliabilityTone = 'warning';
              else if (reliability === 'Düşük') reliabilityTone = 'danger';

              return (
                <Card key={creator.id} style={{ padding: '20px', display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-text-muted)', width: '32px' }}>
                        #{index + 1}
                      </div>
                      <Avatar name={creator.name} />
                      <div>
                        <h3 style={{ margin: '0 0 2px 0', fontSize: '1.1rem' }}>{creator.name}</h3>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                          @{creator.username} • {creator.followers.toLocaleString('tr-TR')} takipçi
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Güvenilirlik:</span>
                        <span 
                          style={{ 
                            fontSize: '0.8rem', 
                            fontWeight: 'bold', 
                            padding: '3px 8px', 
                            borderRadius: '4px',
                            background: reliability === 'Yüksek' ? 'rgba(35, 131, 95, 0.15)' : reliability === 'Orta' ? 'rgba(183, 121, 31, 0.15)' : 'rgba(194, 65, 61, 0.15)',
                            color: reliability === 'Yüksek' ? 'var(--color-success)' : reliability === 'Orta' ? 'var(--color-warning)' : 'var(--color-danger)'
                          }}
                        >
                          {reliability} ({data.verifiedCount} İçerik)
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-primary-hover)' }}>
                        KODİ Konu Skoru: {score.toFixed(3)}
                      </div>
                    </div>
                  </div>

                  {/* Metrik Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
                    gap: '12px', 
                    padding: '12px', 
                    background: 'var(--color-background)', 
                    borderRadius: '8px',
                    fontSize: '0.85rem'
                  }}>
                    <div>
                      <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>Ort. Görüntülenme</div>
                      <strong style={{ color: 'var(--color-text)' }}>{data.avgViews.toLocaleString('tr-TR')}</strong>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>Etkileşim Oranı</div>
                      <strong style={{ color: 'var(--color-text)' }}>%{(data.engagementRate * 100).toFixed(1)}</strong>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>Kaydetme Oranı</div>
                      <strong style={{ color: 'var(--color-text)' }}>%{(data.saveRate * 100).toFixed(1)}</strong>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>Paylaşım Oranı</div>
                      <strong style={{ color: 'var(--color-text)' }}>%{(data.shareRate * 100).toFixed(1)}</strong>
                    </div>
                  </div>

                  {/* Açıklama Kutusu */}
                  <div style={{ 
                    padding: '10px 14px', 
                    background: 'rgba(15, 139, 141, 0.05)', 
                    borderLeft: '3px solid var(--color-primary)', 
                    borderRadius: '0 4px 4px 0',
                    fontSize: '0.85rem',
                    color: 'var(--color-text)'
                  }}>
                    <strong>Neden bu sırada?</strong> {getReasoningText(item, index)}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

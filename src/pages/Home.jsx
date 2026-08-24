import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

const homeFeatures = [
  {
    icon: 'K',
    title: 'Konu Sistemi',
    route: '/creator',
    description: 'Creator içeriklerini doğrulanmış konular altında keşfet.',
  },
  {
    icon: '₺',
    title: 'Mikro Destek',
    route: '/support',
    description: 'İçerik üreticilerine anonim ve gönüllü küçük katkılar gönder.',
  },
  {
    icon: 'S',
    title: 'Sponsor Keşfi',
    route: '/sponsor',
    description: "Creator'ları takipçi sayısı yerine konuya özgü performanslarıyla karşılaştır.",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-copy">
          <span className="home-kicker">Sosyal medya içerik ekonomisi prototipi</span>
          <h1>KODİ</h1>
          <p className="subtitle">Konu Odaklı Destek ve İşbirliği</p>
          <p className="lead">
            İçerikleri konu bazında keşfet, içerik üreticilerini anonim olarak destekle ve konuya
            uygun creator'ları keşfet.
          </p>
        </div>

        <Card className="home-post-preview" aria-label="KODI sosyal medya gönderi örneği">
          <div className="post-header">
            <div className="post-profile">
              <div className="avatar avatar-md">AD</div>
              <div>
                <strong>Aylin Demir</strong>
                <span>@aylindemir · 18 dk</span>
              </div>
            </div>
            <button className="icon-button" type="button" aria-label="Gönderi menüsü">
              •••
            </button>
          </div>
          <p>
            Deprem çantası hazırlarken en sık unutulan küçük parçaları konu başlığı altında
            topladım.
          </p>
          <div className="topic-row">
            <Badge tone="primary">Afet hazırlığı</Badge>
            <Badge>Topluluk</Badge>
          </div>
          <div className="home-post-actions">
            <span>Beğen</span>
            <span>Yorum</span>
            <span>Paylaş</span>
          </div>
        </Card>
      </section>

      <section className="home-feature-grid" aria-label="KODI özellikleri">
        {homeFeatures.map((feature) => (
          <Card className="home-feature-card" key={feature.route}>
            <span className="home-feature-icon" aria-hidden="true">
              {feature.icon}
            </span>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <Button to={feature.route} variant="secondary">
              İncele
            </Button>
          </Card>
        ))}
      </section>
    </div>
  );
}

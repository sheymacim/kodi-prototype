import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import CreatorCard from '../components/CreatorCard.jsx';
import { featuredCreators, modules } from '../data/modules.js';

export default function Home() {
  return (
    <div className="page-stack">
      <section className="intro-section">
        <div className="intro-copy">
          <Badge tone="primary">NSosyal İnovasyon Yarışması 2026</Badge>
          <h1>KODİ</h1>
          <p className="subtitle">Konu Odaklı Destek ve İşbirliği</p>
          <p className="lead">
            İçeriklerin konu bazında keşfedilmesini, içerik üreticilerinin anonim mikro destek
            alabilmesini ve markaların konuya özgü performans üzerinden içerik üreticisi
            keşfedebilmesini sağlayan sosyal medya içerik ekonomisi prototipi.
          </p>
          <div className="intro-actions">
            <Button to="/creator">Konu Sistemini İncele</Button>
            <Button to="/sponsor" variant="secondary">
              Sponsor Keşfine Git
            </Button>
          </div>
        </div>

        <Card className="feed-preview" aria-label="KODI sosyal medya önizlemesi">
          <div className="post-header">
            <div className="post-profile">
              <div className="avatar avatar-md">DA</div>
              <div>
                <strong>Deniz Aral</strong>
                <span>@denizaral · 12 dk</span>
              </div>
            </div>
            <button className="icon-button" type="button" aria-label="Gönderi menüsü">
              ...
            </button>
          </div>
          <p>
            Şehirde atıksız alışveriş rotalarını konu konu kaydediyorum. Bu hafta Kadıköy
            çevresindeki üç yeni durağı ekledim.
          </p>
          <div className="topic-row">
            <Badge tone="primary">Sürdürülebilir yaşam</Badge>
            <Badge>Yerel rehber</Badge>
          </div>
          <div className="post-stats">
            <span>2,4 bin görüntülenme</span>
            <span>184 kaydetme</span>
            <span>%71 tamamlama</span>
          </div>
        </Card>
      </section>

      <section className="module-grid" aria-label="KODI modülleri">
        {modules.map((module) => (
          <Card className="module-card" key={module.route}>
            <Badge>{module.eyebrow}</Badge>
            <h2>{module.title}</h2>
            <p>{module.description}</p>
            <Button to={module.route} variant="secondary">
              Modüle Git
            </Button>
          </Card>
        ))}
      </section>

      <section className="content-band">
        <div>
          <h2>Konu bazlı performans, gerçek sosyal deneyimin içinde</h2>
          <p>
            KODİ, creator profili, gönderi kartları, konu etiketleri ve profesyonel araçları tek
            bir ürün diliyle birleştirir. Ayrıntılı senaryolar ilerleyen geliştirme adımlarında bu
            ortak zemin üzerinde genişletilecektir.
          </p>
        </div>
        <div className="creator-list">
          {featuredCreators.map((creator) => (
            <CreatorCard creator={creator} key={creator.username} />
          ))}
        </div>
      </section>
    </div>
  );
}

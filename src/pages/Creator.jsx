import Badge from '../components/Badge.jsx';
import Card from '../components/Card.jsx';

export default function Creator() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge tone="primary">Konu Sistemi</Badge>
        <h1>Creator içeriklerini konu bazında keşfedilebilir hale getir.</h1>
        <p>
          Bu route, creator arşivinin standart Konu Kataloğu üzerinden sınıflandırılacağı senaryo
          için ayrılmıştır. Detaylı akış sonraki geliştirme adımında eklenecektir.
        </p>
      </section>

      <Card className="placeholder-panel">
        <h2>Geliştirme alanı</h2>
        <p>
          Konu önerileri, creator seçimi, katalog doğrulaması ve profil içerik grid'i burada ortak
          design system kullanılarak geliştirilecektir.
        </p>
      </Card>
    </div>
  );
}

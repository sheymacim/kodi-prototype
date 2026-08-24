import Badge from '../components/Badge.jsx';
import Card from '../components/Card.jsx';

export default function Sponsor() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge tone="primary">Sponsor Keşfi</Badge>
        <h1>Markaların konuya özgü performansla creator keşfetmesini sağla.</h1>
        <p>
          Bu route, sponsorların belirli bir konu seçerek uygun creatorları doğrulanmış içerik
          geçmişi ve normalize performans sinyalleriyle inceleyeceği senaryo için ayrılmıştır.
        </p>
      </section>

      <Card className="placeholder-panel">
        <h2>Geliştirme alanı</h2>
        <p>
          Konu filtresi, creator yeterlilik koşulları, işbirliği tercihi ve performans sıralama
          sinyalleri burada ortak componentlerle geliştirilecektir.
        </p>
      </Card>
    </div>
  );
}

import Badge from '../components/Badge.jsx';
import Card from '../components/Card.jsx';

export default function Support() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge tone="primary">Mikro Destek</Badge>
        <h1>İzleyicinin anonim ve gönüllü destek akışını göster.</h1>
        <p>
          Bu route, gönderi menüsünden erişilen anonim mikro destek deneyimi için ayrılmıştır.
          Detaylı destek akışı sonraki geliştirme adımında eklenecektir.
        </p>
      </section>

      <Card className="placeholder-panel">
        <h2>Geliştirme alanı</h2>
        <p>
          Demo destek bakiyesi, destek modalı, anonimlik metinleri ve toplulaştırılmış creator
          istatistikleri burada geliştirilecektir.
        </p>
      </Card>
    </div>
  );
}

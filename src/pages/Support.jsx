import { useMemo, useState } from 'react';
import Avatar from '../components/Avatar.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

export default function Support() {
  const [view, setView] = useState('viewer');
  const [balance, setBalance] = useState(42);
  const [menuOpen, setMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [supportEnabled, setSupportEnabled] = useState(true);
  const [hintVisible, setHintVisible] = useState(true);

  const amount = useMemo(() => {
    if (selectedAmount === 'custom') {
      return Number(customAmount);
    }

    return selectedAmount;
  }, [customAmount, selectedAmount]);

  function openSupportPanel() {
    setMenuOpen(false);
    setSupportOpen(true);
    setMessage('');
    setError('');
  }

  function submitSupport() {
    setMessage('');
    setError('');

    if (!supportEnabled) {
      setError('Bu içerik üreticisi şu anda Mikro Destek kabul etmiyor.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Lütfen geçerli bir destek tutarı girin.');
      return;
    }

    if (amount > balance) {
      setError('Destek bakiyeniz bu işlem için yeterli değil.');
      return;
    }

    setBalance((currentBalance) => currentBalance - amount);
    setSupportOpen(false);
    setMessage('Desteğiniz anonim olarak iletildi.');
    setCustomAmount('');
    setSelectedAmount(5);
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge tone="primary">Mikro Destek</Badge>
        <h1>İzleyicinin anonim ve gönüllü destek akışını göster.</h1>
        <p>
          Destek akışı gönderinin ana etkileşim satırına eklenmeden, yalnızca menüdeki Destekle
          seçeneği üzerinden çalışır. Demo ödeme davranışı local state ile simüle edilir.
        </p>
      </section>

      <div className="support-view-toggle" aria-label="Mikro Destek görünümü">
        <button
          className={view === 'viewer' ? 'is-active' : ''}
          type="button"
          onClick={() => setView('viewer')}
        >
          İzleyici Görünümü
        </button>
        <button
          className={view === 'creator' ? 'is-active' : ''}
          type="button"
          onClick={() => setView('creator')}
        >
          Creator Görünümü
        </button>
      </div>

      {view === 'viewer' ? (
        <section className="support-layout">
          <div className="support-feed-column">
            {hintVisible ? (
              <Card className="support-discovery-band">
                <span className="support-info-icon" aria-hidden="true">
                  i
                </span>
                <div>
                  <h2>Destekle seçeneği ••• menüsünde</h2>
                  <p>
                    İçerik üreticisini desteklemek için gönderinin sağ üstündeki üç noktaya
                    basabilirsin.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Bilgi bandını kapat"
                  onClick={() => setHintVisible(false)}
                >
                  ×
                </button>
              </Card>
            ) : null}

            <Card className="support-post-card">
            <div className="post-header">
              <div className="post-profile">
                <Avatar name="Aylin Demir" />
                <div>
                  <div className="support-creator-line">
                    <strong>Aylin Demir</strong>
                    <span>Doğrulanmış</span>
                  </div>
                  <span>@aylindemir · 18 dk</span>
                </div>
              </div>

              <div className="support-menu-wrap">
                <button
                  className="icon-button support-menu-trigger"
                  type="button"
                  aria-label="Gönderi menüsü"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((current) => !current)}
                >
                  •••
                </button>
                {menuOpen ? (
                  <div className="support-menu" role="menu">
                    <button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>
                      Kaydet
                    </button>
                    <button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>
                      Bağlantıyı Kopyala
                    </button>
                    <button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>
                      Şikayet Et
                    </button>
                    <button
                      className="support-menu-primary"
                      type="button"
                      role="menuitem"
                      disabled={!supportEnabled}
                      onClick={openSupportPanel}
                    >
                      Destekle
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <p>
              Deprem çantası hazırlarken en sık unutulan küçük ama kritik parçaları kısa bir listeye
              topladım. Kendi listenizi mahalle ihtiyaçlarına göre güncellemeyi unutmayın.
            </p>

            <div className="support-media" aria-label="Gönderi görsel alanı">
              <div>
                <strong>Acil Durum Çantası</strong>
                <span>Su · fener · powerbank · ilk yardım · yerel notlar</span>
              </div>
            </div>

            <div className="topic-row">
              <Badge tone="primary">Afet hazırlığı</Badge>
              <Badge>Topluluk dayanışması</Badge>
            </div>

            <div className="support-actions" aria-label="Normal sosyal etkileşimler">
              <button
                type="button"
                className={liked ? 'is-active' : ''}
                onClick={() => setLiked(!liked)}
              >
                {liked ? 'Beğenildi' : 'Beğen'}
              </button>
              <button type="button">Yorum</button>
              <button type="button">Paylaş</button>
            </div>

            {message ? <p className="support-success">{message}</p> : null}
            </Card>
          </div>

          <Card className="support-info-card">
            <h2>Destek Bakiyesi: {balance} TL</h2>
            <p>
              Mikro Destek gönüllüdür ve anonim iletilir. Bu demo akışında destek; öneri
              algoritmasını, Sponsor Keşfi sıralamasını veya kullanıcının sosyal görünürlüğünü
              etkilemez.
            </p>
            <div className="support-rule-list">
              <span>Kimlik paylaşılmaz</span>
              <span>Kamuya açık tutar yok</span>
              <span>Özel ayrıcalık yok</span>
            </div>
          </Card>
        </section>
      ) : (
        <section className="support-layout">
          <Card className="creator-support-panel">
            <div>
              <Badge tone="primary">Creator kontrolü</Badge>
              <h2>Mikro Destek durumu</h2>
              <p>
                Creator, Mikro Destek özelliğini açıp kapatabilir. Kapatıldığında izleyici menüden
                destek akışını başlatamaz.
              </p>
            </div>

            <label className="support-switch">
              <input
                type="checkbox"
                checked={supportEnabled}
                onChange={(event) => setSupportEnabled(event.target.checked)}
              />
              <span>{supportEnabled ? 'Mikro Destek açık' : 'Mikro Destek kapalı'}</span>
            </label>
          </Card>

          <Card className="creator-support-panel">
            <div>
              <Badge>Toplulaştırılmış istatistikler</Badge>
              <h2>Bu ay destek geliri: 2.430 TL</h2>
              <h2>Benzersiz destekçi hesabı: 684</h2>
              <p>
                Destekçilerin adı, kullanıcı adı, profil bilgisi veya tek tek hangi tutarı
                gönderdikleri creator görünümünde gösterilmez.
              </p>
            </div>
          </Card>
        </section>
      )}

      {supportOpen ? (
        <div className="support-modal-backdrop" role="presentation">
          <Card
            className="support-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-modal-title"
          >
            <div className="support-modal-header">
              <div>
                <Badge tone="primary">Anonim destek</Badge>
                <h2 id="support-modal-title">İçerik üreticisini destekle</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Destek penceresini kapat"
                onClick={() => setSupportOpen(false)}
              >
                ×
              </button>
            </div>

            <p className="support-balance">Destek Bakiyesi: {balance} TL</p>

            <div className="amount-options" aria-label="Destek tutarı">
              {[1, 5].map((option) => (
                <button
                  key={option}
                  className={selectedAmount === option ? 'is-active' : ''}
                  type="button"
                  onClick={() => setSelectedAmount(option)}
                >
                  {option} TL
                </button>
              ))}
              <button
                className={selectedAmount === 'custom' ? 'is-active' : ''}
                type="button"
                onClick={() => setSelectedAmount('custom')}
              >
                Özel Tutar
              </button>
            </div>

            {selectedAmount === 'custom' ? (
              <label className="custom-amount-field">
                <span>Özel Tutar</span>
                <input
                  min="1"
                  max={balance}
                  type="number"
                  inputMode="numeric"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  placeholder="Örn. 12"
                />
              </label>
            ) : null}

            <p>
              Destek karşılığında özel görünürlük, takip, özel ilgi veya içerik sözü verilmez.
              İşlem kamuya açık destekçi sayısı ya da toplam tutar oluşturmaz.
            </p>

            {error ? <p className="support-error">{error}</p> : null}

            <div className="support-modal-actions">
              <Button variant="secondary" onClick={() => setSupportOpen(false)}>
                Vazgeç
              </Button>
              <Button onClick={submitSupport}>Anonim Destek Gönder</Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

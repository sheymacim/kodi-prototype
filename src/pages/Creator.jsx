import { useMemo, useState } from 'react';
import Avatar from '../components/Avatar.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

const topics = ['Tümü', 'Makyaj', 'Cilt Bakımı', 'Parfüm', 'Saç Bakımı'];

const initialPosts = [
  {
    id: 1,
    title: 'Nötr makyaj kombinim',
    topic: 'Makyaj',
    group: 'makyaj',
    description: 'Leke kapatıcı, pudra ve doğal bitiş için günlük rutin.',
    likes: '12,4K',
    comments: '319',
    duration: '00:38',
    image: 'M',
  },
  {
    id: 2,
    title: 'Gecelik cilt bakımı rutini',
    topic: 'Cilt Bakımı',
    group: 'cilt',
    description: 'Nemlendirici, serum ve güneş koruyucu adım adım düzeni.',
    likes: '8,9K',
    comments: '246',
    duration: '00:54',
    image: 'C',
  },
  {
    id: 3,
    title: 'Yaz için ferah parfüm seçimi',
    topic: 'Parfüm',
    group: 'parfum',
    description: 'Sıcak hava için hafif ve uzun süre kalıcı koku önerileri.',
    likes: '6,8K',
    comments: '187',
    duration: '00:44',
    image: 'P',
  },
  {
    id: 4,
    title: 'Saç kırılmasına karşı bakım',
    topic: 'Saç Bakımı',
    group: 'sac',
    description: 'Yıpranmış saçlar için bakım ve koruyucu ürünler.',
    likes: '9,7K',
    comments: '402',
    duration: '01:06',
    image: 'S',
  },
  {
    id: 5,
    title: 'Pazartesi sabahı kahve molası',
    topic: null,
    group: 'günlük',
    description: 'Konu atanmamış günlük yaşam içerikleri düzenli akışta kalır.',
    likes: '5,1K',
    comments: '104',
    duration: '00:27',
    image: 'G',
  },
  {
    id: 6,
    title: 'Makyaj fırçalarını düzenleme',
    topic: null,
    group: 'makyaj',
    description: 'Fırça temizliği ve bakım için pratik adım adım rehber.',
    likes: '7,3K',
    comments: '208',
    duration: '00:42',
    image: 'F',
  },
];

const catalogTopics = [
  'Cilt Bakımı',
  'Akne Bakımı',
  'Kozmetik Ürünleri',
  'Güneş Koruması',
  'Saç Bakımı',
  'Oyun',
];

const compatibilityMap = {
  cilt: ['Cilt Bakımı', 'Akne Bakımı', 'Güneş Koruması'],
  makyaj: ['Makyaj', 'Kozmetik Ürünleri'],
  parfum: ['Parfüm'],
  sac: ['Saç Bakımı'],
  günlük: ['Makyaj', 'Cilt Bakımı', 'Parfüm', 'Saç Bakımı'],
};

function Creator() {
  const [selectedTab, setSelectedTab] = useState('Tümü');
  const [selectedPostId, setSelectedPostId] = useState(initialPosts[1].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('Cilt Bakımı');
  const [validation, setValidation] = useState({ type: 'neutral', message: 'Bir konu seçin.' });

  const visiblePosts = useMemo(() => {
    if (selectedTab === 'Tümü') {
      return initialPosts;
    }

    return initialPosts.filter((post) => post.topic === selectedTab);
  }, [selectedTab]);

  const filteredCatalog = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return catalogTopics.slice(0, 4);
    }

    return catalogTopics.filter((topic) => topic.toLowerCase().includes(normalized));
  }, [searchTerm]);

  const selectedPost = initialPosts.find((post) => post.id === selectedPostId) ?? initialPosts[0];

  const handleTopicSelect = (topic) => {
    setAiSuggestion(topic);
    setSearchTerm('');
    setValidation({ type: 'neutral', message: 'Konu seçimi yapıldı. İçerik uyumunu kontrol edin.' });
  };

  const handleValidate = () => {
    const compatibleTopics = compatibilityMap[selectedPost.group] ?? [];

    if (aiSuggestion === 'Oyun') {
      setValidation({
        type: 'error',
        message: 'Bu konu içerikle yeterli uyum göstermiyor.',
      });
      return;
    }

    if (compatibleTopics.includes(aiSuggestion)) {
      setValidation({
        type: 'success',
        message: 'İçerikle uyumlu',
      });
      return;
    }

    setValidation({
      type: 'error',
      message: 'Bu konu içerikle uyumlu değil. Başka bir konuyu deneyin.',
    });
  };

  const handleAssign = () => {
    if (validation.type === 'error') {
      return;
    }

    setSelectedPostId((currentId) => currentId);
    const nextPosts = initialPosts.map((post) => {
      if (post.id === selectedPost.id) {
        return { ...post, topic: aiSuggestion };
      }
      return post;
    });

    const activeIndex = nextPosts.findIndex((post) => post.id === selectedPost.id);
    if (activeIndex >= 0) {
      nextPosts[activeIndex].topic = aiSuggestion;
    }

    // state update is local for demo behavior
    const current = initialPosts.find((post) => post.id === selectedPost.id);
    if (current) {
      current.topic = aiSuggestion;
    }

    setValidation({
      type: 'success',
      message: `${selectedPost.title} için ${aiSuggestion} konusu eklendi.`,
    });
  };

  return (
    <div className="page-stack creator-page">
      <section className="creator-hero card">
        <div className="creator-profile-header">
          <Avatar name="Beyza Yalçın" size="lg" />
          <div className="creator-profile-copy">
            <div className="profile-inline">
              <h1>@beyzayalcin</h1>
              <Badge tone="primary">KODİ Creator</Badge>
            </div>
            <p>
              Cilt, bakım ve günlük rutinler üzerine düzenli içerik üretiyorum. Konu sistemiyle
              içeriklerim daha kolay keşfediliyor.
            </p>
          </div>
          <Button variant="secondary" className="profile-action">
            Profili Düzenle
          </Button>
        </div>

        <div className="profile-stats" aria-label="creator istatistikleri">
          <div>
            <strong>13.4K</strong>
            <span>Takipçi</span>
          </div>
          <div>
            <strong>482</strong>
            <span>Gönderi</span>
          </div>
          <div>
            <strong>96%</strong>
            <span>Takipçi memnuniyeti</span>
          </div>
        </div>
      </section>

      <section className="content-section card">
        <div className="section-header">
          <div>
            <Badge tone="primary">İçerik Akışı</Badge>
            <h2>İzleyici konuya göre keşif yapıyor</h2>
          </div>
          <p>Konular isteğe bağlıdır; konu atanmamış içerikler Tümü görünümünde kalır.</p>
        </div>

        <div className="topic-tabs" aria-label="Konu sekmeleri">
          {topics.map((topic) => (
            <button
              key={topic}
              type="button"
              className={`topic-tab${selectedTab === topic ? ' is-selected' : ''}`}
              onClick={() => setSelectedTab(topic)}
              aria-pressed={selectedTab === topic}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="topic-grid">
          {visiblePosts.map((post) => (
            <button
              key={post.id}
              type="button"
              className={`topic-post${selectedPostId === post.id ? ' is-selected' : ''}`}
              onClick={() => setSelectedPostId(post.id)}
            >
              <div className="topic-post-thumb" aria-hidden="true">
                {post.image}
              </div>
              <div className="topic-post-meta">
                <span className="topic-post-tag">{post.topic ?? 'Konu yok'}</span>
                <strong>{post.title}</strong>
                <p>{post.description}</p>
              </div>
              <div className="topic-post-footer">
                <span>{post.likes} beğeni</span>
                <span>{post.comments} yorum</span>
                <span>{post.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="assign-section">
        <Card className="assign-panel">
          <div className="section-header compact">
            <div>
              <Badge tone="primary">Konu Ata</Badge>
              <h2>Creator içeriğine konu ekleme</h2>
            </div>
          </div>

          <div className="assign-layout">
            <div className="post-picker">
              <h3>İçerik seçimi</h3>
              {initialPosts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  className={`content-choice${selectedPostId === post.id ? ' is-selected' : ''}`}
                  onClick={() => setSelectedPostId(post.id)}
                >
                  <span className="content-pill">{post.topic ?? 'Konu yok'}</span>
                  <span>{post.title}</span>
                </button>
              ))}
            </div>

            <div className="assign-controls">
              <div className="selected-content-card">
                <span className="selected-label">Seçili İçerik</span>
                <strong>{selectedPost.title}</strong>
                <p>{selectedPost.description}</p>
              </div>

              <div className="ai-suggestions" aria-label="AI önerileri">
                <h3>AI konu önerileri</h3>
                <div className="suggestion-list">
                  {['Cilt Bakımı', 'Akne Bakımı', 'Kozmetik Ürünleri'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`suggestion-chip${aiSuggestion === option ? ' is-selected' : ''}`}
                      onClick={() => handleTopicSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <label className="search-field" htmlFor="catalog-search">
                <span>Katalogda Ara</span>
                <input
                  id="catalog-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Örn: Güneş Koruması"
                />
              </label>

              <div className="catalog-results" aria-label="Katalog sonuçları">
                {filteredCatalog.length > 0 ? (
                  filteredCatalog.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`catalog-item${aiSuggestion === item ? ' is-selected' : ''}`}
                      onClick={() => handleTopicSelect(item)}
                    >
                      {item}
                    </button>
                  ))
                ) : (
                  <p className="catalog-empty">Bu konuda sonuç bulunamadı. Farklı bir konu deneyin.</p>
                )}
              </div>

              <div className="validation-actions">
                <Button variant="primary" onClick={handleValidate}>Doğrula</Button>
                <Button variant="secondary" onClick={() => setAiSuggestion('Cilt Bakımı')}>
                  Sıfırla
                </Button>
                <Button variant="primary" onClick={handleAssign}>Konu Ata</Button>
              </div>

              <div className={`status-message ${validation.type}`} role="status" aria-live="polite">
                <span className="status-icon" aria-hidden="true">
                  {validation.type === 'success' ? '✓' : validation.type === 'error' ? '!' : 'i'}
                </span>
                {validation.message}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default Creator;

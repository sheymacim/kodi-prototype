# KODİ
Konu Odaklı Destek ve İşbirliği

## Proje Hakkında
KODİ, içeriklerin konu bazında keşfedilmesini, içerik üreticilerinin anonim mikro destek alabilmesini ve markaların konuya özgü performans üzerinden içerik üreticisi keşfedebilmesini sağlayan sosyal medya içerik ekonomisi prototipidir.

Bu repository, NSosyal İnovasyon Yarışması 2026 için geliştirilen çalışan MVP/prototip zeminidir. Ürün, mevcut sosyal medya platformlarının marka varlıklarını veya birebir arayüzlerini kopyalamadan, kullanıcıların aşina olduğu genel sosyal medya etkileşim kalıplarını KODİ ürün dili içinde gösterir.

## Temel Fikir
KONU SİSTEMİ → MİKRO DESTEK → SPONSOR KEŞFİ

KODİ'nin merkezinde içeriğin hangi konuda olduğu ve creator'ın özellikle o konudaki geçmiş performansı bulunur. Konu Sistemi içerik arşivini standart konularla daha keşfedilebilir hale getirir. Mikro Destek, izleyicinin creator'a anonim ve gönüllü katkı sunmasını sağlar. Sponsor Keşfi ise markaların yalnızca takipçi büyüklüğüne değil, aradıkları konuya özgü doğrulanmış içerik geçmişine ve performansa göre creator bulmasını amaçlar.

## Prototipin Amacı
Bu proje production-ready bir sosyal medya platformu değildir. Yarışma için KODİ'nin temel kullanıcı senaryolarını doğrulayan, geliştiricilerin paralel çalışmasına uygun ortak React uygulama iskeletidir.

Bu aşamada üç modülün detaylı akışları geliştirilmemiştir. `/creator`, `/support` ve `/sponsor` route'ları ayrı ekip üyeleri tarafından genişletilmek üzere ortak navigasyon, başlık, açıklama ve placeholder alanlarıyla hazırlanmıştır.

## Modüller
### 1. Konu Sistemi
- Tamamen isteğe bağlıdır.
- Creator ister tüm içeriklerine konu atar, ister bazılarına atar, ister hiçbirine atamaz.
- Konu atanmayan içerikler normal sosyal medya akışında varlığını sürdürür.
- Konular serbest hashtag değildir; platform tarafından tanımlanmış standart Konu Kataloğu kullanılır.
- AI içerikle ilişkili konu önerileri sunabilir.
- Creator katalogdan farklı bir konu seçebilir.
- Sistem seçilen konunun içerikle uyumunu doğrulayabilir.
- Alakasız konu atamalarının engellenmesi amaçlanır.
- Video başına sınırlı sayıda ana konu kullanılmalıdır.

### 2. Mikro Destek
- Creator tarafından açılıp kapatılabilir.
- Ana beğeni, yorum ve paylaşım butonlarının arasına yerleştirilmez.
- Gönderinin üç nokta menüsündeki "Destekle" seçeneği üzerinden erişilir.
- Demo destek bakiyesi kullanılabilir.
- Destek anonimdir.
- Creator destek veren kişinin kimliğini göremez.
- Diğer kullanıcılar kimin destek verdiğini göremez.
- Kamuya açık destek sayısı veya toplanan tutar gösterilmez.
- Creator yalnızca toplulaştırılmış istatistikler görebilir.
- Destek algoritmik görünürlüğü artırmaz.
- Destek Sponsor Keşfi sıralamasını etkilemez.
- Destek sosyal ayrıcalık satın alma mekanizmasına dönüşmemelidir.

### 3. Sponsor Keşfi
- Her creator otomatik olarak burada görünmez.
- Belirli creator yeterlilik koşulları bulunur.
- Uygun creator ayrıca "İşbirliklerine Açığım" tercihini etkinleştirmelidir.
- Sponsor belirli bir konu seçerek creator arar.
- Yalnızca o konuda doğrulanmış içerikleri bulunan uygun creatorlar değerlendirilir.
- "En çok takipçi = en üst sıra" mantığı kullanılmaz.
- Aranan konuya özgü performans önemlidir.
- Örnek sinyaller: konuya ilişkin içerik geçmişi, izlenme/tamamlama, kaydetme oranı, paylaşım oranı ve etkileşim oranı.
- Mümkün olduğunca normalize edilmiş oranlar düşünülmelidir.
- Çok küçük örneklemlerde yanıltıcı yüksek oran oluşabileceği için veri güvenilirliği de dikkate alınmalıdır.
- Küçük creatorlara yapay avantaj verilmez.
- Büyük creatorların yalnızca hesap büyüklüğünden kaynaklanan otomatik avantajının azaltılması amaçlanır.

## Ortak UI/UX Kuralları
KODİ sade, modern, güvenilir ve gerçek bir sosyal medya ürünü hissi veren tek bir ürün dili kullanır.

- Font: Inter, fallback olarak Arial, sans-serif.
- Renkler `src/styles/globals.css` içindeki CSS variables üzerinden yönetilir.
- Tek accent renk kullanılır: `--color-primary`.
- Temel renk değişkenleri: `--color-primary`, `--color-primary-hover`, `--color-background`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-success`, `--color-warning`, `--color-danger`.
- Layout açık/nötr arka plan, beyaz surface/kartlar ve yaklaşık 1200px maksimum içerik genişliği üzerine kuruludur.
- Spacing sistemi 4 / 8 / 12 / 16 / 24 / 32 px ölçeğini temel alır.
- Kartlar ince nötr border, hafif shadow ve yaklaşık 10-12px border radius kullanır.
- Button, Card, Badge, Avatar ve CreatorCard gibi ortak bileşenler `src/components` altında tutulur.
- Gradient, glassmorphism, neon efekt, ağır shadow ve gereksiz animasyon kullanılmaz.

Yeni bir modül geliştirirken mevcut global CSS değişkenleri ve ortak componentler kullanılmalıdır. Geliştirici kendi bağımsız font, ana renk, navbar veya tasarım sistemi oluşturmamalıdır.

## Geliştirme Kuralları
- Mevcut ortak componentleri kullan.
- Global design system'i bozma.
- Başka modüllerin dosyalarını gereksiz değiştirme.
- Gerçekçi Türkçe demo veriler kullan.
- Lorem ipsum kullanma.
- Mevcut platformların marka veya logolarını kullanma.
- API key, token, parola veya kişisel veri commit etme.
- `.env` dosyalarını commit etme.

## Route'lar
- `/` → KODİ ana sayfası
- `/creator` → Konu Sistemi senaryosu
- `/support` → Mikro Destek senaryosu
- `/sponsor` → Sponsor Keşfi senaryosu

## Kurulum
```bash
npm install
npm run dev
```

Üretim build'i için:

```bash
npm run build
```

## Git ve Ekip Çalışması
Her geliştirici kendi modülüne odaklanmalı, ortak component veya global stil değişikliklerini yalnızca gerekli olduğunda yapmalıdır. Commit mesajları kısa, anlamlı ve yapılan işi açıkça anlatmalıdır.

Örnek commit mesajları:

```text
feat: implement topic system prototype
feat: implement micro support flow
feat: implement sponsor discovery prototype
fix: improve responsive creator cards
docs: update prototype documentation
```

import { useState } from 'react';
import { Sliders, X, Check, Music, HelpCircle, Palette, Heart, Phone, Sparkles } from 'lucide-react';
import type { LoveConfig } from '../config';

interface Props {
  config: LoveConfig;
  onUpdateConfig: (newConfig: LoveConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ config, onUpdateConfig, isOpen, onClose }: Props) {
  const [formData, setFormData] = useState<LoveConfig>(config);
  const [activeTab, setActiveTab] = useState<'profile' | 'music' | 'theme' | 'guide'>('profile');
  const [savedAlert, setSavedAlert] = useState(false);

  // Preset romantic songs
  const songPresets = [
    { title: 'Wanting You Is Not A Crime', artist: 'Reality Club', id: 'buoQZThUnNI', start: 0 },
    { title: 'Hingga Tua Bersama', artist: 'Rizky Febian', id: 'w7wTjE_H4_8', start: 15 },
    { title: 'Dari Mata', artist: 'Jaz', id: 'T2Zz8d9pUls', start: 10 },
    { title: 'Perfect', artist: 'Ed Sheeran', id: '2Vv-BfVoq4g', start: 0 },
    { title: 'Until I Found You', artist: 'Stephen Sanchez', id: 'GxldQ9eX2wo', start: 5 },
  ];

  const handleSave = () => {
    onUpdateConfig(formData);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Pengaturan Surat</h3>
              <p className="text-[11px] text-stone-500">Sesuaikan nama, musik & tampilan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup pengaturan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50/50 p-1 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'profile' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Nama & Teks</span>
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'music' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Musik</span>
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'theme' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Tema</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'guide' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Deploy</span>
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-stone-700">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-stone-800 mb-1">
                  Nama Si Dia (Penerima)
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-800 mb-1">
                  Nama Pengirim
                </label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) =>
                    setFormData({ ...formData, senderName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-800 mb-1">
                  Pertanyaan Utama
                </label>
                <input
                  type="text"
                  value={formData.proposal.question}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proposal: { ...formData.proposal, question: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-800 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nomor WhatsApp Kamu (Untuk balasan WA dari si dia)</span>
                </label>
                <input
                  type="text"
                  value={formData.proposal.yesResponse.whatsappNumber || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proposal: {
                        ...formData.proposal,
                        yesResponse: {
                          ...formData.proposal.yesResponse,
                          whatsappNumber: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-500 text-sm"
                  placeholder="misal: 6281234567890"
                />
                <p className="text-[10px] text-stone-400 mt-1">
                  Gunakan format internasional tanpa spasi (misal: 628xxx)
                </p>
              </div>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-stone-800 mb-1">
                  Pilihan Lagu Cepat:
                </label>
                <div className="space-y-1.5">
                  {songPresets.map((song) => (
                    <button
                      key={song.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          youtube: {
                            ...formData.youtube,
                            videoId: song.id,
                            songTitle: song.title,
                            artist: song.artist,
                            startSeconds: song.start,
                          },
                        })
                      }
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        formData.youtube.videoId === song.id
                          ? 'border-rose-400 bg-rose-50 text-rose-900 font-semibold'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <p>{song.title}</p>
                        <p className="text-[10px] text-stone-400 font-normal">{song.artist}</p>
                      </div>
                      {formData.youtube.videoId === song.id && (
                        <Check className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <label className="block font-medium text-stone-800 mb-1">
                  Link / ID Video YouTube:
                </label>
                <input
                  type="text"
                  value={formData.youtube.videoId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      youtube: { ...formData.youtube, videoId: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-500 text-xs font-mono"
                  placeholder="6REQGufi8uE"
                />
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-3">
              <label className="block font-medium text-stone-800 mb-1">
                Pilih Nuansa Warna:
              </label>

              <button
                onClick={() => setFormData({ ...formData, theme: 'pastel-pink' })}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                  formData.theme === 'pastel-pink'
                    ? 'border-rose-400 bg-rose-50 ring-2 ring-rose-300'
                    : 'border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    <span className="w-5 h-5 rounded-full bg-[#FFF8F6] border border-stone-300" />
                    <span className="w-5 h-5 rounded-full bg-rose-400" />
                    <span className="w-5 h-5 rounded-full bg-rose-200" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Pink Pastel & Krem</p>
                    <p className="text-[10px] text-stone-500">Lembut, manis, dan hangat</p>
                  </div>
                </div>
                {formData.theme === 'pastel-pink' && <Check className="w-4 h-4 text-rose-600" />}
              </button>

              <button
                onClick={() => setFormData({ ...formData, theme: 'maroon-gold' })}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                  formData.theme === 'maroon-gold'
                    ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-300'
                    : 'border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    <span className="w-5 h-5 rounded-full bg-[#FAFAF8] border border-stone-300" />
                    <span className="w-5 h-5 rounded-full bg-[#881337]" />
                    <span className="w-5 h-5 rounded-full bg-[#d97706]" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Merah Marun & Emas</p>
                    <p className="text-[10px] text-stone-500">Klasik, elegan, dan mendalam</p>
                  </div>
                </div>
                {formData.theme === 'maroon-gold' && <Check className="w-4 h-4 text-amber-600" />}
              </button>

              <button
                onClick={() => setFormData({ ...formData, theme: 'lavender-white' })}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                  formData.theme === 'lavender-white'
                    ? 'border-purple-400 bg-purple-50 ring-2 ring-purple-300'
                    : 'border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8FF] border border-stone-300" />
                    <span className="w-5 h-5 rounded-full bg-purple-400" />
                    <span className="w-5 h-5 rounded-full bg-purple-200" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Ungu Lavender & Putih</p>
                    <p className="text-[10px] text-stone-500">Menenangkan, puitis, dan dreamy</p>
                  </div>
                </div>
                {formData.theme === 'lavender-white' && <Check className="w-4 h-4 text-purple-600" />}
              </button>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-3">
              <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                <p className="font-semibold text-rose-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>Cara Mengganti Foto</span>
                </p>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Letakkan foto kamu dan Raissa di folder <code>public/images/</code>:
                  <br />• <code>foto1.jpg</code>
                  <br />• <code>foto2.jpg</code>
                  <br />• <code>foto3.jpg</code>
                  <br />• <code>foto4.jpg</code>
                </p>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <p className="font-semibold text-stone-900 mb-1">
                  Cara Deploy Gratis (Vercel / Netlify / GitHub)
                </p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600">
                  <li>Push atau upload proyek ke GitHub kamu.</li>
                  <li>Buka <b>vercel.com</b> atau <b>netlify.com</b>.</li>
                  <li>Pilih <b>Import Git Repository</b> dan klik <b>Deploy</b>.</li>
                  <li>Link website langsung aktif dan siap dikirim ke Raissa!</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          {savedAlert ? (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Tersimpan!
            </span>
          ) : (
            <span className="text-[11px] text-stone-400">Pratinjau otomatis aktif</span>
          )}

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Terapkan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

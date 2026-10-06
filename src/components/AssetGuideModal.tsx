import React from 'react';
import { X, FolderGit2, Image, Music, Check, Copy } from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';
import { AUDIO_FILE_PATHS } from '../utils/audioSystem';

interface AssetGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetGuideModal: React.FC<AssetGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0f1118] rounded-2xl border border-white/20 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#ff3b1d]/20 text-[#ff3b1d]">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#ff3b1d] uppercase font-bold tracking-wider">
                GUIDE TECHNIQUE DES ASSETS
              </div>
              <h3 className="font-display font-black text-xl text-white uppercase mt-0.5">
                ARCHITECTURE DES DOSSIERS IMAGES &amp; SONS
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
          Pour remplacer les images et bandes-sons temporaires par les rendus 3D définitifs de Koffi &amp; Diabaté ou de vos graphistes, déposez simplement vos fichiers dans les dossiers ci-dessous ou mettez à jour <code className="text-[#ff3b1d] font-mono">src/data/storyAssets.ts</code> et <code className="text-[#ff3b1d] font-mono">src/utils/audioSystem.ts</code>.
        </p>

        {/* Image Assets Registry */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d] uppercase font-bold tracking-wider mb-3">
            <Image className="w-4 h-4" />
            <span>1. Dossiers Images &amp; Storyboard Rendu 3D</span>
          </h4>

          <div className="space-y-2.5">
            {Object.values(STORY_ASSETS).map((asset) => (
              <div
                key={asset.id}
                className="p-3.5 rounded-xl bg-white/3 border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div>
                  <span className="text-white font-bold">{asset.title}</span>
                  <div className="text-neutral-400 text-[11px] font-sans mt-0.5">
                    {asset.caption}
                  </div>
                </div>
                <div className="text-right sm:text-right shrink-0">
                  <span className="text-[#ff3b1d] bg-black/60 px-2.5 py-1 rounded border border-white/10 block">
                    {asset.categoryFolder}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Assets Registry */}
        <div>
          <h4 className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d] uppercase font-bold tracking-wider mb-3">
            <Music className="w-4 h-4" />
            <span>2. Dossiers Audio &amp; Bande-Son Définitive</span>
          </h4>

          <div className="space-y-2">
            {Object.entries(AUDIO_FILE_PATHS).map(([name, path]) => (
              <div
                key={name}
                className="p-3 rounded-lg bg-black/50 border border-white/8 flex items-center justify-between font-mono text-xs"
              >
                <span className="text-neutral-300 font-semibold">{name}</span>
                <span className="text-[#ff3b1d]">{path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

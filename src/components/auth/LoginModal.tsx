/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { TwoColumnAuthView } from './TwoColumnAuthView';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useApp();

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl bg-slate-900 border border-slate-700/80 p-4 sm:p-8 shadow-[0_0_70px_rgba(6,182,212,0.22)] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
          title="Close SSO Gateway"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Embedded Two Column Auth View */}
        <TwoColumnAuthView isModal={true} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    </div>
  );
};

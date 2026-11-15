import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · COSMIC LOST & FOUND` : 'COSMIC LOST & FOUND — Abandoned but not Forgotten';
  }, [title]);
}

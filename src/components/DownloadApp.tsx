import { useState } from 'react';
import { Download, LoaderCircle, Smartphone } from 'lucide-react';
import { downloadAndroidApp } from '../services/api';

export default function DownloadApp() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setHasError(false);
    setMessage('Preparando la APK. La primera descarga puede tardar hasta 3 minutos.');
    try {
      const apk = await downloadAndroidApp();
      const url = URL.createObjectURL(apk);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'VisionText.apk';
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Give mobile browsers time to hand the file to their download manager.
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setMessage('APK enviada al navegador. Ábrela desde Descargas para instalar VisionText.');
    } catch (error) {
      setHasError(true);
      setMessage(error instanceof Error ? error.message : 'No se pudo descargar la app. Intenta de nuevo.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <aside aria-label="Aplicación Android" className="mb-8 rounded-2xl border border-brand-red-100 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-brand-red-50 p-2.5 text-brand-red-600">
            <Smartphone className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Lleva VisionText en tu Android</p>
            <p className="mt-1 text-sm text-slate-500">Busca con texto o imágenes desde tu celular. Android 8.0 o posterior.</p>
            <p className="mt-1 text-xs text-slate-500">Al instalar, Android puede pedirte permiso para instalar desde tu navegador.</p>
          </div>
        </div>
        <button type="button" onClick={handleDownload} disabled={isDownloading}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-600 disabled:opacity-60 disabled:cursor-wait transition-colors">
          {isDownloading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
          {isDownloading ? 'Descargando…' : 'Descargar app (APK)'}
        </button>
      </div>
      {message && <p role={hasError ? 'alert' : 'status'} className={`mt-3 text-sm ${hasError ? 'text-red-700' : 'text-slate-600'}`}>{message}</p>}
    </aside>
  );
}

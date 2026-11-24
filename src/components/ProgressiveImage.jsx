import { useState, useEffect, useRef, useCallback } from 'react';

// Maps original image paths to pre-generated lightweight WebP thumbnails
export const getThumbnailSrc = (src) => {
  if (!src || typeof src !== 'string') return src;
  if (src.startsWith('/projects/thumbs/') || src.startsWith('/thumbs/')) return src;

  if (src.startsWith('/projects/')) {
    const filename = src.replace('/projects/', '').replace(/\.[^/.]+$/, '');
    return `/projects/thumbs/${filename}.webp`;
  }
  if (src.startsWith('projects/')) {
    const filename = src.replace('projects/', '').replace(/\.[^/.]+$/, '');
    return `/projects/thumbs/${filename}.webp`;
  }
  if (src.startsWith('/')) {
    const filename = src.replace('/', '').replace(/\.[^/.]+$/, '');
    return `/thumbs/${filename}.webp`;
  }
  return src;
};

// Detect if current connection is poor, slow, or offline
export const isPoorConnection = () => {
  if (typeof navigator === 'undefined') return false;
  if (!navigator.onLine) return true;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    if (conn.saveData) return true;
    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return true;
    if (conn.rtt && conn.rtt > 600) return true;
    if (conn.downlink && conn.downlink < 1.0) return true;
  }
  return false;
};

export default function ProgressiveImage({
  src,
  thumb,
  alt = '',
  className = '',
  style = {},
  imgStyle = {},
  accentColor = '#00e5ff',
  onClick,
  priority = false,
  autoLoadHighRes,
  objectFit = 'cover',
}) {
  const thumbSrc = thumb || getThumbnailSrc(src);

  // States
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [highResLoading, setHighResLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const isMountedRef = useRef(true);
  const activeImageRef = useRef(null);
  const timeoutRef = useRef(null);

  // Determine if we should automatically load high-res on mount:
  const shouldAutoLoad = autoLoadHighRes !== undefined
    ? autoLoadHighRes
    : (!isPoorConnection() || priority);

  // Load the original high-resolution image with timeout protection
  const loadHighRes = useCallback(() => {
    if (highResLoaded || highResLoading) return;

    setHighResLoading(true);
    setLoadError(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const img = new Image();
    activeImageRef.current = img;

    // Timeout after 12s on very poor connections so it doesn't hang indefinitely
    timeoutRef.current = setTimeout(() => {
      if (!highResLoaded && isMountedRef.current) {
        if (activeImageRef.current) {
          activeImageRef.current.onload = null;
          activeImageRef.current.onerror = null;
          activeImageRef.current.src = '';
        }
        setHighResLoading(false);
        setLoadError(true);
      }
    }, 12000);

    const requestSrc = retryKey > 0 ? `${src}?retry=${retryKey}_${Date.now()}` : src;
    img.src = requestSrc;

    img.onload = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!isMountedRef.current) return;
      setHighResLoaded(true);
      setHighResLoading(false);
      setLoadError(false);
    };

    img.onerror = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!isMountedRef.current) return;
      setHighResLoading(false);
      setLoadError(true);
    };
  }, [src, highResLoaded, highResLoading, retryKey]);

  // Initial load trigger
  useEffect(() => {
    isMountedRef.current = true;

    if (shouldAutoLoad && !highResLoaded) {
      loadHighRes();
    }

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (activeImageRef.current) {
        activeImageRef.current.onload = null;
        activeImageRef.current.onerror = null;
      }
    };
  }, [shouldAutoLoad, retryKey, src]);

  // Listen for connection recovery ('online' event and Network Information changes)
  useEffect(() => {
    const handleConnectionRecovered = () => {
      // Connection recovered! Automatically load original scale image
      if (!highResLoaded) {
        setLoadError(false);
        setRetryKey(prev => prev + 1);
        loadHighRes();
      }
    };

    window.addEventListener('online', handleConnectionRecovered);

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.addEventListener) {
      const handleConnChange = () => {
        if (!isPoorConnection() && !highResLoaded) {
          handleConnectionRecovered();
        }
      };
      conn.addEventListener('change', handleConnChange);
      return () => {
        window.removeEventListener('online', handleConnectionRecovered);
        conn.removeEventListener('change', handleConnChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleConnectionRecovered);
    };
  }, [highResLoaded, loadHighRes]);

  // When user clicks the image:
  // If high-res not loaded or previously errored, trigger high-res immediately
  const handleClick = (e) => {
    if (!highResLoaded && !highResLoading) {
      setLoadError(false);
      setRetryKey(prev => prev + 1);
      loadHighRes();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`prog-img-container ${className}`}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : (!highResLoaded ? 'pointer' : 'default'),
        ...style,
      }}
    >
      {/* 1. Low-res Thumbnail (Loads first, ultra-lightweight WebP 2-8KB) */}
      <img
        src={thumbSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setThumbLoaded(true)}
        onError={(e) => {
          // If thumbnail fails for any reason, fallback to original src
          if (e.currentTarget.src !== src) {
            e.currentTarget.src = src;
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: imgStyle.objectFit || objectFit,
          display: 'block',
          position: highResLoaded ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          filter: highResLoaded ? 'none' : (thumbLoaded ? 'blur(0px)' : 'blur(4px)'),
          opacity: highResLoaded ? 0 : 1,
          transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
          pointerEvents: highResLoaded ? 'none' : 'auto',
          ...imgStyle,
        }}
      />

      {/* 2. Original High-Res Image (Loaded on click, on connection recovery, or in background) */}
      {highResLoaded && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: imgStyle.objectFit || objectFit,
            display: 'block',
            position: 'relative',
            opacity: 1,
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            ...imgStyle,
          }}
        />
      )}

      {/* 3. Subtle Status Badge: Loading Spinner on High-Res Download */}
      {highResLoading && (
        <div
          title="Loading full resolution image..."
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            padding: '3px 8px',
            borderRadius: 12,
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${accentColor}60`,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.62rem',
            fontFamily: "'Fira Code', monospace",
            color: '#fff',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              border: `1.5px solid ${accentColor}`,
              borderTopColor: 'transparent',
              animation: 'spin 0.8s linear infinite',
              display: 'inline-block',
            }}
          />
          <span style={{ color: accentColor }}>HD...</span>
        </div>
      )}

      {/* 4. If connection was poor or loading timed out: show retry button */}
      {loadError && !highResLoaded && !highResLoading && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setRetryKey(prev => prev + 1);
            loadHighRes();
          }}
          title="Poor connection. Click to reload full quality image"
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            padding: '3px 8px',
            borderRadius: 12,
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(244, 63, 94, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: '0.62rem',
            fontFamily: "'Fira Code', monospace",
            color: '#fda4af',
            cursor: 'pointer',
            zIndex: 4,
            boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
          <span>Tap for HD</span>
        </div>
      )}
    </div>
  );
}

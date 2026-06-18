import React, { useState, useEffect } from 'react';
import './App.css';

// SVG Icons
const Icons = {
  Link: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
  ),
  Wifi: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"></path><path d="M8.5 16.5A5 5 0 0 1 12 15a5 5 0 0 1 3.5 1.5"></path><path d="M5 13a10 10 0 0 1 14 0"></path><path d="M1.5 9.5a15 15 0 0 1 21 0"></path></svg>
  ),
  Email: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
  ),
  Sms: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
  ),
  Copy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  ),
  Print: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline><line x1="12" y1="7" x2="12" y2="12"></line><line x1="12" y1="12" x2="16" y2="14"></line></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z"></path><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"></path></svg>
  ),
  Share: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
  ),
  Folder: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
  ),
  UserCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 2.59-4 4.98-4h3c2.39 0 4.34 1.8 4.98 4"></path><circle cx="12" cy="10" r="3"></circle><circle cx="12" cy="12" r="10"></circle></svg>
  )
};

// Default constants for standard sizing layout constraints
const boxSize = 10;
const border = 4;
const errorCorrection = 'M';

function App() {
  // Theme and UI panel state
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('url');
  const [qrCode, setQrCode] = useState('');
  const [qrCodeSvg, setQrCodeSvg] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [history, setHistory] = useState([]);
  
  // Customization Settings
  const fillColor = '#000000';
  const backColor = 'transparent';
  const eyeStyle = 'square';
  const patternStyle = 'classic';
  const logoSize = 20;
  const hasFrame = false;
  const frameText = 'SCAN ME';

  // Input states
  const [textVal, setTextVal] = useState('https://google.com');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiSecurity, setWifiSecurity] = useState('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const [vcardFirst, setVcardFirst] = useState('');
  const [vcardLast, setVcardLast] = useState('');
  const [vcardPhone, setVcardPhone] = useState('');
  const [vcardEmail, setVcardEmail] = useState('');
  const [vcardOrg, setVcardOrg] = useState('');
  const [vcardTitle, setVcardTitle] = useState('');
  const [vcardAddress, setVcardAddress] = useState('');
  const [vcardUrl, setVcardUrl] = useState('');

  // Handle Theme Change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load History on mount
  useEffect(() => {
    const saved = localStorage.getItem('qr_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse QR history', e);
      }
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  // Helper to compile final raw text string depending on content type
  const getFormattedText = () => {
    switch (activeTab) {
      case 'url':
        return textVal.trim();
      case 'wifi':
        if (!wifiSSID) return '';
        const escapeWifiVal = (val) => val.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/:/g, '\\:').replace(/,/g, '\\,');
        const escapedSSID = escapeWifiVal(wifiSSID);
        const escapedPass = escapeWifiVal(wifiPassword);
        const secVal = wifiSecurity === 'nopass' ? 'nopass' : wifiSecurity;
        return `WIFI:S:${escapedSSID};T:${secVal};P:${secVal === 'nopass' ? '' : escapedPass};H:${wifiHidden ? 'true' : 'false'};;`;
      case 'email':
        if (!emailTo) return '';
        return `mailto:${emailTo.trim()}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        if (!phoneNum) return '';
        return `tel:${phoneNum.trim()}`;
      case 'sms':
        if (!smsPhone) return '';
        return `SMSTO:${smsPhone.trim()}:${smsMessage}`;
      case 'vcard':
        if (!vcardFirst && !vcardLast) return '';
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `N:${vcardLast.trim()};${vcardFirst.trim()};;;`,
          `FN:${vcardFirst.trim()} ${vcardLast.trim()}`,
          vcardOrg.trim() ? `ORG:${vcardOrg.trim()}` : '',
          vcardTitle.trim() ? `TITLE:${vcardTitle.trim()}` : '',
          vcardPhone.trim() ? `TEL;TYPE=CELL:${vcardPhone.trim()}` : '',
          vcardEmail.trim() ? `EMAIL;TYPE=PREF,INTERNET:${vcardEmail.trim()}` : '',
          vcardAddress.trim() ? `ADR;TYPE=WORK:;;${vcardAddress.trim()};;;` : '',
          vcardUrl.trim() ? `URL:${vcardUrl.trim()}` : '',
          'END:VCARD'
        ].filter(Boolean).join('\n');
      default:
        return '';
    }
  };

  const getHistoryLabel = (formattedText) => {
    switch (activeTab) {
      case 'url':
        try {
          const url = new URL(formattedText);
          return url.hostname;
        } catch (e) {
          return formattedText.length > 20 ? formattedText.substring(0, 17) + '...' : formattedText;
        }
      case 'wifi':
        return `Wi-Fi: ${wifiSSID}`;
      case 'email':
        return `Email: ${emailTo}`;
      case 'phone':
        return `Phone: ${phoneNum}`;
      case 'sms':
        return `SMS to: ${smsPhone}`;
      case 'vcard':
        return `Contact: ${vcardFirst} ${vcardLast}`;
      default:
        return formattedText.length > 20 ? formattedText.substring(0, 17) + '...' : formattedText;
    }
  };

  const generateQR = async () => {
    const data = getFormattedText();
    if (!data) {
      showToast('Please fill in required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      // Helper function to dynamically load qrcode script if not already present
      const loadQrCodeScript = () => {
        return new Promise((resolve, reject) => {
          if (window.QRCode) {
            resolve(window.QRCode);
            return;
          }
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.1/qrcode.min.js';
          script.onload = () => resolve(window.QRCode);
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      const QRCodeLib = await loadQrCodeScript();
      if (!QRCodeLib) {
        throw new Error('QR Code library not loaded');
      }

      // Map options
      const options = {
        errorCorrectionLevel: errorCorrection,
        margin: parseInt(border, 10) || 4,
        scale: parseInt(boxSize, 10) || 10,
        color: {
          dark: fillColor || '#000000',
          light: (backColor === 'transparent' || !backColor) ? '#00000000' : backColor
        }
      };

      // Generate PNG data URL
      const pngUrl = await QRCodeLib.toDataURL(data, options);
      
      // Generate SVG XML string
      const svgString = await QRCodeLib.toString(data, {
        ...options,
        type: 'svg'
      });

      setQrCode(pngUrl);
      setQrCodeSvg(svgString);
      showToast('QR Code generated successfully!');
      
      // Add to history list
      const labelText = getHistoryLabel(data);
      const newItem = {
        id: Date.now(),
        type: activeTab,
        label: labelText,
        text: data,
        qrCode: pngUrl,
        qrCodeSvg: svgString,
        fillColor,
        backColor,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedHistory = [newItem, ...history.filter(item => item.text !== data)].slice(0, 8);
      setHistory(updatedHistory);
      localStorage.setItem('qr_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error generating QR code:', error);
      showToast(error.message || 'Failed to generate QR code', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryItem = (item) => {
    setQrCode(item.qrCode);
    setQrCodeSvg(item.qrCodeSvg || '');
    setActiveTab(item.type);
    
    // Parse values back to input states if possible
    if (item.type === 'url') {
      setTextVal(item.text);
    } else if (item.type === 'phone' && item.text.startsWith('tel:')) {
      setPhoneNum(item.text.replace('tel:', ''));
    } else if (item.type === 'sms' && item.text.startsWith('SMSTO:')) {
      const parts = item.text.replace('SMSTO:', '').split(':');
      setSmsPhone(parts[0] || '');
      setSmsMessage(parts.slice(1).join(':') || '');
    } else if (item.type === 'wifi' && item.text.startsWith('WIFI:')) {
      const ssidMatch = item.text.match(/S:([^;]+)/);
      const passMatch = item.text.match(/P:([^;]+)/);
      const typeMatch = item.text.match(/T:([^;]+)/);
      const hiddenMatch = item.text.match(/H:([^;]+)/);
      setWifiSSID(ssidMatch ? ssidMatch[1] : '');
      setWifiPassword(passMatch ? passMatch[1] : '');
      setWifiSecurity(typeMatch ? typeMatch[1] : 'WPA');
      setWifiHidden(hiddenMatch ? hiddenMatch[1] === 'true' : false);
    } else if (item.type === 'email' && item.text.startsWith('mailto:')) {
      const emailPart = item.text.substring(7).split('?');
      setEmailTo(emailPart[0] || '');
      if (emailPart[1]) {
        const urlParams = new URLSearchParams(emailPart[1]);
        setEmailSubject(urlParams.get('subject') || '');
        setEmailBody(urlParams.get('body') || '');
      }
    } else if (item.type === 'vcard' && item.text.startsWith('BEGIN:VCARD')) {
      const nameMatch = item.text.match(/N:([^;]*);([^;\n]*)/);
      const orgMatch = item.text.match(/ORG:([^\n]+)/);
      const titleMatch = item.text.match(/TITLE:([^\n]+)/);
      const telMatch = item.text.match(/TEL;TYPE=CELL:([^\n]+)/);
      const emailMatch = item.text.match(/EMAIL;TYPE=PREF,INTERNET:([^\n]+)/);
      const adrMatch = item.text.match(/ADR;TYPE=WORK:;;([^\n;]*)/);
      const urlMatch = item.text.match(/URL:([^\n]+)/);
      setVcardLast(nameMatch ? nameMatch[1] : '');
      setVcardFirst(nameMatch ? nameMatch[2] : '');
      setVcardOrg(orgMatch ? orgMatch[1] : '');
      setVcardTitle(titleMatch ? titleMatch[1] : '');
      setVcardPhone(telMatch ? telMatch[1] : '');
      setVcardEmail(emailMatch ? emailMatch[1] : '');
      setVcardAddress(adrMatch ? adrMatch[1] : '');
      setVcardUrl(urlMatch ? urlMatch[1] : '');
    }
    
    showToast('Loaded configuration from history!');
  };

  const deleteHistoryItem = (e, id) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('qr_history', JSON.stringify(updated));
    showToast('History item deleted');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('qr_history');
    showToast('History cleared');
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qr_${activeTab}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('QR Code downloaded!');
  };

  const downloadSVG = () => {
    if (!qrCodeSvg) {
      showToast('No SVG data available', 'error');
      return;
    }
    const blob = new Blob([qrCodeSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr_${activeTab}_${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('SVG QR Code downloaded!');
  };

  const downloadPDF = () => {
    if (!qrCode) return;
    
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (window.jspdf) {
          resolve(window.jspdf);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(window.jspdf);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
      .then((jspdf) => {
        const jsPDFClass = jspdf.jsPDF || window.jsPDF;
        if (!jsPDFClass) {
          throw new Error('jsPDF not found');
        }
        const doc = new jsPDFClass({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        // Center the QR code in the PDF.
        const qrSize = 150; // 150mm x 150mm
        const x = (210 - qrSize) / 2;
        const y = (297 - qrSize) / 2;
        
        doc.addImage(qrCode, 'PNG', x, y, qrSize, qrSize);
        doc.save(`qr_${activeTab}_${Date.now()}.pdf`);
        showToast('PDF downloaded successfully!');
      })
      .catch((err) => {
        console.error('Failed to load jsPDF', err);
        showToast('Failed to generate PDF. Check connection.', 'error');
      });
  };

  const copyTextToClipboard = async () => {
    const formatted = getFormattedText();
    if (!formatted) return;
    try {
      await navigator.clipboard.writeText(formatted);
      showToast('Raw QR content copied!');
    } catch (err) {
      showToast('Failed to copy text', 'error');
    }
  };

  const printQR = () => {
    if (!qrCode) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              font-family: 'Inter', sans-serif;
              background-color: #ffffff;
            }
            .container {
              text-align: center;
              border: 1px solid #e2e8f0;
              padding: 40px;
              border-radius: 16px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.03);
            }
            img {
              width: 280px;
              height: 280px;
              margin-bottom: 20px;
              border-radius: 6px;
            }
            h2 {
              margin: 0 0 8px 0;
              color: #0F172A;
              font-weight: 600;
            }
            p {
              margin: 0;
              color: #64748B;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${qrCode}" alt="QR Code" />
            <h2>QR Code</h2>
            <p>Generated by QR Studio</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };



  return (
    <div className="App-container">
      {/* Toast Notice */}
      {toast.show && (
        <div className={`toast-message ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Modern SaaS Header */}
      <header className="glass-header">
        <div className="logo-section">
          <div className="logo-orb">
            <Icons.Sparkles />
          </div>
          <div className="logo-text">
            <h1>QR Studio</h1>
            <span>Generate beautiful custom QR codes instantly</span>
          </div>
        </div>
        
        <div className="header-right">
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}
          </button>
          
          <button className="user-menu-btn" title="User Account Menu">
            <Icons.UserCircle />
          </button>
        </div>
      </header>

      {/* Primary Dashboard Grid */}
      <main className="dashboard-grid">
        {/* Left Side: Create Card */}
        <section className="dashboard-card inputs-panel">
          <div className="card-header-simple">
            <h2>Create QR Code</h2>
            <p>Select your content type, fill in the details, and customize your code.</p>
          </div>

          {/* QR Type selector (Modern card grid) */}
          <div className="type-cards-grid">
            <button 
              className={`type-card ${activeTab === 'url' ? 'active' : ''}`}
              onClick={() => setActiveTab('url')}
            >
              <div className="icon-wrapper"><Icons.Link /></div>
              <span className="card-label">URL / Text</span>
            </button>
            
            <button 
              className={`type-card ${activeTab === 'wifi' ? 'active' : ''}`}
              onClick={() => setActiveTab('wifi')}
            >
              <div className="icon-wrapper"><Icons.Wifi /></div>
              <span className="card-label">Wi-Fi</span>
            </button>
            
            <button 
              className={`type-card ${activeTab === 'email' ? 'active' : ''}`}
              onClick={() => setActiveTab('email')}
            >
              <div className="icon-wrapper"><Icons.Email /></div>
              <span className="card-label">Email</span>
            </button>
            
            <button 
              className={`type-card ${activeTab === 'phone' ? 'active' : ''}`}
              onClick={() => setActiveTab('phone')}
            >
              <div className="icon-wrapper"><Icons.Phone /></div>
              <span className="card-label">Phone</span>
            </button>
            
            <button 
              className={`type-card ${activeTab === 'sms' ? 'active' : ''}`}
              onClick={() => setActiveTab('sms')}
            >
              <div className="icon-wrapper"><Icons.Sms /></div>
              <span className="card-label">SMS</span>
            </button>
            
            <button 
              className={`type-card ${activeTab === 'vcard' ? 'active' : ''}`}
              onClick={() => setActiveTab('vcard')}
            >
              <div className="icon-wrapper"><Icons.User /></div>
              <span className="card-label">vCard</span>
            </button>
          </div>

          <div className="tab-content-container">
            {/* 1. URL / Text Tab */}
            {activeTab === 'url' && (
              <div className="tab-pane fade-in">
                <div className="form-group full-width">
                  <label className="input-label">URL or Text Data</label>
                  <textarea
                    className="input-textarea"
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    placeholder="e.g. https://google.com"
                    rows={4}
                  />
                  <span className="helper-text">Enter a website link, paragraph, or raw text here...</span>
                </div>
              </div>
            )}

            {/* 2. Wi-Fi Tab */}
            {activeTab === 'wifi' && (
              <div className="tab-pane fade-in grid-form">
                <div className="form-group full-width">
                  <label className="input-label">Network Name (SSID) *</label>
                  <input
                    type="text"
                    className="input-field"
                    value={wifiSSID}
                    onChange={(e) => setWifiSSID(e.target.value)}
                    placeholder="e.g. MyHomeNetwork"
                  />
                  <span className="helper-text">Enter the network SSID name</span>
                </div>
                
                <div className="form-group">
                  <label className="input-label">Password</label>
                  <input
                    type="password"
                    className="input-field"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="Enter network password"
                    disabled={wifiSecurity === 'nopass'}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Security Type</label>
                  <select
                    className="input-select"
                    value={wifiSecurity}
                    onChange={(e) => setWifiSecurity(e.target.value)}
                  >
                    <option value="WPA">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Unsecured (Open)</option>
                  </select>
                </div>

                <div className="form-group full-width checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(e) => setWifiHidden(e.target.checked)}
                    />
                    <span className="checkbox-checkmark"></span>
                    <span className="checkbox-label">This is a hidden network SSID</span>
                  </label>
                </div>
              </div>
            )}

            {/* 3. Email Tab */}
            {activeTab === 'email' && (
              <div className="tab-pane fade-in grid-form">
                <div className="form-group full-width">
                  <label className="input-label">Recipient Email *</label>
                  <input
                    type="email"
                    className="input-field"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="e.g. hello@domain.com"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="input-label">Subject</label>
                  <input
                    type="text"
                    className="input-field"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Add an email subject line"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="input-label">Message Body</label>
                  <textarea
                    className="input-textarea"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Write your email body draft..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* 4. Phone Tab */}
            {activeTab === 'phone' && (
              <div className="tab-pane fade-in">
                <div className="form-group full-width">
                  <label className="input-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="e.g. +1 555 123 4567"
                  />
                  <span className="helper-text">Enter phone number with international area code</span>
                </div>
              </div>
            )}

            {/* 5. SMS Tab */}
            {activeTab === 'sms' && (
              <div className="tab-pane fade-in grid-form">
                <div className="form-group full-width">
                  <label className="input-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={smsPhone}
                    onChange={(e) => setSmsPhone(e.target.value)}
                    placeholder="e.g. +1 555 123 4567"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="input-label">Prefilled Message</label>
                  <textarea
                    className="input-textarea"
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    placeholder="Type pre-composed text message..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* 6. vCard Tab */}
            {activeTab === 'vcard' && (
              <div className="tab-pane fade-in grid-form">
                <div className="form-section-header full-width">
                  <h4>Identity Details</h4>
                </div>

                <div className="form-group">
                  <label className="input-label">First Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    value={vcardFirst}
                    onChange={(e) => setVcardFirst(e.target.value)}
                    placeholder="First Name"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Last Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={vcardLast}
                    onChange={(e) => setVcardLast(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Organization</label>
                  <input
                    type="text"
                    className="input-field"
                    value={vcardOrg}
                    onChange={(e) => setVcardOrg(e.target.value)}
                    placeholder="Company Name"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Job Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={vcardTitle}
                    onChange={(e) => setVcardTitle(e.target.value)}
                    placeholder="e.g. Director of Engineering"
                  />
                </div>

                <div className="form-section-header full-width">
                  <h4>Contact & Address Details</h4>
                </div>

                <div className="form-group">
                  <label className="input-label">Phone Number</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={vcardPhone}
                    onChange={(e) => setVcardPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 019-2834"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    value={vcardEmail}
                    onChange={(e) => setVcardEmail(e.target.value)}
                    placeholder="name@company.com"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="input-label">Street Address</label>
                  <input
                    type="text"
                    className="input-field"
                    value={vcardAddress}
                    onChange={(e) => setVcardAddress(e.target.value)}
                    placeholder="e.g. 100 Main St, San Francisco, CA"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="input-label">Website URL</label>
                  <input
                    type="url"
                    className="input-field"
                    value={vcardUrl}
                    onChange={(e) => setVcardUrl(e.target.value)}
                    placeholder="https://company.com"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger */}
          <div className="generate-action-section">
            <button 
              className="generate-main-btn"
              onClick={generateQR}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Generating Code...</span>
                </>
              ) : (
                <>
                  <Icons.Sparkles />
                  <span>Generate QR Code</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Right Side: Sticky Preview & Customizations */}
        <div className="right-panel-group">
          {/* Main QR Card */}
          <section className="dashboard-card preview-panel">
            <div className="card-header">
              <div className="header-info">
                <h2>QR Preview</h2>
                <span className="subtitle-helper">Live rendering updates automatically</span>
              </div>
              
              {qrCode && (
                <span className="status-badge success">
                  ✓ Generated Successfully
                </span>
              )}
            </div>

            <div className={`qr-container-box ${qrCode ? 'has-qr' : ''}`}>
              {qrCode ? (
                <div className="qr-image-wrapper fade-in">
                  <img src={qrCode} alt="Generated Custom QR Code" />
                </div>
              ) : (
                <div className="qr-placeholder-wrapper">
                  <div className="placeholder-scan-box">
                    <svg viewBox="0 0 100 100" className="placeholder-scan-lines">
                      <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                    </svg>
                  </div>
                  <p>Enter data and click Generate to preview QR</p>
                </div>
              )}
            </div>

            {qrCode && (
              <div className="preview-action-block">
                {/* Download Actions */}
                <div className="download-formats-row">
                  <button className="download-action-btn pill-btn" onClick={downloadQR} title="Download PNG format">
                    <span>PNG</span>
                  </button>
                  <button className="download-action-btn pill-btn secondary" onClick={downloadSVG} title="Download SVG format">
                    <span>SVG</span>
                  </button>
                  <button className="download-action-btn pill-btn secondary" onClick={downloadPDF} title="Download PDF format">
                    <span>PDF</span>
                  </button>
                </div>
                
                {/* Additional Utilities */}
                <div className="utility-buttons-row">
                  <button className="utility-btn" onClick={copyTextToClipboard} title="Copy Content">
                    <Icons.Copy />
                    <span>Copy Link</span>
                  </button>
                  <button className="utility-btn" onClick={() => showToast('Share QR Link is mocked', 'success')} title="Share QR Link">
                    <Icons.Share />
                    <span>Share</span>
                  </button>
                  <button className="utility-btn" onClick={() => showToast('Template saved successfully!', 'success')} title="Save Template">
                    <Icons.Save />
                    <span>Save Template</span>
                  </button>
                </div>
              </div>
            )}
          </section>



          {/* History card */}
          {history.length > 0 && (
            <section className="dashboard-card history-panel fade-in">
              <div className="history-header">
                <div className="title-row">
                  <Icons.History />
                  <h3>Recent Generator History</h3>
                </div>
                <button className="clear-history-btn" onClick={clearHistory}>
                  <Icons.Trash />
                  <span>Clear All</span>
                </button>
              </div>
              <ul className="history-list">
                {history.map((item) => (
                  <li 
                    key={item.id} 
                    className="history-list-item"
                    onClick={() => loadHistoryItem(item)}
                    title="Load this QR layout parameters"
                  >
                    <div className="history-item-avatar">
                      {item.type === 'wifi' && <Icons.Wifi />}
                      {item.type === 'url' && <Icons.Link />}
                      {item.type === 'email' && <Icons.Email />}
                      {item.type === 'phone' && <Icons.Phone />}
                      {item.type === 'sms' && <Icons.Sms />}
                      {item.type === 'vcard' && <Icons.User />}
                    </div>
                    <div className="history-item-details">
                      <h4 className="history-item-name">{item.label}</h4>
                      <div className="history-item-sub">
                        <span>{item.type.toUpperCase()}</span>
                        <span className="dot">•</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                    <button 
                      className="history-delete-btn"
                      onClick={(e) => deleteHistoryItem(e, item.id)}
                      title="Remove from history"
                    >
                      <Icons.Trash />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <footer className="glass-footer">
        <p>&copy; {new Date().getFullYear()} QR Studio. Designed as a premium SaaS dashboard utility.</p>
      </footer>
    </div>
  );
}

export default App;
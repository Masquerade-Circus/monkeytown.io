export default { 
    view(){ 
        return [
            v("link", {"rel":"shortcut icon","href":"/icons/favicon.ico"}),
            v("link", {"rel":"icon","type":"image/png","sizes":"16x16","href":"/icons/favicon-16x16.png"}),
            v("link", {"rel":"icon","type":"image/png","sizes":"32x32","href":"/icons/favicon-32x32.png"}),
            v("link", {"rel":"manifest","href":"/icons/manifest.json"}),
            v("meta", {"name":"mobile-web-app-capable","content":"yes"}),
            v("meta", {"name":"theme-color","content":"#4CAF50"}),
            v("meta", {"name":"application-name","content":"MonkeyTown.io"}),
            v("link", {"rel":"apple-touch-icon","sizes":"57x57","href":"/icons/apple-touch-icon-57x57.png"}),
            v("link", {"rel":"apple-touch-icon","sizes":"60x60","href":"/icons/apple-touch-icon-60x60.png"}),
            v("link", {"rel":"apple-touch-icon","sizes":"72x72","href":"/icons/apple-touch-icon-72x72.png"}),
            v("link", {"rel":"apple-touch-icon","sizes":"76x76","href":"/icons/apple-touch-icon-76x76.png"}),
            v("link", {"rel":"apple-touch-icon","sizes":"114x114","href":"/icons/apple-touch-icon-114x114.png"}),
            v("link", {"rel":"apple-touch-icon","sizes":"120x120","href":"/icons/apple-touch-icon-120x120.png"}),
            v("link", {"rel":"apple-touch-icon","sizes":"144x144","href":"/icons/apple-touch-icon-144x144.png"}),
            v("link", {"rel":"apple-touch-icon","sizes":"152x152","href":"/icons/apple-touch-icon-152x152.png"}),
            v("link", {"rel":"apple-touch-icon","sizes":"180x180","href":"/icons/apple-touch-icon-180x180.png"}),
            v("meta", {"name":"apple-mobile-web-app-capable","content":"yes"}),
            v("meta", {"name":"apple-mobile-web-app-status-bar-style","content":"black-translucent"}),
            v("meta", {"name":"apple-mobile-web-app-title","content":"MonkeyTown.io"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)","href":"/icons/apple-touch-startup-image-320x460.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)","href":"/icons/apple-touch-startup-image-640x920.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)","href":"/icons/apple-touch-startup-image-640x1096.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)","href":"/icons/apple-touch-startup-image-750x1294.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)","href":"/icons/apple-touch-startup-image-1182x2208.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)","href":"/icons/apple-touch-startup-image-1242x2148.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)","href":"/icons/apple-touch-startup-image-748x1024.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)","href":"/icons/apple-touch-startup-image-768x1004.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)","href":"/icons/apple-touch-startup-image-1496x2048.png"}),
            v("link", {"rel":"apple-touch-startup-image","media":"(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)","href":"/icons/apple-touch-startup-image-1536x2008.png"}),
            v("meta", {"name":"msapplication-TileColor","content":"#4CAF50"}),
            v("meta", {"name":"msapplication-TileImage","content":"/icons/mstile-144x144.png"}),
            v("meta", {"name":"msapplication-config","content":"/icons/browserconfig.xml"})
        ];
    }
};
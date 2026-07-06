/*
 * FileMy.Email cookie notice.
 * Notification-style banner (not a consent gate): informs visitors that the
 * site uses analytics (Google Analytics / GTM) and Stripe checkout cookies,
 * and links to the Privacy Policy. Dismissal is remembered in localStorage.
 *
 * NOTE: This is a notice, not opt-in consent. Analytics load regardless of
 * dismissal. If you later need EU/UK opt-in consent, gate the GA/GTM tags on
 * an "Accept" click instead of loading them in each page's <head>.
 */
(function () {
    var KEY = 'fme_cookie_notice_v1';

    try {
        if (localStorage.getItem(KEY) === 'dismissed') return;
    } catch (e) {
        // localStorage unavailable (private mode / blocked) — show the notice
        // but it just won't persist. Fall through.
    }

    function init() {
        if (document.getElementById('fme-cookie-notice')) return;

        var style = document.createElement('style');
        style.textContent =
            '#fme-cookie-notice{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;' +
            'max-width:760px;margin:0 auto;background:#fff;color:#1a1a1a;border:1px solid #e2e6ea;' +
            'border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.15);padding:16px 20px;' +
            "font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;" +
            'display:flex;align-items:center;gap:16px;flex-wrap:wrap;line-height:1.5;}' +
            '#fme-cookie-notice .fme-cn-text{flex:1;min-width:240px;font-size:0.86rem;color:#444;}' +
            '#fme-cookie-notice .fme-cn-text a{color:#1b6ec2;text-decoration:none;font-weight:600;}' +
            '#fme-cookie-notice .fme-cn-text a:hover{text-decoration:underline;}' +
            '#fme-cookie-notice .fme-cn-btn{flex-shrink:0;background:linear-gradient(135deg,#1b6ec2,#0d7377);' +
            'color:#fff;border:none;border-radius:8px;padding:10px 22px;font-size:0.88rem;font-weight:600;' +
            'cursor:pointer;transition:opacity 0.2s;}' +
            '#fme-cookie-notice .fme-cn-btn:hover{opacity:0.9;}' +
            '@media (max-width:520px){#fme-cookie-notice{flex-direction:column;align-items:stretch;}' +
            '#fme-cookie-notice .fme-cn-btn{width:100%;padding:12px;}}';
        document.head.appendChild(style);

        var bar = document.createElement('div');
        bar.id = 'fme-cookie-notice';
        bar.setAttribute('role', 'region');
        bar.setAttribute('aria-label', 'Cookie notice');

        var text = document.createElement('div');
        text.className = 'fme-cn-text';
        text.innerHTML =
            '🍪 We use cookies for site analytics (Google Analytics) and secure ' +
            'checkout (Stripe). By continuing to use this site, you agree to their use. ' +
            'See our <a href="/privacy">Privacy Policy</a> for details.';

        var btn = document.createElement('button');
        btn.className = 'fme-cn-btn';
        btn.type = 'button';
        btn.textContent = 'Got it';
        btn.addEventListener('click', function () {
            try { localStorage.setItem(KEY, 'dismissed'); } catch (e) {}
            if (bar.parentNode) bar.parentNode.removeChild(bar);
        });

        bar.appendChild(text);
        bar.appendChild(btn);
        document.body.appendChild(bar);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

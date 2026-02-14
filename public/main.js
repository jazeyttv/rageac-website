// ============================================================
// RageAC Website - Main Script
// ============================================================

(function () {
    'use strict';

    // ── Particle Canvas ──
    var canvas = document.getElementById('particles');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var mouse = { x: -1000, y: -1000 };

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        document.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        for (var i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.5,
                a: Math.random() * 0.3 + 0.05
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 62, 62, ' + p.a + ')';
                ctx.fill();

                // Connect nearby particles
                for (var j = i + 1; j < particles.length; j++) {
                    var p2 = particles[j];
                    var dx = p.x - p2.x;
                    var dy = p.y - p2.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = 'rgba(255, 62, 62, ' + (0.06 * (1 - dist / 120)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Mouse interaction
                var mdx = p.x - mouse.x;
                var mdy = p.y - mouse.y;
                var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(255, 62, 62, ' + (0.15 * (1 - mDist / 150)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // ── Navbar scroll effect ──
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ── Mobile nav burger ──
    var burger = document.getElementById('navBurger');
    var navLinks = document.getElementById('navLinks');
    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        // Close on link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
            });
        });
    }

    // ── Animated counters ──
    function animateCounters() {
        var counters = document.querySelectorAll('[data-count]');
        counters.forEach(function (el) {
            if (el.dataset.animated) return;
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.dataset.animated = 'true';
                var target = parseInt(el.dataset.count);
                var current = 0;
                var increment = target / 40;
                var suffix = el.innerHTML.includes('+') ? '+' : '';
                var timer = setInterval(function () {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current) + suffix;
                }, 30);
            }
        });
    }
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ── Scroll fade-in animations ──
    function setupFadeIns() {
        var elements = document.querySelectorAll(
            '.feature-card, .det-item, .admin-card, .layer-card, .dash-feat, .stat-big, .faq-item'
        );
        elements.forEach(function (el) {
            el.classList.add('fade-in');
        });
    }
    setupFadeIns();

    function checkFadeIns() {
        var els = document.querySelectorAll('.fade-in');
        els.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkFadeIns);
    checkFadeIns();

    // ── Detection tabs ──
    var detTabs = document.querySelectorAll('.det-tab');
    detTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            detTabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');
            document.querySelectorAll('.detection-panel').forEach(function (p) {
                p.classList.remove('active');
            });
            var panel = document.getElementById('det-' + tab.dataset.tab);
            if (panel) {
                panel.classList.add('active');
                // Re-trigger fade-ins for newly visible items
                panel.querySelectorAll('.det-item').forEach(function (item) {
                    item.classList.remove('visible');
                    item.classList.add('fade-in');
                    setTimeout(function () {
                        item.classList.add('visible');
                    }, 50);
                });
            }
        });
    });

    // ── FAQ accordion ──
    document.querySelectorAll('.faq-q').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var isOpen = item.classList.contains('open');

            // Close all others
            document.querySelectorAll('.faq-item').forEach(function (f) {
                f.classList.remove('open');
            });

            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // ── Mock dashboard data ──
    var names = [
        'xX_DarkRider_Xx', 'TurboChad99', 'SilentSniper', 'NoobSlayer420',
        'FiveM_Pro', 'CJ_Grove', 'RocketMan', 'ShadowFox', 'PixelDust',
        'NightHawk', 'CyberWolf', 'BlazeRunner', 'IronFist', 'StormChaser',
        'NeonViper', 'PhantomAce', 'ThunderBolt', 'FrostByte', 'AquaReaper',
        'VoidWalker', 'SkyPilot', 'GhostRacer', 'StarDust', 'CosmicRay'
    ];
    var detections = [
        'Aimbot (Bone Lock)', 'Speed Hack', 'God Mode', 'Teleport',
        'No Recoil', 'Silent Aim', 'Noclip', 'Infinite Ammo',
        'Entity Spam', 'Explosive Ammo', 'Freecam Abuse', 'Super Jump'
    ];
    var sevColors = { critical: '#ff3e3e', high: '#ff8a00', medium: '#f59e0b', low: '#22c55e' };
    var sevKeys = ['critical', 'high', 'medium', 'low'];

    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

    // Mock feed
    var feedEl = document.getElementById('mockFeed');
    if (feedEl) {
        var feedHtml = '';
        for (var f = 0; f < 8; f++) {
            var sev = pick(sevKeys);
            feedHtml += '<div class="mock-feed-item">' +
                '<span class="mock-feed-dot" style="background:' + sevColors[sev] + '"></span>' +
                '<span class="mock-feed-name">' + pick(names) + '</span>' +
                '<span class="mock-feed-det">' + pick(detections) + '</span>' +
                '<span class="mock-feed-time">' + rand(1, 45) + 'm ago</span>' +
                '</div>';
        }
        feedEl.innerHTML = feedHtml;
    }

    // Mock players
    var playersEl = document.getElementById('mockPlayers');
    if (playersEl) {
        var pHtml = '';
        for (var p = 0; p < 10; p++) {
            pHtml += '<div class="mock-player">' +
                '<span class="mock-player-name">' + names[p] + '</span>' +
                '<span class="mock-player-ping">' + rand(18, 120) + 'ms</span>' +
                '</div>';
        }
        playersEl.innerHTML = pHtml;
    }

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();

// ============================================================
// RageAC Demo - Full Mock Data Generator with Live Animation
// ============================================================
(function () {
    'use strict';

    // ── Data ──
    var N = ['xX_DarkRider_Xx','TurboChad99','SilentSniper','NoobSlayer420','FiveM_Pro','CJ_Grove','RocketMan','ShadowFox','PixelDust','NightHawk','CyberWolf','BlazeRunner','IronFist','StormChaser','NeonViper','PhantomAce','ThunderBolt','FrostByte','AquaReaper','VoidWalker','SkyPilot','GhostRacer','StarDust','CosmicRay','ZeroGravity','AlphaStrike','OmegaForce','DeltaHunter','BravoSix','EchoTango','FoxtrotLead','GolfCharlie','HotelIndia','JulietKilo','LimaMike','NovemberOscar','PapaQuebec','RomeoSierra','TangoUniform','VictorWhiskey','WhiskeyXray','YankeeZulu','MaverickOne','WarpDrive','HyperNova','QuantumLeap','NebulaDrift'];
    var D = ['Aimbot (Bone Lock)','Speed Hack','God Mode','Teleport','No Recoil','Silent Aim','Vehicle Modification','Noclip','Infinite Ammo','Explosive Ammo','Freecam Abuse','Super Jump','Entity Spam','Invisible','ESP Overlay','Blacklisted Weapon','Model Change','Particle Crash','Resource Tampering','Menu Detection'];
    var SV = ['critical','high','medium','low'];
    var SC = { critical:'#ef4444', high:'#f59e0b', medium:'#3b82f6', low:'#22c55e' };

    function R(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
    function P(a) { return a[R(0, a.length - 1)]; }
    function T(m) { if (m < 1) return 'Just now'; if (m < 60) return m + 'm ago'; return Math.floor(m / 60) + 'h ' + (m % 60) + 'm ago'; }
    function E(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
    function hex(n) { var s = ''; for (var i = 0; i < n; i++) s += '0123456789abcdef'[R(0, 15)]; return s; }
    function timeStr() { return String(R(0, 23)).padStart(2, '0') + ':' + String(R(0, 59)).padStart(2, '0') + ':' + String(R(0, 59)).padStart(2, '0'); }

    // ── Feed item builder ──
    function feedItem(name, det, sev, time) {
        return '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #1a1a2e;animation:fadeIn .3s ease">' +
            '<span class="material-icons-round" style="font-size:16px;color:' + SC[sev] + '">warning</span>' +
            '<div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600;color:#e4e4ef">' + E(name) + '</div>' +
            '<div style="font-size:11px;color:#8888a0">' + E(det) + '</div></div>' +
            '<div style="text-align:right"><span style="font-size:10px;padding:2px 8px;border-radius:4px;background:' + SC[sev] + '20;color:' + SC[sev] + ';font-weight:600;text-transform:uppercase">' + sev + '</span>' +
            '<div style="font-size:10px;color:#55556a;margin-top:2px">' + time + '</div></div></div>';
    }

    // ── Dashboard: Live Feed (animated) ──
    var feedEl = document.getElementById('dFeed');
    if (feedEl) {
        var feedHtml = '';
        for (var i = 0; i < 12; i++) {
            feedHtml += feedItem(P(N), P(D), P(SV), T(R(1, 120)));
        }
        feedEl.innerHTML = feedHtml;

        // Live: add new detection every 4 seconds
        var detCount = 156;
        setInterval(function () {
            var newItem = feedItem(P(N), P(D), P(SV), 'Just now');
            feedEl.innerHTML = newItem + feedEl.innerHTML;
            // Keep max 20 items
            var items = feedEl.querySelectorAll('div[style*="border-bottom"]');
            if (items.length > 20) items[items.length - 1].remove();
            // Update detection counter
            detCount++;
            var dc = document.getElementById('sDetections');
            if (dc) dc.textContent = detCount;
        }, 4000);
    }

    // ── Dashboard: Online Players sidebar ──
    var playersEl = document.getElementById('dPlayers');
    if (playersEl) {
        var ph = '';
        for (var i = 0; i < 15; i++) {
            ph += '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #1a1a2e">' +
                '<span style="font-size:12px;color:#e4e4ef;font-weight:500">' + E(N[i]) + '</span>' +
                '<span style="font-size:11px;color:#55556a">' + R(18, 120) + 'ms</span></div>';
        }
        playersEl.innerHTML = ph;
    }

    // ── Server: Player Table ──
    var ptbl = document.getElementById('dPTbl');
    if (ptbl) {
        var ph = '';
        for (var i = 0; i < 25; i++) {
            var tr = R(35, 100), tc = tr > 70 ? '#22c55e' : tr > 40 ? '#f59e0b' : '#ef4444';
            ph += '<tr><td style="color:var(--text-4)">' + (i + 1) + '</td>' +
                '<td style="font-weight:600">' + E(N[i % N.length]) + '</td>' +
                '<td style="font-family:monospace;font-size:11px;color:#8888a0">license:' + hex(20) + '...</td>' +
                '<td><span style="color:' + tc + ';font-weight:700">' + tr + '</span></td>' +
                '<td style="color:var(--text-3)">' + R(18, 150) + 'ms</td>' +
                '<td><button style="background:#1a1a2e;color:#e4e4ef;border:1px solid #2a2a40;padding:4px 12px;border-radius:6px;font-size:11px;cursor:pointer;font-family:inherit">Actions ▾</button></td></tr>';
        }
        ptbl.innerHTML = ph;
    }

    // ── Configs ──
    (function () {
        var tabs = document.getElementById('dCfgTabs'), body = document.getElementById('dCfgBody');
        if (!tabs || !body) return;
        var S = {
            'General': ['Anti God Mode', 'Anti God Mode V2', 'Anti God Mode V3', 'Aimbot Detection', 'Silent Aim Detection', 'Anti Noclip', 'Anti Super Jump', 'Anti Fly Hack', 'Anti Freecam', 'Anti Invisible', 'Anti Spectate', 'Anti Teleport to Waypoint', 'Anti Speed Hack', 'Anti Vision Modifier', 'Anti Damage Spoof', 'Anti Damage Spoof V2', 'Anti Crosshair/ESP', 'Anti Resource Tampering', 'Anti Model Change', 'Anti Particle Crash'],
            'Server Management': ['Trust Score System', 'Anti VPN', 'Geo Blocking', 'IP Ban System', 'Discord Account Min Age', 'Duplicate License Prevention', 'Detection Whitelist Zones', 'Global Ban Sharing'],
            'Menu Detections': ['Scaleform Detection', 'Keybind Detection', 'NUI Focus Detection', 'GXT Injection', 'Blacklisted Textures', 'Blacklisted Commands', 'HUD Anomaly'],
            'Entities': ['Entity Spam Protection', 'Armed Ped Detection', 'Entity Ratelimit', 'Remote Entity Control', 'Entity Attach Detection', 'Blacklisted Entities'],
            'Weapons': ['Blacklisted Weapons', 'Infinite Ammo Detection', 'No Reload Detection', 'No Recoil Detection', 'Explosive Ammo Detection', 'Super Punch Detection', 'Hitbox Modifier', 'Weapon Component Modifier', 'Anti Tase'],
            'Explosions': ['Explosion Filtering', 'Explosion Rate Limiting', 'Explosion Modifier Blocking'],
            'Event Protection': ['Event Ratelimit', 'Blacklisted Events', 'Event AI Analysis', 'Bad Event Blocking']
        };
        var K = Object.keys(S), A = K[0];
        function render() {
            tabs.innerHTML = '';
            body.innerHTML = '';
            K.forEach(function (k) {
                var b = document.createElement('div');
                b.style.cssText = 'padding:8px 16px;background:' + (k === A ? '#ff3e3e' : '#12121f') + ';border:1px solid ' + (k === A ? '#ff3e3e' : '#1e1e30') + ';border-radius:8px;color:' + (k === A ? '#fff' : '#8888a0') + ';font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all .2s';
                b.textContent = k;
                b.onclick = function () { A = k; render(); };
                tabs.appendChild(b);
            });
            var items = S[A], h = '';
            items.forEach(function (item) {
                var on = Math.random() > 0.15;
                h += '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #1a1a2e">' +
                    '<div><div style="color:#e4e4ef;font-size:13px;font-weight:500">' + item + '</div>' +
                    '<div style="font-size:11px;color:#55556a;margin-top:2px">' + (on ? 'Active — monitoring' : 'Disabled') + '</div></div>' +
                    '<div style="position:relative;width:42px;height:24px;background:' + (on ? '#ff3e3e' : '#2a2a40') + ';border-radius:12px;cursor:pointer">' +
                    '<div style="position:absolute;top:3px;left:' + (on ? '21px' : '3px') + ';width:18px;height:18px;background:#fff;border-radius:50%;transition:.2s"></div></div></div>';
            });
            body.innerHTML = h;
        }
        render();
    })();

    // ── Bans Table ──
    var banTbl = document.getElementById('dBanTbl');
    if (banTbl) {
        var h = '';
        for (var i = 0; i < 15; i++) {
            var pm = Math.random() > 0.6;
            var daysAgo = R(1, 60);
            h += '<tr><td style="font-family:monospace;font-size:11px;color:#8888a0">BAN-' + R(10000, 99999) + '</td>' +
                '<td style="font-weight:600">' + E(P(N)) + '</td>' +
                '<td style="color:#ff8888">' + E(P(D)) + '</td>' +
                '<td>RageAC</td>' +
                '<td style="color:var(--text-3)">' + daysAgo + 'd ago</td>' +
                '<td>' + (pm ? '<span style="color:var(--text-4)">Never</span>' : R(1, 30) + 'd') + '</td>' +
                '<td>' + (pm ? '<span style="color:#ef4444;font-weight:600">● Permanent</span>' : '<span style="color:#f59e0b;font-weight:600">● Temporary</span>') + '</td></tr>';
        }
        banTbl.innerHTML = h;
    }

    // ── Threats Table ──
    var thrTbl = document.getElementById('dThrTbl');
    if (thrTbl) {
        var h = '';
        for (var i = 0; i < 20; i++) {
            var s = P(SV);
            var det = P(D);
            var details = {
                'Aimbot (Bone Lock)': 'Bone lock: 84 frames at 0.3° | Methods: 3/5',
                'Speed Hack': 'Speed: 45.2 m/s | Max: 15.0 m/s | On foot',
                'God Mode': 'Health: 350 | Max: 200 | Invincible: true',
                'Teleport': 'Distance: 842m in 0.1s | Strike 3/3',
                'Silent Aim': 'Bullet angle deviation: 47° from aim direction',
                'Vehicle Modification': 'Speed: 89.1 | Max Expected: 52.3 | Violations: 3',
                'Entity Spam': 'Created 180 entities in 15s | Limit: 150',
            };
            h += '<tr><td style="color:#55556a;font-size:12px">' + T(R(0, 300)) + '</td>' +
                '<td style="font-weight:600">' + E(P(N)) + '</td>' +
                '<td>' + E(det) + '</td>' +
                '<td style="color:#8888a0;font-size:12px">' + (details[det] || 'Detected by anti-cheat module') + '</td>' +
                '<td><span style="padding:2px 8px;border-radius:4px;background:' + SC[s] + '20;color:' + SC[s] + ';font-size:11px;font-weight:600;text-transform:uppercase">' + s + '</span></td></tr>';
        }
        thrTbl.innerHTML = h;
    }

    // ── Analytics: Detection Breakdown ──
    var chartEl = document.getElementById('dChart');
    if (chartEl) {
        var types = [
            { name: 'Aimbot', count: 34, color: '#ef4444' },
            { name: 'Speed Hack', count: 28, color: '#f59e0b' },
            { name: 'God Mode', count: 22, color: '#a855f7' },
            { name: 'Teleport', count: 18, color: '#3b82f6' },
            { name: 'Noclip', count: 15, color: '#06b6d4' },
            { name: 'Entity Spam', count: 12, color: '#ec4899' },
            { name: 'Silent Aim', count: 10, color: '#ff6b35' },
            { name: 'Other', count: 17, color: '#555' },
        ];
        var maxC = 34;
        var h = '';
        types.forEach(function (t) {
            var pct = Math.round((t.count / maxC) * 100);
            h += '<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid #1a1a2e">' +
                '<span style="min-width:100px;font-size:13px;font-weight:500">' + t.name + '</span>' +
                '<div style="flex:1;height:20px;background:#1a1a2e;border-radius:4px;overflow:hidden">' +
                '<div style="width:' + pct + '%;height:100%;background:' + t.color + ';border-radius:4px;transition:width 1s ease"></div></div>' +
                '<span style="min-width:40px;text-align:right;font-size:13px;font-weight:700;color:' + t.color + '">' + t.count + '</span></div>';
        });
        chartEl.innerHTML = h;
    }

    // ── Analytics: Top Offenders ──
    var offTbl = document.getElementById('dOffTbl');
    if (offTbl) {
        var h = '', used = [];
        for (var i = 0; i < 10; i++) {
            var n; do { n = P(N); } while (used.indexOf(n) >= 0); used.push(n);
            var r = R(25, 98), rc = r > 70 ? '#ef4444' : r > 40 ? '#f59e0b' : '#22c55e';
            h += '<tr><td style="font-weight:700;color:#ff3e3e">#' + (i + 1) + '</td>' +
                '<td style="font-weight:600">' + E(n) + '</td>' +
                '<td><div style="display:flex;align-items:center;gap:8px"><div style="width:60px;height:6px;background:#1a1a2e;border-radius:3px;overflow:hidden"><div style="width:' + r + '%;height:100%;background:' + rc + ';border-radius:3px"></div></div><span style="color:' + rc + ';font-weight:700;font-size:12px">' + r + '/100</span></div></td>' +
                '<td>' + R(2, 30) + '</td></tr>';
        }
        offTbl.innerHTML = h;
    }

    // ── Screen Viewer Grid ──
    var screenGrid = document.getElementById('dScreenGrid');
    if (screenGrid) {
        var h = '';
        for (var i = 0; i < 12; i++) {
            var name = N[i];
            var trust = R(35, 100);
            var tc = trust > 70 ? 'var(--green)' : trust > 40 ? 'var(--yellow)' : 'var(--red)';
            var isThreat = trust < 45;
            h += '<div class="screen-card">' +
                '<div class="screen-thumb"><span class="material-icons-round">screenshot_monitor</span>' +
                '<div class="screen-online"></div>' +
                (isThreat ? '<div style="position:absolute;top:8px;left:8px;font-size:9px;padding:2px 8px;border-radius:10px;background:rgba(231,76,60,.2);color:#ef4444;font-weight:700">FLAGGED</div>' : '') +
                '</div>' +
                '<div class="screen-info"><div class="screen-name">' + E(name) + '</div>' +
                '<div class="screen-meta">Trust: <span style="color:' + tc + ';font-weight:600">' + trust + '</span> · ' + R(18, 120) + 'ms</div></div></div>';
        }
        screenGrid.innerHTML = h;
    }

    // ── Console Output ──
    var consoleEl = document.getElementById('dConsole');
    if (consoleEl) {
        var consoleMsgs = [
            { tag: 'system', cls: 'tag-system', msg: 'RageAC v6.5.4 initialized successfully' },
            { tag: 'system', cls: 'tag-system', msg: 'License validated — server authorized' },
            { tag: 'system', cls: 'tag-system', msg: 'Loading 70+ detection modules...' },
            { tag: 'system', cls: 'tag-system', msg: 'Web dashboard started on port 30120' },
            { tag: 'info', cls: 'tag-info', msg: 'All detection modules loaded and active' },
            { tag: 'info', cls: 'tag-info', msg: P(N) + ' connected (license:' + hex(16) + ')' },
            { tag: 'info', cls: 'tag-info', msg: P(N) + ' connected (license:' + hex(16) + ')' },
            { tag: 'anticheat', cls: 'tag-anticheat', msg: '[Detection] ' + P(N) + ' — Aimbot (Bone Lock) | Confidence: 94%' },
            { tag: 'ban', cls: 'tag-ban', msg: '[BAN] ' + P(N) + ' permanently banned — God Mode (Health: 450/200)' },
            { tag: 'info', cls: 'tag-info', msg: P(N) + ' connected (license:' + hex(16) + ')' },
            { tag: 'warn', cls: 'tag-warn', msg: '[Warning] Entity creation spike detected from ' + P(N) + ' — 82 entities in 10s' },
            { tag: 'anticheat', cls: 'tag-anticheat', msg: '[Detection] ' + P(N) + ' — Speed Hack | Speed: 38.2 m/s | Max: 15.0 m/s' },
            { tag: 'kick', cls: 'tag-kick', msg: '[KICK] ' + P(N) + ' kicked — Blacklisted weapon (weapon_railgun)' },
            { tag: 'info', cls: 'tag-info', msg: P(N) + ' disconnected (Exiting)' },
            { tag: 'chat', cls: 'tag-chat', msg: '[Chat] ' + P(N) + ': anyone want to do a heist?' },
            { tag: 'info', cls: 'tag-info', msg: P(N) + ' connected (license:' + hex(16) + ')' },
            { tag: 'anticheat', cls: 'tag-anticheat', msg: '[Detection] ' + P(N) + ' — Silent Aim | Bullet deviation: 52° from aim' },
            { tag: 'ban', cls: 'tag-ban', msg: '[BAN] ' + P(N) + ' banned 30d — Aimbot (3 methods confirmed)' },
            { tag: 'warn', cls: 'tag-warn', msg: '[Warning] Explosion rate limit exceeded by ' + P(N) + ' — 6 in 10s' },
            { tag: 'anticheat', cls: 'tag-anticheat', msg: '[Detection] ' + P(N) + ' — Noclip | Height: 342m | Speed: 65 km/h' },
            { tag: 'system', cls: 'tag-system', msg: 'Heartbeat check: 47/47 clients responsive' },
            { tag: 'info', cls: 'tag-info', msg: P(N) + ' disconnected (Kicked by RageAC)' },
            { tag: 'chat', cls: 'tag-chat', msg: '[Chat] ' + P(N) + ': thanks for getting rid of that cheater!' },
            { tag: 'anticheat', cls: 'tag-anticheat', msg: '[Detection] ' + P(N) + ' — Teleport | Distance: 1,204m in 0.2s | Strike 3/3' },
            { tag: 'ban', cls: 'tag-ban', msg: '[BAN] ' + P(N) + ' permanently banned — Teleport Hack' },
        ];
        var h = '';
        consoleMsgs.forEach(function (m) {
            h += '<div class="console-line"><span class="console-time">' + timeStr() + '</span>' +
                '<span class="console-tag ' + m.cls + '">[' + m.tag.toUpperCase() + ']</span>' +
                '<span class="console-msg">' + m.msg + '</span></div>';
        });
        consoleEl.innerHTML = h;
        consoleEl.scrollTop = consoleEl.scrollHeight;

        // Live console lines
        setInterval(function () {
            var live = [
                { tag: 'info', cls: 'tag-info', msg: P(N) + ' connected (license:' + hex(16) + ')' },
                { tag: 'anticheat', cls: 'tag-anticheat', msg: '[Detection] ' + P(N) + ' — ' + P(D) },
                { tag: 'info', cls: 'tag-info', msg: P(N) + ' disconnected (Exiting)' },
                { tag: 'chat', cls: 'tag-chat', msg: '[Chat] ' + P(N) + ': ' + P(['gg','nice server','anyone online?','lol','bruh','how do I get a job?','where is the car shop']) },
                { tag: 'warn', cls: 'tag-warn', msg: '[Warning] Suspicious activity from ' + P(N) },
                { tag: 'system', cls: 'tag-system', msg: 'Heartbeat: all clients responsive' },
            ];
            var m = P(live);
            var now = new Date();
            var ts = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
            var line = '<div class="console-line" style="animation:fadeIn .3s"><span class="console-time">' + ts + '</span>' +
                '<span class="console-tag ' + m.cls + '">[' + m.tag.toUpperCase() + ']</span>' +
                '<span class="console-msg">' + m.msg + '</span></div>';
            consoleEl.innerHTML += line;
            consoleEl.scrollTop = consoleEl.scrollHeight;
        }, 3000);
    }

    // ── Health Alerts ──
    var alertsEl = document.getElementById('dAlerts');
    if (alertsEl) {
        alertsEl.innerHTML =
            '<div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:rgba(255,159,67,.08);border-left:3px solid #ff9f43;border-radius:6px;margin-bottom:8px;font-size:13px">' +
            '<span class="material-icons-round" style="font-size:16px;color:#ff9f43;margin-top:1px">warning</span>' +
            '<div style="flex:1;color:var(--text-2)">Memory usage reached <strong style="color:var(--text-1)">62%</strong> — consider optimizing resources</div>' +
            '<span style="font-size:10px;color:var(--text-4)">2m ago</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:rgba(46,204,113,.06);border-left:3px solid #22c55e;border-radius:6px;margin-bottom:8px;font-size:13px">' +
            '<span class="material-icons-round" style="font-size:16px;color:#22c55e;margin-top:1px">check_circle</span>' +
            '<div style="flex:1;color:var(--text-2)">Server FPS recovered to <strong style="color:var(--text-1)">62 FPS</strong> — stable</div>' +
            '<span style="font-size:10px;color:var(--text-4)">14m ago</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:rgba(255,62,62,.06);border-left:3px solid #ef4444;border-radius:6px;font-size:13px">' +
            '<span class="material-icons-round" style="font-size:16px;color:#ef4444;margin-top:1px">error</span>' +
            '<div style="flex:1;color:var(--text-2)">Entity spam detected — <strong style="color:var(--text-1)">' + P(N) + '</strong> created 180 entities (auto-banned)</div>' +
            '<span style="font-size:10px;color:var(--text-4)">28m ago</span></div>';
    }

    // ── Identities: Mock Results with clickable profiles ──
    var idPlayers = [];
    var idResults = document.getElementById('dIdResults');
    if (idResults) {
        // Pre-generate player data for profiles
        for (var i = 0; i < 6; i++) {
            var name = N[R(0, N.length - 1)];
            var license = hex(40);
            var conns = R(8, 81);
            var hasBan = Math.random() > 0.65;
            var trust = hasBan ? R(20, 60) : R(70, 100);
            var discord = R(100000000000, 999999999999) + '' + R(100, 999);
            var steam = '1100001' + hex(9);
            var fivem = R(100000, 9999999);
            var firstSeen = R(1, 12) + '/' + R(1, 28) + '/2026, ' + R(1, 12) + ':' + String(R(0, 59)).padStart(2, '0') + ':' + String(R(0, 59)).padStart(2, '0') + (R(0, 1) ? ' PM' : ' AM');
            var lastSeen = '2/' + R(10, 14) + '/2026, ' + R(1, 12) + ':' + String(R(0, 59)).padStart(2, '0') + ':' + String(R(0, 59)).padStart(2, '0') + ' PM';
            var ips = [];
            for (var j = 0; j < R(2, 5); j++) ips.push(R(10, 200) + '.' + R(0, 255) + '.' + R(0, 255) + '.' + R(1, 254));

            idPlayers.push({
                name: name, license: license, conns: conns, hasBan: hasBan, trust: trust,
                discord: discord, steam: steam, fivem: fivem,
                firstSeen: firstSeen, lastSeen: lastSeen, ips: ips
            });
        }

        var h = '';
        idPlayers.forEach(function (p, idx) {
            var initial = p.name.charAt(0).toUpperCase();
            h += '<div class="id-result" onclick="openProfile(' + idx + ')" style="cursor:pointer">' +
                '<div class="id-result-avatar">' + initial + '</div>' +
                '<div class="id-result-info">' +
                '<div class="id-result-name">' + E(p.name) + (p.hasBan ? ' <span style="font-size:10px;padding:2px 8px;border-radius:10px;background:rgba(231,76,60,.15);color:#ef4444;font-weight:600;margin-left:4px">BANNED</span>' : '') + '</div>' +
                '<div class="id-result-id">license:' + p.license.substring(0, 32) + '...</div>' +
                '<div class="id-result-badges">' +
                '<span class="id-badge discord">Discord</span>' +
                '<span class="id-badge steam">Steam</span>' +
                '<span class="id-badge fivem">FiveM</span>' +
                '</div></div>' +
                '<div style="text-align:right;font-size:11px;color:var(--text-4)">' + p.conns + ' connections<br>Last seen: ' + R(1, 14) + 'd ago</div></div>';
        });
        idResults.innerHTML = h;
    }

    // ── Profile: Open player profile ──
    window.openProfile = function (idx) {
        var p = idPlayers[idx];
        if (!p) return;

        document.getElementById('idSearchView').style.display = 'none';
        document.getElementById('idProfileView').style.display = 'block';

        document.getElementById('profBreadcrumb').textContent = p.name;
        document.getElementById('profName').textContent = p.name;
        document.getElementById('profLicense').textContent = p.license;
        document.getElementById('profFirstSeen').textContent = p.firstSeen;
        document.getElementById('profLastSeen').textContent = p.lastSeen;
        document.getElementById('profConnections').textContent = p.conns;

        // Status
        var statusEl = document.getElementById('profStatus');
        statusEl.innerHTML = p.hasBan
            ? '<span class="profile-status banned">● Banned</span>'
            : '<span class="profile-status clean">● Clean</span>';

        // Trust
        var trustEl = document.getElementById('profTrust');
        var tc = p.trust > 70 ? 'green' : p.trust > 40 ? 'orange' : 'red';
        trustEl.innerHTML = '<span class="profile-trust ' + tc + '">' + p.trust + '</span>';

        // Linked accounts
        var accEl = document.getElementById('profAccounts');
        accEl.innerHTML =
            '<span class="profile-account discord">🎮 ' + p.discord + '</span>' +
            '<span class="profile-account steam">🎮 ' + p.steam + '...</span>' +
            '<span class="profile-account fivem">🎮 ' + p.fivem + '</span>';

        // Unban button
        var unbanBtn = document.getElementById('profUnbanBtn');
        unbanBtn.style.display = p.hasBan ? 'block' : 'none';

        // Connections tab
        var connList = document.getElementById('profConnectionsList');
        var ch = '';
        for (var c = 0; c < R(5, 12); c++) {
            var daysAgo = R(0, 30);
            var duration = R(10, 480);
            ch += '<div class="profile-log-item">' +
                '<span class="profile-log-badge connected">Connected</span>' +
                '<div style="flex:1;font-size:12px;color:var(--text-2)">' + (daysAgo === 0 ? 'Today' : daysAgo + 'd ago') +
                ' — played for ' + (duration > 60 ? Math.floor(duration / 60) + 'h ' + (duration % 60) + 'm' : duration + 'm') + '</div>' +
                '<span style="font-size:11px;color:var(--text-4)">' + P(p.ips) + '</span></div>';
        }
        connList.innerHTML = ch;

        // Servers tab
        var serversList = document.getElementById('profServersList');
        var sh = '';
        for (var s = 0; s < R(2, 5); s++) {
            var sNames = ['Demo RP Server', 'Eclipse Roleplay', 'Sunset Valley RP', 'Horizon Gaming', 'Neon City RP'];
            sh += '<div class="profile-log-item">' +
                '<span class="material-icons-round" style="font-size:16px;color:var(--green)">dns</span>' +
                '<div style="flex:1"><div style="font-size:13px;font-weight:600">' + P(sNames) + '</div>' +
                '<div style="font-size:11px;color:var(--text-4)">Last seen: ' + R(1, 30) + 'd ago · ' + R(2, 50) + ' connections</div></div></div>';
        }
        serversList.innerHTML = sh;

        // Identifiers tab
        var idList = document.getElementById('profIdentifiersList');
        idList.innerHTML =
            '<div class="profile-id-item"><div class="profile-id-type">License</div>license:' + p.license + '</div>' +
            '<div class="profile-id-item"><div class="profile-id-type">License2</div>license2:' + hex(40) + '</div>' +
            '<div class="profile-id-item"><div class="profile-id-type">Discord</div>discord:' + p.discord + '</div>' +
            '<div class="profile-id-item"><div class="profile-id-type">Steam</div>steam:' + p.steam + '</div>' +
            '<div class="profile-id-item"><div class="profile-id-type">FiveM</div>fivem:' + p.fivem + '</div>' +
            '<div class="profile-id-item"><div class="profile-id-type">XBL</div>xbl:' + R(1000000000, 9999999999) + '</div>' +
            '<div class="profile-id-item"><div class="profile-id-type">Live</div>live:' + R(1000000000, 9999999999) + '</div>';

        // IPs tab
        var ipsList = document.getElementById('profIpsList');
        var ih = '';
        p.ips.forEach(function (ip) {
            ih += '<div class="profile-log-item">' +
                '<span class="material-icons-round" style="font-size:16px;color:var(--blue)">language</span>' +
                '<div style="flex:1"><div style="font-size:13px;font-weight:500;font-family:monospace">' + ip + '</div>' +
                '<div style="font-size:11px;color:var(--text-4)">Seen ' + R(1, 20) + ' times · Last: ' + R(1, 14) + 'd ago</div></div></div>';
        });
        ipsList.innerHTML = ih;

        // Logs tab
        var logsList = document.getElementById('profLogsList');
        var lTypes = [
            { badge: 'connected', label: 'Connected', msg: 'Joined the server' },
            { badge: 'disconnected', label: 'Disconnected', msg: 'Left the server' },
            { badge: 'detection', label: 'Detection', msg: '' },
        ];
        if (p.hasBan) lTypes.push({ badge: 'ban', label: 'Banned', msg: '' });
        var lh = '';
        for (var l = 0; l < R(8, 15); l++) {
            var lt = P(lTypes);
            var lmsg = lt.msg || P(D);
            lh += '<div class="profile-log-item">' +
                '<span class="profile-log-badge ' + lt.badge + '">' + lt.label + '</span>' +
                '<div style="flex:1;font-size:12px;color:var(--text-2)">' + lmsg + '</div>' +
                '<span style="font-size:11px;color:var(--text-4)">' + T(R(0, 500)) + '</span></div>';
        }
        logsList.innerHTML = lh;

        // Threats tab
        var threatsList = document.getElementById('profThreatsList');
        if (p.hasBan || p.trust < 70) {
            var th = '';
            var numThreats = R(1, 4);
            for (var t = 0; t < numThreats; t++) {
                var det = P(D);
                var sev = P(SV);
                th += '<div class="profile-threat-card"><div class="threat-meta">' +
                    '<strong>Detection:</strong> ' + det + '<br>' +
                    '<strong>Severity:</strong> <span style="color:' + SC[sev] + ';text-transform:uppercase;font-weight:600">' + sev + '</span><br>' +
                    '<strong>Time:</strong> ' + T(R(10, 500)) + '<br>' +
                    '<strong>Action:</strong> ' + (sev === 'critical' ? 'Banned' : sev === 'high' ? 'Kicked' : 'Warned') +
                    '</div></div>';
            }
            threatsList.innerHTML = th;
        } else {
            threatsList.innerHTML = '<div class="profile-empty">No threats recorded for this player</div>';
        }

        // Reset to first tab
        showProfileTab('connections');
    };

    window.closeProfile = function () {
        document.getElementById('idSearchView').style.display = 'block';
        document.getElementById('idProfileView').style.display = 'none';
    };

    window.showProfileTab = function (tab) {
        document.querySelectorAll('.profile-tab').forEach(function (t) {
            t.classList.toggle('active', t.dataset.ptab === tab);
        });
        document.querySelectorAll('.profile-tab-content').forEach(function (c) {
            c.classList.remove('active');
        });
        var el = document.getElementById('ptab-' + tab);
        if (el) el.classList.add('active');
    };

    // ── Exclusions Page ──
    var excGrid = document.getElementById('dExcGrid');
    if (excGrid) {
        var excCards = [
            { icon: 'blur_on', name: 'Particle Crash Whitelist', items: ['weap_xs_vehicle_weapons'], placeholder: 'e.g. weap_xs_vehicle_weapons' },
            { icon: 'gps_fixed', name: 'Aimbot Weapon Whitelist', items: ['OBJECT', 'WEAPON_SNOWBALL'], placeholder: 'e.g. WEAPON_SNOWBALL' },
            { icon: 'track_changes', name: 'Silent Aim Whitelist', items: ['GROUP_SHOTGUN', 'WEAPON_STINGER'], placeholder: 'e.g. GROUP_SHOTGUN' },
            { icon: 'public', name: 'Geo-Blocked Countries', items: [], placeholder: 'e.g. CN, RU, KP' },
            { icon: 'public_off', name: 'Geo-Block Exempt Players', items: [], placeholder: 'e.g. license:xxxxx' },
            { icon: 'verified_user', name: 'Trust Score Whitelist', items: ['ky'], placeholder: 'e.g. license:xxxxx' },
            { icon: 'vpn_lock', name: 'Anti-VPN Whitelist', items: [], placeholder: 'e.g. license:xxxxx' },
            { icon: 'block', name: 'IP Ban Whitelist', items: [], placeholder: 'e.g. 192.168.1.1' },
            { icon: 'location_off', name: 'Detection Whitelist Zones', items: [], placeholder: 'e.g. zone name or coords' },
            { icon: 'code_off', name: 'Blacklisted Commands', items: [], placeholder: 'e.g. /godmode' },
            { icon: 'inventory_2', name: 'Resource Entity Whitelist', items: [], placeholder: 'e.g. my_resource' },
            { icon: 'speed', name: 'Entity Ratelimit Whitelist', items: ['prop'], placeholder: 'e.g. prop_bench_01a' },
            { icon: 'straighten', name: 'Entity Distance Whitelist', items: [], placeholder: 'e.g. resource_name' },
            { icon: 'person_off', name: 'Armed Ped Whitelist', items: [], placeholder: 'e.g. ped_model' },
            { icon: 'whatshot', name: 'Explosion Modifier Whitelist', items: [], placeholder: 'e.g. explosion_type' },
        ];

        var excHtml = '';
        excCards.forEach(function (card, ci) {
            var tagsHtml = '';
            if (card.items.length === 0) {
                tagsHtml = '<div class="exc-empty">No items — add one below</div>';
            } else {
                card.items.forEach(function (item, ti) {
                    tagsHtml += '<span class="exc-tag" id="exc-' + ci + '-' + ti + '">' + E(item) +
                        ' <button class="exc-tag-x" onclick="removeExcTag(' + ci + ',' + ti + ')" title="Remove">×</button></span>';
                });
            }
            excHtml += '<div class="exc-card"><div class="exc-card-head"><h3><span class="material-icons-round">' + card.icon + '</span> ' + E(card.name) + '</h3>' +
                '<span class="exc-count" id="exc-count-' + ci + '">' + card.items.length + ' items</span></div>' +
                '<div class="exc-card-body"><div class="exc-tags" id="exc-tags-' + ci + '">' + tagsHtml + '</div>' +
                '<div class="exc-add-row"><input class="exc-add-input" id="exc-input-' + ci + '" placeholder="' + card.placeholder + '">' +
                '<button class="exc-add-btn" onclick="addExcTag(' + ci + ')">Add</button></div></div></div>';
        });
        excGrid.innerHTML = excHtml;

        // Store data for interactivity
        window._excCards = excCards;
    }

    window.addExcTag = function (ci) {
        var input = document.getElementById('exc-input-' + ci);
        var val = input.value.trim();
        if (!val) return;

        var card = window._excCards[ci];
        card.items.push(val);
        input.value = '';

        var tagsEl = document.getElementById('exc-tags-' + ci);
        var ti = card.items.length - 1;
        // Remove empty message if present
        var empty = tagsEl.querySelector('.exc-empty');
        if (empty) empty.remove();

        var tag = document.createElement('span');
        tag.className = 'exc-tag';
        tag.id = 'exc-' + ci + '-' + ti;
        tag.innerHTML = E(val) + ' <button class="exc-tag-x" onclick="removeExcTag(' + ci + ',' + ti + ')" title="Remove">×</button>';
        tag.style.animation = 'fadeIn .2s ease';
        tagsEl.appendChild(tag);

        document.getElementById('exc-count-' + ci).textContent = card.items.length + ' items';
    };

    window.removeExcTag = function (ci, ti) {
        var el = document.getElementById('exc-' + ci + '-' + ti);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.8)';
            el.style.transition = 'all .2s';
            setTimeout(function () { el.remove(); }, 200);
        }
        var card = window._excCards[ci];
        card.items[ti] = null;
        var count = card.items.filter(function (x) { return x !== null; }).length;
        document.getElementById('exc-count-' + ci).textContent = count + ' items';

        if (count === 0) {
            var tagsEl = document.getElementById('exc-tags-' + ci);
            setTimeout(function () {
                if (!tagsEl.querySelector('.exc-tag')) {
                    tagsEl.innerHTML = '<div class="exc-empty">No items — add one below</div>';
                }
            }, 250);
        }
    };

    // ── Map Page ──
    var mapContainer = document.getElementById('mapContainer');
    var mapSbList = document.getElementById('mapSbList');
    if (mapContainer && mapSbList) {
        var mapPlayers = [];
        var markerColors = ['#2ecc71', '#3498db', '#e67e22', '#9b59b6', '#1abc9c', '#e74c3c', '#f39c12', '#2980b9'];

        for (var i = 0; i < 20; i++) {
            var name = N[i];
            var trust = R(40, 100);
            var x = R(10, 90); // percentage positions
            var y = R(10, 90);
            mapPlayers.push({
                id: i + 1,
                name: name,
                trust: trust,
                x: x,
                y: y,
                health: R(100, 200),
                ping: R(18, 130),
                pos: R(-2000, 3000) + ', ' + R(-3000, 2000) + ', ' + R(10, 100),
                color: P(markerColors)
            });
        }

        // Render markers
        var markersEl = document.getElementById('mapMarkers');
        var mh = '';
        mapPlayers.forEach(function (p) {
            mh += '<div class="map-marker" id="map-m-' + p.id + '" style="left:' + p.x + '%;top:' + p.y + '%;background:' + p.color + '" ' +
                'onclick="showMapPopup(' + p.id + ')" title="' + E(p.name) + '">' + p.id + '</div>';
        });
        markersEl.innerHTML = mh;

        // Render sidebar
        var sbh = '';
        mapPlayers.forEach(function (p) {
            var tc = p.trust > 70 ? 'green' : p.trust > 40 ? 'orange' : 'red';
            sbh += '<div class="map-sb-player" id="map-sb-' + p.id + '" onclick="showMapPopup(' + p.id + ')">' +
                '<span class="map-sb-id">[' + p.id + ']</span>' +
                '<span class="map-sb-name">' + E(p.name) + '</span>' +
                '<span class="map-sb-trust ' + tc + '">' + p.trust + '</span></div>';
        });
        mapSbList.innerHTML = sbh;

        // Search filter
        var mapSearch = document.getElementById('mapSearch');
        if (mapSearch) {
            mapSearch.addEventListener('input', function () {
                var q = mapSearch.value.toLowerCase();
                mapPlayers.forEach(function (p) {
                    var sbEl = document.getElementById('map-sb-' + p.id);
                    var mEl = document.getElementById('map-m-' + p.id);
                    var show = p.name.toLowerCase().indexOf(q) >= 0 || String(p.id).indexOf(q) >= 0;
                    if (sbEl) sbEl.style.display = show ? 'flex' : 'none';
                    if (mEl) mEl.style.display = show ? 'flex' : 'none';
                });
            });
        }

        window._mapPlayers = mapPlayers;
    }

    window.showMapPopup = function (id) {
        var p = window._mapPlayers.find(function (x) { return x.id === id; });
        if (!p) return;

        // Highlight sidebar
        document.querySelectorAll('.map-sb-player').forEach(function (el) { el.classList.remove('active'); });
        document.querySelectorAll('.map-marker').forEach(function (el) { el.classList.remove('selected'); });
        var sbEl = document.getElementById('map-sb-' + id);
        var mEl = document.getElementById('map-m-' + id);
        if (sbEl) sbEl.classList.add('active');
        if (mEl) mEl.classList.add('selected');

        var tc = p.trust > 70 ? '#2ecc71' : p.trust > 40 ? '#f39c12' : '#e74c3c';
        var popup = document.getElementById('mapPopup');
        popup.innerHTML =
            '<button class="map-popup-close" onclick="closeMapPopup()">×</button>' +
            '<div class="map-popup-name">#' + p.id + ' ' + E(p.name) + '</div>' +
            '<div class="map-popup-row">Trust: <span style="color:' + tc + ';font-weight:700;padding:1px 8px;border-radius:4px;background:' + tc + '20">' + p.trust + '/100</span></div>' +
            '<div class="map-popup-row">Pos: <span>' + p.pos + '</span></div>' +
            '<div class="map-popup-row">Health: <span>' + p.health + '</span> | Ping: <span>' + p.ping + 'ms</span></div>' +
            '<div class="map-popup-actions">' +
            '<button class="map-popup-btn">Kick</button>' +
            '<button class="map-popup-btn">Ban</button>' +
            '<button class="map-popup-btn">Screenshot</button></div>';

        popup.style.left = Math.min(p.x, 65) + '%';
        popup.style.top = Math.min(p.y, 60) + '%';
        popup.className = 'map-popup show';
    };

    window.closeMapPopup = function () {
        var popup = document.getElementById('mapPopup');
        popup.className = 'map-popup';
        document.querySelectorAll('.map-sb-player').forEach(function (el) { el.classList.remove('active'); });
        document.querySelectorAll('.map-marker').forEach(function (el) { el.classList.remove('selected'); });
    };

    // ── Logs ──
    var logsEl = document.getElementById('dLogs');
    if (logsEl) {
        var types = [
            { icon: 'login', color: '#22c55e', label: 'Join' },
            { icon: 'logout', color: '#3b82f6', label: 'Leave' },
            { icon: 'warning', color: '#f59e0b', label: 'Detection' },
            { icon: 'gavel', color: '#ef4444', label: 'Ban' },
            { icon: 'front_hand', color: '#ff6b35', label: 'Kick' },
            { icon: 'shield', color: '#a855f7', label: 'Admin' },
        ];
        var h = '';
        for (var i = 0; i < 30; i++) {
            var ty = P(types), name = P(N);
            var msg = ty.label === 'Join' ? 'Connected to server' :
                ty.label === 'Leave' ? 'Disconnected' :
                ty.label === 'Detection' ? P(D) :
                ty.label === 'Ban' ? 'Banned: ' + P(D) :
                ty.label === 'Kick' ? 'Kicked: ' + P(D) :
                'Admin action by Console';
            h += '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #1a1a2e">' +
                '<span class="material-icons-round" style="font-size:16px;color:' + ty.color + '">' + ty.icon + '</span>' +
                '<div style="flex:1"><span style="font-size:12px;font-weight:600;color:#e4e4ef">' + E(name) + '</span>' +
                '<span style="font-size:11px;color:#8888a0;margin-left:8px">' + E(msg) + '</span></div>' +
                '<span style="font-size:10px;color:#55556a;white-space:nowrap">' + T(R(0, 400)) + '</span></div>';
        }
        logsEl.innerHTML = h;
    }

    // ── Appeals Table ──
    var aplTbl = document.getElementById('dAplTbl');
    if (aplTbl) {
        var reasons = ['I was not cheating, my internet was lagging', 'False positive — gaming mouse macros', 'My brother was on my account', 'Reported incorrectly by another player', 'I think there was a server bug', 'I was AFK and got banned for god mode??'];
        var sts = ['<span style="color:#f59e0b;font-weight:600">● Pending</span>', '<span style="color:#22c55e;font-weight:600">● Approved</span>', '<span style="color:#ef4444;font-weight:600">● Denied</span>'];
        var h = '';
        for (var i = 0; i < 8; i++) {
            h += '<tr><td style="font-family:monospace;font-size:11px;color:#8888a0">APL-' + R(1000, 9999) + '</td>' +
                '<td style="font-weight:600">' + E(P(N)) + '</td>' +
                '<td style="font-family:monospace;font-size:11px">BAN-' + R(10000, 99999) + '</td>' +
                '<td style="font-size:12px;color:#8888a0;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + E(P(reasons)) + '</td>' +
                '<td style="font-size:11px;color:#55556a">' + R(1, 14) + 'd ago</td>' +
                '<td>' + P(sts) + '</td></tr>';
        }
        aplTbl.innerHTML = h;
    }

    // ── Identity pills interactivity ──
    document.querySelectorAll('.id-pill').forEach(function (pill) {
        pill.addEventListener('click', function () {
            document.querySelectorAll('.id-pill').forEach(function (p) { p.classList.remove('active'); });
            pill.classList.add('active');
            var input = document.querySelector('.id-search-bar input');
            if (input) {
                var placeholders = { Name: 'Search by player name...', License: 'Search by license key...', Discord: 'Search by Discord ID...', Steam: 'Search by Steam hex...', IP: 'Search by IP address...' };
                input.placeholder = placeholders[pill.textContent] || 'Search...';
            }
        });
    });

    // ── Navigation ──
    window.showDemo = function (p) {
        document.querySelectorAll('.page').forEach(function (e) { e.classList.remove('active'); });
        var page = document.getElementById('page-' + p);
        if (page) page.classList.add('active');
        document.querySelectorAll('.topnav-tab').forEach(function (t) {
            t.classList.toggle('active', t.dataset.page === p);
        });
    };

    // ── Particles ──
    (function () {
        var c = document.getElementById('particleCanvas');
        if (!c) return;
        var x = c.getContext('2d');
        function rs() { c.width = window.innerWidth; c.height = window.innerHeight; }
        rs();
        window.addEventListener('resize', rs);
        var ps = [];
        for (var i = 0; i < 50; i++) ps.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 2 + .5, a: Math.random() * .3 + .1 });
        function dr() {
            x.clearRect(0, 0, c.width, c.height);
            ps.forEach(function (p) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
                if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
                x.beginPath(); x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                x.fillStyle = 'rgba(255,62,62,' + p.a + ')'; x.fill();
            });
            requestAnimationFrame(dr);
        }
        dr();
    })();

})();

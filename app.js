/* ============================================
   SpendWise — 3-Page App Logic
   Home · Add · Summary (Donut Pie Dashboard)
   ============================================ */

(function () {
    'use strict';

    // ─── Constants ───
    const STORAGE_KEY = 'spendwise_expenses';
    const CATEGORIES = {
        food:          { emoji: '🍔', label: 'Food',       color: '#fdcb6e' },
        transport:     { emoji: '🚗', label: 'Transport',  color: '#74b9ff' },
        shopping:      { emoji: '🛍️', label: 'Shopping',   color: '#fd79a8' },
        entertainment: { emoji: '🎬', label: 'Fun',        color: '#a29bfe' },
        bills:         { emoji: '📄', label: 'Bills',      color: '#b2bec3' },
        health:        { emoji: '💊', label: 'Health',     color: '#55efc4' },
        education:     { emoji: '📚', label: 'Education',  color: '#81ecec' },
        other:         { emoji: '📦', label: 'Other',      color: '#fab1a0' },
    };

    const TRANSLATIONS = {
        en: {
            home: "Home",
            add: "Add",
            summary: "Summary",
            recent_tx: "Recent Transactions",
            top_categories: "Top Categories",
            see_all: "See All",
            good_morning: "Good morning",
            good_afternoon: "Good afternoon",
            good_evening: "Good evening",
            add_expense: "Add Expense",
            amount: "Amount",
            date: "Date",
            description: "Description",
            category: "Category",
            scan_receipt: "Scan Receipt",
            monthly_summary: "Monthly Summary",
            total_spent: "Total Spent",
            daily_trends: "Daily Spending Trends",
            category_breakdown: "Category Breakdown",
            search_placeholder: "Search transactions...",
            settings: "Settings",
            profile_settings: "Profile Settings",
            default_currency: "Default Currency",
            monthly_budgets: "Monthly Budgets",
            data_management: "Data Management",
            upload_photo: "Upload Photo",
            remove: "Remove",
            export_backup: "Export Backup",
            import_backup: "Import Backup",
            save_changes: "Save Changes",
            cancel: "Cancel",
            delete_expense: "Delete Expense?",
            delete_confirm: "This action cannot be undone.",
            login: "Login",
            register: "Register",
            email: "Email",
            password: "Password",
            full_name: "Full Name",
            confirm_password: "Confirm Password",
            create_account: "Create Account",
            language: "Language",
            cat_food: "Food",
            cat_transport: "Transport",
            cat_shopping: "Shopping",
            cat_entertainment: "Fun",
            cat_bills: "Bills",
            cat_health: "Health",
            cat_education: "Education",
            cat_other: "Other"
        },
        km: {
            home: "ទំព័រដើម",
            add: "បន្ថែម",
            summary: "សង្ខេប",
            recent_tx: "ប្រតិបត្តិការថ្មីៗ",
            top_categories: "ប្រភេទចំណាយច្រើនបំផុត",
            see_all: "មើលទាំងអស់",
            good_morning: "អរុណសួស្តី",
            good_afternoon: "ទិវាសួស្តី",
            good_evening: "សាយ័ន្តសួស្តី",
            add_expense: "បន្ថែមការចំណាយ",
            amount: "ចំនួនទឹកប្រាក់",
            date: "កាលបរិច្ឆេទ",
            description: "ការពិពណ៌នា",
            category: "ប្រភេទចំណាយ",
            scan_receipt: "ស្កេនវិក្កយបត្រ",
            monthly_summary: "សេចក្តីសង្ខេបប្រចាំខែ",
            total_spent: "ចំណាយសរុប",
            daily_trends: "និន្នាការចំណាយប្រចាំថ្ងៃ",
            category_breakdown: "ចំណាយតាមប្រភេទ",
            search_placeholder: "ស្វែងរកប្រតិបត្តិការ...",
            settings: "ការកំណត់",
            profile_settings: "ការកំណត់ប្រវត្តិរូប",
            default_currency: "រូបិយប័ណ្ណលំនាំដើម",
            monthly_budgets: "កញ្ចប់ថវិកាប្រចាំខែ",
            data_management: "ការគ្រប់គ្រងទិន្នន័យ",
            upload_photo: "ផ្ទុកឡើងរូបភាព",
            remove: "លុបចេញ",
            export_backup: "នាំចេញទិន្នន័យ",
            import_backup: "នាំចូលទិន្នន័យ",
            save_changes: "រក្សាទុក",
            cancel: "បោះបង់",
            delete_expense: "លុបការចំណាយនេះ?",
            delete_confirm: "សកម្មภาพនេះមិនអាចត្រឡប់វិញបានទេ។",
            login: "ចូលគណនី",
            register: "ចុះឈ្មោះ",
            email: "អ៊ីមែល",
            password: "ពាក្យសម្ងាត់",
            full_name: "ឈ្មោះពេញ",
            confirm_password: "បញ្ជាក់ពាក្យសម្ងាត់",
            create_account: "បង្កើតគណនី",
            language: "ភាសា",
            cat_food: "អាហារ",
            cat_transport: "ដឹកជញ្ជូន",
            cat_shopping: "ទិញអីវ៉ាន់",
            cat_entertainment: "កម្សាន្ត",
            cat_bills: "វិក្កយបត្រ",
            cat_health: "សុខភាព",
            cat_education: "ការសិក្សា",
            cat_other: "ផ្សេងៗ"
        },
        th: {
            home: "หน้าแรก",
            add: "เพิ่ม",
            summary: "สรุป",
            recent_tx: "รายการล่าสุด",
            top_categories: "หมวดหมู่หลัก",
            see_all: "ดูทั้งหมด",
            good_morning: "อรุณสวัสดิ์",
            good_afternoon: "สวัสดีตอนบ่าย",
            good_evening: "สวัสดีตอนเย็น",
            add_expense: "เพิ่มรายการใช้จ่าย",
            amount: "จำนวนเงิน",
            date: "วันที่",
            description: "รายละเอียด",
            category: "หมวดหมู่",
            scan_receipt: "สแกนใบเสร็จ",
            monthly_summary: "สรุปประจำเดือน",
            total_spent: "ยอดใช้จ่ายทั้งหมด",
            daily_trends: "แนวโน้มการใช้จ่ายรายวัน",
            category_breakdown: "สัดส่วนตามหมวดหมู่",
            search_placeholder: "ค้นหารายการใช้จ่าย...",
            settings: "การตั้งค่า",
            profile_settings: "ตั้งค่าโปรไฟล์",
            default_currency: "สกุลเงินเริ่มต้น",
            monthly_budgets: "งบประมาณรายเดือน",
            data_management: "จัดการข้อมูล",
            upload_photo: "อัปโหลดรูปภาพ",
            remove: "ลบออก",
            export_backup: "ส่งออกข้อมูลสำรอง",
            import_backup: "นำเข้าข้อมูลสำรอง",
            save_changes: "บันทึกการเปลี่ยนแปลง",
            cancel: "ยกเลิก",
            delete_expense: "ลบรายการนี้ใช่หรือไม่?",
            delete_confirm: "การดำเนินการนี้ไม่สามารถย้อนกลับได้",
            login: "เข้าสู่ระบบ",
            register: "สมัครสมาชิก",
            email: "อีเมล",
            password: "รหัสผ่าน",
            full_name: "ชื่อ-นามสกุล",
            confirm_password: "ยืนยันรหัสผ่าน",
            create_account: "สร้างบัญชี",
            language: "ภาษา",
            cat_food: "อาหาร",
            cat_transport: "ขนส่ง",
            cat_shopping: "ช้อปปิ้ง",
            cat_entertainment: "บันเทิง",
            cat_bills: "บิล",
            cat_health: "สุขภาพ",
            cat_education: "การศึกษา",
            cat_other: "อื่นๆ"
        }
    };

    // ─── State ───
    let currentUser = null; // { name, email, id, country, language }
    let expenses = [];
    let selectedCategory = null;
    let deleteTargetId = null;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let activePage = 'home';
    let currentCurrency = localStorage.getItem('spendwise_currency') || '$';
    let currentLanguage = localStorage.getItem('spendwise_language') || 'km';

    // ─── DOM ───
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    // Pages
    const pages = {
        home: $('#page-home'),
        add: $('#page-add'),
        summary: $('#page-summary'),
        auth: $('#page-auth'),
    };
    const navItems = $$('.nav-item');
    const authCountrySelect = $('#auth-country-select');
    const authLangSelect = $('#auth-lang-select');

    // Home
    const greetingEl = $('#greeting');
    const homeTotal = $('#home-total');
    const homeTxCount = $('#home-tx-count');
    const homeDailyAvg = $('#home-daily-avg');
    const recentList = $('#recent-list');
    const topCatsRow = $('#top-cats-row');
    const homeMonthLabel = $('#home-month-label');
    const langPills = $$('.lang-pill');
    const quickAddBtn = $('#quick-add-btn');
    const seeAllBtn = $('#see-all-btn');

    // Add
    const form = $('#expense-form');
    const amountInput = $('#expense-amount');
    const descInput = $('#expense-description');
    const dateInput = $('#expense-date');
    const catHidden = $('#expense-category');
    const catBtns = $$('.cat-btn');
    const submitBtn = $('#submit-btn');

    // Summary
    const summaryTotal = $('#summary-total');
    const summaryCount = $('#summary-count');
    const summaryAvg = $('#summary-avg');
    const summaryMonthLabel = $('#summary-month-label');
    const donutCanvas = $('#donut-chart');
    const donutCtx = donutCanvas.getContext('2d');
    const donutCenterValue = $('#donut-center-value');
    const donutContainer = $('#donut-container');
    const donutLegend = $('#donut-legend');
    const chartEmpty = $('#chart-empty');
    const breakdownList = $('#breakdown-list');
    const allTxList = $('#all-tx-list');
    const filterSelect = $('#filter-category');

    // Scan (inside Add page)
    const scanSection = $('#scan-section');
    const scanToggleBtn = $('#scan-toggle-btn');
    const scanBody = $('#scan-body');
    const receiptInput = $('#receipt-input');
    const scanDropzone = $('#scan-dropzone');
    const scanUploadArea = $('#scan-upload-area');
    const scanGalleryBtn = $('#scan-gallery-btn');
    const scanCameraBtn = $('#scan-camera-btn');
    const scanPreview = $('#scan-preview');
    const scanPreviewImg = $('#scan-preview-img');
    const scanRemoveBtn = $('#scan-remove-btn');
    const scanProgress = $('#scan-progress');
    const scanProgressLabel = $('#scan-progress-label');
    const scanProgressFill = $('#scan-progress-fill');
    const scanProgressPct = $('#scan-progress-pct');
    const scanResults = $('#scan-results');
    const scanResultItems = $('#scan-result-items');
    const scanRawToggleBtn = $('#scan-raw-toggle-btn');
    const scanRawText = $('#scan-raw-text');
    const scanRawContent = $('#scan-raw-content');
    const scanUseBtn = $('#scan-use-btn');
    const scanRetryBtn = $('#scan-retry-btn');

    // Auth & Profile
    const profileAvatarBtn = $('#profile-avatar-btn');
    const avatarInitials = $('#avatar-initials');
    const avatarIcon = $('#avatar-icon');
    
    const authModal = $('#auth-modal');
    const authCloseBtn = $('#auth-close-btn');
    const authTabs = $$('.auth-tab');
    const authTabIndicator = $('#auth-tab-indicator');
    const loginForm = $('#login-form');
    const registerForm = $('#register-form');
    
    const profileDropdown = $('#profile-dropdown');
    const dropdownAvatar = $('#dropdown-avatar');
    const dropdownName = $('#dropdown-name');
    const dropdownEmail = $('#dropdown-email');
    const profileLogoutBtn = $('#profile-logout-btn');

    // Modal
    const deleteModal = $('#delete-modal');
    const modalCancelBtn = $('#modal-cancel-btn');
    const modalDeleteBtn = $('#modal-delete-btn');
    const deleteModalText = $('#delete-modal-text');

    // Toast
    const toastContainer = $('#toast-container');

    // ─── Utilities ───
    function uid() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }

    function money(n) {
        return currentCurrency + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Money short helper
    function moneyShort(n) {
        if (n >= 10000) return currentCurrency + (n / 1000).toFixed(1) + 'k';
        return money(n);
    }

    // Update currency in UI
    function updateCurrencyUI() {
        const amountCurrencySpan = $('.amount-currency');
        if (amountCurrencySpan) amountCurrencySpan.textContent = currentCurrency;
        
        $$('.budget-symbol-prefix').forEach(el => {
            el.textContent = currentCurrency;
        });
    }

    // Get budget local storage key
    function getBudgetsKey() {
        if (!currentUser) return 'spendwise_budgets';
        return `spendwise_budgets_${currentUser.email}`;
    }

    // Load budgets
    function loadBudgets() {
        try {
            return JSON.parse(localStorage.getItem(getBudgetsKey())) || {};
        } catch {
            return {};
        }
    }

    // Save budgets
    function saveBudgets(budgets) {
        localStorage.setItem(getBudgetsKey(), JSON.stringify(budgets));
    }

    function fmtDate(d) {
        return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    function monthName(m, y) {
        return new Date(y, m).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    function daysInMonth(m, y) {
        return new Date(y, m + 1, 0).getDate();
    }

    function escapeHtml(t) {
        const d = document.createElement('div');
        d.textContent = t;
        return d.innerHTML;
    }

    function setGreeting() {
        const h = new Date().getHours();
        let key = 'good_morning';
        let emoji = '☀️';
        if (h < 12) {
            key = 'good_morning';
            emoji = '☀️';
        } else if (h < 17) {
            key = 'good_afternoon';
            emoji = '🌤️';
        } else {
            key = 'good_evening';
            emoji = '🌙';
        }
        
        const welcomeText = (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) 
            ? TRANSLATIONS[currentLanguage][key] 
            : 'Welcome';
            
        if (currentUser) {
            greetingEl.textContent = `${welcomeText}, ${currentUser.name.split(' ')[0]} ${emoji}`;
        } else {
            greetingEl.textContent = `${welcomeText} ${emoji}`;
        }
    }

    function applyTranslations(lang) {
        currentLanguage = lang || 'en';
        localStorage.setItem('spendwise_language', currentLanguage);
        
        $$('[data-i18n]').forEach((el) => {
            const key = el.dataset.i18n;
            const text = TRANSLATIONS[currentLanguage] ? TRANSLATIONS[currentLanguage][key] : null;
            if (text) {
                el.textContent = text;
            }
        });
        
        // Dynamic search input placeholder translation
        const searchInput = $('#search-tx');
        if (searchInput && TRANSLATIONS[currentLanguage]) {
            searchInput.placeholder = TRANSLATIONS[currentLanguage].search_placeholder;
        }
        
        // Re-generate welcome greeting
        setGreeting();
    }

    function showToast(msg, type = 'success') {
        const icons = {
            success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
            error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
            info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        };
        const el = document.createElement('div');
        el.className = `toast toast-${type}`;
        el.innerHTML = `${icons[type] || icons.info}<span>${msg}</span>`;
        toastContainer.appendChild(el);
        setTimeout(() => {
            el.classList.add('removing');
            setTimeout(() => el.remove(), 250);
        }, 2800);
    }

    // ─── Storage & Auth ───
    function getStorageKey() {
        if (!currentUser) return STORAGE_KEY;
        return `${STORAGE_KEY}_${currentUser.email}`;
    }

    function load() {
        try { expenses = JSON.parse(localStorage.getItem(getStorageKey())) || []; }
        catch { expenses = []; }
    }

    function save() {
        localStorage.setItem(getStorageKey(), JSON.stringify(expenses));
    }

    // ─── Auth Logic ───
    function loadAuth() {
        try {
            const storedUser = localStorage.getItem('spendwise_current_user');
            if (storedUser) {
                currentUser = JSON.parse(storedUser);
                updateProfileUI();
            }
        } catch (e) {}
    }

    function updateProfileUI() {
        if (currentUser) {
            avatarIcon.style.display = 'none';
            
            let users = [];
            try { users = JSON.parse(localStorage.getItem('spendwise_users')) || []; } catch(e){}
            const userRecord = users.find(u => u.email === currentUser.email) || currentUser;
            
            // Apply user-specific language/country settings
            if (userRecord.language) {
                currentLanguage = userRecord.language;
                localStorage.setItem('spendwise_language', currentLanguage);
            }
            if (userRecord.country) {
                if (userRecord.country === 'cambodia') currentCurrency = '៛';
                else if (userRecord.country === 'thailand') currentCurrency = '฿';
                localStorage.setItem('spendwise_currency', currentCurrency);
                updateCurrencyUI();
            }
            
            applyTranslations(currentLanguage); // Will call setGreeting internally
            
            if (userRecord && userRecord.avatar) {
                avatarInitials.style.display = 'none';
                profileAvatarBtn.style.backgroundImage = `url(${userRecord.avatar})`;
                profileAvatarBtn.style.backgroundSize = 'cover';
                profileAvatarBtn.style.backgroundPosition = 'center';
                
                dropdownAvatar.textContent = '';
                dropdownAvatar.style.backgroundImage = `url(${userRecord.avatar})`;
                dropdownAvatar.style.backgroundSize = 'cover';
                dropdownAvatar.style.backgroundPosition = 'center';
            } else {
                avatarInitials.style.display = 'block';
                avatarInitials.textContent = currentUser.name.substring(0, 2).toUpperCase();
                profileAvatarBtn.style.backgroundImage = '';
                
                dropdownAvatar.textContent = currentUser.name.substring(0, 2).toUpperCase();
                dropdownAvatar.style.backgroundImage = '';
            }
            
            dropdownName.textContent = currentUser.name;
            dropdownEmail.textContent = currentUser.email;
            if (authCloseBtn) authCloseBtn.style.display = 'block';
        } else {
            avatarIcon.style.display = 'block';
            avatarInitials.style.display = 'none';
            profileAvatarBtn.style.backgroundImage = '';
            profileDropdown.classList.remove('open');
            applyTranslations(currentLanguage);
            if (authCloseBtn) authCloseBtn.style.display = 'none';
        }
    }

    function handleLogin(email, password) {
        // Simple mock authentication using localStorage users list
        let users = [];
        try { users = JSON.parse(localStorage.getItem('spendwise_users')) || []; } catch(e){}
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = { id: user.id, name: user.name, email: user.email, country: user.country, language: user.language };
            localStorage.setItem('spendwise_current_user', JSON.stringify(currentUser));
            updateProfileUI();
            switchPage('home');
            load(); // load user's specific expenses
            renderAll();
            showToast('Logged in successfully!');
        } else {
            showToast('Invalid email or password', 'error');
        }
    }

    function handleRegister(name, email, password) {
        let users = [];
        try { users = JSON.parse(localStorage.getItem('spendwise_users')) || []; } catch(e){}
        if (users.find(u => u.email === email)) {
            showToast('Email already registered', 'error');
            return;
        }
        
        const country = authCountrySelect ? authCountrySelect.value : 'cambodia';
        const language = authLangSelect ? authLangSelect.value : 'km';
        
        const newUser = { id: uid(), name, email, password, country, language };
        users.push(newUser);
        localStorage.setItem('spendwise_users', JSON.stringify(users));
        
        currentUser = { id: newUser.id, name: newUser.name, email: newUser.email, country: newUser.country, language: newUser.language };
        localStorage.setItem('spendwise_current_user', JSON.stringify(currentUser));
        updateProfileUI();
        switchPage('home');
        load();
        renderAll();
        showToast('Account created successfully!');
    }

    function logout() {
        currentUser = null;
        localStorage.removeItem('spendwise_current_user');
        updateProfileUI();
        switchPage('auth');
        load(); // load default anonymous expenses
        renderAll();
        showToast('Logged out');
    }

    // ─── Auth Events ───
    profileAvatarBtn.addEventListener('click', () => {
        if (currentUser) {
            profileDropdown.classList.toggle('open');
        } else {
            switchPage('auth');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileAvatarBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('open');
        }
    });

    profileLogoutBtn.addEventListener('click', () => {
        profileDropdown.classList.remove('open');
        logout();
    });
    
    // Auth Tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            authTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            const isLogin = e.target.dataset.tab === 'login';
            loginForm.style.display = isLogin ? 'flex' : 'none';
            registerForm.style.display = isLogin ? 'none' : 'flex';
            authTabIndicator.style.transform = isLogin ? 'translateX(0)' : 'translateX(100%)';
        });
    });

    // Region change handlers
    if (authCountrySelect && authLangSelect) {
        function updateLanguageOptions() {
            const country = authCountrySelect.value;
            if (country === 'cambodia') {
                authLangSelect.innerHTML = `
                    <option value="km">🇰🇭 Khmer</option>
                    <option value="en">🇺🇸 English</option>
                `;
                applyTranslations('km');
            } else if (country === 'thailand') {
                authLangSelect.innerHTML = `
                    <option value="th">🇹🇭 Thai</option>
                    <option value="en">🇺🇸 English</option>
                `;
                applyTranslations('th');
            }
        }
        
        authCountrySelect.addEventListener('change', () => {
            updateLanguageOptions();
            
            // Auto-change default currency symbol based on country select
            const country = authCountrySelect.value;
            if (country === 'cambodia') {
                currentCurrency = '៛';
            } else if (country === 'thailand') {
                currentCurrency = '฿';
            }
            localStorage.setItem('spendwise_currency', currentCurrency);
            updateCurrencyUI();
            renderAll();
        });
        
        authLangSelect.addEventListener('change', () => {
            applyTranslations(authLangSelect.value);
        });

        // Initialize language dropdown state
        updateLanguageOptions();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin($('#login-email').value, $('#login-password').value);
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = $('#register-password').value;
        const confirm = $('#register-confirm').value;
        if (pwd !== confirm) {
            showToast('Passwords do not match', 'error');
            return;
        }
        handleRegister($('#register-name').value, $('#register-email').value, pwd);
    });

    // ─── Data Helpers ───
    function monthExpenses() {
        return expenses.filter((e) => {
            const d = new Date(e.date + 'T00:00:00');
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });
    }

    function filteredExpenses() {
        const cat = filterSelect.value;
        const query = $('#search-tx') ? $('#search-tx').value.toLowerCase().trim() : '';
        return monthExpenses().filter((e) => {
            const matchesCat = cat === 'all' || e.category === cat;
            const matchesSearch = e.description.toLowerCase().includes(query);
            return matchesCat && matchesSearch;
        });
    }

    function categoryTotals(list) {
        const t = {};
        list.forEach((e) => { t[e.category] = (t[e.category] || 0) + e.amount; });
        return Object.entries(t).sort((a, b) => b[1] - a[1]);
    }

    // ─── Navigation ───
    function switchPage(name) {
        activePage = name;
        Object.values(pages).forEach((p) => p.classList.remove('active'));
        pages[name].classList.add('active');
        navItems.forEach((n) => {
            n.classList.toggle('active', n.dataset.page === name);
        });
        
        // Hide bottom navigation bar on auth page
        const bottomNav = $('#bottom-nav');
        if (bottomNav) {
            bottomNav.style.display = (name === 'auth') ? 'none' : 'flex';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Render active page
        renderActivePage();
    }

    // ─── Month Navigation ───
    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderAll();
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderAll();
    }

    // ─── Render: HOME ───
    function renderHome() {
        const me = monthExpenses();
        const total = me.reduce((s, e) => s + e.amount, 0);
        const days = daysInMonth(currentMonth, currentYear);

        homeTotal.textContent = money(total);
        homeTxCount.textContent = `${me.length} transaction${me.length !== 1 ? 's' : ''}`;
        homeDailyAvg.textContent = `${money(me.length > 0 ? total / days : 0)}/day`;
        homeMonthLabel.textContent = monthName(currentMonth, currentYear);

        // Recent transactions (last 5)
        const sorted = [...me].sort((a, b) => {
            const dd = new Date(b.date) - new Date(a.date);
            return dd !== 0 ? dd : (b.id > a.id ? 1 : -1);
        });
        const recent = sorted.slice(0, 5);

        if (recent.length === 0) {
            recentList.innerHTML = `<div class="empty-state-mini"><span class="empty-emoji">💳</span><p>No expenses yet this month</p></div>`;
        } else {
            recentList.innerHTML = recent.map((e, i) => txItemHTML(e, i)).join('');
        }

        // Top categories (max 4)
        const cats = categoryTotals(me).slice(0, 4);
        if (cats.length === 0) {
            topCatsRow.innerHTML = `<div class="empty-state-mini"><span class="empty-emoji">📊</span><p>Add expenses to see categories</p></div>`;
        } else {
            topCatsRow.innerHTML = cats.map(([cat, amt], i) => {
                const c = CATEGORIES[cat] || CATEGORIES.other;
                const catKey = `cat_${cat}`;
                const localizedLabel = (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][catKey])
                    ? TRANSLATIONS[currentLanguage][catKey]
                    : c.label;
                return `<div class="top-cat-chip" style="animation-delay:${i * 0.06}s">
                    <span class="top-cat-emoji">${c.emoji}</span>
                    <span class="top-cat-name">${localizedLabel}</span>
                    <span class="top-cat-amount">${moneyShort(amt)}</span>
                </div>`;
            }).join('');
        }
    }

    // ─── Render: SUMMARY ───
    let lineChartAnimation = null;

    function drawLineChart() {
        const lineCanvas = $('#line-chart');
        const chartEmpty = $('#line-chart-empty');
        const container = $('#line-chart-container');
        if (!lineCanvas) return;

        const me = monthExpenses();

        if (me.length === 0) {
            container.style.display = 'none';
            chartEmpty.classList.add('visible');
            return;
        }

        container.style.display = 'block';
        chartEmpty.classList.remove('visible');

        const days = daysInMonth(currentMonth, currentYear);
        const dailySpending = Array(days).fill(0);

        me.forEach(e => {
            const ed = new Date(e.date + 'T00:00:00');
            const d = ed.getDate();
            if (d >= 1 && d <= days) {
                dailySpending[d - 1] += e.amount;
            }
        });

        const dpr = window.devicePixelRatio || 1;
        const containerWidth = container.clientWidth || 440;
        const height = 180;

        lineCanvas.width = containerWidth * dpr;
        lineCanvas.height = height * dpr;
        lineCanvas.style.width = containerWidth + 'px';
        lineCanvas.style.height = height + 'px';

        const ctx = lineCanvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const paddingLeft = 38;
        const paddingRight = 15;
        const paddingTop = 20;
        const paddingBottom = 25;
        const chartWidth = containerWidth - paddingLeft - paddingRight;
        const chartHeight = height - paddingTop - paddingBottom;

        const maxSpent = Math.max(...dailySpending, 10);

        ctx.clearRect(0, 0, containerWidth, height);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.fillStyle = '#8888aa';
        ctx.font = '9px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        const gridValues = [0, maxSpent / 2, maxSpent];
        gridValues.forEach(val => {
            const y = paddingTop + chartHeight - (val / maxSpent) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(paddingLeft, y);
            ctx.lineTo(containerWidth - paddingRight, y);
            ctx.stroke();
            ctx.fillText(moneyShort(val), paddingLeft - 6, y);
        });

        // Draw X labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const xDays = [1, 5, 10, 15, 20, 25, days];
        xDays.forEach(day => {
            const x = paddingLeft + ((day - 1) / (days - 1)) * chartWidth;
            ctx.fillText(day, x, height - paddingBottom + 8);
        });

        const points = dailySpending.map((val, idx) => {
            const x = paddingLeft + (idx / (days - 1)) * chartWidth;
            const y = paddingTop + chartHeight - (val / maxSpent) * chartHeight;
            return { x, y, val };
        });

        if (lineChartAnimation) cancelAnimationFrame(lineChartAnimation);

        const duration = 850;
        const startTime = performance.now();

        function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const t = 1 - Math.pow(1 - progress, 3);

            ctx.clearRect(paddingLeft, 0, chartWidth + paddingRight, height - paddingBottom + 2);

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            gridValues.forEach(val => {
                const y = paddingTop + chartHeight - (val / maxSpent) * chartHeight;
                ctx.beginPath();
                ctx.moveTo(paddingLeft, y);
                ctx.lineTo(containerWidth - paddingRight, y);
                ctx.stroke();
            });

            ctx.beginPath();
            ctx.moveTo(points[0].x, paddingTop + chartHeight);

            const endIdx = Math.floor(t * (points.length - 1));
            const subProgress = (t * (points.length - 1)) - endIdx;

            for (let i = 0; i <= endIdx; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }

            if (endIdx < points.length - 1) {
                const nextP = points[endIdx + 1];
                const currP = points[endIdx];
                const interpX = currP.x + (nextP.x - currP.x) * subProgress;
                const interpY = currP.y + (nextP.y - currP.y) * subProgress;
                ctx.lineTo(interpX, interpY);
                ctx.lineTo(interpX, paddingTop + chartHeight);
            } else {
                ctx.lineTo(points[points.length - 1].x, paddingTop + chartHeight);
            }
            ctx.closePath();

            const areaGrad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + chartHeight);
            areaGrad.addColorStop(0, 'rgba(108, 92, 231, 0.25)');
            areaGrad.addColorStop(1, 'rgba(108, 92, 231, 0)');
            ctx.fillStyle = areaGrad;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i <= endIdx; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            if (endIdx < points.length - 1) {
                const nextP = points[endIdx + 1];
                const currP = points[endIdx];
                const interpX = currP.x + (nextP.x - currP.x) * subProgress;
                const interpY = currP.y + (nextP.y - currP.y) * subProgress;
                ctx.lineTo(interpX, interpY);
            }

            ctx.strokeStyle = '#a29bfe';
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            if (progress >= 1) {
                const maxVal = Math.max(...dailySpending);
                if (maxVal > 0) {
                    const maxIdx = dailySpending.indexOf(maxVal);
                    const maxPoint = points[maxIdx];

                    ctx.beginPath();
                    ctx.arc(maxPoint.x, maxPoint.y, 6, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(253, 121, 168, 0.4)';
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(maxPoint.x, maxPoint.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = '#fd79a8';
                    ctx.fill();
                }
            }

            if (progress < 1) {
                lineChartAnimation = requestAnimationFrame(animate);
            }
        }

        lineChartAnimation = requestAnimationFrame(animate);
    }

    function renderSummary() {
        const me = monthExpenses();
        const total = me.reduce((s, e) => s + e.amount, 0);
        const days = daysInMonth(currentMonth, currentYear);

        summaryTotal.textContent = moneyShort(total);
        summaryCount.textContent = me.length;
        summaryAvg.textContent = moneyShort(me.length > 0 ? total / days : 0);
        summaryMonthLabel.textContent = monthName(currentMonth, currentYear);
        donutCenterValue.textContent = moneyShort(total);

        const cats = categoryTotals(me);

        // Donut chart
        if (cats.length === 0) {
            donutContainer.style.display = 'none';
            donutLegend.style.display = 'none';
            chartEmpty.classList.add('visible');
        } else {
            donutContainer.style.display = 'block';
            donutLegend.style.display = 'flex';
            chartEmpty.classList.remove('visible');
            drawDonut(cats, total);
            renderLegend(cats, total);
        }

        // Draw Line Chart
        drawLineChart();

        // Breakdown bars (with budgets)
        if (cats.length === 0) {
            breakdownList.innerHTML = `<div class="empty-state-mini"><span class="empty-emoji">📋</span><p>No breakdown data</p></div>`;
        } else {
            const budgets = loadBudgets();
            breakdownList.innerHTML = cats.map(([cat, amt], i) => {
                const c = CATEGORIES[cat] || CATEGORIES.other;
                const budget = budgets[cat] ? parseFloat(budgets[cat]) : 0;
                
                let rightText = '';
                let barClass = `bar-${cat}`;
                let pctSpent = 0;
                let barWidth = 0;
                
                if (budget > 0) {
                    pctSpent = (amt / budget) * 100;
                    barWidth = Math.min(pctSpent, 100);
                    
                    rightText = `<span class="bd-amount">${money(amt)} of ${money(budget)} spent</span>`;
                    
                    if (pctSpent < 70) {
                         barClass = 'budget-green';
                    } else if (pctSpent <= 90) {
                         barClass = 'budget-orange';
                    } else {
                         barClass = 'budget-red budget-pulse';
                    }
                } else {
                    const total = me.reduce((s, e) => s + e.amount, 0);
                    pctSpent = total > 0 ? (amt / total) * 100 : 0;
                    barWidth = pctSpent;
                    rightText = `<span class="bd-amount">${money(amt)}</span><span class="bd-pct">${pctSpent.toFixed(1)}%</span>`;
                }

                const catKey = `cat_${cat}`;
                const localizedLabel = (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][catKey])
                    ? TRANSLATIONS[currentLanguage][catKey]
                    : c.label;
                return `<div class="bd-item" style="animation-delay:${i * 0.05}s">
                    <div class="bd-header">
                        <span class="bd-left"><span class="bd-emoji">${c.emoji}</span> ${localizedLabel}</span>
                        <span class="bd-right">${rightText}</span>
                    </div>
                    <div class="bd-track"><div class="bd-fill ${barClass}" style="width:0%" data-width="${barWidth}%"></div></div>
                </div>`;
            }).join('');
            
            // Animate bars
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const fills = breakdownList.querySelectorAll('.bd-fill');
                    fills.forEach(fill => {
                        fill.style.width = fill.dataset.width;
                    });
                }, 60);
            });
        }

        // All transactions list
        renderAllTx();
    }

    function renderAllTx() {
        const filtered = filteredExpenses();
        const sorted = [...filtered].sort((a, b) => {
            const dd = new Date(b.date) - new Date(a.date);
            return dd !== 0 ? dd : (b.id > a.id ? 1 : -1);
        });
        if (sorted.length === 0) {
            allTxList.innerHTML = `<div class="empty-state-mini"><span class="empty-emoji">💳</span><p>No transactions</p></div>`;
        } else {
            allTxList.innerHTML = sorted.map((e, i) => txItemHTML(e, i)).join('');
        }
    }

    // ─── Transaction Item HTML ───
    function txItemHTML(e, i) {
        const c = CATEGORIES[e.category] || CATEGORIES.other;
        const catKey = `cat_${e.category}`;
        const localizedLabel = (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][catKey])
            ? TRANSLATIONS[currentLanguage][catKey]
            : c.label;
        return `<div class="tx-item" style="animation-delay:${i * 0.04}s">
            <div class="tx-emoji">${c.emoji}</div>
            <div class="tx-info">
                <div class="tx-desc">${escapeHtml(e.description)}</div>
                <div class="tx-meta">
                    <span class="tx-cat">${localizedLabel}</span>
                    <span class="tx-dot"></span>
                    <span class="tx-date-label">${fmtDate(e.date)}</span>
                </div>
            </div>
            <span class="tx-amount">-${money(e.amount)}</span>
            <button class="tx-del" data-id="${e.id}" aria-label="Delete" title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        </div>`;
    }

    // ─── Donut Pie Chart (Canvas) ───
    let donutAnimation = null;

    function drawDonut(cats, total) {
        const dpr = window.devicePixelRatio || 1;
        const size = 220;
        donutCanvas.width = size * dpr;
        donutCanvas.height = size * dpr;
        donutCanvas.style.width = size + 'px';
        donutCanvas.style.height = size + 'px';
        donutCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cx = size / 2;
        const cy = size / 2;
        const outerR = 100;
        const innerR = 62;
        const gap = 0.03; // gap in radians between segments

        // Cancel any running animation
        if (donutAnimation) cancelAnimationFrame(donutAnimation);

        // Animate donut
        const duration = 800;
        const start = performance.now();

        function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const t = 1 - Math.pow(1 - progress, 3);

            donutCtx.clearRect(0, 0, size, size);

            // Draw background ring
            donutCtx.beginPath();
            donutCtx.arc(cx, cy, outerR, 0, Math.PI * 2);
            donutCtx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
            donutCtx.fillStyle = 'rgba(255,255,255,0.03)';
            donutCtx.fill();

            let startAngle = -Math.PI / 2;
            const totalAngle = Math.PI * 2 * t;

            cats.forEach(([cat, amt]) => {
                const sliceAngle = (amt / total) * totalAngle;
                if (sliceAngle <= 0) return;

                const endAngle = startAngle + sliceAngle - gap;
                const c = CATEGORIES[cat] || CATEGORIES.other;

                // Draw segment
                donutCtx.beginPath();
                donutCtx.arc(cx, cy, outerR, startAngle, endAngle);
                donutCtx.arc(cx, cy, innerR, endAngle, startAngle, true);
                donutCtx.closePath();

                // Gradient fill
                const midAngle = startAngle + sliceAngle / 2;
                const gx1 = cx + Math.cos(midAngle) * innerR;
                const gy1 = cy + Math.sin(midAngle) * innerR;
                const gx2 = cx + Math.cos(midAngle) * outerR;
                const gy2 = cy + Math.sin(midAngle) * outerR;
                const grad = donutCtx.createLinearGradient(gx1, gy1, gx2, gy2);
                grad.addColorStop(0, c.color);
                grad.addColorStop(1, adjustBrightness(c.color, -25));
                donutCtx.fillStyle = grad;
                donutCtx.fill();

                // Subtle inner shadow
                donutCtx.shadowColor = 'rgba(0,0,0,0.2)';
                donutCtx.shadowBlur = 4;
                donutCtx.shadowOffsetX = 0;
                donutCtx.shadowOffsetY = 2;
                donutCtx.fill();
                donutCtx.shadowColor = 'transparent';
                donutCtx.shadowBlur = 0;

                startAngle += sliceAngle;
            });

            if (progress < 1) {
                donutAnimation = requestAnimationFrame(animate);
            }
        }

        donutAnimation = requestAnimationFrame(animate);
    }

    function adjustBrightness(hex, amt) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        r = Math.max(0, Math.min(255, r + amt));
        g = Math.max(0, Math.min(255, g + amt));
        b = Math.max(0, Math.min(255, b + amt));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    function renderLegend(cats, total) {
        donutLegend.innerHTML = cats.map(([cat, amt]) => {
            const c = CATEGORIES[cat] || CATEGORIES.other;
            const pct = ((amt / total) * 100).toFixed(0);
            const catKey = `cat_${cat}`;
            const localizedLabel = (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][catKey])
                ? TRANSLATIONS[currentLanguage][catKey]
                : c.label;
            return `<div class="legend-item">
                <span class="legend-dot" style="background:${c.color}"></span>
                <span>${localizedLabel} ${pct}%</span>
            </div>`;
        }).join('');
    }

    // ─── Render Active Page ───
    function renderActivePage() {
        if (activePage === 'home') renderHome();
        else if (activePage === 'summary') renderSummary();
    }

    function renderAll() {
        updateMonthLabels();
        renderActivePage();
    }

    function updateMonthLabels() {
        homeMonthLabel.textContent = monthName(currentMonth, currentYear);
        summaryMonthLabel.textContent = monthName(currentMonth, currentYear);
    }

    // ═══════════════════════════════════
    //  EVENT LISTENERS
    // ═══════════════════════════════════

    // Navigation
    navItems.forEach((btn) => {
        btn.addEventListener('click', () => switchPage(btn.dataset.page));
    });

    // Quick add button
    quickAddBtn.addEventListener('click', () => switchPage('add'));

    // See all button → go to summary
    seeAllBtn.addEventListener('click', () => switchPage('summary'));

    // Month navigation (home)
    $('#home-prev-month').addEventListener('click', prevMonth);
    $('#home-next-month').addEventListener('click', nextMonth);

    // Month navigation (summary)
    $('#summary-prev-month').addEventListener('click', prevMonth);
    $('#summary-next-month').addEventListener('click', nextMonth);

    // Category selection
    catBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            catBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCategory = btn.dataset.category;
            catHidden.value = selectedCategory;
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;
        const desc = descInput.value.trim();
        const cat = catHidden.value;

        if (!amount || amount <= 0) { showToast('Enter a valid amount', 'error'); amountInput.focus(); return; }
        if (!date) { showToast('Select a date', 'error'); dateInput.focus(); return; }
        if (!desc) { showToast('Enter a description', 'error'); descInput.focus(); return; }
        if (!cat) { showToast('Pick a category', 'error'); return; }

        expenses.push({ id: uid(), amount, date, description: desc, category: cat, createdAt: new Date().toISOString() });
        save();

        // Switch view to the expense's month
        const ed = new Date(date + 'T00:00:00');
        currentMonth = ed.getMonth();
        currentYear = ed.getFullYear();

        // Success animation
        submitBtn.classList.add('success');
        submitBtn.querySelector('.btn-text').textContent = '✓ Added!';
        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.querySelector('.btn-text').textContent = 'Add Expense';
        }, 1400);

        showToast(`Added ${money(amount)} for "${desc}"`, 'success');

        // Reset form
        form.reset();
        catBtns.forEach((b) => b.classList.remove('active'));
        selectedCategory = null;
        catHidden.value = '';
        dateInput.value = new Date().toISOString().split('T')[0];

        renderAll();
    });

    // Delete buttons (delegation on both lists)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.tx-del');
        if (!btn) return;
        deleteTargetId = btn.dataset.id;
        const exp = expenses.find((x) => x.id === deleteTargetId);
        if (exp) deleteModalText.textContent = `Delete "${exp.description}" (${money(exp.amount)})?`;
        deleteModal.classList.add('active');
    });

    modalCancelBtn.addEventListener('click', () => {
        deleteModal.classList.remove('active');
        deleteTargetId = null;
    });

    modalDeleteBtn.addEventListener('click', () => {
        if (deleteTargetId) {
            expenses = expenses.filter((x) => x.id !== deleteTargetId);
            save();
            renderAll();
            showToast('Expense deleted', 'info');
        }
        deleteModal.classList.remove('active');
        deleteTargetId = null;
    });

    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) { deleteModal.classList.remove('active'); deleteTargetId = null; }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && deleteModal.classList.contains('active')) {
            deleteModal.classList.remove('active'); deleteTargetId = null;
        }
    });

    // Filter change
    filterSelect.addEventListener('change', renderAllTx);

    // Search input real-time filtering
    const searchInput = $('#search-tx');
    if (searchInput) {
        searchInput.addEventListener('input', renderAllTx);
    }

    // CSV export listener
    const csvExportBtn = $('#csv-export-btn');
    if (csvExportBtn) {
        csvExportBtn.addEventListener('click', () => {
            const filtered = filteredExpenses();
            if (filtered.length === 0) {
                showToast('No transactions to export', 'error');
                return;
            }
            
            let csv = 'Date,Description,Category,Amount\n';
            filtered.forEach(e => {
                const c = CATEGORIES[e.category] || CATEGORIES.other;
                let desc = e.description.replace(/"/g, '""');
                if (desc.includes(',') || desc.includes('\n') || desc.includes('"')) {
                    desc = `"${desc}"`;
                }
                csv += `${e.date},${desc},${c.label},${e.amount}\n`;
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const dateStr = monthName(currentMonth, currentYear).replace(/\s+/g, '_');
            link.setAttribute('href', url);
            link.setAttribute('download', `SpendWise_Expenses_${dateStr}.csv`);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast('CSV file downloaded successfully!');
        });
    }

    // Backup Functions
    function exportBackup() {
        const backup = {
            version: '1.0',
            expenses: expenses,
            budgets: loadBudgets(),
            currency: currentCurrency
        };
        
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `SpendWise_Backup_${new Date().toISOString().split('T')[0]}.json`);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('JSON backup exported successfully!');
    }

    function importBackup(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data && Array.isArray(data.expenses)) {
                    expenses = data.expenses;
                    save();
                    
                    if (data.budgets) {
                        saveBudgets(data.budgets);
                    }
                    
                    if (data.currency) {
                        currentCurrency = data.currency;
                        localStorage.setItem('spendwise_currency', currentCurrency);
                    }
                    
                    updateCurrencyUI();
                    renderAll();
                    showToast('Backup restored successfully!', 'success');
                    settingsModal.classList.remove('active');
                } else {
                    showToast('Invalid backup file structure', 'error');
                }
            } catch (err) {
                showToast('Failed to parse JSON backup', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Settings Modal Listeners
    const settingsBtn = $('#settings-btn');
    const budgetSettingsBtn = $('#budget-settings-btn');
    const settingsModal = $('#settings-modal');
    const settingsCloseBtn = $('#settings-close-btn');
    const settingsCancelBtn = $('#settings-cancel-btn');
    const settingsSaveBtn = $('#settings-save-btn');
    const budgetInputsGrid = $('#budget-inputs-grid');

    function openSettings() {
        $$('.currency-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.currency === currentCurrency);
        });
        
        // Show/hide profile section in Settings based on currentUser
        const profileSection = $('#settings-profile-section');
        const previewEl = $('#settings-avatar-preview');
        const removeBtn = $('#btn-remove-avatar');
        
        if (profileSection) {
            profileSection.style.display = currentUser ? 'block' : 'none';
        }
        
        if (previewEl && currentUser) {
            let users = [];
            try { users = JSON.parse(localStorage.getItem('spendwise_users')) || []; } catch(e){}
            const userRecord = users.find(u => u.email === currentUser.email) || currentUser;
            
            if (userRecord && userRecord.avatar) {
                previewEl.textContent = '';
                previewEl.style.backgroundImage = `url(${userRecord.avatar})`;
                previewEl.style.backgroundSize = 'cover';
                previewEl.style.backgroundPosition = 'center';
                if (removeBtn) removeBtn.style.display = 'block';
            } else {
                previewEl.textContent = currentUser.name.substring(0, 2).toUpperCase();
                previewEl.style.backgroundImage = '';
                if (removeBtn) removeBtn.style.display = 'none';
            }
            
            const profileNameInput = $('#settings-profile-name');
            if (profileNameInput) {
                profileNameInput.value = currentUser.name;
            }
            
            const profileLangSelect = $('#settings-profile-lang');
            if (profileLangSelect) {
                profileLangSelect.value = currentLanguage;
            }
        }
        
        const budgets = loadBudgets();
        budgetInputsGrid.innerHTML = Object.entries(CATEGORIES).map(([key, cat]) => {
            const val = budgets[key] || '';
            return `
                <div class="budget-input-item">
                    <label class="budget-input-label">
                        <span>${cat.emoji}</span>
                        <span>${cat.label}</span>
                    </label>
                    <div class="budget-field-wrap">
                        <span class="budget-symbol-prefix">${currentCurrency}</span>
                        <input type="number" class="budget-num-input" data-category="${key}" placeholder="0.00" min="0" step="1" value="${val}">
                    </div>
                </div>
            `;
        }).join('');
        
        settingsModal.classList.add('active');
    }

    function closeSettings() {
        settingsModal.classList.remove('active');
    }

    if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
    if (budgetSettingsBtn) budgetSettingsBtn.addEventListener('click', openSettings);
    if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', closeSettings);
    if (settingsCancelBtn) settingsCancelBtn.addEventListener('click', closeSettings);

    if (settingsSaveBtn) {
        settingsSaveBtn.addEventListener('click', () => {
            // Save Profile Name changes
            const profileNameInput = $('#settings-profile-name');
            if (profileNameInput && currentUser) {
                const newName = profileNameInput.value.trim();
                if (newName && newName !== currentUser.name) {
                    currentUser.name = newName;
                    localStorage.setItem('spendwise_current_user', JSON.stringify(currentUser));
                    
                    // Save to user database in localStorage
                    let users = [];
                    try { users = JSON.parse(localStorage.getItem('spendwise_users')) || []; } catch(e){}
                    const idx = users.findIndex(u => u.email === currentUser.email);
                    if (idx !== -1) {
                        users[idx].name = newName;
                        localStorage.setItem('spendwise_users', JSON.stringify(users));
                    }
                    updateProfileUI();
                }
            }

            // Save Profile Language changes
            const profileLangSelect = $('#settings-profile-lang');
            if (profileLangSelect && currentUser) {
                const newLang = profileLangSelect.value;
                if (newLang && newLang !== currentLanguage) {
                    currentLanguage = newLang;
                    currentUser.language = newLang;
                    localStorage.setItem('spendwise_current_user', JSON.stringify(currentUser));
                    localStorage.setItem('spendwise_language', newLang);
                    
                    // Save to user database in localStorage
                    let users = [];
                    try { users = JSON.parse(localStorage.getItem('spendwise_users')) || []; } catch(e){}
                    const idx = users.findIndex(u => u.email === currentUser.email);
                    if (idx !== -1) {
                        users[idx].language = newLang;
                        localStorage.setItem('spendwise_users', JSON.stringify(users));
                    }
                    applyTranslations(newLang);
                }
            }

            const budgets = {};
            $$('.budget-num-input').forEach(input => {
                const cat = input.dataset.category;
                const val = parseFloat(input.value);
                if (!isNaN(val) && val > 0) {
                    budgets[cat] = val;
                }
            });
            saveBudgets(budgets);
            closeSettings();
            renderAll();
            showToast('Settings saved successfully!');
        });
    }

    // Currency Switcher
    $$('.currency-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCurrency = btn.dataset.currency;
            localStorage.setItem('spendwise_currency', currentCurrency);
            
            $$('.currency-btn').forEach(b => b.classList.toggle('active', b === btn));
            
            $$('.budget-symbol-prefix').forEach(el => {
                el.textContent = currentCurrency;
            });
            
            updateCurrencyUI();
            renderAll();
            showToast(`Currency changed to ${currentCurrency}`);
        });
    });

    // Backup handlers
    const btnExportBackup = $('#btn-export-backup');
    const btnImportBackupTrigger = $('#btn-import-backup-trigger');
    const backupFileInput = $('#backup-file-input');

    if (btnExportBackup) btnExportBackup.addEventListener('click', exportBackup);
    if (btnImportBackupTrigger) btnImportBackupTrigger.addEventListener('click', () => backupFileInput.click());
    if (backupFileInput) {
        backupFileInput.addEventListener('change', () => {
            if (backupFileInput.files.length > 0) {
                importBackup(backupFileInput.files[0]);
            }
        });
    }

    // Avatar upload handlers
    const btnUploadAvatar = $('#btn-upload-avatar');
    const btnRemoveAvatar = $('#btn-remove-avatar');
    const avatarFileInput = $('#avatar-file-input');

    if (btnUploadAvatar) {
        btnUploadAvatar.addEventListener('click', () => avatarFileInput.click());
    }

    if (avatarFileInput) {
        avatarFileInput.addEventListener('change', () => {
            const file = avatarFileInput.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Data = e.target.result;
                    
                    // Save to user record in localStorage
                    let users = [];
                    try { users = JSON.parse(localStorage.getItem('spendwise_users')) || []; } catch(err){}
                    const userIdx = users.findIndex(u => u.email === currentUser.email);
                    if (userIdx !== -1) {
                        users[userIdx].avatar = base64Data;
                        localStorage.setItem('spendwise_users', JSON.stringify(users));
                    }
                    
                    // Update preview and display
                    updateProfileUI();
                    
                    const previewEl = $('#settings-avatar-preview');
                    if (previewEl) {
                        previewEl.textContent = '';
                        previewEl.style.backgroundImage = `url(${base64Data})`;
                        previewEl.style.backgroundSize = 'cover';
                        previewEl.style.backgroundPosition = 'center';
                    }
                    if (btnRemoveAvatar) btnRemoveAvatar.style.display = 'block';
                    showToast('Profile picture updated successfully!');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnRemoveAvatar) {
        btnRemoveAvatar.addEventListener('click', () => {
            let users = [];
            try { users = JSON.parse(localStorage.getItem('spendwise_users')) || []; } catch(err){}
            const userIdx = users.findIndex(u => u.email === currentUser.email);
            if (userIdx !== -1) {
                delete users[userIdx].avatar;
                localStorage.setItem('spendwise_users', JSON.stringify(users));
            }
            
            // Reset input
            if (avatarFileInput) avatarFileInput.value = '';
            
            // Update preview and display
            updateProfileUI();
            
            const previewEl = $('#settings-avatar-preview');
            if (previewEl) {
                previewEl.textContent = currentUser.name.substring(0, 2).toUpperCase();
                previewEl.style.backgroundImage = '';
            }
            btnRemoveAvatar.style.display = 'none';
            showToast('Profile picture removed');
        });
    }

    // ═══════════════════════════════════
    //  SCAN / OCR MODULE
    // ═══════════════════════════════════
    let ocrExtracted = { amount: null, description: null, date: null, category: null, currency: null, rawText: '' };
    let scanImageFile = null;
    let ocrLanguage = 'eng';

    // Scan toggle (expand/collapse)
    scanToggleBtn.addEventListener('click', () => {
        scanSection.classList.toggle('open');
    });

    // Language pills
    langPills.forEach((pill) => {
        pill.addEventListener('click', () => {
            langPills.forEach((p) => p.classList.remove('active'));
            pill.classList.add('active');
            ocrLanguage = pill.dataset.lang;
        });
    });

    // Open file picker
    scanGalleryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        receiptInput.removeAttribute('capture');
        receiptInput.click();
    });

    scanCameraBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        receiptInput.setAttribute('capture', 'environment');
        receiptInput.click();
    });

    scanDropzone.addEventListener('click', () => {
        receiptInput.removeAttribute('capture');
        receiptInput.click();
    });

    // Drag & Drop
    scanDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        scanDropzone.classList.add('dragover');
    });
    scanDropzone.addEventListener('dragleave', () => {
        scanDropzone.classList.remove('dragover');
    });
    scanDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        scanDropzone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) handleScanFile(file);
    });

    // File input change
    receiptInput.addEventListener('change', () => {
        if (receiptInput.files.length > 0) {
            handleScanFile(receiptInput.files[0]);
        }
    });

    // Remove image
    scanRemoveBtn.addEventListener('click', resetScan);
    scanRetryBtn.addEventListener('click', resetScan);

    // Raw text toggle
    scanRawToggleBtn.addEventListener('click', () => {
        const visible = scanRawText.style.display !== 'none';
        scanRawText.style.display = visible ? 'none' : 'block';
        scanRawToggleBtn.innerHTML = visible
            ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Show Raw Text'
            : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Hide Raw Text';
    });

    // Use extracted data → auto-fill the form below
    scanUseBtn.addEventListener('click', () => {
        if (ocrExtracted.amount) amountInput.value = ocrExtracted.amount;
        if (ocrExtracted.description) descInput.value = ocrExtracted.description;
        if (ocrExtracted.date) dateInput.value = ocrExtracted.date;
        if (ocrExtracted.category) {
            catBtns.forEach((b) => {
                b.classList.toggle('active', b.dataset.category === ocrExtracted.category);
            });
            selectedCategory = ocrExtracted.category;
            catHidden.value = ocrExtracted.category;
        }

        // Auto-switch currency symbol based on scanned slip's detected currency
        if (ocrExtracted.currency === 'KHR' && currentCurrency !== '៛') {
            currentCurrency = '៛';
            localStorage.setItem('spendwise_currency', '៛');
            updateCurrencyUI();
            renderAll();
            showToast('Currency switched to ៛ (KHR) automatically!', 'info');
        } else if (ocrExtracted.currency === 'THB' && currentCurrency !== '฿') {
            currentCurrency = '฿';
            localStorage.setItem('spendwise_currency', '฿');
            updateCurrencyUI();
            renderAll();
            showToast('Currency switched to ฿ (THB) automatically!', 'info');
        } else if (ocrExtracted.currency === 'USD' && currentCurrency !== '$') {
            currentCurrency = '$';
            localStorage.setItem('spendwise_currency', '$');
            updateCurrencyUI();
            renderAll();
            showToast('Currency switched to $ (USD) automatically!', 'info');
        }
        
        // Also update currency buttons active state in Settings Modal
        $$('.currency-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.currency === currentCurrency);
        });

        // Collapse scan section & scroll to form
        scanSection.classList.remove('open');
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast('Receipt data filled in! Review and submit.', 'success');
    });

    function resetScan() {
        scanImageFile = null;
        receiptInput.value = '';
        scanUploadArea.style.display = 'block';
        scanPreview.style.display = 'none';
        scanProgress.style.display = 'none';
        scanResults.style.display = 'none';
        scanRawText.style.display = 'none';
        scanProgressFill.style.width = '0%';
        ocrExtracted = { amount: null, description: null, date: null, category: null, currency: null, rawText: '' };
    }

    function handleScanFile(file) {
        scanImageFile = file;

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            scanPreviewImg.src = e.target.result;
            scanUploadArea.style.display = 'none';
            scanPreview.style.display = 'block';
            scanResults.style.display = 'none';
            scanRawText.style.display = 'none';

            // Start OCR
            runOCR(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // ─── Dynamic Tesseract.js loader ───
    let tesseractLoaded = false;

    function loadTesseract() {
        return new Promise((resolve, reject) => {
            if (tesseractLoaded && window.Tesseract) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
            script.onload = () => {
                tesseractLoaded = true;
                resolve();
            };
            script.onerror = () => reject(new Error('Failed to load Tesseract.js. Check your internet connection.'));
            document.head.appendChild(script);
        });
    }

    async function runOCR(imageData) {
        scanProgress.style.display = 'block';
        scanProgressFill.style.width = '0%';
        scanProgressLabel.textContent = 'Loading OCR engine...';
        scanProgressPct.textContent = '0%';

        try {
            // Load Tesseract.js dynamically
            await loadTesseract();

            // Set OCR language dynamically based on active app language preference
            let ocrLanguage = 'eng';
            if (currentLanguage === 'km') {
                ocrLanguage = 'khm+eng';
            } else if (currentLanguage === 'th') {
                ocrLanguage = 'tha+eng';
            }

            const langNames = { 'eng': 'English', 'khm+eng': 'Khmer + English', 'tha+eng': 'Thai + English' };
            scanProgressLabel.textContent = `Loading ${langNames[ocrLanguage] || 'OCR'} engine...`;

            const worker = await Tesseract.createWorker(ocrLanguage, 1, {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        const pct = Math.round(m.progress * 100);
                        scanProgressFill.style.width = pct + '%';
                        scanProgressPct.textContent = pct + '%';
                        scanProgressLabel.textContent = 'Reading receipt...';
                    } else if (m.status === 'loading language traineddata') {
                        scanProgressLabel.textContent = 'Loading language data...';
                        const pct = Math.round(m.progress * 30);
                        scanProgressFill.style.width = pct + '%';
                        scanProgressPct.textContent = pct + '%';
                    } else if (m.status === 'initializing api') {
                        scanProgressLabel.textContent = 'Initializing...';
                    }
                },
            });

            const { data } = await worker.recognize(imageData);
            await worker.terminate();

            const rawText = data.text || '';
            ocrExtracted.rawText = rawText;

            // Parse the receipt
            parseReceipt(rawText);

            // Show results
            scanProgress.style.display = 'none';
            displayResults();

        } catch (err) {
            console.error('OCR Error:', err);
            scanProgress.style.display = 'none';
            showToast(err.message || 'OCR failed. Try a clearer image.', 'error');
        }
    }

    // Convert Khmer digits to Standard Western digits
    function convertKhmerNumerals(text) {
        const khmerMap = {
            '០': '0', '១': '1', '២': '2', '៣': '3', '៤': '4',
            '៥': '5', '៦': '6', '៧': '7', '៨': '8', '៩': '9'
        };
        return text.replace(/[០-៩]/g, (char) => khmerMap[char]);
    }

    // ─── Receipt Parser ───
    function parseReceipt(text) {
        // Normalize Khmer numerals first
        const normalizedText = convertKhmerNumerals(text);
        const lines = normalizedText.split('\n').map((l) => l.trim()).filter(Boolean);

        // 1. Extract AMOUNT
        ocrExtracted.amount = extractAmount(lines, normalizedText);

        // 2. Extract DATE
        ocrExtracted.date = extractDate(lines, normalizedText);

        // 3. Extract DESCRIPTION
        ocrExtracted.description = extractDescription(lines, normalizedText);

        // 4. Guess CATEGORY
        ocrExtracted.category = guessCategory(normalizedText);
    }

    function extractAmount(lines, fullText) {
        const isKhmerRegion = (currentLanguage === 'km' || currentCurrency === '៛');
        const isThaiRegion = (currentLanguage === 'th' || currentCurrency === '฿');

        // 1. Prioritized Regional Match
        if (isKhmerRegion) {
            const khrMatch = fullText.match(/(?:^|\s|\-|–)([\d,]+)\s*(?:KHR|khr|៛|រៀល)/i);
            if (khrMatch) {
                const val = parseFloat(khrMatch[1].replace(/,/g, ''));
                if (val > 0) {
                    ocrExtracted.currency = 'KHR';
                    return val;
                }
            }
        } else if (isThaiRegion) {
            const thbMatch = fullText.match(/(?:^|\s|\-|–|฿)([\d,]+(?:\.\d{2})?)\s*(?:THB|thb|baht|Baht|บาท)/i);
            if (thbMatch) {
                const val = parseFloat(thbMatch[1].replace(/,/g, ''));
                if (val > 0) {
                    ocrExtracted.currency = 'THB';
                    return val;
                }
            }
        }

        // 2. Secondary Regional Match (in case it parsed a slip from another region)
        if (!isKhmerRegion) {
            const khrMatch = fullText.match(/(?:^|\s|\-|–)([\d,]+)\s*(?:KHR|khr|៛|រៀល)/i);
            if (khrMatch) {
                const val = parseFloat(khrMatch[1].replace(/,/g, ''));
                if (val > 0) {
                    ocrExtracted.currency = 'KHR';
                    return val;
                }
            }
        }
        if (!isThaiRegion) {
            const thbMatch = fullText.match(/(?:^|\s|\-|–|฿)([\d,]+(?:\.\d{2})?)\s*(?:THB|thb|baht|Baht|บาท)/i);
            if (thbMatch) {
                const val = parseFloat(thbMatch[1].replace(/,/g, ''));
                if (val > 0) {
                    ocrExtracted.currency = 'THB';
                    return val;
                }
            }
        }

        // 3. Dollar/Generic total keywords
        const totalPatterns = [
            /(?:grand\s*total|total\s*(?:due|amount|paid|charges)?)[:\s]*\$?([\d,]+\.\d{2})/i,
            /(?:amount\s*(?:due|paid|total)?)[:\s]*\$?([\d,]+\.\d{2})/i,
            /(?:balance\s*(?:due)?)[:\s]*\$?([\d,]+\.\d{2})/i,
        ];

        for (const pattern of totalPatterns) {
            for (const line of lines) {
                const match = line.match(pattern);
                if (match) {
                    ocrExtracted.currency = 'USD';
                    return parseFloat(match[1].replace(/,/g, ''));
                }
            }
        }

        // 4. Find all dollar amounts and pick the largest
        const amountRegex = /\$\s*([\d,]+\.\d{2})/g;
        const amounts = [];
        let m;
        while ((m = amountRegex.exec(fullText)) !== null) {
            amounts.push(parseFloat(m[1].replace(/,/g, '')));
        }

        // 5. Try amounts without $ sign but with decimal
        const bareAmountRegex = /(?:^|\s)([\d,]+\.\d{2})(?:\s|$)/gm;
        while ((m = bareAmountRegex.exec(fullText)) !== null) {
            const val = parseFloat(m[1].replace(/,/g, ''));
            if (val > 0.5 && val < 100000) amounts.push(val);
        }

        if (amounts.length > 0) {
            ocrExtracted.currency = 'USD';
            return Math.max(...amounts);
        }

        // 6. Fallback to largest isolated number >= 100
        const integerRegex = /(?:^|\s)([\d,]+)(?:\s|$)/gm;
        const ints = [];
        while ((m = integerRegex.exec(fullText)) !== null) {
            const val = parseFloat(m[1].replace(/,/g, ''));
            if (val >= 100 && val < 1000000) ints.push(val);
        }
        if (ints.length > 0) {
            return Math.max(...ints);
        }

        return null;
    }

    function extractDate(lines, fullText) {
        // Khmer month names translation
        const khmerMonths = {
            'មករា': '01', 'កុម្ភៈ': '02', 'មីនា': '03', 'មេសា': '04',
            'ឧសភា': '05', 'មិថុនា': '06', 'កក្កដា': '07', 'សីហា': '08',
            'កញ្ញា': '09', 'តុលា': '10', 'វិច្ឆិកា': '11', 'ធ្នូ': '12'
        };

        for (const [kMonth, mm] of Object.entries(khmerMonths)) {
            const regex = new RegExp(`(\\d{1,2})\\s*(?:ខែ)?\\s*${kMonth}\\s*(?:ឆ្នាំ)?\\s*(\\d{4})`, 'i');
            const match = fullText.match(regex);
            if (match) {
                const dd = match[1].padStart(2, '0');
                const yyyy = match[2];
                return `${yyyy}-${mm}-${dd}`;
            }
        }

        // Thai month names translation
        const thaiMonths = {
            'มกราคม': '01', 'ม.ค.': '01',
            'กุมภาพันธ์': '02', 'ก.พ.': '02',
            'มีนาคม': '03', 'มี.ค.': '03',
            'เมษายน': '04', 'เม.ย.': '04',
            'พฤษภาคม': '05', 'พ.ค.': '05',
            'มิถุนายน': '06', 'มิ.ย.': '06',
            'กรกฎาคม': '07', 'ก.ค.': '07',
            'สิงหาคม': '08', 'ส.ค.': '08',
            'กันยายน': '09', 'ก.ย.': '09',
            'ตุลาคม': '10', 'ต.ค.': '10',
            'พฤศจิกายน': '11', 'พ.ย.': '11',
            'ธันวาคม': '12', 'ธ.ค.': '12'
        };

        for (const [tMonth, mm] of Object.entries(thaiMonths)) {
            const regex = new RegExp(`(\\d{1,2})\\s*${tMonth.replace(/\./g, '\\.')}\\s*(?:พ\\.ศ\\.)?\\s*(\\d{4})`, 'i');
            const match = fullText.match(regex);
            if (match) {
                const dd = match[1].padStart(2, '0');
                let yyyy = parseInt(match[2]);
                if (yyyy > 2400) yyyy -= 543; // Convert Buddhist Era (BE) to AD
                return `${yyyy}-${mm}-${dd}`;
            }
        }

        const datePatterns = [
            /(\d{4})-(\d{2})-(\d{2})/, // ISO
            /(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/, // MM/DD/YYYY
            /(\d{1,2})[\/-](\d{1,2})[\/-](\d{2})(?!\d)/, // MM/DD/YY
            /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})/i,
            /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?,?\s+(\d{4})/i,
        ];

        for (const line of lines) {
            const isoMatch = line.match(/(\d{4})-(\d{2})-(\d{2})/);
            if (isoMatch) {
                return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
            }

            const mdyMatch = line.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/);
            if (mdyMatch) {
                const mm = mdyMatch[1].padStart(2, '0');
                const dd = mdyMatch[2].padStart(2, '0');
                return `${mdyMatch[3]}-${mm}-${dd}`;
            }

            const mdyShort = line.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{2})(?!\d)/);
            if (mdyShort) {
                const mm = mdyShort[1].padStart(2, '0');
                const dd = mdyShort[2].padStart(2, '0');
                const yy = parseInt(mdyShort[3]);
                const yyyy = yy > 50 ? 1900 + yy : 2000 + yy;
                return `${yyyy}-${mm}-${dd}`;
            }

            const months = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
            const monthMatch = line.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})/i);
            if (monthMatch) {
                const mm = months[monthMatch[1].toLowerCase().slice(0, 3)];
                const dd = monthMatch[2].padStart(2, '0');
                return `${monthMatch[3]}-${mm}-${dd}`;
            }

            const dayMonthMatch = line.match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?,?\s+(\d{4})/i);
            if (dayMonthMatch) {
                const dd = dayMonthMatch[1].padStart(2, '0');
                const mm = months[dayMonthMatch[2].toLowerCase().slice(0, 3)];
                return `${dayMonthMatch[3]}-${mm}-${dd}`;
            }
        }

        return new Date().toISOString().split('T')[0];
    }

    function extractDescription(lines, fullText) {
        // Check if a line contains money tags (Riel / Baht / Dollars) - the name is usually on the next line
        for (let i = 0; i < Math.min(lines.length, 8); i++) {
            const line = lines[i];
            if (/(?:KHR|៛|THB|฿|USD|រៀល|บาท)/i.test(line) && i + 1 < lines.length) {
                const nextLine = lines[i + 1].trim();
                if (nextLine.length >= 3 && !/^[\d\s\/\-\.\(\)\+]+$/.test(nextLine)) {
                    if (!/transaction|date|time|លេខកូដ|ថ្ងៃធ្វើ|ទូទាត់/i.test(nextLine)) {
                        let cleaned = nextLine.replace(/[^a-zA-Z0-9\s\&'\-]/g, '').trim();
                        if (cleaned.length >= 3) {
                            return cleaned.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
                        }
                    }
                }
            }
        }

        // Scan specific label markers
        const descriptionPatterns = [
            /(?:to|paid\s*to|transfer\s*to|recipient|beneficiary|ទៅកាន់|គណនីទទួល)[:\s]+([a-zA-Z\s]+)/i,
        ];
        for (const pattern of descriptionPatterns) {
            const match = fullText.match(pattern);
            if (match && match[1].trim().length >= 3) {
                return match[1].trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            }
        }

        for (let i = 0; i < Math.min(lines.length, 6); i++) {
            const line = lines[i];
            if (/^[\d\s\/\-\.\(\)\+]+$/.test(line)) continue;
            if (/^(tel|phone|fax|www|http|រួចរាល់)/i.test(line)) continue;
            if (line.length < 3) continue;
            if (/\b(street|st\.|avenue|ave\.|road|rd\.|blvd|suite|floor)\b/i.test(line)) continue;

            let name = line.replace(/[^a-zA-Z0-9\s\&'\-]/g, '').trim();
            if (name.length >= 3 && name.length <= 60) {
                return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            }
        }

        return 'Receipt Purchase';
    }

    function guessCategory(text) {
        const t = text.toLowerCase();
        const categoryKeywords = {
            food: ['restaurant', 'cafe', 'coffee', 'pizza', 'burger', 'sushi', 'food', 'eat', 'dine', 'dining', 'kitchen', 'bakery', 'grill', 'bar', 'pub', 'taco', 'noodle', 'rice', 'chicken', 'starbucks', 'mcdonald', 'subway', 'kfc', 'breakfast', 'lunch', 'dinner', 'meal', 'drink', 'beverage'],
            transport: ['gas', 'fuel', 'petrol', 'uber', 'lyft', 'taxi', 'parking', 'transit', 'bus', 'train', 'airline', 'flight', 'toll', 'auto', 'car wash', 'oil change', 'mechanic', 'grab', 'gojek'],
            shopping: ['mall', 'store', 'shop', 'mart', 'market', 'retail', 'outlet', 'amazon', 'walmart', 'target', 'costco', 'clothes', 'fashion', 'shoe', 'apparel', 'electronics', 'ikea', 'home depot'],
            entertainment: ['cinema', 'movie', 'theatre', 'theater', 'concert', 'netflix', 'spotify', 'game', 'gaming', 'amusement', 'park', 'ticket', 'museum', 'show', 'entertainment'],
            bills: ['electric', 'water', 'internet', 'phone', 'mobile', 'utility', 'bill', 'insurance', 'rent', 'mortgage', 'subscription', 'monthly', 'payment', 'cable', 'wifi'],
            health: ['pharmacy', 'hospital', 'clinic', 'doctor', 'dentist', 'medicine', 'drug', 'health', 'medical', 'lab', 'prescription', 'vitamin', 'supplement', 'cvs', 'walgreens'],
            education: ['book', 'school', 'university', 'college', 'course', 'tuition', 'tutorial', 'class', 'education', 'training', 'seminar', 'library', 'textbook'],
        };

        let bestCat = 'other';
        let bestScore = 0;

        for (const [cat, keywords] of Object.entries(categoryKeywords)) {
            let score = 0;
            for (const kw of keywords) {
                if (t.includes(kw)) score++;
            }
            if (score > bestScore) {
                bestScore = score;
                bestCat = cat;
            }
        }

        return bestCat;
    }

    function displayResults() {
        scanResults.style.display = 'block';

        const items = [];

        items.push({
            label: '💰 Amount',
            value: ocrExtracted.amount ? money(ocrExtracted.amount) : 'Not detected',
            highlight: !!ocrExtracted.amount,
        });

        items.push({
            label: '📝 Description',
            value: ocrExtracted.description || 'Not detected',
        });

        items.push({
            label: '📅 Date',
            value: ocrExtracted.date ? fmtDate(ocrExtracted.date) : 'Not detected',
        });

        const catInfo = CATEGORIES[ocrExtracted.category] || CATEGORIES.other;
        items.push({
            label: '📂 Category',
            value: `${catInfo.emoji} ${catInfo.label}`,
        });

        scanResultItems.innerHTML = items.map((item) => `
            <div class="scan-result-row">
                <span class="scan-result-label">${item.label}</span>
                <span class="scan-result-value${item.highlight ? ' amount-highlight' : ''}">${escapeHtml(item.value)}</span>
            </div>
        `).join('');

        // Raw text
        scanRawContent.textContent = ocrExtracted.rawText || '(No text extracted)';

        showToast('Receipt scanned successfully!', 'success');
    }

    // ═══════════════════════════════════
    //  INIT
    // ═══════════════════════════════════
    function init() {
        loadAuth();
        load();
        setGreeting();
        dateInput.value = new Date().toISOString().split('T')[0];
        updateMonthLabels();
        updateCurrencyUI();
        
        // Direct to Auth page if no active user session, otherwise home page
        if (!currentUser) {
            switchPage('auth');
        } else {
            switchPage('home');
        }
    }

    init();
})();

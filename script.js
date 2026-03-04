// Global language state
window.currentLang = localStorage.getItem('selectedLang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isLoginPage = currentPath === 'login.html';
    const hasToken = localStorage.getItem('token');
    const isGuest = localStorage.getItem('guestMode') === 'true';

    // If not on login page, not logged in, and not exploring as guest, redirect to login
    if (!isLoginPage && !hasToken && !isGuest) {
        window.location.href = 'login.html';
        return; // Stop execution of the rest of the script
    }

    const mobileMenuBtn = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // --- UI Authentication State ---
    function updateAuthUI() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const loginLink = document.querySelector('a[href="login.html"]');

        if (token && user) {
            if (loginLink) {
                loginLink.innerHTML = `<i class="fas fa-sign-out-alt"></i> <span data-i18n="logout">Logout</span> (${user.username})`;
                loginLink.href = '#';
                loginLink.id = 'logout-btn';
                loginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    logout();
                });
            }
        }
    }

    window.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Logged out successfully');
        window.location.href = 'index.html';
    };

    updateAuthUI();

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Add active class to current nav item
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    const translations = {
        'en': {
            'home': 'Home',
            'login': 'Login',
            'settings': 'Settings',
            'help': 'Help',
            'welcome': 'Welcome to EduPlay',
            'math_title': 'Construction and Design, Mathematics',
            'math_desc': 'Develops basic mathematical skills like counting, shapes, and construction principles.',
            'science_title': 'Role-play Games and Dramatization',
            'science_desc': 'Explores social roles and storytelling through imaginative play.',
            'geo_title': 'Language and Speech',
            'geo_desc': 'Focuses on vocabulary, correct pronunciation, and verbal expression.',
            'lit_title': 'Science and Nature',
            'lit_desc': 'Introduction to the natural world, animals, and basic scientific concepts.',
            'logic_title': 'Art',
            'logic_desc': 'Encourages creativity, artistic expression, and fine motor skills.',
            'Game': 'Game',
            'video_Game_desc': 'Explore the fundamentals in this interactive Game. Perfect for preschool learning and development.',
            'login_header': 'Login',
            'email_label': 'Email',
            'password_label': 'Password',
            'signin_btn': 'Sign In',
            'register_header': 'Register',
            'username_label': 'Username',
            'no_account': "Don't have an account?",
            'already_account': 'Already have an account?',
            'signup_link': 'Sign Up',
            'login_link': 'Login',
            'signup_btn': 'Sign Up',
            'logout': 'Logout',
            'video_lessons': 'Video Lessons',
            'settings_header': 'Settings',
            'help_header': 'Help Center',
            'under_construction': 'This page is under construction.',
            'back_home': 'Back to Home',
            'help_about_title': 'What can this site do?',
            'help_about_p1': 'This website is designed to support preschool educational institutions and organize children\'s education more effectively through modern information technologies.',
            'help_about_p2': 'The platform collects various developmental, educational, and fun games for children, serving to increase their knowledge level, logical thinking, and activity. It also allows monitoring children\'s participation and task completion.',
            'help_about_p3': 'This website serves as a convenient and effective tool for educators to control and analyze the educational process, and for parents to monitor their children\'s development.',
            'help_contact_title': 'Contact',
            'help_tech_title': 'Technical Issues',
            'help_tech_desc': 'For bugs and errors',
            'help_game_title': 'Regarding Video Games',
            'help_game_desc': 'Suggestions and game functions',
            'help_footer_text': 'All requests will be reviewed as quickly as possible to resolve issues and further improve the website\'s operation.',
            'videos': 'Saved Videos',
            'videos_header': 'Your Video Library',
            'add_video_title': 'Add New Video',
            'video_file_label': 'Select Video File',
            'video_title_label': 'Video Title',
            'save_video_btn': 'Save Video',
            'save_to_library': 'Save to Library',
            'theme_title': 'Theme',
            'theme_desc': 'Switch between dark and light mode',
            'text_size_title': 'Text Size',
            'text_size_desc': 'Adjust the size of text on the screen',
            'reset_settings_btn': 'Reset to Default',
            'bg_tint_title': 'Background Tint',
            'bg_tint_desc': 'Change the color overlay of the background',
            'sidebar_color_title': 'Sidebar Color',
            'sidebar_color_desc': 'Customize the sidebar background color',
            'age_select_title': 'Select Your Age',
            'age_3_4': '3-4 years old',
            'age_5_6': '5-6 years old',
            'age_label': 'Age:',
            'start_page': 'Welcome',
            'get_certificate': 'Get Certificate',
            'poems': 'Poems',
            'games': 'Games',
            'cert_req_title': 'Requirements to obtain a certificate:',
            'cert_req_desc': 'To obtain a certificate, 50 test questions must be solved. Once all 50 test questions are fully completed, the certificate will be automatically generated and presented.',
            'start_test_btn': 'Start Test',
            'test_title': 'Assessment Test',
            'question': 'Question',
            'next_btn': 'Next',
            'finish_btn': 'Finish',
            'score': 'Score',
            'test_complete': 'Test Complete!',
            'correct_answers': 'Correct Answers',
            'total_questions': 'Total Questions',
            'result_message_excellent': 'Excellent! You earn a certificate!',
            'result_message_good': 'Good job! Keep practicing.',
            'result_message_retry': 'Try again to improve your score.',
            'get_cert_btn': 'Get Certificate',
            'later_btn': 'Later',
            'poem1_title': `Mother's Eyes`,
            'poem1_subtitle': `A touching poem`,
            'poem1_body': `These deep eyes looking at you<br>Are not mine, friends...<br><br>I was born blind into the world,<br>They called me poor, said it was my fate.<br>I didn't know what the moon or stars were,<br>Or what nights and days were.<br><br>Early spring, my father brought<br>A doctor from Tashkent, I was so happy.<br>He was a professor, looked at my eyes,<br>Listened to my sad, sorrowful words.<br><br>He said he'd cure me, but only if someone<br>Gave their own eyes, though it's terrifying.<br>Then my father gathered my friends,<br>They said giving eyes is scary,<br>My relatives didn't gift their eyes either.<br><br>One day I sat in silence,<br>A loud cry was heard from the house.<br>I jumped up, someone sat me down,<br>5 days after the operation,<br>When the Russian doctor gave permission,<br>And sharply took the bandage off my eyes,<br>I saw the world for the first time.<br><br>Oh, moon and stars! Then I brought the horse home,<br>Oh, this life is forbidden for a worthless servant like me.<br>My mother's eyes were blind,<br>The poor thing groaned, her pain was great.<br>She felt my face and sharply<br>Kissed my new eyes once.<br><br>These deep eyes looking at you<br>Are not mine, friends... They are my mother's!`,
            'poem2_title': `Uzbekistan, My Motherland`,
            'poem2_subtitle': `Abdulla Oripov`,
            'poem2_body': `My land, I wrote a poem for you today,<br>I could never find a comparison for you.<br>There are poets who called their whole country<br>The only one in the world.<br><br>Their poems flew very far,<br>On the wings of silver lands,<br>There is a land in the world, however<br>All of it is an unwritten poem:<br>Only my weak pen,<br>Uzbekistan, my motherland.<br><br>I would never walk searching for paradise,<br>I wouldn't suffer if I couldn't find it.<br>I wouldn't sit telling fairy tales,<br>I wouldn't sharpen my pen calling it wine.<br><br>Taking joy from your spring,<br>Master Olimjon became famous,<br>The pride that Gafur Gulam felt<br>Could be made into a poem for the world.<br>Distant history is my step,<br>Uzbekistan, my motherland.<br><br>Your past is truly very long,<br>My eyes cannot catch all of it.<br>I would not praise the past, however<br>I think of your past for a moment.<br><br>Enquiring the wide Asia,<br>A proud, conquering person emerged,<br>For two and a half centuries<br>The Great Conqueror shook the world.<br>I will say, today, he is mine, mine.<br>Uzbekistan, my motherland.`,
            'liked_question': `Did you like it?`,
            'liked_answer': `Liked!`,
            'poem_alpha_a_title': `A harfi uchun she'r`,
            'poem_alpha_a_subtitle': `Alifbo she'rlari`,
            'poem_alpha_a_body': `Ahil asalarilar<br>Azonlab tushar ishga<br>Atrof dala, bogʻlardan<br>Asal yigʻishar qishga<br>Ayiq boʻlsa, meshqorin<br>Asallarni yer, borin.<br>Arilar xafa gʻoyat,<br>Axir' bormi adolat?!`,
            'poem_alpha_b_title': `B harfi uchun she'r`,
            'poem_alpha_b_subtitle': `Alifbo she'rlari`,
            'poem_alpha_b_body': `Baliq boyvuchcha, desam,<br>Bekor gap, dema hecham.<br>Boq oʻzing, ana oʻrtoq,<br>Badani xoʻp yaltiroq.<br>Boshdan-oyoq tanga u,<br>Bas, boyvuchcha yanga u.`,
            'poem_alpha_d_title': `D harfi uchun she'r`,
            'poem_alpha_d_subtitle': `Alifbo she'rlari`,
            'poem_alpha_d_body': `Delfin mohir dengizchi,<br>Dono, aqlli biram<br>Dengizda choʻksa birov<br>Darrov beradi yordam.`,
            'poem_alpha_e_title': `E harfi uchun she'r`,
            'poem_alpha_e_subtitle': `Alifbo she'rlari`,
            'poem_alpha_e_body': `Etikdoʻz Echki eski<br>Etiklarni rostladi.<br>Eplab, qolipga tortib,<br>Eshakvoyga mosladi.`,
            'poem_alpha_f_title': `F harfi uchun she'r`,
            'poem_alpha_f_subtitle': `Alifbo she'rlari`,
            'poem_alpha_f_body': `Farrosh Fill xola, qarang,<br>Tozalabdi har yoqni.<br>Topmaysiz hech yerda chang,<br>Artib kiring oyoqni.<br>Fayzli, fusunkor boʻlib,<br>Yashnab turar hamma yoq.<br>Farroshlar mehnatini<br>Qadrlang siz ey oʻrtoq!`,
            'poem_alpha_g_title': `G harfi uchun she'r`,
            'poem_alpha_g_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_body': `Gimnastikachi--<br>Gavdali, durkun<br>Gardani yoʻgʻon<br>Gorilla maymun.<br>Gap yoʻq mashqiga,<br>Bajarar chaqqon,<br>Olqishlar olib,<br>Hammaga yoqqan.`,
            'poem_alpha_h_title': `H harfi uchun she'r`,
            'poem_alpha_h_subtitle': `Alifbo she'rlari`,
            'poem_alpha_h_body': `Hakka harbiy xizmatda,<br>Himoyachi zoʻr posbon!<br>Havodan oʻtmas pashsha,<br>Hatlolmas yerdan sichqon.`,
            'poem_alpha_i_title': `I harfi uchun she'r`,
            'poem_alpha_i_subtitle': `Alifbo she'rlari`,
            'poem_alpha_i_body': `It ishonchli izquvar,<br>Ishini yaxshi bilar.<br>Ishkal qilsa kim-birov,<br>Izini olib darrov,<br>Izlab-izlab topadi,<br>Irillaydi qopadi!`,
            'poem_alpha_j_title': `J harfi uchun she'r`,
            'poem_alpha_j_subtitle': `Alifbo she'rlari`,
            'poem_alpha_j_body': `Jarroh Jayra<br>Ja zoʻr-da.<br>Kasallarga<br>Gʻamxoʻrda<br>Sekin tiqar ninasin.<br>Ishonmagan sinasin.`,
            'poem_alpha_k_title': `K harfi uchun she'r`,
            'poem_alpha_k_subtitle': `Alifbo she'rlari`,
            'poem_alpha_k_body': `Kalamushvoy kemirar,<br>Kundan-kunga semirar.<br>Boshqa kasb kori yoʻq,<br>Andishasi ori yo'q.`,
            'poem_alpha_l_title': `L harfi uchun she'r`,
            'poem_alpha_l_subtitle': `Alifbo she'rlari`,
            'poem_alpha_l_body': `Lofchi laylak lof urar,<br>Laqma, laqqa baqaga.<br>Soʻng cho'qib shartta yutar,<br>Dars bu bola-chaqaga.`,
            'poem_alpha_m_title': `M harfi uchun she'r`,
            'poem_alpha_m_subtitle': `Alifbo she'rlari`,
            'poem_alpha_m_body': `Maymun bilan Mosh mitti<br>Masxaraboz oʻyinchi.<br>Maydonda mashq qilmoqda,<br>Mana, siz ham koʻring-chi:<br>Maymunni mashinaday<br>Minib, haydamoqchi Mosh.<br>"Mashina"-chi, miq etmas,<br>Tormozda-da, na iloj...`,
            'poem_alpha_n_title': `N harfi uchun she'r`,
            'poem_alpha_n_subtitle': `Alifbo she'rlari`,
            'poem_alpha_n_body': `Ninachixon raqqosa<br>Nozik, navnihol rosa.<br>Nazar soling, naqadar<br>Nafis raqsga tushar.`,
            'poem_alpha_o_title': `O harfi uchun she'r`,
            'poem_alpha_o_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_body': `Ot kasbi -ishchi,<br>Omborchi, yukchi,<br>Ortib don-dunni,<br>Oppoq tuz, unni,<br>Olib yeladi, olib keladi.`,
            'poem_alpha_p_title': `P harfi uchun she'r`,
            'poem_alpha_p_subtitle': `Alifbo she'rlari`,
            'poem_alpha_p_body': `Pingvin xola pazanda,<br>Piyoz sabzi qozonda.<br>Peshin palov pishsin deb<br>Ish boshlagan azonda`,
            'poem_alpha_q_title': `Q harfi uchun she'r`,
            'poem_alpha_q_subtitle': `Alifbo she'rlari`,
            'poem_alpha_q_body': `Qaldirgʻochga qoyil-a,<br>Qarang, qanday quruvchi.<br>Quribdi loydan uya,<br>Qotiribdi, koʻring-chi.<br>Qiyin ishmi shuyam deb,<br>Qora qargʻa gap qotar.<br>Oʻzi qurgan in esa,<br>Shamolda qulab yotar.`,
            'poem_alpha_r_title': `R harfi uchun she'r`,
            'poem_alpha_r_subtitle': `Alifbo she'rlari`,
            'poem_alpha_r_body': `Rassom Buzoq<br>Rasm solar.<br>Quyon qoʻrqib<br>Razm solar.<br>Rasmlarning<br>zo'ri-da u,<br>Rosa katta<br>Boʻrida u!`,
            'poem_alpha_s_title': `S harfi uchun she'r`,
            'poem_alpha_s_subtitle': `Alifbo she'rlari`,
            'poem_alpha_s_body': `Sa'vaxon-suxandon,<br>Soʻzlari biyron-biyron.<br>Soling quloq, qanday soz,<br>Sehrli, sohir ovoz!`,
            'poem1_title': `Mother's Eyes`,
            'poem1_subtitle': `A touching poem`,
            'poem1_body': `These deep eyes looking at you<br>Are not mine, friends...<br><br>I was born blind into the world,<br>They called me poor, said it was my fate.<br>I didn't know what the moon or stars were,<br>Or what nights and days were.<br><br>Early spring, my father brought<br>A doctor from Tashkent, I was so happy.<br>He was a professor, looked at my eyes,<br>Listened to my sad, sorrowful words.<br><br>He said he'd cure me, but only if someone<br>Gave their own eyes, though it's terrifying.<br>Then my father gathered my friends,<br>They said giving eyes is scary,<br>My relatives didn't gift their eyes either.<br><br>One day I sat in silence,<br>A loud cry was heard from the house.<br>I jumped up, someone sat me down,<br>5 days after the operation,<br>When the Russian doctor gave permission,<br>And sharply took the bandage off my eyes,<br>I saw the world for the first time.<br><br>Oh, moon and stars! Then I brought the horse home,<br>Oh, this life is forbidden for a worthless servant like me.<br>My mother's eyes were blind,<br>The poor thing groaned, her pain was great.<br>She felt my face and sharply<br>Kissed my new eyes once.<br><br>These deep eyes looking at you<br>Are not mine, friends... They are my mother's!`,
            'poem2_title': `Uzbekistan, My Motherland`,
            'poem2_subtitle': `Abdulla Oripov`,
            'poem2_body': `My land, I wrote a poem for you today,<br>I could never find a comparison for you.<br>There are poets who called their whole country<br>The only one in the world.<br><br>Their poems flew very far,<br>On the wings of silver lands,<br>There is a land in the world, however<br>All of it is an unwritten poem:<br>Only my weak pen,<br>Uzbekistan, my motherland.<br><br>I would never walk searching for paradise,<br>I wouldn't suffer if I couldn't find it.<br>I wouldn't sit telling fairy tales,<br>I wouldn't sharpen my pen calling it wine.<br><br>Taking joy from your spring,<br>Master Olimjon became famous,<br>The pride that Gafur Gulam felt<br>Could be made into a poem for the world.<br>Distant history is my step,<br>Uzbekistan, my motherland.<br><br>Your past is truly very long,<br>My eyes cannot catch all of it.<br>I would not praise the past, however<br>I think of your past for a moment.<br><br>Enquiring the wide Asia,<br>A proud, conquering person emerged,<br>For two and a half centuries<br>The Great Conqueror shook the world.<br>I will say, today, he is mine, mine.<br>Uzbekistan, my motherland.`,
            'liked_question': `Did you like it?`,
            'liked_answer': `Liked!`,
            'poem_alpha_a_title': `A harfi uchun she'r`,
            'poem_alpha_a_subtitle': `Alifbo she'rlari`,
            'poem_alpha_a_body': `Ahil asalarilar<br>Azonlab tushar ishga<br>Atrof dala, bogʻlardan<br>Asal yigʻishar qishga<br>Ayiq boʻlsa, meshqorin<br>Asallarni yer, borin.<br>Arilar xafa gʻoyat,<br>Axir' bormi adolat?!`,
            'poem_alpha_b_title': `B harfi uchun she'r`,
            'poem_alpha_b_subtitle': `Alifbo she'rlari`,
            'poem_alpha_b_body': `Baliq boyvuchcha, desam,<br>Bekor gap, dema hecham.<br>Boq oʻzing, ana oʻrtoq,<br>Badani xoʻp yaltiroq.<br>Boshdan-oyoq tanga u,<br>Bas, boyvuchcha yanga u.`,
            'poem_alpha_d_title': `D harfi uchun she'r`,
            'poem_alpha_d_subtitle': `Alifbo she'rlari`,
            'poem_alpha_d_body': `Delfin mohir dengizchi,<br>Dono, aqlli biram<br>Dengizda choʻksa birov<br>Darrov beradi yordam.`,
            'poem_alpha_e_title': `E harfi uchun she'r`,
            'poem_alpha_e_subtitle': `Alifbo she'rlari`,
            'poem_alpha_e_body': `Etikdoʻz Echki eski<br>Etiklarni rostladi.<br>Eplab, qolipga tortib,<br>Eshakvoyga mosladi.`,
            'poem_alpha_f_title': `F harfi uchun she'r`,
            'poem_alpha_f_subtitle': `Alifbo she'rlari`,
            'poem_alpha_f_body': `Farrosh Fill xola, qarang,<br>Tozalabdi har yoqni.<br>Topmaysiz hech yerda chang,<br>Artib kiring oyoqni.<br>Fayzli, fusunkor boʻlib,<br>Yashnab turar hamma yoq.<br>Farroshlar mehnatini<br>Qadrlang siz ey oʻrtoq!`,
            'poem_alpha_g_title': `G harfi uchun she'r`,
            'poem_alpha_g_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_body': `Gimnastikachi--<br>Gavdali, durkun<br>Gardani yoʻgʻon<br>Gorilla maymun.<br>Gap yoʻq mashqiga,<br>Bajarar chaqqon,<br>Olqishlar olib,<br>Hammaga yoqqan.`,
            'poem_alpha_h_title': `H harfi uchun she'r`,
            'poem_alpha_h_subtitle': `Alifbo she'rlari`,
            'poem_alpha_h_body': `Hakka harbiy xizmatda,<br>Himoyachi zoʻr posbon!<br>Havodan oʻtmas pashsha,<br>Hatlolmas yerdan sichqon.`,
            'poem_alpha_i_title': `I harfi uchun she'r`,
            'poem_alpha_i_subtitle': `Alifbo she'rlari`,
            'poem_alpha_i_body': `It ishonchli izquvar,<br>Ishini yaxshi bilar.<br>Ishkal qilsa kim-birov,<br>Izini olib darrov,<br>Izlab-izlab topadi,<br>Irillaydi qopadi!`,
            'poem_alpha_j_title': `J harfi uchun she'r`,
            'poem_alpha_j_subtitle': `Alifbo she'rlari`,
            'poem_alpha_j_body': `Jarroh Jayra<br>Ja zoʻr-da.<br>Kasallarga<br>Gʻamxoʻrda<br>Sekin tiqar ninasin.<br>Ishonmagan sinasin.`,
            'poem_alpha_k_title': `K harfi uchun she'r`,
            'poem_alpha_k_subtitle': `Alifbo she'rlari`,
            'poem_alpha_k_body': `Kalamushvoy kemirar,<br>Kundan-kunga semirar.<br>Boshqa kasb kori yoʻq,<br>Andishasi ori yo'q.`,
            'poem_alpha_l_title': `L harfi uchun she'r`,
            'poem_alpha_l_subtitle': `Alifbo she'rlari`,
            'poem_alpha_l_body': `Lofchi laylak lof urar,<br>Laqma, laqqa baqaga.<br>Soʻng cho'qib shartta yutar,<br>Dars bu bola-chaqaga.`,
            'poem_alpha_m_title': `M harfi uchun she'r`,
            'poem_alpha_m_subtitle': `Alifbo she'rlari`,
            'poem_alpha_m_body': `Maymun bilan Mosh mitti<br>Masxaraboz oʻyinchi.<br>Maydonda mashq qilmoqda,<br>Mana, siz ham koʻring-chi:<br>Maymunni mashinaday<br>Minib, haydamoqchi Mosh.<br>"Mashina"-chi, miq etmas,<br>Tormozda-da, na iloj...`,
            'poem_alpha_n_title': `N harfi uchun she'r`,
            'poem_alpha_n_subtitle': `Alifbo she'rlari`,
            'poem_alpha_n_body': `Ninachixon raqqosa<br>Nozik, navnihol rosa.<br>Nazar soling, naqadar<br>Nafis raqsga tushar.`,
            'poem_alpha_o_title': `O harfi uchun she'r`,
            'poem_alpha_o_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_body': `Ot kasbi -ishchi,<br>Omborchi, yukchi,<br>Ortib don-dunni,<br>Oppoq tuz, unni,<br>Olib yeladi, olib keladi.`,
            'poem_alpha_p_title': `P harfi uchun she'r`,
            'poem_alpha_p_subtitle': `Alifbo she'rlari`,
            'poem_alpha_p_body': `Pingvin xola pazanda,<br>Piyoz sabzi qozonda.<br>Peshin palov pishsin deb<br>Ish boshlagan azonda`,
            'poem_alpha_q_title': `Q harfi uchun she'r`,
            'poem_alpha_q_subtitle': `Alifbo she'rlari`,
            'poem_alpha_q_body': `Qaldirgʻochga qoyil-a,<br>Qarang, qanday quruvchi.<br>Quribdi loydan uya,<br>Qotiribdi, koʻring-chi.<br>Qiyin ishmi shuyam deb,<br>Qora qargʻa gap qotar.<br>Oʻzi qurgan in esa,<br>Shamolda qulab yotar.`,
            'poem_alpha_r_title': `R harfi uchun she'r`,
            'poem_alpha_r_subtitle': `Alifbo she'rlari`,
            'poem_alpha_r_body': `Rassom Buzoq<br>Rasm solar.<br>Quyon qoʻrqib<br>Razm solar.<br>Rasmlarning<br>zo'ri-da u,<br>Rosa katta<br>Boʻrida u!`,
            'poem_alpha_s_title': `S harfi uchun she'r`,
            'poem_alpha_s_subtitle': `Alifbo she'rlari`,
            'poem_alpha_s_body': `Sa'vaxon-suxandon,<br>Soʻzlari biyron-biyron.<br>Soling quloq, qanday soz,<br>Sehrli, sohir ovoz!`,
            'g1_v1_title': "Game 1: Fun Mathematics",
            'g1_v1_desc': "A fun journey into the world of math and logic puzzles.",
            'g1_v2_title': "Game 2: Learn Basic Shapes",
            'g1_v2_desc': "Identify circles, squares, triangles, and more.",
            'g1_v3_title': "Game 3: Learning Coins",
            'g1_v3_desc': "Basic introduction to coins and financial literacy.",
            'g1_v4_title': "Game 4: Subtraction for Kids",
            'g1_v4_desc': "Learn basic subtraction concepts with visual aids.",
            'g1_v5_title': "Game 5: Fractions Basics",
            'g1_v5_desc': "An introduction to halves and quarters for beginners.",
            'g1_v6_title': "Game 6: Counting to 100",
            'g1_v6_desc': "Practice counting all the way up to 100.",
            'g1_v7_title': "Game 7: Shapes in Real Life",
            'g1_v7_desc': "Finding shapes in everyday objects around us.",
            'g1_v8_title': "Game 8: Addition up to 20",
            'g1_v8_desc': "Practicing adding numbers up to 20.",
            'g1_v9_title': "Game 9: Left and Right",
            'g1_v9_desc': "Learn the difference between left and right directions.",
            'g1_v10_title': "Game 1: Simple Addition",
            'g1_v10_desc': "Learn how to add small numbers together easily.",
            'g1_v11_title': "Game 2: Big vs Small",
            'g1_v11_desc': "Understand concepts of size and basic measurements.",
            'g1_v12_title': "Game 3: Number Action Song",
            'g1_v12_desc': "Count, sing and dance to learn numbers fast.",
            'g1_v13_title': "Game 4: Telling Time",
            'g1_v13_desc': "Learn how to read a simple clock.",
            'g1_v14_title': "Game 5: Greater Than, Less Than",
            'g1_v14_desc': "Learn how to compare numbers using the alligator method.",
            'g1_v15_title': "Game 6: Counting by 10s",
            'g1_v15_desc': "Learn how to count by tens fast and easy.",
            'g2_v1_title': "Game 1: The ABC Song",
            'g2_v1_desc': "The classic alphabet song to learn the English alphabet.",
            'g2_v2_title': "Game 2: Alphabet Sounds",
            'g2_v2_desc': "Learn the phonics sounds of every letter.",
            'g2_v3_title': "Game 3: Colors Song",
            'g2_v3_desc': "Learn the vocabulary for different basic colors.",
            'g2_v4_title': "Game 4: Hygiene Vocabulary",
            'g2_v4_desc': "Learn words related to daily routines like brushing teeth.",
            'g2_v5_title': "Game 5: Weather Words",
            'g2_v5_desc': "How is the weather? Learn sunny, rainy, and more.",
            'g2_v6_title': "Game 6: Body Parts",
            'g2_v6_desc': "Head, shoulders, knees, and toes vocabulary song.",
            'g2_v7_title': "Game 7: Fruits Song",
            'g2_v7_desc': "Learn the names of delicious common fruits.",
            'g2_v8_title': "Game 8: Vehicles",
            'g2_v8_desc': "Learn vocabulary about buses, cars, and other transport.",
            'g2_v9_title': "Game 9: Family Members",
            'g2_v9_desc': "Learn words for family members like mother, father, brother.",
            'g2_v10_title': "Game 1: Days of the Week",
            'g2_v10_desc': "Learn all seven days of the week in English.",
            'g2_v11_title': "Game 2: Months of the Year",
            'g2_v11_desc': "Learn the twelve months of the calendar year.",
            'g2_v12_title': "Game 3: Animal Sounds",
            'g2_v12_desc': "Learn the names of common animals and their sounds.",
            'g2_v13_title': "Game 4: Opposites",
            'g2_v13_desc': "Learn basic opposite words like hot and cold.",
            'g2_v14_title': "Game 5: Clothes Vocabulary",
            'g2_v14_desc': "Learn the names of common clothing items.",
            'g2_v15_title': "Game 6: Food Vocabulary",
            'g2_v15_desc': "Learn the names of basic everyday foods.",
            'g3_v1_title': "Game 1: How Are You Feeling?",
            'g3_v1_desc': "Learn to express basic emotions and feelings.",
            'g3_v2_title': "Game 2: Magic Words",
            'g3_v2_desc': "Learn to use polite words like please and thank you.",
            'g3_v3_title': "Game 3: Sharing is Caring",
            'g3_v3_desc': "Learn the importance of sharing with friends.",
            'g3_v4_title': "Game 4: Making Friends",
            'g3_v4_desc': "How to introduce yourself and make new friends.",
            'g3_v5_title': "Game 5: Taking Turns",
            'g3_v5_desc': "Learn why it's important to take turns when playing.",
            'g3_v6_title': "Game 6: Saying Sorry",
            'g3_v6_desc': "Learn how and when to apologize to others.",
            'g3_v7_title': "Game 7: Helping Out",
            'g3_v7_desc': "The joy of helping parents and teachers.",
            'g3_v8_title': "Game 8: Personal Space",
            'g3_v8_desc': "Understanding boundaries and respecting personal space.",
            'g3_v9_title': "Game 9: Listening Skills",
            'g3_v9_desc': "How to be a good listener when others are talking.",
            'g3_v10_title': "Game 1: Being Honest",
            'g3_v10_desc': "The importance of telling the truth.",
            'g3_v11_title': "Game 2: Teamwork",
            'g3_v11_desc': "Working together to achieve a common goal.",
            'g3_v12_title': "Game 3: Dealing with Anger",
            'g3_v12_desc': "Healthy ways to cope with feeling mad or frustrated.",
            'g3_v13_title': "Game 4: Bedtime Routine",
            'g3_v13_desc': "Establishing good routines for bedtime.",
            'g3_v14_title': "Game 5: Asking for Help",
            'g3_v14_desc': "It's okay to ask for help when you need it.",
            'g3_v15_title': "Game 6: Being Brave",
            'g3_v15_desc': "How to handle handle feeling scared or trying new things.",
            'g4_v1_title': "Game 1: Creative Task 1",
            'g4_v1_desc': "Use your imagination and create new ideas.",
            'g4_v2_title': "Game 2: Creative Task 2",
            'g4_v2_desc': "New ways of drawing and being creative.",
            'g4_v3_title': "Game 3: Making Stories",
            'g4_v3_desc': "Use your imagination to invent fun stories.",
            'g4_v4_title': "Game 4: Drawing Animals",
            'g4_v4_desc': "Simple step-by-step drawing of common animals.",
            'g4_v5_title': "Game 5: Origami Basics",
            'g4_v5_desc': "Learn how to fold paper into wonderful shapes.",
            'g4_v6_title': "Game 6: Painting with Sponges",
            'g4_v6_desc': "A fun and messy creative art project for kids.",
            'g4_v7_title': "Game 7: Musical Instruments",
            'g4_v7_desc': "Discover the sounds of different musical instruments.",
            'g4_v8_title': "Game 1: Shadow Puppets",
            'g4_v8_desc': "How to make shadow puppets with your hands.",
            'g4_v9_title': "Game 2: Clay Modeling",
            'g4_v9_desc': "Basic shapes and creations using playdough or clay.",
            'g4_v10_title': "Game 3: Singing Along",
            'g4_v10_desc': "Warm up your voice and sing fun melodies.",
            'g4_v11_title': "Game 4: Dancing Fun",
            'g4_v11_desc': "Move your body and express yourself through dance.",
            'g4_v12_title': "Game 5: Building Blocks",
            'g4_v12_desc': "Creative block building and architecture for kids.",
            'g4_v13_title': "Game 6: Nature Art",
            'g4_v13_desc': "Creating art using leaves, twigs, and nature.",
            'g4_v14_title': "Game 7: Let's Pretend",
            'g4_v14_desc': "The magic of pretend play and acting.",
            'g4_v15_title': "Game 8: Finger Painting",
            'g4_v15_desc': "Expressing creativity through colorful finger painting.",
            'g5_v1_title': "Game 1: Logic Puzzle 1",
            'g5_v1_desc': "A fun task to develop logical thinking skills.",
            'g5_v2_title': "Game 2: Logic Puzzle 2",
            'g5_v2_desc': "A game to test your focus and logic.",
            'g5_v3_title': "Game 3: Kid Riddles",
            'g5_v3_desc': "Challenge your brain with simple logic riddles.",
            'g5_v4_title': "Game 4: Which one belongs?",
            'g5_v4_desc': "Find the grouping logic of different objects.",
            'g5_v5_title': "Game 5: Habitats Logic",
            'g5_v5_desc': "Where do animals belong? Logical categorization.",
            'g5_v6_title': "Game 6: Planets Order",
            'g5_v6_desc': "Learning sequence and order using the planets.",
            'g5_v7_title': "Game 7: Life Cycles",
            'g5_v7_desc': "Understanding cause, effect, and sequence in nature.",
            'g5_v8_title': "Game 1: Dinosaur Facts",
            'g5_v8_desc': "Categorizing dinosaurs by their characteristics.",
            'g5_v9_title': "Game 2: Sorting Objects",
            'g5_v9_desc': "Logic of sorting by color, shape, and size.",
            'g5_v10_title': "Game 3: Maze Puzzles",
            'g5_v10_desc': "Tracing paths and solving simple mazes.",
            'g5_v11_title': "Game 4: Spot the Difference",
            'g5_v11_desc': "Enhance visual logic by finding differences.",
            'g5_v12_title': "Game 5: Sequencing Events",
            'g5_v12_desc': "What happens first, next, and last?",
            'g5_v13_title': "Game 6: Size Ordering",
            'g5_v13_desc': "Logical ordering from smallest to largest.",
            'g5_v14_title': "Game 7: Shadow Matching",
            'g5_v14_desc': "Matching objects to their correct silhouettes.",
            'g5_v15_title': "Game 8: Part to Whole",
            'g5_v15_desc': "Understanding how pieces fit together to make a whole.",
        },
        'uz': {
            'home': 'Bosh sahifa',
            'login': 'Kirish',
            'settings': 'Sozlamalar',
            'help': 'Yordam',
            'welcome': 'EduPlay ga xush kelibsiz',
            'math_title': 'Qurilish va konstruksiyalash, Matematika',
            'math_desc': "Sanash, shakllar va qurilish tamoyillari kabi asosiy matematika ko'nikmalarini rivojlantiradi.",
            'science_title': 'Syujet roli oʻyinlar va sahnalashtirish',
            'science_desc': "Tasavvurdagi o'yinlar orqali ijtimoiy rollar va hikoya qilishni o'rganadi.",
            'geo_title': 'Til va nutq',
            'geo_desc': "So'z boyligi, to'g'ri talaffuz va nutqiy ifodani rivojlantiradi.",
            'lit_title': 'Fan va tabiat',
            'lit_desc': "Tabiat olami, hayvonlar va asosiy ilmiy tushunchalar bilan tanishish.",
            'logic_title': "San'at",
            'logic_desc': "Ijodkorlik, badiiy ifoda va nozik motorikani rag'batlantiradi.",
            'Game': 'O\'yin',
            'video_Game_desc': 'Ushbu interaktiv darsda asoslarni o\'rganing. Maktabgacha ta\'lim va rivojlanish uchun mukammal.',
            'login_header': 'Kirish',
            'email_label': 'Elektron pochta',
            'password_label': 'Parol',
            'signin_btn': 'Kirish',
            'register_header': "Ro'yxatdan o'tish",
            'username_label': 'Foydalanuvchi nomi',
            'no_account': "Hisobingiz yo'qmi?",
            'already_account': 'Hisobingiz bormi?',
            'signup_link': "Ro'yxatdan o'tish",
            'login_link': 'Kirish',
            'signup_btn': "Ro'yxatdan o'tish",
            'logout': 'Chiqish',
            'video_lessons': 'Video darslar',
            'settings_header': 'Sozlamalar',
            'help_header': 'Yordam Markazi',
            'under_construction': 'Bu sahifa tayyorlanmoqda.',
            'back_home': 'Bosh sahifaga qaytish',
            'help_about_title': 'Bu sayt nima qila oladi?',
            'help_about_p1': 'Ushbu veb-sayt maktabgacha bo‘lgan ta’lim muassasalari faoliyatini qo‘llab-quvvatlash hamda bolalar ta’lim-tarbiyasini zamonaviy axborot texnologiyalari orqali yanada samarali tashkil etish maqsadida ishlab chiqilgan.',
            'help_about_p2': 'Platformada bolalar uchun mo‘ljallangan turli xil rivojlantiruvchi, ta’limiy va qiziqarli o‘yinlar jamlangan bo‘lib, ular orqali bolalarning bilim darajasi, mantiqiy fikrlashi hamda faolligini oshirishga xizmat qiladi. Shuningdek, sayt orqali bolalarning o‘yin jarayonida ishtiroki va topshiriqlarni bajarish holatini kuzatish imkoniyati mavjud.',
            'help_about_p3': 'Mazkur veb-sayt pedagoglar va tarbiyachilar uchun ta’lim jarayonini nazorat qilish va tahlil etishda, ota-onalar uchun esa farzandlarining rivojlanish jarayonini kuzatishda qulay va samarali vosita hisoblanadi.',
            'help_contact_title': 'Bog\'lanish',
            'help_tech_title': 'Texnik masalalar',
            'help_tech_desc': 'Nosozliklar va xatoliklar bo‘yicha',
            'help_game_title': 'Video o‘yinlar bo\'yicha',
            'help_game_desc': 'Takliflar va o\'yin funksiyalari',
            'help_footer_text': 'Barcha murojaatlar imkon qadar tezkor tarzda ko‘rib chiqilib, muammolarni bartaraf etish hamda veb-sayt faoliyatini yanada takomillashtirish choralari ko‘riladi.',
            'videos': 'Saqlangan Videolar',
            'videos_header': 'Sizning Video Kutubxonangiz',
            'add_video_title': 'Yangi Video Qo\'shish',
            'video_file_label': 'Video Faylni Tanlang',
            'video_title_label': 'Video Nomi',
            'save_video_btn': 'Videoni Saqlash',
            'save_to_library': 'Kutubxonaga Saqlash',
            'theme_title': 'Mavzu',
            'theme_desc': 'Qorong\'i va yorug\' rejim o\'rtasida almashtirish',
            'text_size_title': 'Matn Hajmi',
            'text_size_desc': 'Ekrandagi matn hajmini sozlash',
            'reset_settings_btn': 'Oddiy holatga qaytarish',
            'bg_tint_title': 'Fon Rangi',
            'bg_tint_desc': 'Orqa fon rangini o\'zgartirish',
            'sidebar_color_title': 'Yon Panel Rangi',
            'sidebar_color_desc': 'Yon panel fon rangini o\'zgartirish',
            'age_select_title': 'Yoshingizni tanlang',
            'age_3_4': '3-4 yosh',
            'age_5_6': '5-6 yosh',
            'age_label': 'Yosh:',
            'start_page': 'Bosh sahifa',
            'get_certificate': 'Sertifikat olish',
            'poems': 'She\'rlar',
            'games': 'O\'yinlar',
            'cert_req_title': 'Siz sertifikatga ega bo‘lishingiz uchun quyidagi shartlar bajarilishi kerak:',
            'cert_req_desc': 'Sertifikatni olish uchun 50 ta test savolini yechish lozim. 50 ta test savollari to‘liq bajarilgandan so‘ng sertifikat avtomatik tarzda shakllantiriladi va taqdim etiladi.',
            'start_test_btn': 'Testni boshlash',
            'test_title': 'Baholash testi',
            'question': 'Savol',
            'next_btn': 'Keyingisi',
            'finish_btn': 'Yakunlash',
            'score': 'Natija',
            'test_complete': 'Test yakunlandi!',
            'correct_answers': 'To\'g\'ri javoblar',
            'total_questions': 'Jami savollar',
            'result_message_excellent': 'Ajoyib! Siz sertifikat oldingiz!',
            'result_message_good': 'Yaxshi! Yana mashq qiling.',
            'result_message_retry': 'Natijani yaxshilash uchun qaytadan urinib ko\'ring.',
            'get_cert_btn': 'Sertifikatni yuklab olish',
            'later_btn': 'Keyinroq',
            'poem1_title': `Mother's Eyes`,
            'poem1_subtitle': `A touching poem`,
            'poem1_body': `These deep eyes looking at you<br>Are not mine, friends...<br><br>I was born blind into the world,<br>They called me poor, said it was my fate.<br>I didn't know what the moon or stars were,<br>Or what nights and days were.<br><br>Early spring, my father brought<br>A doctor from Tashkent, I was so happy.<br>He was a professor, looked at my eyes,<br>Listened to my sad, sorrowful words.<br><br>He said he'd cure me, but only if someone<br>Gave their own eyes, though it's terrifying.<br>Then my father gathered my friends,<br>They said giving eyes is scary,<br>My relatives didn't gift their eyes either.<br><br>One day I sat in silence,<br>A loud cry was heard from the house.<br>I jumped up, someone sat me down,<br>5 days after the operation,<br>When the Russian doctor gave permission,<br>And sharply took the bandage off my eyes,<br>I saw the world for the first time.<br><br>Oh, moon and stars! Then I brought the horse home,<br>Oh, this life is forbidden for a worthless servant like me.<br>My mother's eyes were blind,<br>The poor thing groaned, her pain was great.<br>She felt my face and sharply<br>Kissed my new eyes once.<br><br>These deep eyes looking at you<br>Are not mine, friends... They are my mother's!`,
            'poem2_title': `Uzbekistan, My Motherland`,
            'poem2_subtitle': `Abdulla Oripov`,
            'poem2_body': `My land, I wrote a poem for you today,<br>I could never find a comparison for you.<br>There are poets who called their whole country<br>The only one in the world.<br><br>Their poems flew very far,<br>On the wings of silver lands,<br>There is a land in the world, however<br>All of it is an unwritten poem:<br>Only my weak pen,<br>Uzbekistan, my motherland.<br><br>I would never walk searching for paradise,<br>I wouldn't suffer if I couldn't find it.<br>I wouldn't sit telling fairy tales,<br>I wouldn't sharpen my pen calling it wine.<br><br>Taking joy from your spring,<br>Master Olimjon became famous,<br>The pride that Gafur Gulam felt<br>Could be made into a poem for the world.<br>Distant history is my step,<br>Uzbekistan, my motherland.<br><br>Your past is truly very long,<br>My eyes cannot catch all of it.<br>I would not praise the past, however<br>I think of your past for a moment.<br><br>Enquiring the wide Asia,<br>A proud, conquering person emerged,<br>For two and a half centuries<br>The Great Conqueror shook the world.<br>I will say, today, he is mine, mine.<br>Uzbekistan, my motherland.`,
            'liked_question': `Did you like it?`,
            'liked_answer': `Liked!`,
            'poem_alpha_a_title': `A harfi uchun she'r`,
            'poem_alpha_a_subtitle': `Alifbo she'rlari`,
            'poem_alpha_a_body': `Ahil asalarilar<br>Azonlab tushar ishga<br>Atrof dala, bogʻlardan<br>Asal yigʻishar qishga<br>Ayiq boʻlsa, meshqorin<br>Asallarni yer, borin.<br>Arilar xafa gʻoyat,<br>Axir' bormi adolat?!`,
            'poem_alpha_b_title': `B harfi uchun she'r`,
            'poem_alpha_b_subtitle': `Alifbo she'rlari`,
            'poem_alpha_b_body': `Baliq boyvuchcha, desam,<br>Bekor gap, dema hecham.<br>Boq oʻzing, ana oʻrtoq,<br>Badani xoʻp yaltiroq.<br>Boshdan-oyoq tanga u,<br>Bas, boyvuchcha yanga u.`,
            'poem_alpha_d_title': `D harfi uchun she'r`,
            'poem_alpha_d_subtitle': `Alifbo she'rlari`,
            'poem_alpha_d_body': `Delfin mohir dengizchi,<br>Dono, aqlli biram<br>Dengizda choʻksa birov<br>Darrov beradi yordam.`,
            'poem_alpha_e_title': `E harfi uchun she'r`,
            'poem_alpha_e_subtitle': `Alifbo she'rlari`,
            'poem_alpha_e_body': `Etikdoʻz Echki eski<br>Etiklarni rostladi.<br>Eplab, qolipga tortib,<br>Eshakvoyga mosladi.`,
            'poem_alpha_f_title': `F harfi uchun she'r`,
            'poem_alpha_f_subtitle': `Alifbo she'rlari`,
            'poem_alpha_f_body': `Farrosh Fill xola, qarang,<br>Tozalabdi har yoqni.<br>Topmaysiz hech yerda chang,<br>Artib kiring oyoqni.<br>Fayzli, fusunkor boʻlib,<br>Yashnab turar hamma yoq.<br>Farroshlar mehnatini<br>Qadrlang siz ey oʻrtoq!`,
            'poem_alpha_g_title': `G harfi uchun she'r`,
            'poem_alpha_g_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_body': `Gimnastikachi--<br>Gavdali, durkun<br>Gardani yoʻgʻon<br>Gorilla maymun.<br>Gap yoʻq mashqiga,<br>Bajarar chaqqon,<br>Olqishlar olib,<br>Hammaga yoqqan.`,
            'poem_alpha_h_title': `H harfi uchun she'r`,
            'poem_alpha_h_subtitle': `Alifbo she'rlari`,
            'poem_alpha_h_body': `Hakka harbiy xizmatda,<br>Himoyachi zoʻr posbon!<br>Havodan oʻtmas pashsha,<br>Hatlolmas yerdan sichqon.`,
            'poem_alpha_i_title': `I harfi uchun she'r`,
            'poem_alpha_i_subtitle': `Alifbo she'rlari`,
            'poem_alpha_i_body': `It ishonchli izquvar,<br>Ishini yaxshi bilar.<br>Ishkal qilsa kim-birov,<br>Izini olib darrov,<br>Izlab-izlab topadi,<br>Irillaydi qopadi!`,
            'poem_alpha_j_title': `J harfi uchun she'r`,
            'poem_alpha_j_subtitle': `Alifbo she'rlari`,
            'poem_alpha_j_body': `Jarroh Jayra<br>Ja zoʻr-da.<br>Kasallarga<br>Gʻamxoʻrda<br>Sekin tiqar ninasin.<br>Ishonmagan sinasin.`,
            'poem_alpha_k_title': `K harfi uchun she'r`,
            'poem_alpha_k_subtitle': `Alifbo she'rlari`,
            'poem_alpha_k_body': `Kalamushvoy kemirar,<br>Kundan-kunga semirar.<br>Boshqa kasb kori yoʻq,<br>Andishasi ori yo'q.`,
            'poem_alpha_l_title': `L harfi uchun she'r`,
            'poem_alpha_l_subtitle': `Alifbo she'rlari`,
            'poem_alpha_l_body': `Lofchi laylak lof urar,<br>Laqma, laqqa baqaga.<br>Soʻng cho'qib shartta yutar,<br>Dars bu bola-chaqaga.`,
            'poem_alpha_m_title': `M harfi uchun she'r`,
            'poem_alpha_m_subtitle': `Alifbo she'rlari`,
            'poem_alpha_m_body': `Maymun bilan Mosh mitti<br>Masxaraboz oʻyinchi.<br>Maydonda mashq qilmoqda,<br>Mana, siz ham koʻring-chi:<br>Maymunni mashinaday<br>Minib, haydamoqchi Mosh.<br>"Mashina"-chi, miq etmas,<br>Tormozda-da, na iloj...`,
            'poem_alpha_n_title': `N harfi uchun she'r`,
            'poem_alpha_n_subtitle': `Alifbo she'rlari`,
            'poem_alpha_n_body': `Ninachixon raqqosa<br>Nozik, navnihol rosa.<br>Nazar soling, naqadar<br>Nafis raqsga tushar.`,
            'poem_alpha_o_title': `O harfi uchun she'r`,
            'poem_alpha_o_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_body': `Ot kasbi -ishchi,<br>Omborchi, yukchi,<br>Ortib don-dunni,<br>Oppoq tuz, unni,<br>Olib yeladi, olib keladi.`,
            'poem_alpha_p_title': `P harfi uchun she'r`,
            'poem_alpha_p_subtitle': `Alifbo she'rlari`,
            'poem_alpha_p_body': `Pingvin xola pazanda,<br>Piyoz sabzi qozonda.<br>Peshin palov pishsin deb<br>Ish boshlagan azonda`,
            'poem_alpha_q_title': `Q harfi uchun she'r`,
            'poem_alpha_q_subtitle': `Alifbo she'rlari`,
            'poem_alpha_q_body': `Qaldirgʻochga qoyil-a,<br>Qarang, qanday quruvchi.<br>Quribdi loydan uya,<br>Qotiribdi, koʻring-chi.<br>Qiyin ishmi shuyam deb,<br>Qora qargʻa gap qotar.<br>Oʻzi qurgan in esa,<br>Shamolda qulab yotar.`,
            'poem_alpha_r_title': `R harfi uchun she'r`,
            'poem_alpha_r_subtitle': `Alifbo she'rlari`,
            'poem_alpha_r_body': `Rassom Buzoq<br>Rasm solar.<br>Quyon qoʻrqib<br>Razm solar.<br>Rasmlarning<br>zo'ri-da u,<br>Rosa katta<br>Boʻrida u!`,
            'poem_alpha_s_title': `S harfi uchun she'r`,
            'poem_alpha_s_subtitle': `Alifbo she'rlari`,
            'poem_alpha_s_body': `Sa'vaxon-suxandon,<br>Soʻzlari biyron-biyron.<br>Soling quloq, qanday soz,<br>Sehrli, sohir ovoz!`,
            'poem_alpha_t_title': `T harfi uchun she'r`,
            'poem_alpha_t_subtitle': `Alifbo she'rlari`,
            'poem_alpha_t_body': `Tipratikan tikuvchi,<br>Tinmay tikar tunu kun.<br>Turli tuman buyurtma<br>Taxlangan tugun tugun.<br>Tanho tannoz Tovusning<br>Tayyormas buyurtmasi.<br>Timsohning terisini<br>Tesholmadi ignasi.`,
            'poem_alpha_u_title': `U harfi uchun she'r`,
            'poem_alpha_u_subtitle': `Alifbo she'rlari`,
            'poem_alpha_u_body': `Uchqur uchuvchi ukki<br>Uzoq-uzoqqa uchdi.<br>Uloqcha uchaman deb,<br>Uzala yerga tushdi.<br>U yon bu yon boqib soʻng,<br>Uf tortdi tushib choʻkka:<br>"Uchqur qanotim boʻlsa,<br>Uchardim men ham koʻkka".`,
            'poem_alpha_v_title': `V harfi uchun she'r`,
            'poem_alpha_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_v_body': `Va'zxonlik qilar Toʻti:<br>"Vijdonli boʻlish kerak.<br>Va'da berdingmi, boʻldi,<br>Vaqtida qilish kerak!"<br>Toʻgri-yu, aytgan soʻzi,<br>Amal qilarmi oʻzi?`,
            'poem_alpha_x_title': `X harfi uchun she'r`,
            'poem_alpha_x_subtitle': `Alifbo she'rlari`,
            'poem_alpha_x_body': `Xabarchi xoʻroz sahar<br>"Xushxabar!-- deb qichqirar.<br>- Xalos boʻldik zulmatdan,<br>Xatarli tun-kulfatdan.<br>Xursand boʻling, oshnalar,<br>Xayrli tong boshlanar!...<br>Xurrak otib yotmangiz,<br>Xo'p gʻaflatga botmangiz!"`,
            'poem_alpha_y_title': `Y harfi uchun she'r`,
            'poem_alpha_y_subtitle': `Alifbo she'rlari`,
            'poem_alpha_y_body': `Yoʻl-yoʻl formali Yoʻlbars ‐---<br>Yoʻl nazorat xodimi.<br>Yurgan yoʻlovchilarning<br>Kuzatar har odimin<br>Yoʻlchiroqqa qaramay,<br>Tartib buzsa qay biri,<br>Yoʻlga solib, ayamay,<br>Berib qoʻyar tazirin`,
            'poem_alpha_z_title': `Z harfi uchun she'r`,
            'poem_alpha_z_subtitle': `Alifbo she'rlari`,
            'poem_alpha_z_body': `Zargʻaldoq zargar ekan,<br>Ziragi gavhar ekan,<br>Ziyrak turib doimo<br>Zarlarin asrar ekan.`,
            'poem_alpha_o_v_title': `Oʻ harfi uchun she'r`,
            'poem_alpha_o_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_v_body': `Oʻqituvchi oʻrdakning<br>Oʻtgan darsini har kun<br>Oʻzlashtirib, oʻrganar<br>Oʻquvchi oʻrdakchalar.<br>Oʻzlari yosh boʻlsa ham.<br>Oʻtkir zehnli biram.<br>Oʻylab topishar darhol,<br>Oʻnta boʻlsa ham savol.`,
            'poem_alpha_g_v_title': `Gʻ harfi uchun she'r`,
            'poem_alpha_g_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_v_body': `Gʻazalxon Gʻoz sahnada<br>Qoʻshiq aytar "gʻoq-gʻoq" deb.<br>Kekkaymang davralarda,<br>Kamtar boʻling, oʻrtoq, deb<br>Qoʻshigʻiku ma'noli,<br>Gʻalati oʻzi biroq.<br>Gʻoddayishini tashlasa,<br>Boʻlarmidi yaxshiroq.`,
            'poem_alpha_sh_title': `Sh harfi uchun she'r`,
            'poem_alpha_sh_subtitle': `Alifbo she'rlari`,
            'poem_alpha_sh_body': `Shifokor she'r oldiga<br>Shum tulki shoshib keldi.<br>"Voy boshim", deb yolgʻondan<br>Maktabdan qochib keldi.<br>Sher tekshirdi-yu shartta,<br>Dedi: "Sogʻsan, darsga bor!"<br>Shumshayib qaytdi ortga,<br>Sharmanda boʻlib ayyor.`,
            'poem_alpha_ch_title': `Ch harfi uchun she'r`,
            'poem_alpha_ch_subtitle': `Alifbo she'rlari`,
            'poem_alpha_ch_body': `Chigirtka zo'r cholg'uchi<br>Chalar kuy charchamasdan<br>Chiridoqlar jo'r bo'lib<br>Chirillar har tarafdan<br>Chir aylanib o'ynaydi<br>Chiroyli kapalaklar,<br>Chapak chalib  quvnaydi<br>Chamandagi chechaklar`,
            'poem_alpha_ng_title': `Ng harfi uchun she'r`,
            'poem_alpha_ng_subtitle': `Alifbo she'rlari`,
            'poem_alpha_ng_body': `Tayyorga ayyor nahang<br>Tekinxo'r takasaltang<br>Qarmoqdagi o'ljaga<br>Og'iz solgandi qarang<br>Tumshug'idan ilinib<br>Tipirchilar, holi tang.`,
            'poem1_title': `Onaxonim ko'zlari`,
            'poem1_subtitle': `Ta'sirli she'r`,
            'poem1_body': `Sizga boqib turgan bu teron ko'zlar<br>Meniki emas, do'stlar...<br><br>Dunyoda ko'r bo'lib kelgan edim men,<br>Bechora derdilar, qismatim ekan.<br>Bilmasdim oy nima yo yulduz nima,<br>Kechalari nima o'zi yo kunduz nima.<br><br>Ilk bahorda Toshkentdan dadam,<br>Doktor olib keldilar, quvondim biram.<br>Professor ekan, ko'rdi ko'zlarim,<br>Tinglardi dardli, mungli so'zlarim.<br><br>Davalayman dedi, ammo birorta odam,<br>O'z ko'zini bersa, dahshat bo'lsa ham.<br>Shunda do'stlarimni to'pladi dadam,<br>Ko'z berish dahshat-ku deyishdi ular,<br>Ko'z inom etmadi qarindoshlarim ham.<br><br>Bir kun sukunatda o'tirardim jim,<br>Uydan eshitildi qattiq bir faryod.<br>Irg'ib turgandim, kimdir o'tqazdi,<br>Operatsiyadan 5 kun o'tgach,<br>Ul rus tabibi ruxsat bergach,<br>Ko'zimdan dokani oldimi shartta,<br>Men dunyoni ko'rdim birinchi marta.<br><br>Oh, oy yulduz! Shunda uyga qo'ydim ot,<br>Eh, men noshud bandaga harom bu hayot.<br>Onajonim ko'zlari ko'r edi,<br>Ingrardi bechora, dardi zo'r edi.<br>Paypaslab yuzimni tutdi-yu shartta,<br>Yangi ko'zlarimdan bir marotaba o'pdi.<br><br>Sizga boqib turgan bu teron ko'zlar<br>Meniki emas, do'stlar... Onajonimniki!`,
            'poem2_title': `O‘zbekiston, Vatanim manim`,
            'poem2_subtitle': `Abdulla Oripov`,
            'poem2_body': `Yurtim, senga she’r bitdim bu kun,<br>Qiyosingni topmadim aslo.<br>Shoirlar bor, o‘z yurtin butun —<br>Olam aro atagan tanho.<br><br>Ular she’ri uchdi ko‘p yiroq,<br>Qanotida kumush diyori,<br>Bir o‘lka bor dunyoda, biroq<br>Bitilmagan dostondir bori:<br>Faqat ojiz qalamim manim,<br>O‘zbekiston, Vatanim manim.<br><br>Yurmasman hech behishtni izlab,<br>Topolmasam chekmasman alam.<br>O‘tirmasman ertaklar so‘zlab,<br>Musallo deb yo‘nmasman qalam.<br><br>Ko‘klamingdan olib sururni,<br>Dovrug’ soldi ustoz Olimjon,<br>G‘afur G‘ulom tuygan g‘ururni<br>Qilmoq mumkin dunyoga doston.<br>Olis tarix qadamim manim,<br>O‘zbekiston, Vatanim manim.<br><br>Kechmishing bor chindan ham uzoq,<br>Ilg‘ay olmas barchasin ko‘zim.<br>Maqtamasman moziyni, biroq<br>O‘tmishingni o‘ylayman bir zum.<br><br>Zabtga olib keng Osiyoni,<br>Bir zot chiqdi mag‘rur, davongir,<br>Ikki asr yarim dunyoni<br>Zir qaqshatdi Buyuk jahongir.<br>Aytgum, bu kun, u manim, manim.<br>O‘zbekiston, Vatanim manim.`,
            'liked_question': `Yoqdimi?`,
            'liked_answer': `Yoqdi!`,
            'poem_alpha_a_title': `A harfi uchun she'r`,
            'poem_alpha_a_subtitle': `Alifbo she'rlari`,
            'poem_alpha_a_body': `Ahil asalarilar<br>Azonlab tushar ishga<br>Atrof dala, bogʻlardan<br>Asal yigʻishar qishga<br>Ayiq boʻlsa, meshqorin<br>Asallarni yer, borin.<br>Arilar xafa gʻoyat,<br>Axir' bormi adolat?!`,
            'poem_alpha_b_title': `B harfi uchun she'r`,
            'poem_alpha_b_subtitle': `Alifbo she'rlari`,
            'poem_alpha_b_body': `Baliq boyvuchcha, desam,<br>Bekor gap, dema hecham.<br>Boq oʻzing, ana oʻrtoq,<br>Badani xoʻp yaltiroq.<br>Boshdan-oyoq tanga u,<br>Bas, boyvuchcha yanga u.`,
            'poem_alpha_d_title': `D harfi uchun she'r`,
            'poem_alpha_d_subtitle': `Alifbo she'rlari`,
            'poem_alpha_d_body': `Delfin mohir dengizchi,<br>Dono, aqlli biram<br>Dengizda choʻksa birov<br>Darrov beradi yordam.`,
            'poem_alpha_e_title': `E harfi uchun she'r`,
            'poem_alpha_e_subtitle': `Alifbo she'rlari`,
            'poem_alpha_e_body': `Etikdoʻz Echki eski<br>Etiklarni rostladi.<br>Eplab, qolipga tortib,<br>Eshakvoyga mosladi.`,
            'poem_alpha_f_title': `F harfi uchun she'r`,
            'poem_alpha_f_subtitle': `Alifbo she'rlari`,
            'poem_alpha_f_body': `Farrosh Fill xola, qarang,<br>Tozalabdi har yoqni.<br>Topmaysiz hech yerda chang,<br>Artib kiring oyoqni.<br>Fayzli, fusunkor boʻlib,<br>Yashnab turar hamma yoq.<br>Farroshlar mehnatini<br>Qadrlang siz ey oʻrtoq!`,
            'poem_alpha_g_title': `G harfi uchun she'r`,
            'poem_alpha_g_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_body': `Gimnastikachi--<br>Gavdali, durkun<br>Gardani yoʻgʻon<br>Gorilla maymun.<br>Gap yoʻq mashqiga,<br>Bajarar chaqqon,<br>Olqishlar olib,<br>Hammaga yoqqan.`,
            'poem_alpha_h_title': `H harfi uchun she'r`,
            'poem_alpha_h_subtitle': `Alifbo she'rlari`,
            'poem_alpha_h_body': `Hakka harbiy xizmatda,<br>Himoyachi zoʻr posbon!<br>Havodan oʻtmas pashsha,<br>Hatlolmas yerdan sichqon.`,
            'poem_alpha_i_title': `I harfi uchun she'r`,
            'poem_alpha_i_subtitle': `Alifbo she'rlari`,
            'poem_alpha_i_body': `It ishonchli izquvar,<br>Ishini yaxshi bilar.<br>Ishkal qilsa kim-birov,<br>Izini olib darrov,<br>Izlab-izlab topadi,<br>Irillaydi qopadi!`,
            'poem_alpha_j_title': `J harfi uchun she'r`,
            'poem_alpha_j_subtitle': `Alifbo she'rlari`,
            'poem_alpha_j_body': `Jarroh Jayra<br>Ja zoʻr-da.<br>Kasallarga<br>Gʻamxoʻrda<br>Sekin tiqar ninasin.<br>Ishonmagan sinasin.`,
            'poem_alpha_k_title': `K harfi uchun she'r`,
            'poem_alpha_k_subtitle': `Alifbo she'rlari`,
            'poem_alpha_k_body': `Kalamushvoy kemirar,<br>Kundan-kunga semirar.<br>Boshqa kasb kori yoʻq,<br>Andishasi ori yo'q.`,
            'poem_alpha_l_title': `L harfi uchun she'r`,
            'poem_alpha_l_subtitle': `Alifbo she'rlari`,
            'poem_alpha_l_body': `Lofchi laylak lof urar,<br>Laqma, laqqa baqaga.<br>Soʻng cho'qib shartta yutar,<br>Dars bu bola-chaqaga.`,
            'poem_alpha_m_title': `M harfi uchun she'r`,
            'poem_alpha_m_subtitle': `Alifbo she'rlari`,
            'poem_alpha_m_body': `Maymun bilan Mosh mitti<br>Masxaraboz oʻyinchi.<br>Maydonda mashq qilmoqda,<br>Mana, siz ham koʻring-chi:<br>Maymunni mashinaday<br>Minib, haydamoqchi Mosh.<br>"Mashina"-chi, miq etmas,<br>Tormozda-da, na iloj...`,
            'poem_alpha_n_title': `N harfi uchun she'r`,
            'poem_alpha_n_subtitle': `Alifbo she'rlari`,
            'poem_alpha_n_body': `Ninachixon raqqosa<br>Nozik, navnihol rosa.<br>Nazar soling, naqadar<br>Nafis raqsga tushar.`,
            'poem_alpha_o_title': `O harfi uchun she'r`,
            'poem_alpha_o_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_body': `Ot kasbi -ishchi,<br>Omborchi, yukchi,<br>Ortib don-dunni,<br>Oppoq tuz, unni,<br>Olib yeladi, olib keladi.`,
            'poem_alpha_p_title': `P harfi uchun she'r`,
            'poem_alpha_p_subtitle': `Alifbo she'rlari`,
            'poem_alpha_p_body': `Pingvin xola pazanda,<br>Piyoz sabzi qozonda.<br>Peshin palov pishsin deb<br>Ish boshlagan azonda`,
            'poem_alpha_q_title': `Q harfi uchun she'r`,
            'poem_alpha_q_subtitle': `Alifbo she'rlari`,
            'poem_alpha_q_body': `Qaldirgʻochga qoyil-a,<br>Qarang, qanday quruvchi.<br>Quribdi loydan uya,<br>Qotiribdi, koʻring-chi.<br>Qiyin ishmi shuyam deb,<br>Qora qargʻa gap qotar.<br>Oʻzi qurgan in esa,<br>Shamolda qulab yotar.`,
            'poem_alpha_r_title': `R harfi uchun she'r`,
            'poem_alpha_r_subtitle': `Alifbo she'rlari`,
            'poem_alpha_r_body': `Rassom Buzoq<br>Rasm solar.<br>Quyon qoʻrqib<br>Razm solar.<br>Rasmlarning<br>zo'ri-da u,<br>Rosa katta<br>Boʻrida u!`,
            'poem_alpha_s_title': `S harfi uchun she'r`,
            'poem_alpha_s_subtitle': `Alifbo she'rlari`,
            'poem_alpha_s_body': `Sa'vaxon-suxandon,<br>Soʻzlari biyron-biyron.<br>Soling quloq, qanday soz,<br>Sehrli, sohir ovoz!`,
            'g1_v1_title': "Game 1: Qiziqarli matematika",
            'g1_v1_desc': "Matematika olamiga qiziqarli sayohat va mantiqiy savollar.",
            'g1_v2_title': "Game 2: Asosiy shakllarni o'rganish",
            'g1_v2_desc': "Doira, tortburchak, uchburchak kabilarni ajratishni o'rganish.",
            'g1_v3_title': "Game 3: Tangalarni o'rganish",
            'g1_v3_desc': "Tangalar va moliyaviy savodxonlik haqida nishona.",
            'g1_v4_title': "Game 4: Ayirish",
            'g1_v4_desc': "Ko'rgazmali qurollar yordamida ayirish asoslari.",
            'g1_v5_title': "Game 5: Kasrlar asoslari",
            'g1_v5_desc': "Yarim va chorak kasrlari haqida tushuncha.",
            'g1_v6_title': "Game 6: 100 gacha sanash",
            'g1_v6_desc': "100 gacha bo'lgan sonlarni sanashni mashq qiling.",
            'g1_v7_title': "Game 7: Hayotdagi shakllar",
            'g1_v7_desc': "Atrofimizdagi narsalardan shakllarni topish.",
            'g1_v8_title': "Game 8: 20 gacha qo'shish",
            'g1_v8_desc': "20 gacha bo'lgan sonlarni qo'shishni mashq qilish.",
            'g1_v9_title': "Game 9: O'ng va Chap",
            'g1_v9_desc': "O'ng va chap tomonlarni farqlash.",
            'g1_v10_title': "Game 1: Oddiy qo'shish",
            'g1_v10_desc': "Kichik sonlarni oson qo'shishni o'rganing.",
            'g1_v11_title': "Game 2: Katta va Kichik",
            'g1_v11_desc': "O'lcham va o'lchovlarning asosiy tushunchalari.",
            'g1_v12_title': "Game 3: Sonlar qoshig'i",
            'g1_v12_desc': "Raqamlarni tez o'rganish uchun sanang va raqsga tushing.",
            'g1_v13_title': "Game 4: Vaqtni aniqlash",
            'g1_v13_desc': "Oddiy soatni o'qishni o'rganing.",
            'g1_v14_title': "Game 5: Katta va Kichik sonlar",
            'g1_v14_desc': "Sonlarni solishtirish qoidalari.",
            'g1_v15_title': "Game 6: 10 talab sanash",
            'g1_v15_desc': "O'ntadan qilib sanashni o'rganing.",
            'g2_v1_title': "Game 1: Alifbo qoshig'i",
            'g2_v1_desc': "Ingliz tili alifbosini o'rganish uchun klassik qoshiq.",
            'g2_v2_title': "Game 2: Alifbo tovushlari",
            'g2_v2_desc': "Har bir harfning tovushlarini o'rganing.",
            'g2_v3_title': "Game 3: Ranglar qoshig'i",
            'g2_v3_desc': "Asosiy ranglarning nomlarini o'rganing.",
            'g2_v4_title': "Game 4: Gigiyena so'zlari",
            'g2_v4_desc': "Tish tozalash va kundalik jarayonlar haqida so'zlar.",
            'g2_v5_title': "Game 5: Ob-havo so'zlari",
            'g2_v5_desc': "Bugun ob-havo qanday? Quyoshli, yomg'irli kabilarni o'rganing.",
            'g2_v6_title': "Game 6: Tana a'zolari",
            'g2_v6_desc': "Bosh, yelkalar, tizzalar kabi so'zlarni qoshiq orqali o'rganing.",
            'g2_v7_title': "Game 7: Mevalar qoshig'i",
            'g2_v7_desc': "Shirin mevalarning nomlarini o'rganing.",
            'g2_v8_title': "Game 8: Transport vositalari",
            'g2_v8_desc': "Avtobus, mashina kabi transport vositalari so'zlari.",
            'g2_v9_title': "Game 9: Oila a'zolari",
            'g2_v9_desc': "Oila a'zolari tushunchalari: ota, ona, aka.",
            'g2_v10_title': "Game 1: Hafta kunlari",
            'g2_v10_desc': "Ingliz tilida hafta kunlarini o'rganish.",
            'g2_v11_title': "Game 2: Yil oylari",
            'g2_v11_desc': "12 ta oyni o'rganing.",
            'g2_v12_title': "Game 3: Hayvonlar tovushi",
            'g2_v12_desc': "Hayvonlar va ularning tovushlarini o'rganing.",
            'g2_v13_title': "Game 4: Qarama-qarshi so'zlar",
            'g2_v13_desc': "Issiq, sovuq kabi antonim so'zlarni o'rganing.",
            'g2_v14_title': "Game 5: Kiyimlar nomi",
            'g2_v14_desc': "Kundalik kiyimlarning nomlarini o'rganing.",
            'g2_v15_title': "Game 6: Oziq-ovqat so'zlari",
            'g2_v15_desc': "Kundalik taomlarning nomlari.",
            'g3_v1_title': "Game 1: O'zingizni qanday his qilyapsiz?",
            'g3_v1_desc': "Asosiy his-tuyg'ularni ifodalash.",
            'g3_v2_title': "Game 2: Sehrli so'zlar",
            'g3_v2_desc': "Iltimos va rahmat kabi odobli so'zlar.",
            'g3_v3_title': "Game 3: Bo'lishish",
            'g3_v3_desc': "Do'stlar bilan bo'lishishning ahamiyati.",
            'g3_v4_title': "Game 4: Do'slashish",
            'g3_v4_desc': "O'zingizni tanishtirish va do'stlashish.",
            'g3_v5_title': "Game 5: Navbat bilan o'ynash",
            'g3_v5_desc': "Navbat bilan o'ynash nega muhimligi haqida.",
            'g3_v6_title': "Game 6: Kechirim so'rash",
            'g3_v6_desc': "Qachon va qanday kechirim so'rash kerak.",
            'g3_v7_title': "Game 7: Yordam berish",
            'g3_v7_desc': "Ota-onalar va o'qituvchilarga yordam berish quvonchi.",
            'g3_v8_title': "Game 8: Shaxsiy hudud",
            'g3_v8_desc': "Boshqalarning shaxsiy makonini hurmat qilish.",
            'g3_v9_title': "Game 9: Tinglash qobiliyati",
            'g3_v9_desc': "Boshqalar gapirganda ularni diqqat bilan eshitish.",
            'g3_v10_title': "Game 1: Rostgo'y bo'lish",
            'g3_v10_desc': "Doim haqiqatni gapirishning muhimligi.",
            'g3_v11_title': "Game 2: Jamoaviy ish",
            'g3_v11_desc': "Umumiy maqsad yo'lida birgalikda ishlash.",
            'g3_v12_title': "Game 3: G'azabni yengish",
            'g3_v12_desc': "Jahl chiqqanda qanday yo'l tutish kerakligi.",
            'g3_v13_title': "Game 4: Uxlash qoidalari",
            'g3_v13_desc': "Uyqu oldidan yaxshi odatlar yaratish.",
            'g3_v14_title': "Game 5: Yordam so'rash",
            'g3_v14_desc': "Qiyin vaziyatda kattalardan yordam so'rash mumkinligi.",
            'g3_v15_title': "Game 6: Qo'rqmaslik",
            'g3_v15_desc': "Qo'rquvni yengish va yangi narsalarni sinab ko'rish.",
            'g4_v1_title': "Game 1: Ijodiy topshiriq 1",
            'g4_v1_desc': "Tasavvuringizni ishga soling va yangi g'oyalar yarating.",
            'g4_v2_title': "Game 2: Ijodiy topshiriq 2",
            'g4_v2_desc': "Rasm chizish va ijod qilishning yangi usullari.",
            'g4_v3_title': "Game 3: Ertaklar to'qish",
            'g4_v3_desc': "Tasavvur yordamida qiziqarli ertaklar to'qiymiz.",
            'g4_v4_title': "Game 4: Hayvonlarni chizish",
            'g4_v4_desc': "Oson usulda hayvonlar rasmini chizish.",
            'g4_v5_title': "Game 5: Origami",
            'g4_v5_desc': "Qog'ozdan ajoyib shakllar yasash sirlari.",
            'g4_v6_title': "Game 6: Gubka bilan chizish",
            'g4_v6_desc': "Bolalar uchun qiziqarli ijodiy loyiha.",
            'g4_v7_title': "Game 7: Musiqa asboblari",
            'g4_v7_desc': "Turli musiqa asboblari qanday ovoz chiqarishini ko'ring.",
            'g4_v8_title': "Game 1: Lola o'yini",
            'g4_v8_desc': "Qol yordamida devorda soyalar yasash.",
            'g4_v9_title': "Game 2: Plastilindan yasash",
            'g4_v9_desc': "Plastilin yordamida shakllar yasash.",
            'g4_v10_title': "Game 3: Qoshiq ishlash",
            'g4_v10_desc': "Ovozingizni sozlab, yoqimli kuylar kuylash.",
            'g4_v11_title': "Game 4: Raqs tushamiz",
            'g4_v11_desc': "Gavanani harakatlantirib, raqsga tushing.",
            'g4_v12_title': "Game 5: Kubiklar yig'ish",
            'g4_v12_desc': "Kubiklardan har xil shakllar va binolar yasash.",
            'g4_v13_title': "Game 6: Tabiat rari",
            'g4_v13_desc': "Barg va shoxlar yordamida san'at asari yaratamiz.",
            'g4_v14_title': "Game 7: Rollar kiyish",
            'g4_v14_desc': "Turli qahramonlar rolini o'ynash mo'jizasi.",
            'g4_v15_title': "Game 8: Barmoqlar bilan chizish",
            'g4_v15_desc': "Barmoqlar yordamida rang-barang rasm chizish.",
            'g5_v1_title': "Game 1: Mantiqiy savol 1",
            'g5_v1_desc': "Mantiqiy fikrlashni rivojlantiruvchi qiziqarli vazifa.",
            'g5_v2_title': "Game 2: Mantiqiy savol 2",
            'g5_v2_desc': "Diqqat va mantiqni sinovdan o'tkazuvchi o'yin.",
            'g5_v3_title': "Game 3: Bolalar uchun topishmoqlar",
            'g5_v3_desc': "Oddiy mantiqiy topishmoqlari.",
            'g5_v4_title': "Game 4: Qaysi biri mos keladi?",
            'g5_v4_desc': "Ob'ektlarni qanday mantiq bilan ajratish.",
            'g5_v5_title': "Game 5: Makonlar",
            'g5_v5_desc': "Qaysi hayvon qayerda yashaydi? Mantiqiy savollar.",
            'g5_v6_title': "Game 6: Sayyoralar ketma-ketligi",
            'g5_v6_desc': "Sayyoralarni joylashuv o'rniga qarab o'rganing.",
            'g5_v7_title': "Game 7: Hayot davri",
            'g5_v7_desc': "Tabiatda sabab, oqibat va ketma-ketlik.",
            'g5_v8_title': "Game 1: Dinozavrlar",
            'g5_v8_desc': "Dinozavrlarni shakliga qarab tartiblash.",
            'g5_v9_title': "Game 2: Ajratib olish",
            'g5_v9_desc': "Rang, shakl va hajmga qarab ajratish mantiqi.",
            'g5_v10_title': "Game 3: Labirintlar",
            'g5_v10_desc': "Chiziqlarni kuzatish va labirintdan chiqish.",
            'g5_v11_title': "Game 4: Farqini top",
            'g5_v11_desc': "Rasmlar o'rtasidagi farqlarni topish o'yini.",
            'g5_v12_title': "Game 5: Voqealar ketma-ketligi",
            'g5_v12_desc': "Dastlab nima bo'ldi, keyin va oxiri?",
            'g5_v13_title': "Game 6: Hajmi bo'yicha",
            'g5_v13_desc': "Eng kichigidan kattasigacha tartiblang.",
            'g5_v14_title': "Game 7: Soiyasini top",
            'g5_v14_desc': "Narsalarni o'z soyasi bilan birlashtiring.",
            'g5_v15_title': "Game 8: Qismlar",
            'g5_v15_desc': "To'liq narsa qismlardan qanday iboratligini ko'ring.",
        },
        'ru': {
            'home': 'Главная',
            'login': 'Вход',
            'settings': 'Настройки',
            'help': 'Помощь',
            'welcome': 'Добро пожаловать в EduPlay',
            'math_title': 'Конструирование и дизайн, Математика',
            'math_desc': 'Развивает базовые математические навыки, такие как счет, формы и принципы конструирования.',
            'science_title': 'Сюжетно-ролевые игры и инсценировка',
            'science_desc': 'Изучение социальных ролей и рассказов через воображаемую игру.',
            'geo_title': 'Язык и речь',
            'geo_desc': 'Развивает словарный запас, правильное произношение и речевую выразительность.',
            'lit_title': 'Наука и природа',
            'lit_desc': 'Знакомство с миром природы, животными и базовыми научными концепциями.',
            'logic_title': 'Искусство',
            'logic_desc': 'Поощряет творчество, художественное выражение и мелкую моторику.',
            'Game': 'Игра',
            'video_Game_desc': 'Изучите основы в этом интерактивном уроке. Идеально для дошкольного обучения и развития.',
            'login_header': 'Вход',
            'email_label': 'Эл. почта',
            'password_label': 'Пароль',
            'signin_btn': 'Войти',
            'logout': 'Выход',
            'video_lessons': 'Видеоуроки',
            'register_header': 'Регистрация',
            'username_label': 'Имя пользователя',
            'no_account': 'Нет аккаунта?',
            'already_account': 'Уже есть аккаунт?',
            'signup_link': 'Регистрация',
            'login_link': 'Вход',
            'signup_btn': 'Зарегистрироваться',
            'settings_header': 'Настройки',
            'help_header': 'Центр Помощи',
            'under_construction': 'Эта страница в разработке.',
            'back_home': 'На главную',
            'help_about_title': 'Что может этот сайт?',
            'help_about_p1': 'Этот веб-сайт разработан для поддержки деятельности дошкольных образовательных учреждений и более эффективной организации образования детей с использованием современных информационных технологий.',
            'help_about_p2': 'Платформа содержит различные развивающие, образовательные и развлекательные игры для детей, помогающие повысить их уровень знаний, логическое мышление и активность. Также есть возможность отслеживать участие детей и выполнение заданий.',
            'help_about_p3': 'Этот веб-сайт служит удобным и эффективным инструлом для педагогов и воспитателей в контроле и анализе учебного процесса, а также для родителей в наблюдении за развитием их детей.',
            'help_contact_title': 'Связь',
            'help_tech_title': 'Технические вопросы',
            'help_tech_desc': 'По ошибкам и неисправностям',
            'help_game_title': 'По видеоиграм',
            'help_game_desc': 'Предложения и функции игр',
            'help_footer_text': 'Все обращения будут рассмотрены в кратчайшие сроки для устранения проблем и дальнейшего совершенствования работы веб-сайта.',
            'videos': 'Сохраненные Видео',
            'videos_header': 'Ваша Видеобиблиотека',
            'add_video_title': 'Добавить Новое Видео',
            'video_file_label': 'Выберите Видеофайл',
            'video_title_label': 'Название Видео',
            'save_video_btn': 'Сохранить Видео',
            'save_to_library': 'Сохранить в Библиотеку',
            'theme_title': 'Тема',
            'theme_desc': 'Переключение между темным и светлым режимом',
            'text_size_title': 'Размер Текста',
            'text_size_desc': 'Настройка размера текста на экране',
            'reset_settings_btn': 'Сбросить по умолчанию',
            'bg_tint_title': 'Оттенок Фона',
            'bg_tint_desc': 'Изменить цветовой оттенок фона',
            'sidebar_color_title': 'Цвет Боковой Панели',
            'sidebar_color_desc': 'Настроить цвет фона боковой панели',
            'age_select_title': 'Выберите ваш возраст',
            'age_3_4': '3-4 года',
            'age_5_6': '5-6 лет',
            'age_label': 'Возраст:',
            'start_page': 'Приветствие',
            'video_lessons': 'Видеоуроки',
            'get_certificate': 'Получить сертификат',
            'poems': 'Стихи',
            'games': 'Игры',
            'cert_req_title': 'Требования для получения сертификата:',
            'cert_req_desc': 'Для получения сертификата необходимо решить 50 тестовых вопросов. После полного выполнения 50 тестовых вопросов сертификат будет автоматически сформирован и представлен.',
            'start_test_btn': 'Начать тест',
            'test_title': 'Оценочный тест',
            'question': 'Вопрос',
            'next_btn': 'Следующий',
            'finish_btn': 'Завершить',
            'score': 'Счет',
            'test_complete': 'Тест завершен!',
            'correct_answers': 'Правильные ответы',
            'total_questions': 'Всего вопросов',
            'result_message_excellent': 'Отлично! Вы получили сертификат!',
            'result_message_good': 'Хорошая работа! Продолжайте тренироваться.',
            'result_message_retry': 'Попробуйте еще раз, чтобы улучшить результат.',
            'get_cert_btn': 'Получить сертификат',
            'later_btn': 'Позже',
            'poem1_title': `Mother's Eyes`,
            'poem1_subtitle': `A touching poem`,
            'poem1_body': `These deep eyes looking at you<br>Are not mine, friends...<br><br>I was born blind into the world,<br>They called me poor, said it was my fate.<br>I didn't know what the moon or stars were,<br>Or what nights and days were.<br><br>Early spring, my father brought<br>A doctor from Tashkent, I was so happy.<br>He was a professor, looked at my eyes,<br>Listened to my sad, sorrowful words.<br><br>He said he'd cure me, but only if someone<br>Gave their own eyes, though it's terrifying.<br>Then my father gathered my friends,<br>They said giving eyes is scary,<br>My relatives didn't gift their eyes either.<br><br>One day I sat in silence,<br>A loud cry was heard from the house.<br>I jumped up, someone sat me down,<br>5 days after the operation,<br>When the Russian doctor gave permission,<br>And sharply took the bandage off my eyes,<br>I saw the world for the first time.<br><br>Oh, moon and stars! Then I brought the horse home,<br>Oh, this life is forbidden for a worthless servant like me.<br>My mother's eyes were blind,<br>The poor thing groaned, her pain was great.<br>She felt my face and sharply<br>Kissed my new eyes once.<br><br>These deep eyes looking at you<br>Are not mine, friends... They are my mother's!`,
            'poem2_title': `Uzbekistan, My Motherland`,
            'poem2_subtitle': `Abdulla Oripov`,
            'poem2_body': `My land, I wrote a poem for you today,<br>I could never find a comparison for you.<br>There are poets who called their whole country<br>The only one in the world.<br><br>Their poems flew very far,<br>On the wings of silver lands,<br>There is a land in the world, however<br>All of it is an unwritten poem:<br>Only my weak pen,<br>Uzbekistan, my motherland.<br><br>I would never walk searching for paradise,<br>I wouldn't suffer if I couldn't find it.<br>I wouldn't sit telling fairy tales,<br>I wouldn't sharpen my pen calling it wine.<br><br>Taking joy from your spring,<br>Master Olimjon became famous,<br>The pride that Gafur Gulam felt<br>Could be made into a poem for the world.<br>Distant history is my step,<br>Uzbekistan, my motherland.<br><br>Your past is truly very long,<br>My eyes cannot catch all of it.<br>I would not praise the past, however<br>I think of your past for a moment.<br><br>Enquiring the wide Asia,<br>A proud, conquering person emerged,<br>For two and a half centuries<br>The Great Conqueror shook the world.<br>I will say, today, he is mine, mine.<br>Uzbekistan, my motherland.`,
            'liked_question': `Did you like it?`,
            'liked_answer': `Liked!`,
            'poem_alpha_a_title': `A harfi uchun she'r`,
            'poem_alpha_a_subtitle': `Alifbo she'rlari`,
            'poem_alpha_a_body': `Ahil asalarilar<br>Azonlab tushar ishga<br>Atrof dala, bogʻlardan<br>Asal yigʻishar qishga<br>Ayiq boʻlsa, meshqorin<br>Asallarni yer, borin.<br>Arilar xafa gʻoyat,<br>Axir' bormi adolat?!`,
            'poem_alpha_b_title': `B harfi uchun she'r`,
            'poem_alpha_b_subtitle': `Alifbo she'rlari`,
            'poem_alpha_b_body': `Baliq boyvuchcha, desam,<br>Bekor gap, dema hecham.<br>Boq oʻzing, ana oʻrtoq,<br>Badani xoʻp yaltiroq.<br>Boshdan-oyoq tanga u,<br>Bas, boyvuchcha yanga u.`,
            'poem_alpha_d_title': `D harfi uchun she'r`,
            'poem_alpha_d_subtitle': `Alifbo she'rlari`,
            'poem_alpha_d_body': `Delfin mohir dengizchi,<br>Dono, aqlli biram<br>Dengizda choʻksa birov<br>Darrov beradi yordam.`,
            'poem_alpha_e_title': `E harfi uchun she'r`,
            'poem_alpha_e_subtitle': `Alifbo she'rlari`,
            'poem_alpha_e_body': `Etikdoʻz Echki eski<br>Etiklarni rostladi.<br>Eplab, qolipga tortib,<br>Eshakvoyga mosladi.`,
            'poem_alpha_f_title': `F harfi uchun she'r`,
            'poem_alpha_f_subtitle': `Alifbo she'rlari`,
            'poem_alpha_f_body': `Farrosh Fill xola, qarang,<br>Tozalabdi har yoqni.<br>Topmaysiz hech yerda chang,<br>Artib kiring oyoqni.<br>Fayzli, fusunkor boʻlib,<br>Yashnab turar hamma yoq.<br>Farroshlar mehnatini<br>Qadrlang siz ey oʻrtoq!`,
            'poem_alpha_g_title': `G harfi uchun she'r`,
            'poem_alpha_g_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_body': `Gimnastikachi--<br>Gavdali, durkun<br>Gardani yoʻgʻon<br>Gorilla maymun.<br>Gap yoʻq mashqiga,<br>Bajarar chaqqon,<br>Olqishlar olib,<br>Hammaga yoqqan.`,
            'poem_alpha_h_title': `H harfi uchun she'r`,
            'poem_alpha_h_subtitle': `Alifbo she'rlari`,
            'poem_alpha_h_body': `Hakka harbiy xizmatda,<br>Himoyachi zoʻr posbon!<br>Havodan oʻtmas pashsha,<br>Hatlolmas yerdan sichqon.`,
            'poem_alpha_i_title': `I harfi uchun she'r`,
            'poem_alpha_i_subtitle': `Alifbo she'rlari`,
            'poem_alpha_i_body': `It ishonchli izquvar,<br>Ishini yaxshi bilar.<br>Ishkal qilsa kim-birov,<br>Izini olib darrov,<br>Izlab-izlab topadi,<br>Irillaydi qopadi!`,
            'poem_alpha_j_title': `J harfi uchun she'r`,
            'poem_alpha_j_subtitle': `Alifbo she'rlari`,
            'poem_alpha_j_body': `Jarroh Jayra<br>Ja zoʻr-da.<br>Kasallarga<br>Gʻamxoʻrda<br>Sekin tiqar ninasin.<br>Ishonmagan sinasin.`,
            'poem_alpha_k_title': `K harfi uchun she'r`,
            'poem_alpha_k_subtitle': `Alifbo she'rlari`,
            'poem_alpha_k_body': `Kalamushvoy kemirar,<br>Kundan-kunga semirar.<br>Boshqa kasb kori yoʻq,<br>Andishasi ori yo'q.`,
            'poem_alpha_l_title': `L harfi uchun she'r`,
            'poem_alpha_l_subtitle': `Alifbo she'rlari`,
            'poem_alpha_l_body': `Lofchi laylak lof urar,<br>Laqma, laqqa baqaga.<br>Soʻng cho'qib shartta yutar,<br>Dars bu bola-chaqaga.`,
            'poem_alpha_m_title': `M harfi uchun she'r`,
            'poem_alpha_m_subtitle': `Alifbo she'rlari`,
            'poem_alpha_m_body': `Maymun bilan Mosh mitti<br>Masxaraboz oʻyinchi.<br>Maydonda mashq qilmoqda,<br>Mana, siz ham koʻring-chi:<br>Maymunni mashinaday<br>Minib, haydamoqchi Mosh.<br>"Mashina"-chi, miq etmas,<br>Tormozda-da, na iloj...`,
            'poem_alpha_n_title': `N harfi uchun she'r`,
            'poem_alpha_n_subtitle': `Alifbo she'rlari`,
            'poem_alpha_n_body': `Ninachixon raqqosa<br>Nozik, navnihol rosa.<br>Nazar soling, naqadar<br>Nafis raqsga tushar.`,
            'poem_alpha_o_title': `O harfi uchun she'r`,
            'poem_alpha_o_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_body': `Ot kasbi -ishchi,<br>Omborchi, yukchi,<br>Ortib don-dunni,<br>Oppoq tuz, unni,<br>Olib yeladi, olib keladi.`,
            'poem_alpha_p_title': `P harfi uchun she'r`,
            'poem_alpha_p_subtitle': `Alifbo she'rlari`,
            'poem_alpha_p_body': `Pingvin xola pazanda,<br>Piyoz sabzi qozonda.<br>Peshin palov pishsin deb<br>Ish boshlagan azonda`,
            'poem_alpha_q_title': `Q harfi uchun she'r`,
            'poem_alpha_q_subtitle': `Alifbo she'rlari`,
            'poem_alpha_q_body': `Qaldirgʻochga qoyil-a,<br>Qarang, qanday quruvchi.<br>Quribdi loydan uya,<br>Qotiribdi, koʻring-chi.<br>Qiyin ishmi shuyam deb,<br>Qora qargʻa gap qotar.<br>Oʻzi qurgan in esa,<br>Shamolda qulab yotar.`,
            'poem_alpha_r_title': `R harfi uchun she'r`,
            'poem_alpha_r_subtitle': `Alifbo she'rlari`,
            'poem_alpha_r_body': `Rassom Buzoq<br>Rasm solar.<br>Quyon qoʻrqib<br>Razm solar.<br>Rasmlarning<br>zo'ri-da u,<br>Rosa katta<br>Boʻrida u!`,
            'poem_alpha_s_title': `S harfi uchun she'r`,
            'poem_alpha_s_subtitle': `Alifbo she'rlari`,
            'poem_alpha_s_body': `Sa'vaxon-suxandon,<br>Soʻzlari biyron-biyron.<br>Soling quloq, qanday soz,<br>Sehrli, sohir ovoz!`,
            'poem_alpha_t_title': `T harfi uchun she'r`,
            'poem_alpha_t_subtitle': `Alifbo she'rlari`,
            'poem_alpha_t_body': `Ёж-портной,<br>Шьет день и ночь.<br>Разные заказы<br>Сложены в узлы.<br>У одинокого павлина<br>Заказ еще не готов.<br>Игла не смогла<br>Проткнуть кожу крокодила.`,
            'poem_alpha_u_title': `U harfi uchun she'r`,
            'poem_alpha_u_subtitle': `Alifbo she'rlari`,
            'poem_alpha_u_body': `Быстрая сова<br>Улетала далеко-далеко.<br>Козленок, решив полетать,<br>Упал на землю.<br>Посмотрев туда-сюда,<br>Глубоко вздохнул:<br>"Если бы у меня были крылья,<br>Я бы тоже летел в небо".`,
            'poem_alpha_v_title': `V harfi uchun she'r`,
            'poem_alpha_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_v_body': `Попугай проповедует:<br>"Нужно быть честным.<br>Дал обещание - и всё,<br>Делай вовремя!"<br>Слова-то правильные,<br>А следует ли им сам?`,
            'poem_alpha_x_title': `X harfi uchun she'r`,
            'poem_alpha_x_subtitle': `Alifbo she'rlari`,
            'poem_alpha_x_body': `Петух-глашатай на рассвете<br>Кричит: "Благая весть!<br>Мы освободились от тьмы,<br>От опасной ночи.<br>Радуйтесь, друзья,<br>Начинается доброе утро!<br>Не храпите лежа,<br>Не погружайтесь в беспечность!"`,
            'poem_alpha_y_title': `Y harfi uchun she'r`,
            'poem_alpha_y_subtitle': `Alifbo she'rlari`,
            'poem_alpha_y_body': `Тигр в полосатой форме -<br>Инспектор дорожного движения.<br>Наблюдает за каждым шагом<br>Проходящих пешеходов.<br>Если кто-то нарушит порядок,<br>Не глядя на светофор,<br>Наставит на путь истинный,<br>Не жалея, накажет.`,
            'poem_alpha_z_title': `Z harfi uchun she'r`,
            'poem_alpha_z_subtitle': `Alifbo she'rlari`,
            'poem_alpha_z_body': `Иволга была ювелиром,<br>Ее серьга - жемчужина.<br>Всегда бдительная,<br>Хранит свое золото.`,
            'poem_alpha_o_v_title': `Oʻ harfi uchun she'r`,
            'poem_alpha_o_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_v_body': `Учителя Утки<br>Урок каждый день<br>Усваивают и учат<br>Учащиеся утята.<br>Хоть они и маленькие,<br>Очень уж смышленые.<br>Сразу найдут ответ,<br>Даже если будет десять вопросов.`,
            'poem_alpha_g_v_title': `Gʻ harfi uchun she'r`,
            'poem_alpha_g_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_v_body': `Гусь-певец на сцене<br>Поет "га-га-га".<br>"Не будьте заносчивы,<br>Будьте скромными, друзья", - поет он.<br>Песня-то со смыслом,<br>Но сам он странный.<br>Если бы бросил важничать,<br>Было бы лучше.`,
            'poem_alpha_sh_title': `Sh harfi uchun she'r`,
            'poem_alpha_sh_subtitle': `Alifbo she'rlari`,
            'poem_alpha_sh_body': `К Доктору Льву<br>Хитрая лиса прибежала.<br>"Ой, голова", - соврала она,<br>Сбежав из школы.<br>Лев проверил и сразу<br>Сказал: "Ты здоров, иди в класс!"<br>Лиса вернулась понурая,<br>Опозоренная хитростью.`,
            'poem_alpha_ch_title': `Ch harfi uchun she'r`,
            'poem_alpha_ch_subtitle': `Alifbo she'rlari`,
            'poem_alpha_ch_body': `Кузнечик - отличный музыкант<br>Играет мелодию без устали<br>Сверчки подпевают хором<br>Слышно со всех сторон<br>Красивые бабочки<br>Кружатся в танце,<br>Цветы на лугу<br>Хлопают и радуются`,
            'poem_alpha_ng_title': `Ng harfi uchun she'r`,
            'poem_alpha_ng_subtitle': `Alifbo she'rlari`,
            'poem_alpha_ng_body': `Хитрая акула на всё готовое<br>Ленивый бездельник<br>На добычу на крючке<br>Посмотрела, смотрите<br>Зацепилась за рыло<br>Трепыхается, дело плохо.`,
            'poem1_title': `Глаза матери`,
            'poem1_subtitle': `Трогательное стихотворение`,
            'poem1_body': `Эти глубокие глаза, смотрящие на тебя<br>Не мои, друзья...<br><br>Я родился слепым в этот мир,<br>Называли меня беднягой, говорили, что это моя судьба.<br>Я не знал, что такое луна или звезда,<br>Или что такое ночи и дни.<br><br>Ранней весной отец привез<br>Врача из Ташкента, я был так счастлив.<br>Он был профессором, посмотрел в мои глаза,<br>Слушал мои грустные, печальные слова.<br><br>Он сказал, что вылечит, но только если кто-то<br>Отдаст свои глаза, хотя это и ужасно.<br>Затем отец собрал моих друзей,<br>Они сказали, что отдавать глаза страшно,<br>Мои родственники тоже не подарили свои глаза.<br><br>В один из дней я сидел в тишине,<br>Из дома послышался громкий крик.<br>Я вскочил, кто-то усадил меня,<br>Через 5 дней после операции,<br>Когда русский врач дал разрешение,<br>И резко снял повязку с моих глаз,<br>Я впервые увидел мир.<br><br>О, луна и звезда! Тогда я привел коня домой,<br>О, эта жизнь запретна для такого никчемного слуги, как я.<br>Глаза моей матери были слепы,<br>Бедняжка стонала, ее боль была сильна.<br>Она нащупала мое лицо и резко<br>Поцеловала мои новые глаза один раз.<br><br>Эти глубокие глаза, смотрящие на тебя<br>Не мои, друзья... Они моей матери!`,
            'poem2_title': `Узбекистан, моя родина`,
            'poem2_subtitle': `Абдулла Орипов`,
            'poem2_body': `Мой край, я написал тебе стих сегодня,<br>Я никогда не мог найти тебе сравнения.<br>Есть поэты, которые называли свою страну<br>Единственной в мире.<br><br>Их стихи улетели очень далеко,<br>На крыльях серебряных стран,<br>Есть страна в мире, однако<br>Вся она - ненаписанная поэма:<br>Только мое слабое перо,<br>Узбекистан, моя родина.<br><br>Я бы никогда не искал рай,<br>Я бы не страдал, если бы не смог его найти.<br>Я бы не сидел и не рассказывал сказки,<br>Я бы не точил свое перо, называя его вином.<br><br>Беря радость от твоей весны,<br>Мастер Олимджон прославился,<br>Гордость, которую чувствовал Гафур Гулям<br>Можно превратить в поэму для всего мира.<br>Далекая история - мой шаг,<br>Узбекистан, моя родина.<br><br>Твое прошлое действительно очень длинное,<br>Мои глаза не могут охватить его все.<br>Я бы не хвалил прошлое, однако<br>Я думаю о твоем прошлом на мгновение.<br><br>Завоевывая широкую Азию,<br>Появился гордый, победоносный человек,<br>Два с половиной века<br>Великий Завоеватель сотрясал мир.<br>Я скажу, сегодня, он мой, мой.<br>Узбекистан, моя родина.`,
            'liked_question': `Вам понравилось?`,
            'liked_answer': `Понравилось!`,
            'poem_alpha_a_title': `A harfi uchun she'r`,
            'poem_alpha_a_subtitle': `Alifbo she'rlari`,
            'poem_alpha_a_body': `Ahil asalarilar<br>Azonlab tushar ishga<br>Atrof dala, bogʻlardan<br>Asal yigʻishar qishga<br>Ayiq boʻlsa, meshqorin<br>Asallarni yer, borin.<br>Arilar xafa gʻoyat,<br>Axir' bormi adolat?!`,
            'poem_alpha_b_title': `B harfi uchun she'r`,
            'poem_alpha_b_subtitle': `Alifbo she'rlari`,
            'poem_alpha_b_body': `Baliq boyvuchcha, desam,<br>Bekor gap, dema hecham.<br>Boq oʻzing, ana oʻrtoq,<br>Badani xoʻp yaltiroq.<br>Boshdan-oyoq tanga u,<br>Bas, boyvuchcha yanga u.`,
            'poem_alpha_d_title': `D harfi uchun she'r`,
            'poem_alpha_d_subtitle': `Alifbo she'rlari`,
            'poem_alpha_d_body': `Delfin mohir dengizchi,<br>Dono, aqlli biram<br>Dengizda choʻksa birov<br>Darrov beradi yordam.`,
            'poem_alpha_e_title': `E harfi uchun she'r`,
            'poem_alpha_e_subtitle': `Alifbo she'rlari`,
            'poem_alpha_e_body': `Etikdoʻz Echki eski<br>Etiklarni rostladi.<br>Eplab, qolipga tortib,<br>Eshakvoyga mosladi.`,
            'poem_alpha_f_title': `F harfi uchun she'r`,
            'poem_alpha_f_subtitle': `Alifbo she'rlari`,
            'poem_alpha_f_body': `Farrosh Fill xola, qarang,<br>Tozalabdi har yoqni.<br>Topmaysiz hech yerda chang,<br>Artib kiring oyoqni.<br>Fayzli, fusunkor boʻlib,<br>Yashnab turar hamma yoq.<br>Farroshlar mehnatini<br>Qadrlang siz ey oʻrtoq!`,
            'poem_alpha_g_title': `G harfi uchun she'r`,
            'poem_alpha_g_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_body': `Gimnastikachi--<br>Gavdali, durkun<br>Gardani yoʻgʻon<br>Gorilla maymun.<br>Gap yoʻq mashqiga,<br>Bajarar chaqqon,<br>Olqishlar olib,<br>Hammaga yoqqan.`,
            'poem_alpha_h_title': `H harfi uchun she'r`,
            'poem_alpha_h_subtitle': `Alifbo she'rlari`,
            'poem_alpha_h_body': `Hakka harbiy xizmatda,<br>Himoyachi zoʻr posbon!<br>Havodan oʻtmas pashsha,<br>Hatlolmas yerdan sichqon.`,
            'poem_alpha_i_title': `I harfi uchun she'r`,
            'poem_alpha_i_subtitle': `Alifbo she'rlari`,
            'poem_alpha_i_body': `It ishonchli izquvar,<br>Ishini yaxshi bilar.<br>Ishkal qilsa kim-birov,<br>Izini olib darrov,<br>Izlab-izlab topadi,<br>Irillaydi qopadi!`,
            'poem_alpha_j_title': `J harfi uchun she'r`,
            'poem_alpha_j_subtitle': `Alifbo she'rlari`,
            'poem_alpha_j_body': `Jarroh Jayra<br>Ja zoʻr-da.<br>Kasallarga<br>Gʻamxoʻrda<br>Sekin tiqar ninasin.<br>Ishonmagan sinasin.`,
            'poem_alpha_k_title': `K harfi uchun she'r`,
            'poem_alpha_k_subtitle': `Alifbo she'rlari`,
            'poem_alpha_k_body': `Kalamushvoy kemirar,<br>Kundan-kunga semirar.<br>Boshqa kasb kori yoʻq,<br>Andishasi ori yo'q.`,
            'poem_alpha_l_title': `L harfi uchun she'r`,
            'poem_alpha_l_subtitle': `Alifbo she'rlari`,
            'poem_alpha_l_body': `Lofchi laylak lof urar,<br>Laqma, laqqa baqaga.<br>Soʻng cho'qib shartta yutar,<br>Dars bu bola-chaqaga.`,
            'poem_alpha_m_title': `M harfi uchun she'r`,
            'poem_alpha_m_subtitle': `Alifbo she'rlari`,
            'poem_alpha_m_body': `Maymun bilan Mosh mitti<br>Masxaraboz oʻyinchi.<br>Maydonda mashq qilmoqda,<br>Mana, siz ham koʻring-chi:<br>Maymunni mashinaday<br>Minib, haydamoqchi Mosh.<br>"Mashina"-chi, miq etmas,<br>Tormozda-da, na iloj...`,
            'poem_alpha_n_title': `N harfi uchun she'r`,
            'poem_alpha_n_subtitle': `Alifbo she'rlari`,
            'poem_alpha_n_body': `Ninachixon raqqosa<br>Nozik, navnihol rosa.<br>Nazar soling, naqadar<br>Nafis raqsga tushar.`,
            'poem_alpha_o_title': `O harfi uchun she'r`,
            'poem_alpha_o_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_body': `Ot kasbi -ishchi,<br>Omborchi, yukchi,<br>Ortib don-dunni,<br>Oppoq tuz, unni,<br>Olib yeladi, olib keladi.`,
            'poem_alpha_p_title': `P harfi uchun she'r`,
            'poem_alpha_p_subtitle': `Alifbo she'rlari`,
            'poem_alpha_p_body': `Pingvin xola pazanda,<br>Piyoz sabzi qozonda.<br>Peshin palov pishsin deb<br>Ish boshlagan azonda`,
            'poem_alpha_q_title': `Q harfi uchun she'r`,
            'poem_alpha_q_subtitle': `Alifbo she'rlari`,
            'poem_alpha_q_body': `Qaldirgʻochga qoyil-a,<br>Qarang, qanday quruvchi.<br>Quribdi loydan uya,<br>Qotiribdi, koʻring-chi.<br>Qiyin ishmi shuyam deb,<br>Qora qargʻa gap qotar.<br>Oʻzi qurgan in esa,<br>Shamolda qulab yotar.`,
            'poem_alpha_r_title': `R harfi uchun she'r`,
            'poem_alpha_r_subtitle': `Alifbo she'rlari`,
            'poem_alpha_r_body': `Rassom Buzoq<br>Rasm solar.<br>Quyon qoʻrqib<br>Razm solar.<br>Rasmlarning<br>zo'ri-da u,<br>Rosa katta<br>Boʻrida u!`,
            'poem_alpha_s_title': `S harfi uchun she'r`,
            'poem_alpha_s_subtitle': `Alifbo she'rlari`,
            'poem_alpha_s_body': `Sa'vaxon-suxandon,<br>Soʻzlari biyron-biyron.<br>Soling quloq, qanday soz,<br>Sehrli, sohir ovoz!`,
            'poem_alpha_t_title': `T harfi uchun she'r`,
            'poem_alpha_t_subtitle': `Alifbo she'rlari`,
            'poem_alpha_t_body': `Ёж-портной,<br>Шьет день и ночь.<br>Разные заказы<br>Сложены в узлы.<br>У одинокого павлина<br>Заказ еще не готов.<br>Игла не смогла<br>Проткнуть кожу крокодила.`,
            'poem_alpha_u_title': `U harfi uchun she'r`,
            'poem_alpha_u_subtitle': `Alifbo she'rlari`,
            'poem_alpha_u_body': `Быстрая сова<br>Улетала далеко-далеко.<br>Козленок, решив полетать,<br>Упал на землю.<br>Посмотрев туда-сюда,<br>Глубоко вздохнул:<br>"Если бы у меня были крылья,<br>Я бы тоже летел в небо".`,
            'poem_alpha_v_title': `V harfi uchun she'r`,
            'poem_alpha_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_v_body': `Попугай проповедует:<br>"Нужно быть честным.<br>Дал обещание - и всё,<br>Делай вовремя!"<br>Слова-то правильные,<br>А следует ли им сам?`,
            'poem_alpha_x_title': `X harfi uchun she'r`,
            'poem_alpha_x_subtitle': `Alifbo she'rlari`,
            'poem_alpha_x_body': `Петух-глашатай на рассвете<br>Кричит: "Благая весть!<br>Мы освободились от тьмы,<br>От опасной ночи.<br>Радуйтесь, друзья,<br>Начинается доброе утро!<br>Не храпите лежа,<br>Не погружайтесь в беспечность!"`,
            'poem_alpha_y_title': `Y harfi uchun she'r`,
            'poem_alpha_y_subtitle': `Alifbo she'rlari`,
            'poem_alpha_y_body': `Тигр в полосатой форме -<br>Инспектор дорожного движения.<br>Наблюдает за каждым шагом<br>Проходящих пешеходов.<br>Если кто-то нарушит порядок,<br>Не глядя на светофор,<br>Наставит на путь истинный,<br>Не жалея, накажет.`,
            'poem_alpha_z_title': `Z harfi uchun she'r`,
            'poem_alpha_z_subtitle': `Alifbo she'rlari`,
            'poem_alpha_z_body': `Иволга была ювелиром,<br>Ее серьга - жемчужина.<br>Всегда бдительная,<br>Хранит свое золото.`,
            'poem_alpha_o_v_title': `Oʻ harfi uchun she'r`,
            'poem_alpha_o_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_o_v_body': `Учителя Утки<br>Урок каждый день<br>Усваивают и учат<br>Учащиеся утята.<br>Хоть они и маленькие,<br>Очень уж смышленые.<br>Сразу найдут ответ,<br>Даже если будет десять вопросов.`,
            'poem_alpha_g_v_title': `Gʻ harfi uchun she'r`,
            'poem_alpha_g_v_subtitle': `Alifbo she'rlari`,
            'poem_alpha_g_v_body': `Гусь-певец на сцене<br>Поет "га-га-га".<br>"Не будьте заносчивы,<br>Будьте скромными, друзья", - поет он.<br>Песня-то со смыслом,<br>Но сам он странный.<br>Если бы бросил важничать,<br>Было бы лучше.`,
            'poem_alpha_sh_title': `Sh harfi uchun she'r`,
            'poem_alpha_sh_subtitle': `Alifbo she'rlari`,
            'poem_alpha_sh_body': `К Доктору Льву<br>Хитрая лиса прибежала.<br>"Ой, голова", - соврала она,<br>Сбежав из школы.<br>Лев проверил и сразу<br>Сказал: "Ты здоров, иди в класс!"<br>Лиса вернулась понурая,<br>Опозоренная хитростью.`,
            'poem_alpha_ch_title': `Ch harfi uchun she'r`,
            'poem_alpha_ch_subtitle': `Alifbo she'rlari`,
            'poem_alpha_ch_body': `Кузнечик - отличный музыкант<br>Играет мелодию без устали<br>Сверчки подпевают хором<br>Слышно со всех сторон<br>Красивые бабочки<br>Кружатся в танце,<br>Цветы на лугу<br>Хлопают и радуются`,
            'poem_alpha_ng_title': `Ng harfi uchun she'r`,
            'poem_alpha_ng_subtitle': `Alifbo she'rlari`,
            'poem_alpha_ng_body': `Хитрая акула на всё готовое<br>Ленивый бездельник<br>На добычу на крючке<br>Посмотрела, смотрите<br>Зацепилась за рыло<br>Трепыхается, дело плохо.`,
            'g1_v1_title': "Game 1: Веселая математика",
            'g1_v1_desc': "Увлекательное путешествие в мир математики и логики.",
            'g1_v2_title': "Game 2: Изучаем базовые фигуры",
            'g1_v2_desc': "Определяем круг, квадрат, треугольник и другие.",
            'g1_v3_title': "Game 3: Изучаем монеты",
            'g1_v3_desc': "Базовое введение в монеты и финансовую грамотность.",
            'g1_v4_title': "Game 4: Вычитание для детей",
            'g1_v4_desc': "Изучаем базовые концепции вычитания с визуальными пособиями.",
            'g1_v5_title': "Game 5: Основы дробей",
            'g1_v5_desc': "Введение в половины и четверти для начинающих.",
            'g1_v6_title': "Game 6: Счет до 100",
            'g1_v6_desc': "Практика счета до 100.",
            'g1_v7_title': "Game 7: Фигуры в реальной жизни",
            'g1_v7_desc': "Находим формы в повседневных предметах.",
            'g1_v8_title': "Game 8: Сложение до 20",
            'g1_v8_desc': "Практикуем сложение чисел до 20.",
            'g1_v9_title': "Game 9: Лево и право",
            'g1_v9_desc': "Изучаем разницу между левым и правым направлениями.",
            'g1_v10_title': "Game 1: Простое сложение",
            'g1_v10_desc': "Учимся легко складывать маленькие числа.",
            'g1_v11_title': "Game 2: Большой и маленький",
            'g1_v11_desc': "Понимание концепций размера и базовых измерений.",
            'g1_v12_title': "Game 3: Песня про числа",
            'g1_v12_desc': "Считайте, пойте и танцуйте, чтобы быстро выучить числа.",
            'g1_v13_title': "Game 4: Определение времени",
            'g1_v13_desc': "Учимся понимать время по часам.",
            'g1_v14_title': "Game 5: Больше, меньше",
            'g1_v14_desc': "Учимся сравнивать числа.",
            'g1_v15_title': "Game 6: Счет десятками",
            'g1_v15_desc': "Учимся считать десятками легко и быстро.",
            'g2_v1_title': "Game 1: Песня ABC",
            'g2_v1_desc': "Классическая песня для изучения английского алфавита.",
            'g2_v2_title': "Game 2: Звуки алфавита",
            'g2_v2_desc': "Изучаем фонетические звуки каждой буквы.",
            'g2_v3_title': "Game 3: Песня о цветах",
            'g2_v3_desc': "Изучаем названия различных базовых цветов.",
            'g2_v4_title': "Game 4: Слова о гигиене",
            'g2_v4_desc': "Изучаем слова, связанные с ежедневными процедурами.",
            'g2_v5_title': "Game 5: Слова о погоде",
            'g2_v5_desc': "Какая погода? Изучаем: солнечно, дождливо и др.",
            'g2_v6_title': "Game 6: Части тела",
            'g2_v6_desc': "Песня о частях тела: голова, плечи, колени и пальцы ног.",
            'g2_v7_title': "Game 7: Песня о фруктах",
            'g2_v7_desc': "Учим названия вкусных фруктов.",
            'g2_v8_title': "Game 8: Транспорт",
            'g2_v8_desc': "Изучаем транспортные средства: автобусы, машины и т.д.",
            'g2_v9_title': "Game 9: Члены семьи",
            'g2_v9_desc': "Слова о членах семьи: мама, папа, брат.",
            'g2_v10_title': "Game 1: Дни недели",
            'g2_v10_desc': "Изучаем семь дней недели.",
            'g2_v11_title': "Game 2: Месяцы года",
            'g2_v11_desc': "Изучаем 12 месяцев.",
            'g2_v12_title': "Game 3: Звуки животных",
            'g2_v12_desc': "Изучаем названия животных и их звуки.",
            'g2_v13_title': "Game 4: Антонимы",
            'g2_v13_desc': "Изучаем противоположные слова (горячий-холодный).",
            'g2_v14_title': "Game 5: Слова об одежде",
            'g2_v14_desc': "Изучаем названия предметов одежды.",
            'g2_v15_title': "Game 6: Слова о еде",
            'g2_v15_desc': "Изучаем базовую еду.",
            'g3_v1_title': "Game 1: Как ты себя чувствуешь?",
            'g3_v1_desc': "Учимся выражать эмоции и чувства.",
            'g3_v2_title': "Game 2: Волшебные слова",
            'g3_v2_desc': "Изучаем вежливые слова, такие как 'спасибо'.",
            'g3_v3_title': "Game 3: Делиться полезно",
            'g3_v3_desc': "Изучаем важность умения делиться с друзьями.",
            'g3_v4_title': "Game 4: Знакомство",
            'g3_v4_desc': "Как представиться и завести друзей.",
            'g3_v5_title': "Game 5: По очереди",
            'g3_v5_desc': "Почему важно играть по очереди.",
            'g3_v6_title': "Game 6: Просить прощения",
            'g3_v6_desc': "Как и когда просить прощения.",
            'g3_v7_title': "Game 7: Помогать",
            'g3_v7_desc': "Радость помощи родителям и учителям.",
            'g3_v8_title': "Game 8: Личное пространство",
            'g3_v8_desc': "Уважение личных границ.",
            'g3_v9_title': "Game 9: Навыки слушателя",
            'g3_v9_desc': "Как быть хорошим слушателем.",
            'g3_v10_title': "Game 1: Быть честным",
            'g3_v10_desc': "Важность говорить правду.",
            'g3_v11_title': "Game 2: Командная работа",
            'g3_v11_desc': "Совместная работа для достижения цели.",
            'g3_v12_title': "Game 3: Справиться с гневом",
            'g3_v12_desc': "Здоровые способы справиться с разочарованием.",
            'g3_v13_title': "Game 4: Режим сна",
            'g3_v13_desc': "Создание хороших привычек перед сном.",
            'g3_v14_title': "Game 5: Просить помощи",
            'g3_v14_desc': "Бывает трудно? Проси о помощи.",
            'g3_v15_title': "Game 6: Быть смелым",
            'g3_v15_desc': "Как преодолеть страх и пробовать новое.",
            'g4_v1_title': "Game 1: Творческое задание 1",
            'g4_v1_desc': "Используйте воображение и создавайте новые идеи.",
            'g4_v2_title': "Game 2: Творческое задание 2",
            'g4_v2_desc': "Новые способы рисования и творчества.",
            'g4_v3_title': "Game 3: Создание историй",
            'g4_v3_desc': "Используй фантазию для историй.",
            'g4_v4_title': "Game 4: Рисуем животных",
            'g4_v4_desc': "Простое пошаговое рисование.",
            'g4_v5_title': "Game 5: Основы оригами",
            'g4_v5_desc': "Как складывать из бумаги красивые фигуры.",
            'g4_v6_title': "Game 6: Рисование губкой",
            'g4_v6_desc': "Забавный художественный проект для детей.",
            'g4_v7_title': "Game 7: Музыкальные инструменты",
            'g4_v7_desc': "Узнаем звуки разных инструментов.",
            'g4_v8_title': "Game 1: Теневые куклы",
            'g4_v8_desc': "Как сделать тени руками.",
            'g4_v9_title': "Game 2: Лепка из глины",
            'g4_v9_desc': "Создание простых фигур из пластилина.",
            'g4_v10_title': "Game 3: Поем вместе",
            'g4_v10_desc': "Разминка голоса и веселое пение.",
            'g4_v11_title': "Game 4: Танцевальное веселье",
            'g4_v11_desc': "Двигаем телом и танцуем.",
            'g4_v12_title': "Game 5: Строим из блоков",
            'g4_v12_desc': "Творческое конструирование.",
            'g4_v13_title': "Game 6: Искусство природы",
            'g4_v13_desc': "Создаем картины из листьев и камней.",
            'g4_v14_title': "Game 7: Давай притворимся",
            'g4_v14_desc': "Магия ролевых игр.",
            'g4_v15_title': "Game 8: Рисуем пальцами",
            'g4_v15_desc': "Рисование красками с помощью пальцев.",
            'g5_v1_title': "Game 1: Логическая загадка 1",
            'g5_v1_desc': "Интересное задание для развития логического мышления.",
            'g5_v2_title': "Game 2: Логическая загадка 2",
            'g5_v2_desc': "Игра для проверки внимания и логики.",
            'g5_v3_title': "Game 3: Загадки для детей",
            'g5_v3_desc': "Разгадай логические загадки.",
            'g5_v4_title': "Game 4: Что сюда подходит?",
            'g5_v4_desc': "Сгруппируйте предметы по логике.",
            'g5_v5_title': "Game 5: Среда обитания",
            'g5_v5_desc': "Какое животное где живет? Логика.",
            'g5_v6_title': "Game 6: Порядок планет",
            'g5_v6_desc': "Логическая последовательность планет.",
            'g5_v7_title': "Game 7: Жизненные циклы",
            'g5_v7_desc': "Понимание причины и следствия.",
            'g5_v8_title': "Game 8: Факты о динозаврах",
            'g5_v8_desc': "Сортировка по типу.",
            'g5_v9_title': "Game 9: Сортировка",
            'g5_v9_desc': "Сортируем по цвету, размеру и форме.",
            'g5_v10_title': "Game 10: Лабиринты",
            'g5_v10_desc': "Прохождение простых лабиринтов.",
            'g5_v11_title': "Game 11: Найди отличия",
            'g5_v11_desc': "Ищем отличия между картинками.",
            'g5_v12_title': "Game 12: Последовательность",
            'g5_v12_desc': "Что было сначала, а что потом?",
            'g5_v13_title': "Game 13: По размеру",
            'g5_v13_desc': "Сортировка от маленького к большому.",
            'g5_v14_title': "Game 14: Совпадение теней",
            'g5_v14_desc': "Угадываем предметы по силуету.",
            'g5_v15_title': "Game 15: От части к целому",
            'g5_v15_desc': "Понимание целого из кусочков.",
        }
    };

    const langSelect = document.getElementById('lang-select');

    // Make currentLang globally accessible
    window.currentLang = 'en';

    function updateLanguage(lang) {
        window.currentLang = lang;
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        localStorage.setItem('selectedLang', lang);
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });

        // Check local storage or default to en
        const savedLang = localStorage.getItem('selectedLang') || 'en';
        langSelect.value = savedLang;
        updateLanguage(savedLang);
    }

    // --- Settings Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const textSizeSlider = document.getElementById('text-size-slider');
    const textSizeValue = document.getElementById('text-size-value');

    // 1. Theme Logic
    function applyTheme(isLight) {
        if (isLight) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }

    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        const isLight = savedTheme === 'light';
        themeToggle.checked = isLight;
        applyTheme(isLight);

        themeToggle.addEventListener('change', (e) => {
            const isLight = e.target.checked;
            applyTheme(isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    } else {
        // Apply theme on other pages (where toggle might not exist)
        const savedTheme = localStorage.getItem('theme');
        applyTheme(savedTheme === 'light');
    }

    // 2. Text Size/Scale Logic
    function applyTextSize(size) {
        // Option A: Zoom (simpler for full scaling)
        // document.body.style.zoom = size + '%';

        // Option B: REM scaling (better accessibility)
        document.documentElement.style.fontSize = size + '%';

        if (textSizeValue) {
            textSizeValue.textContent = size + '%';
        }
    }

    if (textSizeSlider) {
        // Load saved size
        const savedSize = localStorage.getItem('textSize') || '100';
        textSizeSlider.value = savedSize;
        applyTextSize(savedSize);

        textSizeSlider.addEventListener('input', (e) => {
            const size = e.target.value;
            applyTextSize(size);
            localStorage.setItem('textSize', size);
        });
    } else {
        // Apply size on other pages
        const savedSize = localStorage.getItem('textSize') || '100';
        applyTextSize(savedSize);
    }

    // 3. Sidebar Color Logic
    const sidebarColorPicker = document.getElementById('sidebar-color-picker');

    function applySidebarColor(color) {
        document.documentElement.style.setProperty('--sidebar-bg', color);
    }

    if (sidebarColorPicker) {
        // Load saved color
        // Default depends on theme, but we can just use the computed style if not saved, 
        // or let CSS handle specific defaults if localStorage is empty.
        const savedColor = localStorage.getItem('sidebarColor');

        if (savedColor) {
            sidebarColorPicker.value = savedColor;
            applySidebarColor(savedColor);
        }

        sidebarColorPicker.addEventListener('input', (e) => {
            const color = e.target.value;
            applySidebarColor(color);
            localStorage.setItem('sidebarColor', color);
        });
    } else {
        const savedColor = localStorage.getItem('sidebarColor');
        if (savedColor) {
            applySidebarColor(savedColor);
        }
    }

    // 4. Reset Settings Function
    window.resetSettings = function () {
        // Reset theme to dark
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.checked = false;
            document.body.classList.remove('light-mode');
            localStorage.removeItem('theme');
        }

        // Reset text size to 100%
        const textSizeSlider = document.getElementById('text-size-slider');
        if (textSizeSlider) {
            textSizeSlider.value = '100';
            applyTextSize('100');
            localStorage.removeItem('textSize');
        }

        // Reset sidebar color to default (#0f172a)
        const sidebarColorPicker = document.getElementById('sidebar-color-picker');
        if (sidebarColorPicker) {
            const defaultColor = '#0f172a';
            sidebarColorPicker.value = defaultColor;
            applySidebarColor(defaultColor);
            localStorage.removeItem('sidebarColor');
        }

        // Show confirmation feedback
        alert(translations[currentLang]['reset_settings_btn'] || 'Settings reset to default!');
    };

    // 5. Saved Videos Logic (localStorage)
    const videoGrid = document.getElementById('video-grid');

    function renderVideos(videos) {
        if (!videoGrid) return;
        videoGrid.innerHTML = '';

        if (videos.length === 0) {
            videoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No videos saved yet.</p>';
            return;
        }

        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card';

            const videoSrc = video.src;
            const videoId = video.id;

            const isYouTube = videoSrc.includes('youtube.com/embed/');
            const videoContent = isYouTube
                ? `<iframe src="${videoSrc}" frameborder="0" allowfullscreen style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"></iframe>`
                : `<video src="${videoSrc}" poster="${video.poster || 'bg-mobile.jpg'}" preload="metadata" style="width: 100%; height: 100%; object-fit: cover;"></video>`;

            card.innerHTML = `
                <div class="video-wrapper ${isYouTube ? 'is-playing' : ''}" onclick="${isYouTube ? '' : 'toggleVideo(this)'}">
                    ${videoContent}
                    ${!isYouTube ? `
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>` : ''}
                </div>
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                    <div class="video-desc">${video.description || ''}</div>
                    <button class="delete-video-btn" onclick="deleteVideo('${videoId}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            videoGrid.appendChild(card);
        });
    }

    // Function to save a video
    window.saveVideo = function (title, description, src, poster) {
        saveLocally(title, description, src, poster);
    };

    function saveLocally(title, description, src, poster) {
        const videos = JSON.parse(localStorage.getItem('savedVideos')) || [];
        if (videos.some(v => v.src === src)) {
            alert('This video is already in your library!');
            return;
        }
        const finalPoster = poster || src.replace('.mp4', '.jpg');
        const newVideo = {
            id: Date.now(),
            title: title,
            description: description,
            src: src,
            poster: finalPoster,
            savedAt: new Date().toLocaleDateString()
        };
        videos.push(newVideo);
        localStorage.setItem('savedVideos', JSON.stringify(videos));
        alert('Video saved to your local library!');
    }

    // Function to delete a video
    window.deleteVideo = function (id) {
        if (!confirm('Are you sure you want to delete this video?')) return;

        let videos = JSON.parse(localStorage.getItem('savedVideos')) || [];
        videos = videos.filter(v => v.id !== parseInt(id));
        localStorage.setItem('savedVideos', JSON.stringify(videos));
        loadVideos();
    };

    // Load videos if we are on the videos page
    if (videoGrid) {
        loadVideos();
    }

    // 6. Age Selection Modal Logic
    const ageModal = document.getElementById('age-modal');
    const ageDisplay = document.getElementById('age-display');

    // Function to show age selection modal
    function showAgeModal() {
        if (ageModal) {
            ageModal.style.display = 'flex';
        }
    }

    // Function to hide age selection modal
    function hideAgeModal() {
        if (ageModal) {
            ageModal.style.display = 'none';
        }
    }

    // Function to update age display
    function updateAgeDisplay(ageKey) {
        if (ageDisplay) {
            const ageText = translations[window.currentLang][ageKey];
            const ageLabel = translations[window.currentLang]['age_label'];
            ageDisplay.innerHTML = `<span data-i18n="age_label">${ageLabel}</span> <span data-i18n="${ageKey}">${ageText}</span>`;
        }
    }

    // Function to filter videos by age
    function filterVideosByAge(ageKey) {
        const videoCards = document.querySelectorAll('.video-card');
        if (videoCards.length === 0) return;

        videoCards.forEach(card => {
            const cardAge = card.getAttribute('data-age');
            if (!ageKey || cardAge === ageKey) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Make selectAge globally accessible
    window.selectAge = function (ageKey) {
        localStorage.setItem('selectedAge', ageKey);
        updateAgeDisplay(ageKey);
        filterVideosByAge(ageKey);
        hideAgeModal();
    };

    // Check if age is already selected
    const savedAge = localStorage.getItem('selectedAge');
    const isGamePage = window.location.pathname.includes('game-');

    if (isGamePage) {
        // Always show modal on game pages as requested
        showAgeModal();
        if (savedAge) {
            updateAgeDisplay(savedAge);
            filterVideosByAge(savedAge);
        }
    } else if (savedAge) {
        updateAgeDisplay(savedAge);
    } else {
        // Show modal on home page if no age selected
        showAgeModal();
    }

    // Update age display when language changes
    const originalUpdateLanguage = updateLanguage;
    updateLanguage = function (lang) {
        originalUpdateLanguage(lang);
        const savedAge = localStorage.getItem('selectedAge');
        if (savedAge) {
            updateAgeDisplay(savedAge);
        }
    };
});

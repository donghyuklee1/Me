// 메뉴 클릭 기능
document.addEventListener('DOMContentLoaded', function() {
    // Research와 Projects 메뉴 항목 클릭 이벤트
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.getAttribute('data-type');
            const itemNum = this.getAttribute('data-item');
            const itemName = this.textContent.trim();
            
            console.log(`Clicked: ${type} #${itemNum} - ${itemName}`);
            
            // Research 섹션으로 전환
            if (type === 'research') {
                const researchSectionId = `research-item-${itemNum}`;
                showSection(researchSectionId);
            }
        });
    });

    // Research 섹션 제목은 클릭 불가 (제거됨)

    // 현재 선택된 섹션 추적
    let currentSectionId = 'about-section';
    
    // 섹션 전환 함수
    function showSection(sectionId) {
        // 모든 섹션 숨기기
        const allSections = document.querySelectorAll('.content-section');
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // 선택한 섹션 표시
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'flex';
            // 스크롤을 맨 위로 이동
            const rightColumn = document.querySelector('.right-column');
            if (rightColumn) {
                rightColumn.scrollTop = 0;
            }
        }
        
        // 현재 섹션 업데이트
        currentSectionId = sectionId;
        
        // 메뉴 활성화 상태 업데이트
        updateActiveMenu(sectionId);
    }
    
    // 메뉴 활성화 상태 업데이트 함수
    function updateActiveMenu(sectionId) {
        // 모든 메뉴 항목에서 active 클래스 제거
        const allMenuItems = document.querySelectorAll('.menu-item, .link');
        allMenuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 현재 섹션에 해당하는 메뉴 항목 찾기
        if (sectionId === 'about-section') {
            const aboutLink = document.getElementById('about-link');
            if (aboutLink) aboutLink.classList.add('active');
        } else if (sectionId === 'contact-section') {
            const contactLink = document.getElementById('contact-link');
            if (contactLink) contactLink.classList.add('active');
        } else if (sectionId === 'photos-section') {
            const photosLink = document.getElementById('photos-link');
            if (photosLink) photosLink.classList.add('active');
        } else if (sectionId.startsWith('research-item-')) {
            const itemNum = sectionId.replace('research-item-', '');
            const researchItem = document.querySelector(`.menu-item[data-type="research"][data-item="${itemNum}"]`);
            if (researchItem) researchItem.classList.add('active');
        }
    }
    
    // About 링크 클릭 이벤트
    const aboutLink = document.getElementById('about-link');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('about-section');
            console.log('About clicked');
        });
    }
    
    // Contact 링크 클릭 이벤트
    const contactLink = document.getElementById('contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('contact-section');
            console.log('Contact clicked');
        });
    }
    
    // Photos 링크 클릭 이벤트
    const photosLink = document.getElementById('photos-link');
    if (photosLink) {
        photosLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('photos-section');
            console.log('Photos clicked');
        });
    }
    
    // 초기 로드 시 About 섹션 활성화
    updateActiveMenu('about-section');
    
    // 메모 버튼 클릭 이벤트
    const memoToggle = document.getElementById('memo-toggle');
    const memoSection = document.getElementById('memo-section');
    const memoClose = document.getElementById('memo-close');
    const memoDisplay = document.getElementById('memo-display');
    
    // 근황 데이터 (여기에 직접 작성하세요)
    const statusUpdates = [
        { date: '2026년 1월 3일', message: '새로운 웹사이트로 이전하였습니다.' }
    ];
    
    // 근황 표시 함수
    function displayStatusUpdates() {
        if (!memoDisplay) return;
        
        if (statusUpdates.length === 0) {
            memoDisplay.innerHTML = '<div class="memo-empty">아직 등록된 근황이 없습니다.</div>';
            return;
        }
        
        // 날짜순으로 정렬 (최신순)
        const sortedUpdates = [...statusUpdates].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        memoDisplay.innerHTML = sortedUpdates.map(update => `
            <div class="memo-entry">
                <div class="memo-display-date">${update.date}</div>
                <div class="memo-display-message">${update.message}</div>
            </div>
        `).join('');
    }
    
    // 초기 로드
    displayStatusUpdates();
    
    // Donghyuk Lee 클릭 시 CV 다운로드
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        nameElement.addEventListener('click', function(e) {
            e.preventDefault();
            // CV PDF 파일 경로 (실제 파일 경로로 변경하세요)
            const cvPath = 'cv/Donghyuk_Lee_CV.pdf';
            
            // 파일 다운로드
            const link = document.createElement('a');
            link.href = cvPath;
            link.download = 'Donghyuk_Lee_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // 메모 토글
    if (memoToggle) {
        memoToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (memoSection) {
                const isVisible = memoSection.style.display !== 'none';
                memoSection.style.display = isVisible ? 'none' : 'block';
                
                // 버튼 상태 토글
                if (isVisible) {
                    memoToggle.classList.remove('active');
                } else {
                    memoToggle.classList.add('active');
                }
            }
        });
    }
    
    // 메모 닫기 버튼 클릭 시 버튼 상태도 업데이트
    if (memoClose) {
        memoClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (memoSection) {
                memoSection.style.display = 'none';
                if (memoToggle) {
                    memoToggle.classList.remove('active');
                    }
                }
            });
    }
    
    // 메모 닫기
    if (memoClose) {
        memoClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (memoSection) {
                memoSection.style.display = 'none';
            }
        });
    }
    
    // 색상 테마 변경 기능 (하나의 점으로 순환)
    const colorDot = document.getElementById('theme-dot');
    const colors = ['#000000', '#0066cc', '#cc0066', '#009966', '#996600', '#6600cc'];
    let currentColorIndex = parseInt(localStorage.getItem('themeColorIndex')) || 0;
    let currentColor = colors[currentColorIndex];
    
    // body 변수 먼저 정의
    const body = document.body;
    
    // 함수 먼저 정의
    function applyTheme(color) {
        const isDark = body.classList.contains('dark-mode');
        
        // 다크모드일 때는 색상을 밝게 조정하여 적용
        let actualColor;
        if (isDark) {
            if (color === '#000000') {
                // 검은색은 다크모드에서 흰색으로
                actualColor = '#ffffff';
            } else {
                // 다른 색상은 밝게 조정 (다크모드에서 보이도록)
                actualColor = lightenColor(color, 0.3);
            }
        } else {
            actualColor = color;
        }
        
        // 모든 텍스트 색상 변경
        const textElements = document.querySelectorAll('body, .name, .section-title, .list li a, .link, .section-main-title, .biography, .contact-item, .research-title, .research-subtitle, .contact-link, .about-subtitle, .about-list-item, .memo-title, .memo-close, .photo-caption');
        textElements.forEach(el => {
            el.style.color = actualColor;
        });
        
        // 설명 텍스트는 회색 유지하되 약간 조정
        const descriptions = document.querySelectorAll('.research-description');
        descriptions.forEach(el => {
            // 색상 테마에 따라 설명 텍스트 색상 조정
            if (isDark) {
                // 다크모드에서는 설명 텍스트를 더 밝게
                if (color === '#000000') {
                    el.style.color = '#cccccc';
                } else {
                    el.style.color = lightenColor(color, 0.5);
                }
            } else if (color === '#000000') {
                el.style.color = '#666666';
            } else {
                el.style.color = adjustBrightness(color, 0.6);
            }
        });
        
        // 사진 테두리 색상 변경
        const photoBorders = document.querySelectorAll('.photo-item .photo-placeholder, .photo-image');
        photoBorders.forEach(el => {
            el.style.borderColor = actualColor;
        });
        
        // 캡션 배경색과 테두리 색상도 테마 색상으로 변경
        const photoCaptions = document.querySelectorAll('.photo-caption');
        photoCaptions.forEach(el => {
            el.style.backgroundColor = actualColor;
            el.style.borderTopColor = actualColor;
            // 텍스트 색상은 배경에 맞게 조정
            if (isDark) {
                el.style.color = '#000000';
            } else {
                // 라이트모드에서는 배경색에 따라 텍스트 색상 조정
                if (color === '#000000') {
                    el.style.color = '#ffffff';
                } else {
                    el.style.color = '#ffffff';
                }
            }
        });
        
        
        // 호버 효과 색상도 조정
        const style = document.createElement('style');
        style.id = 'dynamic-theme';
        style.textContent = `
            .list li a:hover {
                opacity: 0.6;
            }
            .link:hover {
                opacity: 0.6;
            }
        `;
        
        // 기존 동적 스타일 제거 후 추가
        const existingStyle = document.getElementById('dynamic-theme');
        if (existingStyle) {
            existingStyle.remove();
        }
        document.head.appendChild(style);
    }
    
    function updateColorDot(color) {
        if (colorDot) {
            colorDot.style.backgroundColor = color;
        }
    }
    
    function adjustBrightness(color, factor) {
        // 간단한 밝기 조정 함수 (어둡게)
        if (color === '#000000') return '#666666';
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            const newR = Math.round(r * factor);
            const newG = Math.round(g * factor);
            const newB = Math.round(b * factor);
            return `rgb(${newR}, ${newG}, ${newB})`;
        }
        return color;
    }
    
    function lightenColor(color, factor) {
        // 색상을 밝게 조정하는 함수 (다크모드용)
        if (color === '#000000') return '#ffffff';
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            // 밝게 조정: 원래 색상 + (255 - 원래 색상) * factor
            const newR = Math.min(255, Math.round(r + (255 - r) * factor));
            const newG = Math.min(255, Math.round(g + (255 - g) * factor));
            const newB = Math.min(255, Math.round(b + (255 - b) * factor));
            // hex로 변환
            const toHex = (n) => {
                const hex = n.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
        }
        return color;
    }
    
    // 저장된 색상 적용 (함수 정의 후)
    applyTheme(currentColor);
    updateColorDot(currentColor);
    
    console.log('Color dot element:', colorDot);
    
    // 색상 테마 버튼 클릭 이벤트
    if (colorDot) {
        colorDot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Color dot clicked!');
            // 다음 색상으로 순환
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            currentColor = colors[currentColorIndex];
            
            console.log('New color index:', currentColorIndex, 'New color:', currentColor);
            
            // 로컬 스토리지에 저장
            localStorage.setItem('themeColorIndex', currentColorIndex);
            localStorage.setItem('themeColor', currentColor);
            
            // 테마 적용
            applyTheme(currentColor);
            updateColorDot(currentColor);
        });
        console.log('Color dot event listener added');
    } else {
        console.error('Color dot element not found!');
    }
    
    // 다크/라이트 모드 토글 기능
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const animationMouse = document.getElementById('animation-mouse');
    
    console.log('Theme elements:', {
        themeToggle: themeToggle,
        themeIcon: themeIcon,
        animationMouse: animationMouse,
        body: body
    });
    
    // 저장된 테마 불러오기
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    const isMobile = window.innerWidth <= 768;
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.textContent = '🐁';
        }
        if (themeToggle) {
            if (isMobile) {
                // 모바일: 고정 위치
                themeToggle.style.display = 'none';
                themeToggle.style.opacity = '0';
            } else {
                // 데스크톱: 기존 로직
                themeToggle.style.display = 'none';
                themeToggle.style.animation = 'none';
                themeToggle.style.top = '20px';
                themeToggle.style.bottom = 'auto';
                themeToggle.style.left = '0';
                themeToggle.style.opacity = '0';
            }
        }
        // 쥐가 버튼 위치에 있도록
        if (animationMouse) {
            animationMouse.style.opacity = '1';
            animationMouse.style.display = 'flex';
            if (isMobile) {
                // 모바일: 고정 위치
                animationMouse.style.top = '10px';
                animationMouse.style.right = '30px';
                animationMouse.style.bottom = 'auto';
                animationMouse.style.left = 'auto';
            } else {
                // 데스크톱: 기존 위치
                animationMouse.style.bottom = '20px';
                animationMouse.style.left = '50px';
            }
            animationMouse.classList.add('clickable');
        }
        // 다크모드일 때 현재 선택된 색상 테마 적용 (밝게 조정됨)
        applyTheme(currentColor);
    } else {
        // 라이트 모드일 때 초기 색상 적용 (다크모드가 아닐 때만)
        if (!body.classList.contains('dark-mode')) {
            applyTheme(currentColor);
        }
        if (themeToggle && isMobile) {
            // 모바일: 고정 위치
            themeToggle.style.top = '10px';
            themeToggle.style.right = '30px';
            themeToggle.style.bottom = 'auto';
            themeToggle.style.left = 'auto';
        }
    }
    
    function toggleTheme() {
        console.log('toggleTheme called, isDarkMode:', isDarkMode);
        const isMobile = window.innerWidth <= 768;
        
        if (themeToggle && (themeToggle.classList.contains('flying') || (animationMouse && animationMouse.classList.contains('crawling')))) {
            console.log('Animation in progress, ignoring');
            return; // 애니메이션 중이면 무시
        }
        
        if (isDarkMode) {
            console.log('Switching from dark to light mode');
            // 다크 모드 -> 라이트 모드
            if (isMobile) {
                // 모바일: 애니메이션 없이 즉시 전환
                if (animationMouse) {
                    animationMouse.style.opacity = '0';
                    animationMouse.style.display = 'none';
                }
                if (themeToggle) {
                    themeToggle.style.display = 'flex';
                    themeToggle.style.opacity = '1';
                    themeToggle.style.top = '10px';
                    themeToggle.style.right = '30px';
                    themeToggle.style.bottom = 'auto';
                    themeToggle.style.left = 'auto';
                }
                body.classList.remove('dark-mode');
                applyTheme(currentColor);
                if (themeIcon) {
                    themeIcon.textContent = '🕊️';
                }
                isDarkMode = false;
                localStorage.setItem('darkMode', 'false');
            } else {
                // 데스크톱: 쥐가 왼쪽으로 기어서 사라지는 애니메이션만 실행
                if (animationMouse) {
                    animationMouse.classList.add('crawling');
                    animationMouse.classList.remove('crawl-in');
                    animationMouse.classList.add('crawl-out');
                    animationMouse.classList.remove('clickable');
                }
                
                setTimeout(() => {
                    if (animationMouse) {
                        animationMouse.classList.remove('crawl-out', 'crawling');
                        animationMouse.style.opacity = '0';
                    }
                    
                    // 쥐가 사라진 후 새가 그 자리에 나타남 (애니메이션 없이)
                    if (themeToggle) {
                        themeToggle.style.display = 'flex';
                        themeToggle.style.animation = 'none';
                        themeToggle.style.transform = 'none';
                        themeToggle.style.top = '';
                        themeToggle.style.bottom = '20px';
                        themeToggle.style.left = '50px';
                        themeToggle.style.opacity = '1';
                    }
                    
                    body.classList.remove('dark-mode');
                    // 다크모드 해제 후 색상 테마 다시 적용
                    applyTheme(currentColor);
                    if (themeIcon) {
                        themeIcon.textContent = '🕊️';
                    }
                    isDarkMode = false;
                    localStorage.setItem('darkMode', 'false');
                }, 1000);
            }
        } else {
            console.log('Switching from light to dark mode');
            // 라이트 모드 -> 다크 모드
            if (isMobile) {
                // 모바일: 애니메이션 없이 즉시 전환
                if (themeToggle) {
                    themeToggle.style.display = 'none';
                    themeToggle.style.opacity = '0';
                }
                if (animationMouse) {
                    animationMouse.style.opacity = '1';
                    animationMouse.style.display = 'flex';
                    animationMouse.style.top = '10px';
                    animationMouse.style.right = '30px';
                    animationMouse.style.bottom = 'auto';
                    animationMouse.style.left = 'auto';
                }
                body.classList.add('dark-mode');
                applyTheme(currentColor);
                if (themeIcon) {
                    themeIcon.textContent = '🐁';
                }
                isDarkMode = true;
                localStorage.setItem('darkMode', 'true');
            } else {
                // 데스크톱: 새가 날아가는 애니메이션만 실행
                if (themeToggle) {
                    // 애니메이션을 방해하는 인라인 스타일 제거
                    themeToggle.style.animation = '';
                    themeToggle.style.transform = '';
                    themeToggle.style.display = 'flex';
                    themeToggle.style.opacity = '1';
                    
                    // 애니메이션 클래스 추가
                    themeToggle.classList.add('flying');
                    themeToggle.classList.add('fly-up');
                    
                    console.log('Fly-up animation started');
                    
                    // 화면 밖으로 사라지는 순간 감지 (약 50% 지점에서 중단)
                    let animationStopped = false;
                    const stopAnimation = function() {
                        if (!animationStopped && themeToggle) {
                            animationStopped = true;
                            console.log('Animation stopped - out of screen');
                            
                            // 애니메이션 즉시 중단
                            themeToggle.style.animation = 'none';
                            themeToggle.style.transform = 'none';
                            // 애니메이션 클래스 제거
                            themeToggle.classList.remove('fly-up', 'flying');
                            // 완전히 숨기기
                            themeToggle.style.display = 'none';
                            themeToggle.style.opacity = '0';
                            // 위치 초기화
                            themeToggle.style.top = '';
                            themeToggle.style.bottom = '';
                            themeToggle.style.left = '';
                        }
                    };
                    
                    // 화면 밖으로 나가는 시점(약 0.5초 후)에 애니메이션 중단
                    setTimeout(stopAnimation, 500);
                    
                    // 백업: 애니메이션 종료 이벤트 리스너 (혹시 모를 경우 대비)
                    const handleAnimationEnd = function() {
                        if (!animationStopped) {
                            stopAnimation();
                            themeToggle.removeEventListener('animationend', handleAnimationEnd);
                        }
                    };
                    
                    themeToggle.addEventListener('animationend', handleAnimationEnd);
                }
                
                // 새가 사라진 후 쥐가 그 자리에 나타남 (애니메이션 없이)
                setTimeout(() => {
                    if (animationMouse) {
                        animationMouse.style.opacity = '1';
                        animationMouse.style.bottom = '20px';
                        animationMouse.style.left = '50px';
                        animationMouse.classList.add('clickable');
                    }
                    
                    body.classList.add('dark-mode');
                    // 다크모드 적용 후 현재 선택된 색상 테마 적용 (밝게 조정됨)
                    applyTheme(currentColor);
                    if (themeIcon) {
                        themeIcon.textContent = '🐁';
                    }
                    isDarkMode = true;
                    localStorage.setItem('darkMode', 'true');
                }, 600); // 애니메이션이 500ms에 중단되므로 약간의 여유를 두고 실행
            }
        }
    }
    
    // 새 클릭 이벤트 (라이트모드일 때)
    if (themeToggle) {
        // 버튼 전체에 이벤트 리스너 추가
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isMobile = window.innerWidth <= 768;
            console.log('Theme toggle clicked, isDarkMode:', isDarkMode, 'flying:', this.classList.contains('flying'), 'isMobile:', isMobile);
            
            // 모바일에서는 항상 작동
            if (isMobile) {
                console.log('Calling toggleTheme from button (mobile)');
                toggleTheme();
            } else if (!isDarkMode && !this.classList.contains('flying')) {
                console.log('Calling toggleTheme from button (desktop)');
                toggleTheme();
            }
        });
        
        // 아이콘에도 이벤트 리스너 추가 (버블링 방지)
        if (themeIcon) {
            themeIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const isMobile = window.innerWidth <= 768;
                console.log('Theme icon clicked, isDarkMode:', isDarkMode, 'isMobile:', isMobile);
                
                // 모바일에서는 항상 작동
                if (isMobile) {
                    console.log('Calling toggleTheme from icon (mobile)');
                    toggleTheme();
                } else if (!isDarkMode && !themeToggle.classList.contains('flying')) {
                    console.log('Calling toggleTheme from icon (desktop)');
                    toggleTheme();
                }
            });
        }
    } else {
        console.error('themeToggle element not found!');
    }
    
    // 쥐 클릭 이벤트 (다크모드일 때)
    if (animationMouse) {
        animationMouse.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isMobile = window.innerWidth <= 768;
            console.log('Mouse clicked, isDarkMode:', isDarkMode, 'crawling:', this.classList.contains('crawling'), 'isMobile:', isMobile);
            
            // 모바일에서는 항상 작동
            if (isMobile) {
                console.log('Calling toggleTheme from mouse (mobile)');
                toggleTheme();
            } else if (isDarkMode && !this.classList.contains('crawling')) {
                console.log('Calling toggleTheme from mouse (desktop)');
                toggleTheme();
            }
        });
    } else {
        console.error('animationMouse element not found!');
    }
    
    // 디버깅: 모든 버튼 요소 확인
    console.log('Button elements check:', {
        themeToggle: themeToggle,
        themeIcon: themeIcon,
        animationMouse: animationMouse,
        colorDot: colorDot,
        memoToggle: memoToggle
    });
    
    // 디버깅 정보
    console.log('Theme toggle initialized:', {
        themeToggle: themeToggle,
        themeIcon: themeIcon,
        animationMouse: animationMouse,
        isDarkMode: isDarkMode,
        colorDot: colorDot
    });
    
    // 모바일에서 Research 항목 접기/펼치기 (모바일에서만 작동)
    const researchToggleMobile = document.getElementById('research-toggle-mobile');
    const researchList = document.getElementById('research-list');
    
    if (researchToggleMobile && researchList) {
        // 모바일에서만 작동하도록 체크
        const checkMobile = () => window.innerWidth <= 768;
        
        // 초기 상태 설정
        if (checkMobile()) {
            researchList.classList.add('collapsed');
            researchToggleMobile.classList.add('collapsed');
        } else {
            // 데스크톱에서는 항상 펼쳐져 있고 클릭 불가
            researchList.classList.remove('collapsed');
            researchToggleMobile.classList.remove('collapsed');
            researchToggleMobile.style.cursor = 'default';
            researchToggleMobile.style.pointerEvents = 'none';
        }
        
        researchToggleMobile.addEventListener('click', function(e) {
            // 모바일에서만 작동
            if (!checkMobile()) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            const isCollapsed = researchList.classList.contains('collapsed');
            
            if (isCollapsed) {
                researchList.classList.remove('collapsed');
                researchToggleMobile.classList.remove('collapsed');
            } else {
                researchList.classList.add('collapsed');
                researchToggleMobile.classList.add('collapsed');
            }
        });
        
        // 화면 크기 변경 시 처리
        window.addEventListener('resize', function() {
            if (checkMobile()) {
                // 모바일: 토글 가능하도록 설정
                researchToggleMobile.style.cursor = 'pointer';
                researchToggleMobile.style.pointerEvents = 'auto';
                // 초기 상태가 접혀있지 않으면 접기
                if (!researchList.classList.contains('collapsed') && !localStorage.getItem('researchExpanded')) {
                    researchList.classList.add('collapsed');
                    researchToggleMobile.classList.add('collapsed');
                }
            } else {
                // 데스크톱: 항상 펼쳐져 있고 클릭 불가
                researchList.classList.remove('collapsed');
                researchToggleMobile.classList.remove('collapsed');
                researchToggleMobile.style.cursor = 'default';
                researchToggleMobile.style.pointerEvents = 'none';
            }
        });
    }
});

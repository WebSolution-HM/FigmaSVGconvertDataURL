# 🔄 SVG → Data URL 변환기

Figma에서 선택한 요소를 SVG로 변환하고, 웹에서 바로 사용할 수 있는 Data URL 형식으로 자동 변환해주는 플러그인입니다.

## ✨ 주요 기능

### 🎯 **실시간 변환**
- Figma에서 요소를 선택하면 자동으로 SVG 변환
- 선택 변경 시 실시간으로 결과 업데이트
- 변환 과정에서 오류 발생 시 친화적인 안내 메시지 제공

### 🛠 **SVG 최적화**
- **공백 및 줄바꿈 제거**: 불필요한 공백과 줄바꿈 문자 자동 정리
- **속성 정리**: xmlns 속성을 맨 앞으로 이동하여 표준화
- **압축**: 최소한의 크기로 SVG 코드 압축

### 📋 **간편한 복사**
- **원클릭 복사**: 버튼 클릭 한 번으로 클립보드에 복사
- **텍스트 선택**: 코드 영역 클릭으로 전체 텍스트 자동 선택
- **이중 출력**: 정리된 SVG 코드와 Data URL 모두 제공

## 🚀 사용 방법

### 1단계: 요소 선택
- Figma에서 SVG로 변환하고 싶은 요소를 선택합니다
- 벡터, 프레임, 컴포넌트 등 모든 요소 지원

### 2단계: 플러그인 실행
- 플러그인 메뉴에서 "🔄 SVG → Data URL 변환기" 선택
- 플러그인 창이 열리고 자동으로 변환 시작

### 3단계: 결과 확인 및 복사
- **정리된 SVG**: 웹 표준에 맞게 최적화된 SVG 코드
- **Data URL**: CSS나 HTML에서 바로 사용 가능한 형식
- "클립보드에 복사" 버튼으로 Data URL 복사

### 4단계: 웹에서 사용
```css
/* CSS에서 배경 이미지로 사용 */
.icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'...");
}
```

```html
<!-- HTML에서 이미지로 사용 -->
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'..." alt="아이콘">
```

## 📦 Figma 플러그인 등록 가이드

### 🔧 개발자용 설치 (로컬 테스트)

#### 1단계: 개발 모드 활성화
1. **Figma 열기** → 좌측 상단 메뉴(☰) 클릭
2. **"플러그인"** → **"개발"** → **"새 플러그인"** 선택
3. **"플러그인 매니페스트 링크"** 선택

#### 2단계: 매니페스트 파일 연결
1. **"manifest.json 선택"** 버튼 클릭
2. 이 프로젝트의 `FigmaSVGconvertDataURL/manifest.json` 파일 선택
3. **"플러그인 생성"** 버튼 클릭

#### 3단계: 플러그인 실행
1. **플러그인** → **개발** → **"🔄 SVG → Data URL 변환기"** 선택
2. 플러그인 창이 열리면 설치 완료!

### 🌐 공개 플러그인 등록 (Figma Community)

#### 1단계: 플러그인 준비
- [ ] 플러그인 아이콘 준비 (512x512px PNG)
- [ ] 스크린샷 준비 (1600x1200px 권장)
- [ ] 플러그인 설명 작성
- [ ] 테스트 완료

#### 2단계: Figma Community 제출
1. **Figma Community** (figma.com/community) 접속
2. **"플러그인 게시"** 선택
3. **플러그인 정보 입력**:
   - 이름: "SVG → Data URL 변환기"
   - 설명: SVG를 Data URL로 변환하는 플러그인
   - 카테고리: "개발자 도구" 또는 "유틸리티"
   - 태그: svg, dataurl, 변환, 웹개발

#### 3단계: 검토 및 승인
- Figma 팀 검토 (보통 1-2주 소요)
- 승인 후 Community에 공개
- 사용자들이 설치 및 사용 가능

## 📂 프로젝트 구조

```
FigmaSVGconvertDataURL/
├── manifest.json    # 플러그인 설정 파일
├── code.js         # 메인 로직 (SVG 변환 및 처리)
├── ui.html         # 사용자 인터페이스
└── README.md       # 이 문서
```

## 🛠 개발 정보

### 기술 스택
- **Figma Plugin API**: 플러그인 프레임워크
- **JavaScript**: 메인 로직 구현
- **HTML/CSS**: UI 구현
- **SVG Processing**: 문자열 파싱 및 최적화

### 주요 함수
- `convertSelectedSVG()`: 선택된 요소를 SVG로 변환
- `selectText()`: 텍스트 영역 자동 선택
- `copyToClipboard()`: 클립보드 복사 기능

### 브라우저 호환성
- **클립보드 API**: Chrome 66+, Firefox 63+
- **백업 방식**: execCommand (모든 브라우저 지원)

## 🔄 업데이트 내역

### v1.0.0 (2024)
- ✅ 기본 SVG → Data URL 변환 기능
- ✅ 실시간 선택 감지
- ✅ 클립보드 복사 기능
- ✅ SVG 코드 최적화

## 🤝 기여하기

1. **Fork** 이 저장소
2. **Feature branch** 생성 (`git checkout -b feature/새기능`)
3. **변경사항 커밋** (`git commit -am '새 기능 추가'`)
4. **브랜치 푸시** (`git push origin feature/새기능`)
5. **Pull Request** 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🙋‍♂️ 문의사항

플러그인 사용 중 문제가 발생하거나 기능 제안이 있으시면 GitHub Issues를 통해 알려주세요.

---

**💡 팁**: 이 플러그인은 웹 개발자와 디자이너가 Figma의 벡터 요소를 웹에서 바로 사용할 수 있도록 도와줍니다. CSS 스프라이트나 아이콘 폰트 대신 가벼운 SVG Data URL을 활용해보세요!

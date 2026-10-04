# KNU Coding Theory Team 홈페이지

강원대학교 수학과 부호이론 연구팀(KNU Coding Theory Team) 홈페이지입니다.
- 빌드 도구 없이 HTML·CSS·JavaScript만으로 동작하며, GitHub Pages에 그대로 올리면 됩니다.
- 내용은 `content/*.json`에 있고, **Pages CMS**(무료, https://pagescms.org)의 웹 양식으로 고칩니다.
- 한국어 판은 맨 위 폴더, 영어 판은 `en/` 폴더입니다. 오른쪽 위 `EN`·`한국어` 단추로 같은 페이지의 다른 언어 판으로 옮겨 갑니다.
- 화면은 보는 사람의 다크 모드 설정과 관계없이 항상 밝은 바탕으로 보입니다.

## 1. 구성

```
index.html          첫 화면: 소개, 연구 분야(한 줄씩), 최근 소식(뉴스레터 카드 3개)
research.html       연구 분야 자세한 설명, VT 부호 체험
people.html         구성원(책임교수 / 박사후연구원 / 대학원생 / 학부연구생 / 졸업생)
publications.html   출간: 학술지 / 학술대회 발표 / 특허
seminars.html       정규 세미나 4개(월·수·목·금)와 캘린더(월별, 이달의 발표·행사 목록)
news.html           뉴스레터: 달마다 묶은 소식 카드. news.html?id=… 은 소식 한 건의 본문
join.html           참여 안내
en/*.html           위 일곱 페이지의 영어 판
content/            ★ 홈페이지 내용(JSON). Pages CMS가 이 파일들을 고칩니다
  site.json           연구팀 이름, 소개, 연락처, 참여 안내
  research.json       연구 분야 4개
  people.json         구성원
  publications.json   출간
  seminar.json        학기 기간, 정규 세미나 목록(이름·요일·시간·장소), 날짜별 발표자, 휴강
  news.json           최근 소식(뉴스레터)
media/              Pages CMS로 올린 그림(사진·대표 그림)이 저장되는 곳
.pages.yml          Pages CMS 설정(입력 양식 정의)
assets/js/main.js   화면 그리기(고칠 일이 거의 없음)
assets/css/style.css  디자인
.nojekyll           GitHub Pages가 Jekyll 변환을 하지 않게 하는 빈 파일
```

## 2. 내용 고치기: Pages CMS

> **공개 원칙**
> - 이 저장소와 홈페이지는 공개됩니다. 진행 중인 세부 연구 주제·결과·발표 제목·발표 자료는 올리지 않습니다.
> - 연구 분야는 큰 주제 수준으로만 적고, 세미나는 날짜·발표자·분야만 적습니다.
> - 구체적인 내용은 논문·특허로 공개된 뒤 Publications와 소식에 적습니다.

### 처음 한 번 연결하기
1. 이 폴더를 GitHub 저장소로 올립니다(4절).
2. https://app.pagescms.org 에 들어가 **GitHub 계정으로 로그인**하고, Pages CMS GitHub 앱이 이 저장소에 접근하도록 허용합니다.
3. 저장소를 고르면 왼쪽 메뉴에 `.pages.yml`에서 정한 여섯 항목이 나타납니다: 최근 소식(뉴스레터), 정규 세미나, 구성원, 출간, 연구 분야, 연구팀 기본 정보.
4. 학생에게 편집을 맡기려면 두 방법이 있습니다.
   - 학생의 GitHub 계정을 저장소 공동 작업자로 초대합니다.
   - 또는 Pages CMS의 협업자(Collaborators) 기능으로 메일 초대를 보냅니다. 학생은 메일로 받은 로그인 링크로 들어오므로 GitHub 계정이 없어도 됩니다.

### 최근 소식(뉴스레터) 올리기
"최근 소식 (뉴스레터)"에서 항목을 하나 추가하고 다음 칸을 채운 뒤 저장(Save)합니다. 저장하면 1~2분 뒤 홈페이지에 나타납니다.

| 칸 | 적는 것 |
|---|---|
| 주소용 이름 | 영문 소문자·숫자·하이픈. 예: `2026-10-15-seminar`. 소식 본문 주소가 `news.html?id=2026-10-15-seminar`가 됩니다 |
| 날짜 | 달력에서 고릅니다. 같은 달 소식이 "2026년 10월호"로 묶입니다 |
| 종류 | 세미나 / 학회 발표 / 논문 게재 / 특허 / 소식 |
| 제목, 한 줄 요약 | 한국어(필수)와 영어. 영어를 비우면 영어 판에도 한국어가 나옵니다 |
| 대표 그림 | 선택. 올리면 `media/`에 저장되고 카드와 본문 위에 나옵니다 |
| 본문 | 워드 프로그램처럼 쓰는 편집기(굵게, 제목, 목록, 링크, 그림 넣기) |

- 첫 화면에는 가장 최근 소식 3건이 카드로 나옵니다.
- News 페이지에는 모든 소식이 달마다 묶여 나옵니다.

### 정규 세미나 바꾸기
"정규 세미나"에서 다음을 고칩니다.
- 학기 시작일·마지막 날: 이 기간 안의 해당 요일 칸에 정규 세미나가 자동으로 채워집니다.
- 정규 세미나 목록: 지금은 점심 세미나(월), 학부연구생 세미나(수), 연구원 세미나(목), 연구생 세미나(금) 네 개입니다. 이름·요일·시간·장소·한 줄 설명을 고칠 수 있습니다.
  - 세미나마다 캘린더 색이 다릅니다(목록 순서대로 남색·청록·보라·주황).
  - 아이디(`lunch` 등)는 바꾸지 않습니다. 세미나를 새로 만들면 `.pages.yml`의 "어느 세미나" 선택 목록 두 곳에도 추가해야 합니다(Claude에게 요청).
- 발표 일정: 날짜, 어느 세미나, 발표자(여러 명이면 쉼표)를 적습니다. 분야는 선택입니다.
  - 정규 세미나가 아닌 행사(워크숍 등)는 "행사 이름"을 적으면 따로 표시됩니다.
- 휴강: 날짜와 어느 세미나를 고릅니다. 세미나를 비우면 그날의 모든 세미나가 휴강으로 표시됩니다.
- 세미나 페이지 아래 "이달의 발표·행사"에는 발표자가 정해진 날, 휴강, 특별 행사만 나옵니다.

### 그 밖의 항목
- **구성원**: 구분(책임교수·박사후연구원·대학원생·학부연구생·졸업생)을 고르고 사진을 올리면 됩니다. 사진이 없으면 이니셜이 나옵니다.
- **출간**: 분류(학술지·학술대회 발표·특허)를 고릅니다. 예시 항목은 지우거나 "예시 항목"을 끕니다.
- **연구 분야**와 **연구팀 기본 정보**: 소개 문장, 연락처, 참여 안내를 고칩니다.

## 3. 내 컴퓨터에서 미리 보기

내용을 `content/*.json`에서 읽어 오므로, 파일을 더블클릭해 열면 "내용을 불러오지 못했습니다"가 나옵니다. 폴더에서 다음 명령으로 간이 웹 서버를 띄운 뒤 브라우저로 `http://127.0.0.1:8000`을 엽니다(끝낼 때는 Ctrl+C).
```
python3 -m http.server 8000 --bind 127.0.0.1
```
- 세미나 캘린더는 주소 끝에 `#2026-08`처럼 붙이면 그 달을 바로 엽니다.
- 주소 끝에 `#selftest`를 붙이면 VT 부호 체험의 자체 시험 결과가 나옵니다.

## 4. GitHub Pages로 게시하기

**권장: 연구팀 이름 주소** — `https://knu-coding-theory-team.github.io`
1. GitHub에서 조직(Organization)을 만듭니다. 예: `knu-coding-theory-team`, 무료 플랜이면 됩니다.
2. 그 조직에 저장소 `knu-coding-theory-team.github.io`를 Public으로 만듭니다.
3. 이 폴더의 파일을 모두 저장소 맨 위에 올립니다. 숨김 파일 `.pages.yml`, `.nojekyll`, `media/.gitkeep`도 함께 올립니다.
   - 웹에서는 "Add file → Upload files"로 올립니다.
   - 터미널에서는 `git init && git add . && git commit -m "site" && git branch -M main && git remote add origin <저장소 주소> && git push -u origin main`으로 올립니다.
4. 저장소의 Settings → Pages → Source를 "Deploy from a branch", Branch를 `main` / `/ (root)`로 정합니다.
5. 1~2분 뒤 주소로 열립니다. 이후 Pages CMS로 저장할 때마다 자동으로 반영됩니다.

- 개인 계정 아래 프로젝트 주소(`https://<계정>.github.io/<저장소>/`)로 올려도 동작합니다.
- Pages CMS가 그림 주소를 `/media/…`로 적는데, 화면 스크립트가 이 주소를 페이지 위치에 맞게 고쳐 씁니다.

## 5. 게시 전에 확인할 것 (TODO)

- [ ] `content/people.json`: 영문 이름 표기 확인(최환혁 Whan-Hyuk Choi, 장덕규 Deokgyu Jang, 노영건 Younggeon Noh, 이상구·장환희·양재승 — 추정 표기), 노영건 박사 관심 분야, 구성원 공개 동의
- [ ] `content/seminar.json`: 학기 기간(지금 2026-09-02 ~ 2026-12-16은 임시), 세미나 장소
- [ ] `content/news.json`: RIKEN 연수의 실제 날짜(지금 7/1로 넣음)
- [ ] `content/publications.json`: 학술대회 발표·특허 추가, 논문 DOI·PDF 주소(지금은 arXiv 한 건만 연결)
- [ ] 영어 문장 검토(Claude 번역)
- [ ] 공개 원칙(2절) 확인

## 6. 디자인 참고와 예시 사이트

다음 템플릿을 참고했습니다(2026. 10. 4. 확인). 코드는 새로 썼습니다.
- al-folio: 흰 바탕과 넓은 여백, 한 가지 강조색, 가는 구분선, 논문 목록과 ABS·BIB 버튼
- research-lab-website(Allan Lab 계열): 소개·소식·구성원 페이지 구성
- Hugo Blox Research Group: 역할별로 묶은 구성원

같은 템플릿으로 만든 연구실 사이트 예:
- al-folio: Hay Lab(Caltech) https://haylab.caltech.edu/ , Decision Lab(UCSF) https://decisionlab.ucsf.edu/ , SAILING Lab https://sailing-lab.github.io/ , Kenji Fukushima Lab https://kenji-fukushima-lab.github.io/
- Greene Lab Website Template: Greene Lab https://greenelab.com/ , Way Lab https://www.waysciencelab.com/ , TIS Lab https://tislab.org/

글꼴은 Pretendard(SIL Open Font License, jsDelivr CDN)를 씁니다.

## 7. 그림 출처

첫 화면의 그림 세 개는 위키미디어 공용(Wikimedia Commons)의 퍼블릭 도메인 그림을 그대로 썼습니다(2026. 10. 4. 받음, 저작자 표시 의무 없음). 파일 이름도 원래 이름 그대로입니다.

| 파일 (`assets/img/`) | 원본 | 작성자 | 이용 조건 |
|---|---|---|---|
| `Numbered_3-cube_on_side.svg` | https://commons.wikimedia.org/wiki/File:Numbered_3-cube_on_side.svg | Watchduck (Tilman Piesk) | CC0 1.0 |
| `Yet_another_Bloch_sphere.svg` | https://commons.wikimedia.org/wiki/File:Yet_another_Bloch_sphere.svg | Qupybara | CC0 1.0 |
| `DNA_simple2.svg` | https://commons.wikimedia.org/wiki/File:DNA_simple2.svg | Forluvoft | 퍼블릭 도메인 |

로고 `assets/img/1.png`는 최환혁 교수 제공입니다.

# at.gbsw. — 학내 이메일 시스템
재학생, 졸업생, 교사 분들을 위한 이메일 시스템입니다.

원래 쓰시던 이메일(gmail, 네이버 메일 등)을 입력하시면 학교 공식 도메인 (gbsw.hs.kr)과 연동되어 이메일을 받아보실 수 있습니다.

https://at.gbsw.hs.kr

https://center.gbsw.hs.kr/#9

## 원리
Cloudflare Email Forwarding API를 통해 @gbsw.hs.kr 도메인으로 온 메일을 사용자가 입력한 개인 이메일 주소로 전달해줍니다.

## 개발 스택
* TypeScript
* React.js
* 경소고 통합로그인 API
* Cloudflare Email Forwarding API
* Cloudflare Pages
* Cloudflare Pages Functions

## 특징
* Serverless로 설계하여 비용 효율 증가
* 경소고 통합 로그인 계정을 통해 간단하게 학생인증, 이메일 포워딩 설정 가능

## 끄적끄적
* 이메일 수신 뿐만 아니라 도메인 SFP 설정을 적절히 하면 송신도 가능합니다. - 대신 사용자가 설정해야 할 것이 많아서 가이드를 만들던가 해야...
* UI가 너무 심플한데?

## Rights
만든이: @pmh-only\
License: MIT License

## db

### ************

아직 개발 중입니다.
오류나 아이디어가 있으면 자유롭게 이슈를 생성해 주세요.

### ************

### 연결 정보

해당 모듈은 dotenv 사용을 전제로 합니다.
따라서 .env 파일을 생성해야합니다.

4개의 값이 필요합니다.

```env
DB_HOST
DB_USER
DB_PASSWORD
DB_DATABASE
```

```
DB_HOST: mysql 주소
```
```
DB_USER: mysql 유저
```
```
DB_PASSWORD: mysql 비밀번호
```
```
DB_DATABASE: mysql 데이터베이스
```

### db

연결된 `mysql.Connection` 입니다.

연결이 끊길 시 자동으로 재연결됩니다.

### querySync

query문과 파라미터를 입력할 수 있는 Promise(async 함수)입니다.

async 함수 내에서 가독성으로 좋게 하기 위해 사용합니다.

예외 처리를 해주시길 바랍니다.
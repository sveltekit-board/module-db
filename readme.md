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

### runQuery
runQuery 함수는 다음과 같이 사용합니다.
```ts
runQuery(async(callback) => {
    ...
    ...
    await callback(query);
    await callback(query, values);
    ...
    ...
    return data;
})
```
querySync 함수와 다르게 이 함수는 db connection을 생성하고, 마지막에 종료합니다.
메모리 누수의 위험을 줄입니다.

사용법의 예를 들어보겠습니다.
name이 철수인 행의 age 값과 name이 영희인 행의 age 값을 가져와 출력하고, 둘을 비교하고 누구의 나이가 더 많은 지 출력해봅시다.
```ts
import { runQuery } from "@sveltekit-board/db";

let who = await runQuery(async (run) => {
    let age1 = await run("SELECT `age` FROM `humans` WHERE `name` = ?", ['철수']);
    console.log(age1);//10

    let age2 = await run("SELECT `age` FROM `humans` WHERE `name` = ?", ['영희']);
    console.log(age2);//8

    if( age1 > age2){
        return '철수';
    }
    else if (age2 > age1){
        return '영희';
    }
});

console.log(`${who}의 나이가 더 많습니다.`)//철수의 나이가 더 많습니다.
```

runQuery 함수는 비동기 함수이며, 인수로는 하나의 인수를 가지는 비동기 콜백함수를 갖습니다.
이 비동기 콜백함수의 인수는 위의 querySync와 비슷하게 SQL 쿼리문과 값들을 받아 실행한 후, 반환 값을 반환합니다.

예외가 발생할 수 있으므로 예외 처리를 해주십시오.
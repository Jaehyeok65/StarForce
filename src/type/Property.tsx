export interface Property {
    meso : number; //토글 창에 보여질 메소
    erda : number; //조각
    gem : number; //코어 젬스톤
    innocent? : number; //이노센트
    epicabillity? : number; //에잠
    editional? : number; //에디셔널
    dew : number; //황혼의 이슬
    milk : number; //순록의 우유
    pure : number; //순백
    [key: string]: any; // 인덱스 시그니처 추가
};

export interface PropertyProfit {
    meso : number; //토글 창에 보여질 메소
    erda : number; //조각
    gem : number; //코어 젬스톤
    innocent? : number; //이노센트
    epicabillity? : number; //에잠
    editional? : number; //에디셔널
    dew : number; //황혼의 이슬
    milk : number; //순록의 우유
    pure : number; //순백
    [key: string]: any; // 인덱스 시그니처 추가
};

export const defaultProperty : Property = {
    meso : 0,
    erda : 0,
    gem : 0,
    innocent : 0,
    epicabillity : 0,
    editional : 0,
    dew : 0,
    milk : 0,
    pure : 0,
};

export const defaultPropertyProfit : PropertyProfit = {
    meso : 1, //메소의 가치는 1원
    erda : 0, //조각의 가치는 입력해야함
    gem : 0, //젬스톤의 가치는 입력
    innocent : 0, //이노센트의 가치는 입력
    epicabillity : 0, //에잠의 가치는 입력
    editional : 0, //에디셔널 가치는 입력
    dew : 5100, // 
    milk : 2750,
    pure : 0, //순백의 가치는 입력
};


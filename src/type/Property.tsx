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
    totalmeso : number; //캐릭터 창에 보여질 메소
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
    totalmeso : 0,
};
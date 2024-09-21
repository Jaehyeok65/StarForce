import axios from 'axios';
import moment from 'moment';

const API_KEY =
    'test_74790d6c1e1a5cb1905064274c1b3980d0486e0a9d76ace9cf20b083cd2d302982ea3bdcfca557e78d562bd50c5822bd';

const isRealTime = (ocid: string, date: string, type: string) => {
    const current = moment().format('YYYY-MM-DD');

    if (current === date) {
        //실시간 조회라면
        return `https://open.api.nexon.com/maplestory/v1/${type}?ocid=${ocid}`;
    } else {
        //실시간 조회가 아니라면
        return `https://open.api.nexon.com/maplestory/v1/${type}?ocid=${ocid}&date=${date}`;
    }
};

export const getOcidData = async (characterName: string) => {
    if (characterName === '') {
        return;
    }
    const urlString =
        'https://open.api.nexon.com/maplestory/v1/id?character_name=' +
        characterName;
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data?.ocid;
    } catch (e) {
        console.log(e);
    }
};

export const getStatData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/stat');

    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data?.final_stat;
    } catch (e) {
        console.log(e);
    }
};

export const getCharacterData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/basic');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });
        const Data = {
            ...answer?.data,
            ocid
        };

        return Data;
    } catch (e) {
        console.log(e);
    }
};

export const getItemData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/item-equipment');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getCashItemData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/cashitem-equipment');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getBeautyData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/beauty-equipment');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getVCoreData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/vmatrix');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getHexaCoreData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/hexamatrix');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getHexaStatData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/hexamatrix-stat');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getSymbolData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/symbol-equipment');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getAbilityData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/ability');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getLinkData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'character/link-skill');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getUnionData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'user/union');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

export const getUnionRaiderData = async (ocid: string, date: string) => {
    const urlString = isRealTime(ocid, date, 'user/union-raider');
    try {
        const answer = await axios.get(urlString, {
            headers: {
                'x-nxopen-api-key': API_KEY,
            },
        });

        return answer?.data;
    } catch (e) {
        console.log(e);
    }
};

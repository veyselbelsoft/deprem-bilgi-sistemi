import axios from "axios";

export const GetCities = () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/HasarTespit/GetIller')
            .then(async response => {
                resolve(await response.data);
            })
            .catch(async error => {
                reject(await error)
            })
    })
}

export const GetCounties = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/HasarTespit/GetIleGoreIlceler?id=${id}`)
            .then(async response => {
                resolve(await response.data);
            })
            .catch(async error => {
                reject(await error)
            })
    })
} 

export const GetDistrictList = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/HasarTespit/GetIlceyeGoreMahalleler?id=${id}`)
            .then(async response => {
                resolve(await response.data);
            })
            .catch(async error => {
                reject(await error)
            })
    })
}

export const SearchBuildingDamage = (aramaTip = 2, ilKodu, ilceKodu, mahalleKodu, sokak = "", binaNo = "",) => {
    return new Promise((resolve, reject) => {
        const body = { aramaTip, binaNo, ilKodu, ilceKodu, mahalleKodu, sokak };
        axios.post('/api/HasarTespit/HasarTespitAdresSorgu', body)
            .then(async response => {
                resolve(await response.data);
            })
            .catch(async error => {
                reject(await error)
            })
    })
} 

/*
export const GetCities = (CompanyId, VehicleDefinitionId, UserId, StartDate, EndDate) => {
    return new Promise((resolve, reject) => {
        const body = { 'CompanyId': CompanyId, 'VehicleDefinitionId': VehicleDefinitionId, "UserId": UserId, "StartDate": StartDate, "EndDate": EndDate };
        axios.post('https://dehas-api.csb.gov.tr/api/HasarTespit/GetIller', body)
            .then(async response => {
                resolve(await response.data);
            })
            .catch(async error => {
                reject(await error)
            })
    })
} */